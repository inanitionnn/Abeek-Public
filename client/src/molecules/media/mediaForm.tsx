import { ComponentPropsWithoutRef, Ref, forwardRef, memo } from "react";

import { motion } from "framer-motion";
import MyHeader from "../../atom/myHeader";
import {
  GetMediaQuery,
  WatchedEnum,
} from "../../graphql/__generated__/graphql";
import MyParagraph from "../../atom/myParagraph";
import { MyTitle } from "../myTitle";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithoutRef<"div"> & {
  media: GetMediaQuery["getMedia"] | null;
};

export const MediaForm = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, media, ...restProps } = props;
    return (
      <div
        ref={ref}
        className={twMerge(
          "flex flex-col-reverse items-center sm:flex-col sm:items-start gap-8",
          className
        )}
        {...restProps}
      >
        <div className="max-w-[400px] 2xl:min-w-[320px] 2xl:max-w-[320px]">
          <MyHeader vsize={"lg"} className="text-start">
            {media?.title}
          </MyHeader>

          <MyTitle vsize={"sm"} title="Type: ">
            <MyParagraph vsize={"sm"} className="capitalize text-start">
              {media?.__typename === "FilmMediaResponse" && media?.filmType}
              {media?.__typename === "SeriesMediaResponse" && media?.seriesType}
              {media?.__typename === "ComicsMediaResponse" && media?.comicsType}
              {media?.__typename === "BookMediaResponse" && media?.bookType}
            </MyParagraph>
          </MyTitle>

          <MyTitle vsize={"sm"} title="Year: ">
            <MyParagraph vsize={"sm"} className="text-start">
              {(media?.__typename === "ComicsMediaResponse" ||
                media?.__typename === "SeriesMediaResponse") && (
                <>
                  {media?.startYear
                    ? `${media?.startYear} - ${
                        media?.endYear ? media?.endYear : "????"
                      }`
                    : ""}
                </>
              )}
              {(media?.__typename === "FilmMediaResponse" ||
                media?.__typename === "BookMediaResponse") && (
                <>{media?.year}</>
              )}
            </MyParagraph>
          </MyTitle>
          <MyTitle vsize={"sm"} title="Country: ">
            <MyParagraph vsize={"sm"} className="text-start">
              {media?.country}
            </MyParagraph>
          </MyTitle>
          <MyTitle vsize={"sm"} title="Language: ">
            <MyParagraph vsize={"sm"} className="text-start">
              {media?.language}
            </MyParagraph>
          </MyTitle>

          {media?.__typename === "FilmMediaResponse" && (
            <MyTitle vsize={"sm"} title="Run time: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.runTime}
              </MyParagraph>
            </MyTitle>
          )}

          {(media?.__typename === "FilmMediaResponse" ||
            media?.__typename === "SeriesMediaResponse") && (
            <MyTitle vsize={"sm"} title="Directed by: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.directedBy?.join(", ")}
              </MyParagraph>
            </MyTitle>
          )}

          {media?.__typename === "FilmMediaResponse" && (
            <MyTitle vsize={"sm"} title="Starring: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.starring?.join(", ")}
              </MyParagraph>
            </MyTitle>
          )}

          {(media?.__typename === "BookMediaResponse" ||
            media?.__typename === "ComicsMediaResponse") && (
            <MyTitle vsize={"sm"} title="Author: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.author?.join(", ")}
              </MyParagraph>
            </MyTitle>
          )}
          {media?.__typename === "FilmMediaResponse" && (
            <>
              <MyTitle vsize={"sm"} title="Budget: ">
                <MyParagraph vsize={"sm"} className="text-start">
                  {media?.budget}
                </MyParagraph>
              </MyTitle>
              <MyTitle vsize={"sm"} title="Box office: ">
                <MyParagraph vsize={"sm"} className="text-start">
                  {media?.boxOffice}
                </MyParagraph>
              </MyTitle>
            </>
          )}
          {media?.__typename === "BookMediaResponse" && (
            <MyTitle vsize={"sm"} title="Pages: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.pages}
              </MyParagraph>
            </MyTitle>
          )}
          {media?.__typename === "ComicsMediaResponse" && (
            <MyTitle vsize={"sm"} title="Volumes: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.volumes}
              </MyParagraph>
            </MyTitle>
          )}
        </div>
        <div className="flex gap-4 items-center justify-center">
          {media?.watched ? (
            <div
              className={clsx({
                "border-error": media?.watched === WatchedEnum.Abandoned,
                "border-warning": media?.watched === WatchedEnum.Paused,
                "border-info": media?.watched === WatchedEnum.Planned,
                "border-success":
                  media?.watched === WatchedEnum.Completed ||
                  media?.watched === WatchedEnum.Reviewing ||
                  media?.watched === WatchedEnum.Viewing,
                "p-2 font-head border-2 font-bold text-base rounded-2xl capitalize":
                  true,
              })}
            >
              {media?.watched}
            </div>
          ) : null}
          {!!media?.rate ? (
            <div className="flex items-center gap-1 p-2 rounded-2xl border-2">
              <MyHeader>{media?.rate}</MyHeader>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
    );
  })
);
const MMediaForm = motion(MediaForm);
export default MMediaForm;
