import { memo } from "react";
import MyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import { useAppSelector } from "../../hooks/redux";

const MediaInfo = memo(() => {
  const { parseMedia } = useAppSelector((state) => state.media);
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
          <MyHeader vsize={"sm"}>Type: </MyHeader>
          <MyParagraph vsize={"sm"} className="text-start">
            {parseMedia.__typename === "FilmParseResponse"
              ? parseMedia.filmType
              : parseMedia.__typename === "SeriesParseResponse"
              ? parseMedia.seriesType
              : parseMedia.__typename === "BookParseResponse"
              ? parseMedia.bookType
              : parseMedia.__typename === "ComicsParseResponse"
              ? parseMedia.comicsType
              : ""}
          </MyParagraph>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
          <MyHeader vsize={"sm"}>Title: </MyHeader>
          <MyParagraph vsize={"sm"} className="text-start">
            {parseMedia.title || ""}
          </MyParagraph>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
          <MyHeader vsize={"sm"}>Year: </MyHeader>
          <MyParagraph vsize={"sm"} className="text-start">
            {(parseMedia?.__typename === "ComicsParseResponse" ||
              parseMedia?.__typename === "SeriesParseResponse") &&
              (parseMedia.startYear
                ? `${parseMedia.startYear} - ${
                    parseMedia.endYear ? parseMedia.endYear : "????"
                  }`
                : "")}
            {(parseMedia?.__typename === "FilmParseResponse" ||
              parseMedia?.__typename === "BookParseResponse") &&
              parseMedia.year}
          </MyParagraph>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
          <MyHeader vsize={"sm"}>Country: </MyHeader>
          <MyParagraph vsize={"sm"} className="text-start">
            {parseMedia.country || ""}
          </MyParagraph>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
          <MyHeader vsize={"sm"}>Language: </MyHeader>
          <MyParagraph vsize={"sm"} className="text-start">
            {parseMedia.language || ""}
          </MyParagraph>
        </div>
        {parseMedia.__typename === "FilmParseResponse" && (
          <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
            <MyHeader vsize={"sm"}>Run time: </MyHeader>
            <MyParagraph vsize={"sm"} className="text-start">
              {parseMedia.runTime || ""}
            </MyParagraph>
          </div>
        )}

        {(parseMedia.__typename === "SeriesParseResponse" ||
          parseMedia.__typename === "FilmParseResponse") && (
          <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
            <MyHeader vsize={"sm"}>Directed by: </MyHeader>
            <MyParagraph vsize={"sm"} className="text-start">
              {parseMedia.directedBy?.join(", ") || ""}
            </MyParagraph>
          </div>
        )}

        {parseMedia.__typename === "FilmParseResponse" && (
          <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
            <MyHeader vsize={"sm"}>Starring: </MyHeader>
            <MyParagraph vsize={"sm"} className="text-start">
              {parseMedia.starring?.join(", ") || ""}
            </MyParagraph>
          </div>
        )}

        {(parseMedia.__typename === "BookParseResponse" ||
          parseMedia.__typename === "ComicsParseResponse") && (
          <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
            <MyHeader vsize={"sm"}>Author: </MyHeader>
            <MyParagraph vsize={"sm"} className="text-start">
              {parseMedia.author?.join(", ") || ""}
            </MyParagraph>
          </div>
        )}
        {parseMedia.__typename === "FilmParseResponse" && (
          <>
            <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
              <MyHeader vsize={"sm"}>Budget: </MyHeader>
              <MyParagraph vsize={"sm"} className="text-start">
                {parseMedia.budget || ""}
              </MyParagraph>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
              <MyHeader vsize={"sm"}>Box Office: </MyHeader>
              <MyParagraph vsize={"sm"} className="text-start">
                {parseMedia.boxOffice || ""}
              </MyParagraph>
            </div>
          </>
        )}
        {parseMedia.__typename === "BookParseResponse" && (
          <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
            <MyHeader vsize={"sm"}>Pages: </MyHeader>
            <MyParagraph vsize={"sm"} className="text-start">
              {parseMedia.pages || ""}
            </MyParagraph>
          </div>
        )}
        {parseMedia.__typename === "ComicsParseResponse" && (
          <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
            <MyHeader vsize={"sm"}>Volumes: </MyHeader>
            <MyParagraph vsize={"sm"} className="text-start">
              {parseMedia.volumes || ""}
            </MyParagraph>
          </div>
        )}
        {(parseMedia.__typename === "SeriesParseResponse" ||
          parseMedia.__typename === "FilmParseResponse") && (
          <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
            <MyHeader vsize={"sm"}>Plot: </MyHeader>
            <MyParagraph vsize={"sm"} className="text-start">
              {parseMedia.plot || ""}
            </MyParagraph>
          </div>
        )}
        {(parseMedia.__typename === "ComicsParseResponse" ||
          parseMedia.__typename === "BookParseResponse") && (
          <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
            <MyHeader vsize={"sm"}>Description: </MyHeader>
            <MyParagraph vsize={"sm"} className="text-start">
              {parseMedia.description || ""}
            </MyParagraph>
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:gap-1 items-start sm:items-center">
          <MyHeader vsize={"sm"}>Genres: </MyHeader>
          <MyParagraph vsize={"sm"} className="text-start">
            {parseMedia.genres?.join(", ") || ""}
          </MyParagraph>
        </div>
      </div>
    </>
  );
});

export default MediaInfo;
