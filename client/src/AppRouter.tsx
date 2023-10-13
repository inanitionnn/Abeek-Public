import loadable from "@loadable/component";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/redux";
import Media from "./pages/media";

const AsyncPage = loadable(
  (props: { page: string }) => import(`./pages/${props.page}.tsx`),
  {
    cacheKey: (props) => props.page,
  }
);

const AsyncAddPage = loadable(
  (props: { page: string }) => import(`./pages/add/${props.page}.tsx`),
  {
    cacheKey: (props) => props.page,
  }
);

const AsyncAdditionalPage = loadable(
  (props: { page: string }) => import(`./pages/additional/${props.page}.tsx`),
  {
    cacheKey: (props) => props.page,
  }
);

const AsyncModerationPage = loadable(
  (props: { page: string }) => import(`./pages/moderation/${props.page}.tsx`),
  {
    cacheKey: (props) => props.page,
  }
);

export default function AppRouter() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const role = useAppSelector((state) => state.user.role);
  const isModerator = role === "m" || role === "a";
  const isAdmin = role === "a";
  return (
    <Routes>
      <Route path="/" element={<AsyncPage page="about" />} />
      <Route
        path="/collection/user/:userId"
        element={<AsyncPage page="collection" />}
      />
      <Route
        path="/media/:type/:id/user/:userId"
        element={<AsyncPage page="media" />}
      />
      <Route path="policy" element={<AsyncAdditionalPage page="policy" />} />
      <Route path="terms" element={<AsyncAdditionalPage page="terms" />} />
      {isLoggedIn ? (
        <>
          <Route path="/profile" element={<AsyncPage page="profile" />} />
          <Route
            path="/notifications"
            element={<AsyncPage page="notifications" />}
          />
          <Route path="/follows" element={<AsyncPage page="follows" />} />
          <Route path="/tokens" element={<AsyncPage page="tokens" />} />
          <Route path="/collection" element={<AsyncPage page="collection" />} />
          <Route path="/add" element={<AsyncAddPage page="add" />} />
          <Route path="/add/create" element={<AsyncAddPage page="create" />} />
          <Route
            path="/add/create/wiki"
            element={<AsyncAddPage page="wiki" />}
          />
          <Route
            path="/add/create/text"
            element={<AsyncAddPage page="text" />}
          />
          <Route
            path="/add/create/self"
            element={<AsyncAddPage page="self" />}
          />
          <Route path="/media/:type/:id" element={<Media />} />
          <Route path="/random" element={<AsyncPage page="random" />} />
          <Route path="/search" element={<AsyncPage page="search" />} />
          {!!isModerator && (
            <>
              <Route
                path="/moderation"
                element={<AsyncModerationPage page="moderation" />}
              />
              <Route
                path="/moderation/media"
                element={<AsyncModerationPage page="media" />}
              />
              <Route
                path="/moderation/reports/media"
                element={<AsyncModerationPage page="mediaReport" />}
              />
              <Route
                path="/moderation/reports/note"
                element={<AsyncModerationPage page="noteReport" />}
              />
              <Route
                path="/moderation/reports/account"
                element={<AsyncModerationPage page="accountReport" />}
              />
              <Route
                path="/moderation/admin"
                element={<AsyncModerationPage page="admin" />}
              />
              <Route
                path="/moderation/edit/:type/:id"
                element={<AsyncModerationPage page="edit" />}
              />
            </>
          )}
          {!!isAdmin && (
            <>
              <Route
                path="/moderation/moder"
                element={<AsyncModerationPage page="moderation" />}
              />
            </>
          )}

          <Route path="*" element={<AsyncAdditionalPage page="notFound" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<AsyncPage page="login" />} />
          <Route
            path="/registration"
            element={<AsyncPage page="registration" />}
          />
          <Route
            path="/forgot"
            element={<AsyncAdditionalPage page="forgot" />}
          />
          <Route
            path="/reset/:link"
            element={<AsyncAdditionalPage page="reset" />}
          />
          <Route
            path="/activate/:link"
            element={<AsyncAdditionalPage page="activation" />}
          />
          <Route
            path="*"
            element={<AsyncAdditionalPage page="unauthorized" />}
          />
        </>
      )}
    </Routes>
  );
}
