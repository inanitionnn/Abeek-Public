import { motion } from "framer-motion";
import { Ref, forwardRef, memo } from "react";
import { GetUserMediaQuery } from "../../graphql/__generated__/graphql";
import { IMAGE_API } from "../../constants";
import { MyHeader } from "../../atom/myHeader";
import { MyParagraph } from "../../atom/myParagraph";

interface Props {
  media: Exclude<GetUserMediaQuery["getUserMedia"], null | undefined>[0];
}

const MediumCollectionCard = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { media } = props;
    return (
      <div ref={ref}>
        <div className="group relative w-[100px] h-[150px] sm:w-[150px] sm:h-[225px] lg:w-[180px] lg:h-[270px]">
          {media.image ? (
            <img
              className="absolute top-0 right-0 left-0 h-full object-cover rounded-2xl shadow
               contrast-[0.95] group-hover:shadow-none group-hover:opacity-10"
              src={IMAGE_API + "/" + media.image}
              alt="cover"
            />
          ) : (
            <div
              className="absolute top-0 right-0 left-0 h-full rounded-2xl shadow
           group-hover:shadow-none group-hover:opacity-10 bg-base-300 bg-opacity-80
           flex justify-center items-center p-4"
            >
              <MyHeader className="text-sm sm:text-base line-clamp-4">
                {media.title}
              </MyHeader>
            </div>
          )}

          <div
            className="w-full h-full bg-transparent rounded-xl p-1 sm:p-4 opacity-0
              group-hover:opacity-100  transition duration-[0.6s] ease-in-out z-10 
              backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              <MyHeader className="text-sm sm:text-base text-start line-clamp-4">
                {media.title}
              </MyHeader>

              <MyParagraph className="text-sm sm:text-base text-start">
                {(media?.__typename === "ComicsMediaResponse" ||
                  media?.__typename === "SeriesMediaResponse") &&
                  (media.startYear
                    ? `${media.startYear} - ${
                        media.endYear ? media.endYear : "????"
                      }`
                    : "")}
                {(media?.__typename === "FilmMediaResponse" ||
                  media?.__typename === "BookMediaResponse") &&
                  media.year}
              </MyParagraph>
              <MyParagraph className="text-sm sm:text-base text-start">
                (
                {media?.__typename === "ComicsMediaResponse" &&
                  media.comicsType}
                {media?.__typename === "SeriesMediaResponse" &&
                  media.seriesType + " series"}
                {media?.__typename === "BookMediaResponse" &&
                  media.bookType + " book"}
                {media?.__typename === "FilmMediaResponse" && media.filmType})
              </MyParagraph>
            </div>
            <div className="flex flex-col justify-center sm:gap-1 w-[120px]">
              {media.rate && (
                <div className="flex justify-start items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <MyHeader className="text-sm sm:text-base text-start">
                    {media.rate}
                  </MyHeader>
                </div>
              )}

              <div className="flex justify-start items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 md:w-5 md:h-5"
                >
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  <path
                    fillRule="evenodd"
                    d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <MyHeader className="text-sm sm:text-base text-start">
                  {media.watched}
                </MyHeader>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

const MMediumCollectionCard = motion(MediumCollectionCard);
export default MMediumCollectionCard;
