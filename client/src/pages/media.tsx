import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MediaEnum } from "../graphql/__generated__/graphql";
import { IMAGE_API } from "../constants";
import loadable from "@loadable/component";
import MediaBlock from "../templates/media/mediaBlock";
import { useAppSelector } from "../hooks/redux";
import MMyContainer from "../atom/myContainer";

const AsyncMediaEdit = loadable(() => import("../templates/media/mediaEdit"));

export default function Media() {
  const {
    type,
    id: mediaId,
    userId: followId,
  } = useParams<{ type: MediaEnum; id: string; userId?: string }>();

  const [isEdit, setIsEdit] = useState(false);
  const media = useAppSelector((state) => state.media.getMedia);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [mediaId, isEdit]);

  return (
    <>
      <main className="relative md:ml-[70px] lg:ml-[190px]">
        <div
          className={`absolute top-0 left-0 right-0 h-80 bg-cover bg-center blur-2xl opacity-60 -z-10`}
          style={{
            backgroundImage: `url(${IMAGE_API}/${media?.image || ""})`,
          }}
        ></div>

        <MMyContainer
          initial="hidden"
          animate="visible"
          vwide={"lg"}
          className="justify-start"
        >
          {!isEdit ? (
            <MediaBlock
              followId={followId}
              mediaId={mediaId}
              mediaType={type}
              setIsEdit={setIsEdit}
            />
          ) : (
            <AsyncMediaEdit setIsEdit={setIsEdit} />
          )}
        </MMyContainer>
      </main>
    </>
  );
}
