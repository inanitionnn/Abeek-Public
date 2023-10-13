import { memo } from "react";
import MyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import {
  CreatedEnum,
  GetModerEditMediaQuery,
} from "../../graphql/__generated__/graphql";
import { MyTitle } from "../myTitle";
import { MyBlock } from "../../atom/myBlock";
import { Link } from "react-router-dom";

type Props = {
  media: GetModerEditMediaQuery["getModerEditMedia"];
  creatorId?: string;
  createdType?: CreatedEnum | null;
};

const ModerMediaInfo = memo((props: Props) => {
  const { media, creatorId, createdType } = props;
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center ">
        <Link
          to={
            creatorId
              ? `/media/${media?.media}/${media?.id}/user/${creatorId}`
              : `/media/${media?.media}/${media?.id}`
          }
        >
          {!media?.image ? (
            <div
              className="min-w-[200px] max-w-[200px] min-h-[300px] max-h-[300px]  rounded-2xl bg-base-200
                  contrast-[0.9] drop-shadow-lg flex justify-center items-center uppercase font-bold text-center"
            >
              Have no cover
            </div>
          ) : (
            <img
              src={media?.image}
              alt="poster"
              className="min-w-[200px] max-w-[200px] min-h-[300px] max-h-[300px] rounded-2xl 
                  contrast-[0.9] drop-shadow-lg object-cover"
            />
          )}
        </Link>
        <MyBlock className="bg-base-200 p-8 items-start gap-1">
          <MyTitle vsize={"md"} title="Created type: ">
            <MyHeader vsize={"md"} className="text-start">
              {createdType}
            </MyHeader>
          </MyTitle>
          <div className="divider my-0" />

          <MyTitle vsize={"sm"} title="Type: ">
            <MyParagraph vsize={"sm"} className="text-start">
              {media?.__typename === "FilmBaseResponse"
                ? media?.filmType
                : media?.__typename === "SeriesModerResponse"
                ? media?.seriesType
                : media?.__typename === "BookBaseResponse"
                ? media?.bookType
                : media?.__typename === "ComicsBaseResponse"
                ? media?.comicsType
                : ""}
            </MyParagraph>
          </MyTitle>
          <MyTitle vsize={"sm"} title="Title: ">
            <MyParagraph vsize={"sm"} className="text-start">
              {media?.title}
            </MyParagraph>
          </MyTitle>
          <MyTitle vsize={"sm"} title="Year: ">
            <MyParagraph vsize={"sm"} className="text-start">
              {(media?.__typename === "ComicsBaseResponse" ||
                media?.__typename === "SeriesModerResponse") &&
                (media?.startYear
                  ? `${media?.startYear} - ${
                      media?.endYear ? media?.endYear : "????"
                    }`
                  : "")}
              {(media?.__typename === "FilmBaseResponse" ||
                media?.__typename === "BookBaseResponse") &&
                media?.year}
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

          {media?.__typename === "FilmBaseResponse" && (
            <MyTitle vsize={"sm"} title="Run time: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.runTime}
              </MyParagraph>
            </MyTitle>
          )}

          {(media?.__typename === "SeriesModerResponse" ||
            media?.__typename === "FilmBaseResponse") && (
            <MyTitle vsize={"sm"} title="Directed by: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.directedBy?.join(", ")}
              </MyParagraph>
            </MyTitle>
          )}

          {media?.__typename === "FilmBaseResponse" && (
            <MyTitle vsize={"sm"} title="Starring: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.starring?.join(", ")}
              </MyParagraph>
            </MyTitle>
          )}

          {(media?.__typename === "BookBaseResponse" ||
            media?.__typename === "ComicsBaseResponse") && (
            <MyTitle vsize={"sm"} title="Author: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.author?.join(", ")}
              </MyParagraph>
            </MyTitle>
          )}
          {media?.__typename === "FilmBaseResponse" && (
            <>
              <MyTitle vsize={"sm"} title="Budget: ">
                <MyParagraph vsize={"sm"} className="text-start">
                  {media?.budget}
                </MyParagraph>
              </MyTitle>
              <MyTitle vsize={"sm"} title="Box Office: ">
                <MyParagraph vsize={"sm"} className="text-start">
                  {media?.boxOffice}
                </MyParagraph>
              </MyTitle>
            </>
          )}
          {media?.__typename === "BookBaseResponse" && (
            <MyTitle vsize={"sm"} title="Pages: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.pages}
              </MyParagraph>
            </MyTitle>
          )}
          {media?.__typename === "ComicsBaseResponse" && (
            <MyTitle vsize={"sm"} title="Volumes: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.volumes}
              </MyParagraph>
            </MyTitle>
          )}
          {(media?.__typename === "SeriesModerResponse" ||
            media?.__typename === "FilmBaseResponse") && (
            <MyTitle vsize={"sm"} title="Plot: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.plot}
              </MyParagraph>
            </MyTitle>
          )}
          {(media?.__typename === "ComicsBaseResponse" ||
            media?.__typename === "BookBaseResponse") && (
            <MyTitle vsize={"sm"} title="Description: ">
              <MyParagraph vsize={"sm"} className="text-start">
                {media?.description}
              </MyParagraph>
            </MyTitle>
          )}
          <MyTitle vsize={"sm"} title="Genres: ">
            <MyParagraph vsize={"sm"} className="text-start">
              {media?.genres?.join(", ")}
            </MyParagraph>
          </MyTitle>
          <MyTitle vsize={"sm"} title="Tags: ">
            <MyParagraph vsize={"sm"} className="text-start">
              {media?.tags?.join(", ")}
            </MyParagraph>
          </MyTitle>
        </MyBlock>
      </div>
      {media?.__typename === "SeriesModerResponse" ? (
        <div className="flex justify-center">
          <div className="overflow-x-auto sm:min-w-[450px] w-fit">
            <MyHeader vsize={"lg"}>Seasons</MyHeader>

            <table className="table bg-base-200 ">
              {/* head */}
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th className="sm:table-cell text-start">Title</th>
                  <th>Episodes</th>
                </tr>
              </thead>
              <tbody>
                {media.seasons?.map((season) => (
                  <tr key={season.season}>
                    <th className="font-normal text-center">
                      ({season.season})
                    </th>
                    <td className=" sm:table-cell ">
                      {season.title ? season.title : "No title"}
                    </td>
                    <td className="text-center">{season.episodes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default ModerMediaInfo;
