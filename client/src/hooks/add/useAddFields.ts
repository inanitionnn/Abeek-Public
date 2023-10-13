import React, { useEffect } from "react";
import {
  BookParseResponse,
  ComicsParseResponse,
  FilmParseResponse,
  MediaEnum,
  SeriesParseResponse,
  WikiMediaParseQuery,
} from "../../graphql/__generated__/graphql";
import { useAppDispatch, useAppSelector } from "../redux";
import { setParseMediaState } from "../../redux/reducers/mediaSlice";
import { setStageState } from "../../redux/reducers/addPageSlice";
import { Field } from "../../constants";

type Props = {
  parseMedia: WikiMediaParseQuery["wikiMediaParse"]["media"] | null | undefined;

  setParseMedia: React.Dispatch<
    React.SetStateAction<
      WikiMediaParseQuery["wikiMediaParse"]["media"] | undefined
    >
  >;
};

const useAddFields = (props: Props) => {
  const { parseMedia, setParseMedia } = props;
  const dispatch = useAppDispatch();
  const mediaType = useAppSelector((state) => state.types.mediaType);
  const parsedParseMedia = useAppSelector((state) => state.media.parseMedia);

  const handleNextButton = () => {
    dispatch(
      setParseMediaState({
        ...parseMedia,
        __typename:
          mediaType === MediaEnum.Film
            ? "FilmParseResponse"
            : mediaType === MediaEnum.Series
            ? "SeriesParseResponse"
            : mediaType === MediaEnum.Comics
            ? "ComicsParseResponse"
            : "BookParseResponse",

        directedBy: ((parseMedia as FilmParseResponse | SeriesParseResponse)
          ?.directedBy || [])[0]
          ?.split(",")
          ?.map((direct) => direct.trim())
          ?.filter((direct) => direct),
        starring: ((parseMedia as FilmParseResponse)?.directedBy || [])[0]
          ?.split(",")
          ?.map((direct) => direct.trim())
          ?.filter((direct) => direct),
        author: ((parseMedia as BookParseResponse | ComicsParseResponse)
          ?.author || [])[0]
          ?.split(",")
          ?.map((direct) => direct.trim())
          ?.filter((direct) => direct),
        genres: (parseMedia?.genres || [])[0]
          ?.split(",")
          ?.map((direct) => direct.trim())
          ?.filter((direct) => direct),
        tags: (parseMedia?.tags || [])[0]
          ?.split(",")
          ?.map((direct) => direct.trim())
          ?.filter((direct) => direct),
      })
    );
    dispatch(setStageState("images"));
  };

  useEffect(() => {
    if (parsedParseMedia) {
      setParseMedia(parsedParseMedia);
    }
  }, [parsedParseMedia]);

  const fields: Field[] = [
    {
      if: true,
      type: "text",
      title: "Title: ",
      placeholder: "Title",
      maxLength: 55,
      value: parseMedia?.title || "",
      onChange: (event) =>
        setParseMedia((prev) => ({
          ...prev,
          title: event.target.value,
        })),
    },
    {
      if: mediaType === MediaEnum.Film || mediaType === MediaEnum.Book,
      type: "number",
      title: "Year: ",
      placeholder: "0000",
      maxLength: 4,
      value: (parseMedia as FilmParseResponse | BookParseResponse)?.year || "",
      onChange: (event) =>
        setParseMedia((prev) => ({
          ...prev,
          year: parseInt(event.target.value, 10) || null,
        })),
    },
    {
      if: mediaType === MediaEnum.Series || mediaType === MediaEnum.Comics,
      type: "number",
      title: "Start year: ",
      placeholder: "0000",
      maxLength: 4,
      value:
        (parseMedia as SeriesParseResponse | ComicsParseResponse)?.startYear ||
        "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            startYear: parseInt(event.target.value, 10) || null,
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Series || mediaType === MediaEnum.Comics,
      type: "number",
      title: "End year: ",
      placeholder: "0000",
      maxLength: 4,
      value:
        (parseMedia as SeriesParseResponse | ComicsParseResponse)?.endYear ||
        "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            endYear: parseInt(event.target.value, 10) || null,
          };
        }),
    },
    {
      if: true,
      type: "text",
      title: "Country: ",
      placeholder: "Country",
      maxLength: 55,
      value: parseMedia?.country || "",
      onChange: (event) =>
        setParseMedia((prev) => ({
          ...prev,
          country: event.target.value,
        })),
    },
    {
      if: true,
      type: "text",
      title: "Language: ",
      placeholder: "Language",
      maxLength: 55,
      value: parseMedia?.language || "",
      onChange: (event) =>
        setParseMedia((prev) => ({
          ...prev,
          language: event.target.value,
        })),
    },
    {
      if: mediaType === MediaEnum.Film,
      type: "text",
      title: "Run time: ",
      placeholder: "0h 00m",
      maxLength: 10,
      value: (parseMedia as FilmParseResponse)?.runTime || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            runTime: event.target.value,
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Film || mediaType === MediaEnum.Series,
      type: "text",
      title: "Directed by: ",
      placeholder: "Director 1, director 2",
      rows: 2,
      maxLength: 510,
      value:
        (
          parseMedia as FilmParseResponse | SeriesParseResponse
        )?.directedBy?.join(", ") || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            directedBy: [event.target.value],
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Book || mediaType === MediaEnum.Comics,
      type: "text",
      title: "Author: ",
      placeholder: "Author 1, author 2",
      rows: 2,
      maxLength: 55,
      value:
        (parseMedia as ComicsParseResponse | BookParseResponse)?.author?.join(
          ", "
        ) || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            author: [event.target.value],
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Film,
      type: "text",
      title: "Starring: ",
      placeholder: "Star 1, star 2",
      rows: 2,
      maxLength: 510,
      value: (parseMedia as FilmParseResponse)?.starring?.join(", ") || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            starring: [event.target.value],
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Film,
      type: "text",
      title: "Box office: ",
      placeholder: "00 million",
      maxLength: 55,
      value: (parseMedia as FilmParseResponse)?.boxOffice || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            boxOffice: event.target.value,
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Film,
      type: "text",
      title: "Budget: ",
      placeholder: "00 million",
      maxLength: 55,
      value: (parseMedia as FilmParseResponse)?.budget || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            budget: event.target.value,
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Comics,
      type: "number",
      title: "Volumes: ",
      placeholder: "00",
      maxLength: 6,
      value: (parseMedia as ComicsParseResponse)?.volumes || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            volumes: parseInt(event.target.value, 10) || null,
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Book,
      type: "number",
      title: "Pages: ",
      placeholder: "00",
      maxLength: 6,
      value: (parseMedia as BookParseResponse)?.pages || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            pages: parseInt(event.target.value, 10) || null,
          };
        }),
    },
    {
      if: mediaType === MediaEnum.Film || mediaType === MediaEnum.Series,
      type: "text",
      title: "Plot: ",
      placeholder: "Plot...",
      rows: 8,
      maxLength: 1020,
      value: (parseMedia as FilmParseResponse)?.plot || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return { ...prev, plot: event.target.value };
        }),
    },
    {
      if: mediaType === MediaEnum.Comics || mediaType === MediaEnum.Book,
      type: "text",
      title: "Description: ",
      placeholder: "Plot...",
      rows: 8,
      maxLength: 1020,
      value:
        (parseMedia as ComicsParseResponse | BookParseResponse)?.description ||
        "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            description: event.target.value,
          };
        }),
    },
    {
      if: true,
      type: "text",
      title: "Genres: ",
      placeholder: "Genre1, genre2...",
      rows: 2,
      maxLength: 510,
      value: parseMedia?.genres?.join(", ") || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            genres: [event.target.value],
          };
        }),
    },
    {
      if: true,
      type: "text",
      title: "Tags: ",
      placeholder: "Genre1, genre2...",
      rows: 2,
      maxLength: 510,
      value: parseMedia?.tags?.join(", ") || "",
      onChange: (event) =>
        setParseMedia((prev) => {
          return {
            ...prev,
            tags: [event.target.value],
          };
        }),
    },
  ];

  return {
    fields,
    handleNextButton,
  };
};

export default useAddFields;
