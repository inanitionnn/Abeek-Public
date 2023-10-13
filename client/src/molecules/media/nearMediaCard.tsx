import { IMAGE_API } from "../../constants";
import { Link } from "react-router-dom";
import { GetNearMediaQuery } from "../../graphql/__generated__/graphql";
import { memo } from "react";
import { MyHeader } from "../../atom/myHeader";
import { MyParagraph } from "../../atom/myParagraph";
import clsx from "clsx";

type Props = {
  media: Exclude<GetNearMediaQuery["getNearMedia"], null | undefined>[0];
};
const NearMediaCard = memo((props: Props) => {
  const { media } = props;
  return (
    <Link to={`/media/${media.media}/${media.id}`}>
      <div className="group relative w-[100px] h-[150px] sm:w-[150px] sm:h-[225px]">
        {media.image ? (
          <img
            className="absolute top-0 right-0 left-0 h-full object-cover rounded-2xl shadow
          contrast-[0.95] group-hover:shadow-none group-hover:opacity-10"
            src={IMAGE_API + "/" + media.image}
            alt="cover"
          />
        ) : (
          <div
            className="absolute top-0 right-0 left-0 h-full p-4 
          flex justify-center items-center rounded-2xl shadow 
          group-hover:shadow-none group-hover:opacity-10 bg-base-200 text-center"
          >
            {media.title}
          </div>
        )}

        <div
          className={clsx({
            "absolute bottom-0 right-0 left-0 h-4 rounded-b-2xl group-hover:opacity-0":
              true,
            "bg-success": media.inUserMedia,
            "bg-warning": !media.inUserMedia,
          })}
        ></div>

        <div
          className={clsx({
            "absolute bottom-0 right-0 left-0 h-full rounded-2xl border-2 group-hover:opacity-0":
              true,
            "border-success": media.inUserMedia,
            "border-warning": !media.inUserMedia,
          })}
        ></div>

        <div
          className="w-full h-full bg-transparent rounded-xl p-4 opacity-0
 group-hover:opacity-100  transition duration-[0.6s] ease-in-out z-10 
 backdrop-blur-md flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between h-full">
            <MyHeader className="line-clamp-4">{media.title}</MyHeader>
            <div>
              <MyParagraph>
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
              <MyParagraph>
                (
                {media?.__typename === "ComicsSearchResponse" &&
                  media.comicsType}
                {media?.__typename === "SeriesSearchResponse" &&
                  media.seriesType + " series"}
                {media?.__typename === "BookSearchResponse" &&
                  media.bookType + " book"}
                {media?.__typename === "FilmSearchResponse" && media.filmType})
              </MyParagraph>
            </div>
            {media?.inUserMedia ? (
              <MyParagraph className="px-2 py-1 rounded-2xl bg-success text-success-content">
                Alredy in collection
              </MyParagraph>
            ) : (
              <MyParagraph className="px-2 py-1 rounded-2xl bg-warning text-warning-content">
                Not in collection
              </MyParagraph>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default NearMediaCard;
