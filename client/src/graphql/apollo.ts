import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { store } from "../redux/store";
import {
  LogoutDocument,
  LogoutMutation,
  LogoutMutationVariables,
  RefreshDocument,
  RefreshMutation,
  RefreshMutationVariables,
} from "./__generated__/graphql";
import { setRefreshState, setlogOutState } from "../redux/reducers/userSlice";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import jwt_decode from "jwt-decode";
import { IJwt, SERVER_URL } from "../constants";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const httpLink = new HttpLink({
  uri: SERVER_URL + "/graphql",
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  const { token, uniqueId } = store.getState().user;
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`,
      "x-fingerprint": `${uniqueId}`,
    },
  });
  return forward(operation);
});

let refreshingToken = false;

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            if (operation.operationName === "Refresh") return;
            if (!refreshingToken) {
              refreshingToken = true;

              const observable = new Observable<
                FetchResult<Record<string, any>>
              >((observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshToken();
                    if (accessToken) {
                      const decoded: IJwt = jwt_decode(accessToken);
                      store.dispatch(
                        setRefreshState({
                          additionalMediaTokens: decoded.additionalMediaTokens,
                          mediaTokens: decoded.mediaTokens,
                          notificationCount: decoded.notificationCount,
                          role: decoded.role,
                          token: accessToken,
                        })
                      );
                    } else {
                      gqlClient.mutate<LogoutMutation, LogoutMutationVariables>(
                        {
                          mutation: LogoutDocument,
                        }
                      );
                      store.dispatch(setlogOutState());
                      throw new GraphQLError("Empty AccessToken");
                    }

                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                    refreshingToken = false;
                    // Retry the failed request
                  } catch (err) {
                    console.log("Retry the failed request");
                    observer.error(err);
                  }
                })();
              });

              return observable;
            } else {
              const observable = new Observable<
                FetchResult<Record<string, any>>
              >((observer) => {
                const interval = setInterval(() => {
                  if (!refreshingToken) {
                    clearInterval(interval);
                    forward(operation).subscribe(observer);
                  }
                }, 100);
              });

              return observable;
            }
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const cache = new InMemoryCache();

await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

const gqlClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
});

const refreshToken = async () => {
  try {
    const refreshResponse = await gqlClient.mutate<
      RefreshMutation,
      RefreshMutationVariables
    >({
      mutation: RefreshDocument,
    });
    const accessToken = refreshResponse.data?.refresh.token;
    return accessToken;
  } catch (err) {
    gqlClient.mutate<LogoutMutation, LogoutMutationVariables>({
      mutation: LogoutDocument,
    });
    store.dispatch(setlogOutState());
    throw err;
  }
};

export default gqlClient;
