import { Field } from "../../constants";
import {
  BookBaseResponse,
  ComicsBaseResponse,
  FilmBaseResponse,
  GetModerMediaQuery,
  SeriesModerResponse,
} from "../../graphql/__generated__/graphql";

type Props = {
  media: Exclude<
    GetModerMediaQuery["getModerMedia"],
    null | undefined
  >["media"];
  setMedia: React.Dispatch<
    React.SetStateAction<
      | Exclude<GetModerMediaQuery["getModerMedia"], null | undefined>["media"]
      | undefined
    >
  >;
};

const useModerFields = (props: Props) => {
  const { media, setMedia } = props;

  const fields: Field[] = [
    {
      if: true,
      type: "text",
      title: "Title: ",
      placeholder: "Title",
      maxLength: 55,
      value: media?.title || "",
      onChange: (event) =>
        setMedia((prev) => ({
          ...prev,
          title: event.target.value,
        })),
    },
    {
      if:
        media?.__typename === "FilmBaseResponse" ||
        media?.__typename === "BookBaseResponse",
      type: "number",
      title: "Year: ",
      placeholder: "0000",
      maxLength: 4,
      value: (media as FilmBaseResponse | BookBaseResponse)?.year || "",
      onChange: (event) =>
        setMedia((prev) => ({
          ...prev,
          year: parseInt(event.target.value, 10) || null,
        })),
    },
    {
      if:
        media?.__typename === "SeriesModerResponse" ||
        media?.__typename === "ComicsBaseResponse",
      type: "number",
      title: "Start year: ",
      placeholder: "0000",
      maxLength: 4,
      value:
        (media as SeriesModerResponse | ComicsBaseResponse)?.startYear || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            startYear: parseInt(event.target.value, 10) || null,
          };
        }),
    },
    {
      if:
        media?.__typename === "SeriesModerResponse" ||
        media?.__typename === "ComicsBaseResponse",
      type: "number",
      title: "End year: ",
      placeholder: "0000",
      maxLength: 4,
      value: (media as SeriesModerResponse | ComicsBaseResponse)?.endYear || "",
      onChange: (event) =>
        setMedia((prev) => {
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
      value: media?.country || "",
      onChange: (event) =>
        setMedia((prev) => ({
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
      value: media?.language || "",
      onChange: (event) =>
        setMedia((prev) => ({
          ...prev,
          language: event.target.value,
        })),
    },
    {
      if: media?.__typename === "FilmBaseResponse",
      type: "text",
      title: "Run time: ",
      placeholder: "0h 00m",
      maxLength: 10,
      value: (media as FilmBaseResponse)?.runTime || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            runTime: event.target.value,
          };
        }),
    },
    {
      if:
        media?.__typename === "FilmBaseResponse" ||
        media?.__typename === "SeriesModerResponse",
      type: "text",
      title: "Directed by: ",
      placeholder: "Director 1, director 2",
      rows: 2,
      maxLength: 510,
      value:
        (media as FilmBaseResponse | SeriesModerResponse)?.directedBy?.join(
          ", "
        ) || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            directedBy: [event.target.value],
          };
        }),
    },
    {
      if:
        media?.__typename === "BookBaseResponse" ||
        media?.__typename === "ComicsBaseResponse",
      type: "text",
      title: "Author: ",
      placeholder: "Author 1, author 2",
      rows: 2,
      maxLength: 55,
      value:
        (media as ComicsBaseResponse | BookBaseResponse)?.author?.join(", ") ||
        "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            author: [event.target.value],
          };
        }),
    },
    {
      if: media?.__typename === "FilmBaseResponse",
      type: "text",
      title: "Starring: ",
      placeholder: "Star 1, star 2",
      rows: 2,
      maxLength: 510,
      value: (media as FilmBaseResponse)?.starring?.join(", ") || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            starring: [event.target.value],
          };
        }),
    },
    {
      if: media?.__typename === "FilmBaseResponse",
      type: "text",
      title: "Box office: ",
      placeholder: "00 million",
      maxLength: 55,
      value: (media as FilmBaseResponse)?.boxOffice || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            boxOffice: event.target.value,
          };
        }),
    },
    {
      if: media?.__typename === "FilmBaseResponse",
      type: "text",
      title: "Budget: ",
      placeholder: "00 million",
      maxLength: 55,
      value: (media as FilmBaseResponse)?.budget || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            budget: event.target.value,
          };
        }),
    },
    {
      if: media?.__typename === "ComicsBaseResponse",
      type: "number",
      title: "Volumes: ",
      placeholder: "00",
      maxLength: 6,
      value: (media as ComicsBaseResponse)?.volumes || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            volumes: parseInt(event.target.value, 10) || null,
          };
        }),
    },
    {
      if: media?.__typename === "BookBaseResponse",
      type: "number",
      title: "Pages: ",
      placeholder: "00",
      maxLength: 6,
      value: (media as BookBaseResponse)?.pages || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            pages: parseInt(event.target.value, 10) || null,
          };
        }),
    },
    {
      if:
        media?.__typename === "FilmBaseResponse" ||
        media?.__typename === "SeriesModerResponse",
      type: "text",
      title: "Plot: ",
      placeholder: "Plot...",
      rows: 8,
      maxLength: 1020,
      value: (media as FilmBaseResponse)?.plot || "",
      onChange: (event) =>
        setMedia((prev) => {
          return { ...prev, plot: event.target.value };
        }),
    },
    {
      if:
        media?.__typename === "BookBaseResponse" ||
        media?.__typename === "ComicsBaseResponse",
      type: "text",
      title: "Description: ",
      placeholder: "Plot...",
      rows: 8,
      maxLength: 1020,
      value:
        (media as ComicsBaseResponse | BookBaseResponse)?.description || "",
      onChange: (event) =>
        setMedia((prev) => {
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
      value: media?.genres?.join(", ") || "",
      onChange: (event) =>
        setMedia((prev) => {
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
      value: media?.tags?.join(", ") || "",
      onChange: (event) =>
        setMedia((prev) => {
          return {
            ...prev,
            tags: [event.target.value],
          };
        }),
    },
  ];

  return { fields };
};
export default useModerFields;
