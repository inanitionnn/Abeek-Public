import MyParagraph from "../../atom/myParagraph";
import {
  ChangedEnum,
  GetFollowsMediaQuery,
  WatchedEnum,
} from "../../graphql/__generated__/graphql";
import MMyBlock from "../../atom/myBlock";
import MyHeader from "../../atom/myHeader";
import { IMAGE_API, slideAnimation } from "../../constants";
import { Link } from "react-router-dom";
import clsx from "clsx";
import timeAgo from "../../utils/timeAgo";
import { memo } from "react";

type Props = {
  media: Exclude<GetFollowsMediaQuery["getFollowsMedia"], null | undefined>[0];
  index: number;
};

const FollowBlock = memo((props: Props) => {
  const { media, index } = props;
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <MMyBlock
          variants={slideAnimation}
          custom={0 + (index < 10 ? index : 0)}
          className="p-0 w-full sm:w-2/5 bg-base-200"
        >
          <Link
            to={`/collection/user/${media.user?.id}`}
            className="group flex flex-col xl:flex-row justify-center items-center py-2 px-4 gap-4 rounded-2xl w-full h-full"
          >
            <div
              className="min-w-[80px] w-20 min-h-[80px] h-20 ring-[2px] 
          flex justify-center items-center
          ring-base-300 p-1 ring-current rounded-full bg-base-200"
            >
              {media.user?.picture ? (
                <img
                  src={IMAGE_API + "/" + media.user?.picture}
                  className="rounded-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              )}
            </div>
            <div className="max-w-[230px]">
              <MyHeader className="break-words truncate text-ellipsis w-full">
                {media.user?.name}
              </MyHeader>
            </div>
          </Link>
        </MMyBlock>
        <div className="flex gap-2 w-full">
          <MMyBlock
            variants={slideAnimation}
            custom={1 + (index < 10 ? index : 0)}
            className="py-2 px-4 gap-2 w-1/3 sm:w-1/3 bg-base-200"
          >
            <div className="flex flex-wrap justify-center items-center gap-2">
              {media.userMedia?.changed?.includes(
                ChangedEnum.AddToCollection
              ) ? (
                <div>
                  <p
                    className="p-2 font-head  text-center border-2 border-primary
           font-bold text-base rounded-2xl capitalize"
                  >
                    Add to collection
                  </p>
                </div>
              ) : null}
              {media.userMedia?.changed?.includes(ChangedEnum.ChangeNote) ? (
                <div>
                  <p
                    className="p-2 font-head  text-center border-2 border-secondary
           font-bold text-base rounded-2xl capitalize"
                  >
                    Change note
                  </p>
                </div>
              ) : null}

              {media.userMedia?.changed?.includes(
                ChangedEnum.ChangeWatchType
              ) ? (
                <div>
                  <div
                    className={clsx({
                      "border-error":
                        media.userMedia?.watched === WatchedEnum.Abandoned,
                      "border-warning":
                        media.userMedia?.watched === WatchedEnum.Paused,
                      "border-info":
                        media.userMedia?.watched === WatchedEnum.Planned,
                      "border-success":
                        media.userMedia?.watched === WatchedEnum.Completed ||
                        media.userMedia?.watched === WatchedEnum.Reviewing ||
                        media.userMedia?.watched === WatchedEnum.Viewing,
                      "p-2 font-head border-2 font-bold text-base rounded-2xl capitalize":
                        true,
                    })}
                  >
                    {media.userMedia?.watched}
                  </div>
                </div>
              ) : null}
              {media.userMedia?.changed?.includes(ChangedEnum.ChangeRate) ? (
                <div>
                  <div className="p-2 flex gap-1 items-center font-head border-2 font-bold text-base rounded-2xl capitalize">
                    <MyHeader vsize={"md"}>{media.userMedia?.rate}</MyHeader>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ) : null}
            </div>
            <MyHeader>{timeAgo(media.userMedia?.updatedAt)}</MyHeader>
          </MMyBlock>
          <MMyBlock
            variants={slideAnimation}
            custom={2 + (index < 10 ? index : 0)}
            className="p-0 gap-2 w-full bg-base-200"
          >
            <Link
              to={`/media/${media.media?.media}/${media.media?.id}/user/${media.user?.id}`}
              className="flex flex-col md:flex-row items-center justify-center sm:justify-start gap-4
  p-4 w-full"
            >
              <img
                src={IMAGE_API + "/" + media.media?.image}
                alt="cover"
                className="rounded-2xl w-20 h-30"
              />
              <div className="flex flex-col">
                <MyHeader className="line-clamp-[5]">
                  {media.media?.title}
                </MyHeader>
                <MyParagraph>
                  {media.media?.__typename === "BookBaseResponse" ||
                  media.media?.__typename === "FilmBaseResponse"
                    ? media.media?.year
                    : ""}
                  {(media.media?.__typename === "SeriesBaseResponse" ||
                    media.media?.__typename === "ComicsBaseResponse") &&
                    (!!media.media?.startYear && !!media.media?.endYear
                      ? `${media.media?.startYear} - ${media.media?.endYear}`
                      : !!media.media?.startYear
                      ? `${media.media?.startYear} - ????`
                      : "")}
                </MyParagraph>
              </div>
            </Link>
          </MMyBlock>
        </div>
      </div>
      {media.userMedia?.note &&
        media.userMedia?.changed?.includes(ChangedEnum.ChangeNote) && (
          <MMyBlock
            variants={slideAnimation}
            custom={3 + (index < 10 ? index : 0)}
            className="p-2 bg-base-200"
          >
            <MyParagraph className="w-full line-clamp-2 sm:line-clamp-1 text-start px-2 sm:px-12">
              <span className="font-bold">Note:</span> {media.userMedia?.note}
            </MyParagraph>
          </MMyBlock>
        )}
    </div>
  );
});

export default FollowBlock;
