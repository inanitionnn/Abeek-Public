import gqlClient from "../graphql/apollo";
import {
  LogoutDocument,
  LogoutMutation,
  LogoutMutationVariables,
  RefreshDocument,
  RefreshMutation,
  RefreshMutationVariables,
} from "../graphql/__generated__/graphql";
import { setRefreshState, setlogOutState } from "../redux/reducers/userSlice";
import { IJwt, SERVER_API } from "../constants";
import { useAppDispatch, useAppSelector } from "./redux";
import { GraphQLError } from "graphql";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

type Props = { cb: (url: string) => void; type: "media" | "avatar" };

export default function useFileUpload({ cb, type }: Props) {
  const dispatch = useAppDispatch();

  const uniqueId = useAppSelector((state) => state.user.uniqueId);

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
      dispatch(setlogOutState());
      throw err;
    }
  };

  const uploadFile = async (file: File, token: string) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        let response;
        if (type === "avatar") {
          response = await fetch(SERVER_API + "/public/upload/avatar", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              "x-fingerprint": `${uniqueId}`,
            },
          });
        } else {
          response = await fetch(SERVER_API + "/public/upload/cover", {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              "x-fingerprint": `${uniqueId}`,
            },
          });
        }

        if (response.ok) {
          const url = await response.text();
          cb(url);
        } else if (response.status === 401) {
          const accessToken = await refreshToken();
          if (accessToken) {
            const decoded: IJwt = jwt_decode(accessToken);
            dispatch(
              setRefreshState({
                role: decoded.role,
                token: accessToken,
                additionalMediaTokens: decoded.additionalMediaTokens,
                mediaTokens: decoded.mediaTokens,
                notificationCount: decoded.notificationCount,
              })
            );
            await uploadFile(file, accessToken);
          } else {
            gqlClient.mutate<LogoutMutation, LogoutMutationVariables>({
              mutation: LogoutDocument,
            });
            dispatch(setlogOutState());
            throw new GraphQLError("Empty AccessToken");
          }
        } else {
          toast.error(response.statusText);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return { uploadFile };
}
