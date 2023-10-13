import { motion } from "framer-motion";
import { Ref, forwardRef, memo } from "react";
import {
  FilmEnum,
  GetUserMediaQuery,
} from "../../graphql/__generated__/graphql";
import { IMAGE_API } from "../../constants";
import { MyHeader } from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";

interface Props {
  media: Exclude<GetUserMediaQuery["getUserMedia"], null | undefined>[0];
}

const SmallCollectionCard = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { media } = props;
    return (
      <div ref={ref} className="w-full sm:w-auto">
        <div className="flex items-center bg-base-200 rounded-2xl shadow p-4 gap-4 w-full sm:w-auto">
          {media.image ? (
            <img
              className="hidden sm:block w-[80px] h-[120px] object-cover rounded-lg contrast-[0.95]"
              src={IMAGE_API + "/" + media.image}
              alt="cover"
            />
          ) : null}

          <div className="space-y-1 sm:space-y-4 w-full sm:w-auto">
            <div className="max-w-[250px] flex gap-2 flex-col">
              <MyHeader className="line-clamp-2 text-start">
                {media.title}
              </MyHeader>
              <MyParagraph className="text-start">
                (
                {media?.__typename === "ComicsMediaResponse" &&
                  media.comicsType}
                {media?.__typename === "SeriesMediaResponse" &&
                  media.seriesType + " series"}
                {media?.__typename === "BookMediaResponse" &&
                  media.bookType + " book"}
                {media?.__typename === "FilmMediaResponse" &&
                  (media.filmType !== FilmEnum.Movie
                    ? media.filmType + " film"
                    : media.filmType)}
                )
              </MyParagraph>
            </div>
            <div className="flex flex-row justify-between sm:flex-col sm:justify-center gap-1">
              {media.rate ? (
                <div className="flex justify-start items-center gap-2">
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
                  <MyHeader>{media.rate}</MyHeader>
                </div>
              ) : null}

              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  <path
                    fillRule="evenodd"
                    d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <MyHeader>{media.watched}</MyHeader>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

const MSmallCollectionCard = motion(SmallCollectionCard);
export default MSmallCollectionCard;
