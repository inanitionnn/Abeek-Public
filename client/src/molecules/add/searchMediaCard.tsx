import { ComponentPropsWithRef, Ref, forwardRef, memo } from "react";
import { useAppSelector } from "../../hooks/redux";
import { motion } from "framer-motion";
import { IMAGE_API } from "../../constants";
import { Link } from "react-router-dom";
import MyBlock from "../../atom/myBlock";
import MyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import MyButton from "../../atom/myButton";

type Props = ComponentPropsWithRef<"div"> & {
  handleAddMedia: (id: string) => void;
  index: number;
};

const SearchMediaCard = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { handleAddMedia, index } = props;
    const searchMedia = useAppSelector((state) => state.media.searchMedia);
    const media = searchMedia?.[index];
    const mediaType = useAppSelector((state) => state.types.mediaType);

    return (
      <>
        <MyBlock ref={ref} className="sm:flex-row p-6 w-auto max-w-[400px]">
          {media?.image ? (
            <Link
              to={`/media/${mediaType}/${media.id}`}
              className="min-w-[100px] max-w-[100px] h-[150px]"
            >
              <img
                src={IMAGE_API + "/" + media.image || ""}
                alt="poster"
                className="rounded-2xl shadow contrast-[0.9]  w-[100px] h-[150px]  object-cover"
              />
            </Link>
          ) : (
            <div className="rounded-2xl shadow w-[100px] h-[150px] bg-base-200 flex justify-center items-center">
              <p className="text-center font-head">no image</p>
            </div>
          )}

          <div className="flex flex-col justify-between h-[150px]">
            <div>
              <MyHeader className="text-start line-clamp-3">
                {media?.title}
              </MyHeader>

              <MyParagraph vsize={"sm"} className="text-start">
                {(media?.__typename === "ComicsSearchResponse" ||
                  media?.__typename === "SeriesSearchResponse") &&
                  (media.startYear
                    ? `${media.startYear} - ${
                        media.endYear ? media.endYear : "????"
                      }`
                    : "")}
                {(media?.__typename === "FilmSearchResponse" ||
                  media?.__typename === "BookSearchResponse") &&
                  media.year}
              </MyParagraph>

              <MyParagraph vsize={"sm"} className="text-start line-clamp-2">
                {(media?.__typename === "BookSearchResponse" ||
                  media?.__typename === "ComicsSearchResponse") &&
                  media.author?.join(", ")}
                {media?.__typename === "FilmSearchResponse" &&
                  media.directedBy?.join(", ")}
              </MyParagraph>
            </div>
            {media?.inUserMedia ? (
              <MyButton vvariatns={"disabled"}>
                Already in <br /> collection
              </MyButton>
            ) : (
              <MyButton
                vvariatns={"primary"}
                onClick={() =>
                  media?.id
                    ? handleAddMedia(media?.id)
                    : console.log("no film id")
                }
              >
                Add {mediaType}
              </MyButton>
            )}
          </div>
        </MyBlock>
      </>
    );
  })
);
const MSearchMediaCard = motion(SearchMediaCard);
export default MSearchMediaCard;
