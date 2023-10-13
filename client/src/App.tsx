import { CookiesProvider } from "react-cookie";
// import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import gqlClient from "./graphql/apollo";
// import Navbar from "./templates/navbar";
import loadable from "@loadable/component";

const ToastContainer = loadable(() =>
  import("react-toastify").then((module) => module.ToastContainer)
);

const AppRouter = loadable(() => import("./AppRouter"), {
  cacheKey: () => "AppRouter",
});

const Navbar = loadable(() => import("./templates/navbar"), {
  cacheKey: () => "navbar",
});
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={gqlClient}>
            <CookiesProvider>
              <BrowserRouter>
                <ToastContainer />
                <Navbar />
                <AppRouter />
              </BrowserRouter>
            </CookiesProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
