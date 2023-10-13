import loadable from "@loadable/component";
import { useParams } from "react-router-dom";
import CollectionMedia from "../templates/collection/collectionMedia";
import MMyContainer from "../atom/myContainer";
import MyBgColor from "../atom/myBgColor";

const AsyncMFollowProfile = loadable(
  () => import("../templates/collection/collectionProfile")
);

export default function Collection() {
  const { userId: followId } = useParams<{ userId: string }>();

  return (
    <>
      <main className="md:ml-[260px] relative">
        <img
          src="/posters9.webp"
          alt="poster"
          className="w-full h-full object-cover fixed -z-50"
        />
        <MyBgColor>
          <MMyContainer
            initial="hidden"
            animate="visible"
            className="justify-start max-w-[1500px]"
          >
            {followId ? (
              <AsyncMFollowProfile followId={followId || ""} />
            ) : null}
            <CollectionMedia followId={followId || ""} />
          </MMyContainer>
        </MyBgColor>
      </main>
    </>
  );
}
