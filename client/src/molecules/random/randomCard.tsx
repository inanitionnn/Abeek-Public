import { Link } from "react-router-dom";
import MyParagraph from "../../atom/myParagraph";
import MyHeader from "../../atom/myHeader";
import { IMAGE_API } from "../../constants";
import { GetRandomMediaQuery } from "../../graphql/__generated__/graphql";
import { memo } from "react";
type Props = {
  media: Exclude<GetRandomMediaQuery["getRandomMedia"], null | undefined>[0];
};
const RandomCard = memo((props: Props) => {
  const { media } = props;
  return (
    <Link to={`/media/${media.media}/${media.id}`}>
      <div className="flex items-center h-full bg-base-200 rounded-2xl shadow p-4 max-w-[440px] gap-4">
        <img
          className="w-[100px] h-[150px] md:w-[150px] md:h-[225px] object-cover rounded-2xl shadow contrast-[0.95]"
          src={IMAGE_API + "/" + media.image}
          alt="cover"
        />
        <div className="flex flex-col h-full justify-between py-2 gap-4">
          <div>
            <MyHeader vsize={"lg"} className="text-start line-clamp-3 mb-1">
              {media.title}
            </MyHeader>

            <MyParagraph className="text-start">{media.country}</MyParagraph>

            <MyParagraph className="text-start">
              {(media?.__typename === "ComicsBaseResponse" ||
                media?.__typename === "SeriesBaseResponse") &&
                (media.startYear
                  ? `${media.startYear} - ${
                      media.endYear ? media.endYear : "????"
                    }`
                  : "")}
              {(media?.__typename === "FilmBaseResponse" ||
                media?.__typename === "BookBaseResponse") &&
                media.year}
            </MyParagraph>

            <MyParagraph className="text-start">
              {((media?.__typename === "ComicsBaseResponse" ||
                media?.__typename === "BookBaseResponse") &&
                media.author) ||
                ""}
              {media?.__typename === "FilmBaseResponse" && media.directedBy}
            </MyParagraph>

            <MyParagraph className="text-start">
              ({media?.__typename === "ComicsBaseResponse" && media.comicsType}
              {media?.__typename === "SeriesBaseResponse" &&
                media.seriesType + " series"}
              {media?.__typename === "BookBaseResponse" &&
                media.bookType + " book"}
              {media?.__typename === "FilmBaseResponse" && media.filmType})
            </MyParagraph>
          </div>

          <div className="flex flex-wrap gap-1">
            {media.genres?.slice(0, 6).map((genre) => (
              <div className="badge">{genre}</div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default RandomCard;
