import { motion } from "framer-motion";
import MyHeader from "../../atom/myHeader";
import { IMAGE_API, slideAnimation } from "../../constants";
import MMediaButtons from "../../molecules/media/mediaButtons";
import MMediaForm from "../../molecules/media/mediaForm";
import MMediaTags from "../../molecules/media/mediaTags";
import loadable from "@loadable/component";
import { MediaEnum, ReportEnum } from "../../graphql/__generated__/graphql";
import MyParagraph from "../../atom/myParagraph";
import React, { memo, useState } from "react";
import MMediaNote from "../../molecules/media/mediaNote";
import MMediaSeasons from "../../molecules/media/mediaSeasons";
import NearMediaCard from "../../molecules/media/nearMediaCard";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useGetMediaQuery from "../../hooks/media/useGetMediaQuery";
import useReport from "../../hooks/useReport";
import { useNavigate } from "react-router-dom";
import { setGetMediaState } from "../../redux/reducers/mediaSlice";
import useGetNearestMedia from "../../hooks/media/useGetNearestMedia";
import useAddMediaToUser from "../../hooks/useAddMediaToUser";
import useDeleteMediaFromUser from "../../hooks/useDeleteMediaFromUser";

const AsyncMReport = loadable(() => import("../../organisms/media/report"));

type Props = {
  followId: string | null | undefined;
  mediaId: string | null | undefined;
  mediaType: MediaEnum | null | undefined;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const MediaBlock = memo((props: Props) => {
  const { setIsEdit, mediaType, mediaId, followId } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const media = useAppSelector((state) => state.types);
  const media = useAppSelector((state) => state.media.getMedia);
  const userId = useAppSelector((state) => state.user.user.id);
  const [isReport, setIsReport] = useState(false);

  const handleReport = () => {
    setIsReport((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  useGetMediaQuery({
    followId,
    mediaId,
    mediaType,
    userId,
  });

  const setInUserMedia = (bool: boolean) => {
    dispatch(setGetMediaState({ ...media, inUserMedia: bool }));
  };

  const { nearestMedia } = useGetNearestMedia({ mediaId, mediaType });

  const { handleAddMediaToUser } = useAddMediaToUser({
    mediaId,
    mediaType,
    handleCb: () => {
      setInUserMedia(true), navigate(`/media/${mediaType}/${mediaId}`);
    },
    errorCb: () => setInUserMedia(false),
  });

  const { handleDeleteMediaFromUser } = useDeleteMediaFromUser({
    mediaId,
    dataCb: () => navigate(-1),
  });

  const { handleReport: handleReportFetch } = useReport({});

  const handleSendReport = () => {
    handleReportFetch({
      mediaId: mediaId || null,
      mediaType: mediaType || null,
      userId: followId,
      reportType: ReportEnum.Note,
    });
  };

  return (
    <>
      {followId && (
        <MyHeader vsize={"xl"}>You are viewing another user's media!</MyHeader>
      )}
      <div className="relative flex flex-col gap-8 bg-base-100 bg-opacity-80 px-8 pt-14 rounded-2xl relative">
        <MMediaButtons
          variants={slideAnimation}
          custom={0}
          handleAddMediaToUser={handleAddMediaToUser}
          handleDeleteMedia={handleDeleteMediaFromUser}
          handleEdit={handleEdit}
          handleReport={handleReport}
          followId={followId}
          mediaId={mediaId}
          mediaType={mediaType}
        />

        <div className="flex flex-col 2xl:flex-row justify-center items-center">
          <div className="min-w-fit flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12">
            <motion.img
              variants={slideAnimation}
              custom={0}
              src={`${IMAGE_API}/${media?.image || ""}`}
              alt="poster"
              className="w-[150px] h-[225px] md:w-[200px] md:h-[300px] lg:w-[250px] lg:h-[375px] rounded-2xl bg-cover shadow"
            />

            <MMediaForm variants={slideAnimation} custom={1} media={media} />
          </div>
          <motion.div
            variants={slideAnimation}
            custom={2}
            className="divider divider-vertical 2xl:divider-horizontal"
          />

          <motion.div variants={slideAnimation} custom={2}>
            {(media?.__typename === "FilmMediaResponse" ||
              media?.__typename === "SeriesMediaResponse") && (
              <div className="flex flex-col gap-1">
                <MyHeader>Plot </MyHeader>
                <MyParagraph vsize={"sm"} className="line-clamp-[14]">
                  {media?.plot}
                </MyParagraph>
              </div>
            )}
            {(media?.__typename === "BookMediaResponse" ||
              media?.__typename === "ComicsMediaResponse") && (
              <div className="flex flex-col gap-1 items-center">
                <MyHeader>Description </MyHeader>
                <MyParagraph vsize={"sm"} className="line-clamp-[14]">
                  {media?.description}
                </MyParagraph>
              </div>
            )}
          </motion.div>
        </div>

        <div className="divider divider-vertical 2xl:hidden" />
        <MMediaTags
          variants={slideAnimation}
          custom={3}
          genres={media?.genres}
          tags={media?.tags}
          watched={media?.watched}
        />
        {isReport && (
          <AsyncMReport
            variants={slideAnimation}
            mediaId={media?.id || ""}
            mediaType={mediaType || MediaEnum.Film}
            setIsReport={setIsReport}
          />
        )}
        {media?.note && (
          <MMediaNote
            followId={followId}
            userId={userId}
            variants={slideAnimation}
            custom={4}
            note={media.note}
            handleSendReport={handleSendReport}
          />
        )}

        {media?.__typename === "SeriesMediaResponse" && (
          <MMediaSeasons
            variants={slideAnimation}
            custom={4}
            seasons={media.seasons}
            watched={media.watched}
          />
        )}
        {!!nearestMedia?.length ? (
          <div className="w-full">
            <MyHeader vsize={"lg"}>You may also be interested in</MyHeader>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {nearestMedia?.map((media) => (
                <NearMediaCard media={media} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
});

export default MediaBlock;
