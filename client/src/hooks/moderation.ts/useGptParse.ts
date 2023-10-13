import React, { useEffect } from "react";
import {
  BookParseResponse,
  ComicsParseResponse,
  FilmParseResponse,
  GetModerEditMediaQuery,
  GptMediaParseDocument,
  GptMediaParseQuery,
  GptMediaParseQueryVariables,
  MediaEnum,
  SeriesParseResponse,
} from "../../graphql/__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { findEmptyFields } from "../../utils/findEmptyKeys";

type Props = {
  media: GetModerEditMediaQuery["getModerEditMedia"];
  setMedia: React.Dispatch<
    React.SetStateAction<GetModerEditMediaQuery["getModerEditMedia"]>
  >;
};

const useGtpParse = (props: Props) => {
  const { media, setMedia } = props;

  const [gtpQuery, { data: gptData, loading: gptLoading, error: gptError }] =
    useLazyQuery<GptMediaParseQuery, GptMediaParseQueryVariables>(
      GptMediaParseDocument
    );

  const handleParseButton = () => {
    let query = "";
    let isAfter2021 = false;
    let mediaType: MediaEnum = MediaEnum.Film;
    let isQuery = false;
    const keys = findEmptyFields(media || {});
    switch (media?.__typename) {
      case "FilmBaseResponse": {
        if (media?.plot && media?.year && media?.year > 2021) {
          isQuery = true;
          query = media?.plot;
          isAfter2021 = true;
          mediaType = MediaEnum.Film;
        } else if (media?.year && media?.year <= 2021) {
          isQuery = true;
          query = `film ${media?.title} (${media?.year})`;
          isAfter2021 = false;
          mediaType = MediaEnum.Film;
        } else {
          isQuery = false;
        }
        break;
      }
      case "SeriesModerResponse": {
        if (media?.plot && media?.startYear && media?.startYear > 2021) {
          isQuery = true;
          query = media?.plot;
          isAfter2021 = true;
          mediaType = MediaEnum.Series;
        } else if (media?.startYear && media?.startYear <= 2021) {
          isQuery = true;
          query = `series ${media?.title}`;
          isAfter2021 = false;
          mediaType = MediaEnum.Series;
        } else {
          isQuery = false;
        }
        break;
      }
      case "ComicsBaseResponse": {
        if (media?.description && media?.startYear && media?.startYear > 2021) {
          isQuery = true;
          query = media?.description;
          isAfter2021 = true;
          mediaType = MediaEnum.Comics;
        } else if (media?.startYear && media?.startYear <= 2021) {
          isQuery = true;
          query = `comics ${media?.title}`;
          isAfter2021 = false;
          mediaType = MediaEnum.Comics;
        } else {
          isQuery = false;
        }
        break;
      }
      case "BookBaseResponse": {
        if (media?.description && media?.year && media?.year > 2021) {
          isQuery = true;
          query = media?.description;
          isAfter2021 = true;
          mediaType = MediaEnum.Book;
        } else if (media?.year && media?.year <= 2021) {
          isQuery = true;
          query = `book ${media?.title} (${media?.year})`;
          isAfter2021 = false;
          mediaType = MediaEnum.Book;
        } else {
          isQuery = false;
        }
        break;
      }
    }

    if (isQuery) {
      gtpQuery({
        variables: {
          input: {
            keys: keys,
            query: query,
            isAfter2021: isAfter2021,
            mediaType: mediaType,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (gptData) {
      const { media: parseMedia } = gptData.gptMediaParse;
      switch (media?.__typename) {
        case "FilmBaseResponse": {
          const newParseMedia = parseMedia as FilmParseResponse;
          setMedia((prev) => {
            return {
              ...prev,
              filmType: newParseMedia.filmType || media?.filmType,
              title: newParseMedia.title || media?.title,
              year: newParseMedia.year || media?.year,
              directedBy: !!newParseMedia.directedBy?.length
                ? [(newParseMedia.directedBy ?? []).join(", ")]
                : media?.directedBy,
              country: newParseMedia.country || media?.country,
              language: newParseMedia.language || media?.language,
              boxOffice: newParseMedia.boxOffice || media?.boxOffice,
              starring: newParseMedia.starring?.length
                ? [(newParseMedia.starring ?? []).join(", ")]
                : media?.starring,
              budget: newParseMedia.budget || media?.budget,
              runTime: newParseMedia.runTime || media?.runTime,
              genres: [
                [
                  ...new Set(
                    [
                      ...(newParseMedia.genres ?? []),
                      ...(media?.genres ?? []),
                    ].map((genre) => genre.toLowerCase())
                  ),
                ].join(", "),
              ],
              tags: [
                [
                  ...new Set(
                    [...(newParseMedia.tags ?? []), ...(media?.tags ?? [])].map(
                      (tag) => tag.toLowerCase()
                    )
                  ),
                ].join(", "),
              ],
              plot: newParseMedia.plot || media?.plot,
            };
          });
          break;
        }
        case "SeriesModerResponse": {
          const newParseMedia = parseMedia as SeriesParseResponse;
          setMedia((prev) => {
            return {
              ...prev,
              seriesType: newParseMedia.seriesType || media?.seriesType,
              title: newParseMedia.title || media?.title,
              startYear: newParseMedia.startYear || media?.startYear,
              endYear: newParseMedia.endYear || media?.endYear,
              directedBy: newParseMedia.directedBy?.length
                ? [(newParseMedia.directedBy ?? []).join(", ")]
                : media?.directedBy,
              country: newParseMedia.country || media?.country,
              language: newParseMedia.language || media?.language,
              genres: [
                [
                  ...new Set(
                    [
                      ...(newParseMedia.genres ?? []),
                      ...(media?.genres ?? []),
                    ].map((genre) => genre.toLowerCase())
                  ),
                ].join(", "),
              ],
              tags: [
                [
                  ...new Set(
                    [...(newParseMedia.tags ?? []), ...(media?.tags ?? [])].map(
                      (tag) => tag.toLowerCase()
                    )
                  ),
                ].join(", "),
              ],
              plot: newParseMedia.plot || media?.plot,
            };
          });
          break;
        }
        case "ComicsBaseResponse": {
          const newParseMedia = parseMedia as ComicsParseResponse;
          setMedia((prev) => {
            return {
              ...prev,
              comicsType: newParseMedia.comicsType || media?.comicsType,
              title: newParseMedia.title || media?.title,
              startYear: newParseMedia.startYear || media?.startYear,
              endYear: newParseMedia.endYear || media?.endYear,
              author: newParseMedia.author?.length
                ? [(newParseMedia.author ?? []).join(", ")]
                : media?.author,
              country: newParseMedia.country || media?.country,
              language: newParseMedia.language || media?.language,
              volumes: newParseMedia.volumes || media?.volumes,
              genres: [
                [
                  ...new Set(
                    [
                      ...(newParseMedia.genres ?? []),
                      ...(media?.genres ?? []),
                    ].map((genre) => genre.toLowerCase())
                  ),
                ].join(", "),
              ],
              tags: [
                [
                  ...new Set(
                    [...(newParseMedia.tags ?? []), ...(media?.tags ?? [])].map(
                      (tag) => tag.toLowerCase()
                    )
                  ),
                ].join(", "),
              ],
              description: newParseMedia.description || media?.description,
            };
          });
          break;
        }
        case "BookBaseResponse": {
          const newParseMedia = parseMedia as BookParseResponse;
          setMedia((prev) => {
            return {
              ...prev,
              bookType: newParseMedia.bookType || media?.bookType,
              title: newParseMedia.title || media?.title,
              year: newParseMedia.year || media?.year,
              author: !!newParseMedia.author?.length
                ? [(newParseMedia.author ?? []).join(", ")]
                : media?.author,
              country: newParseMedia.country || media?.country,
              language: newParseMedia.language || media?.language,
              pages: newParseMedia.pages || media?.pages,
              genres: [
                [
                  ...new Set(
                    [
                      ...(newParseMedia.genres ?? []),
                      ...(media?.genres ?? []),
                    ].map((genre) => genre.toLowerCase())
                  ),
                ].join(", "),
              ],
              tags: [
                [
                  ...new Set(
                    [...(newParseMedia.tags ?? []), ...(media?.tags ?? [])].map(
                      (tag) => tag.toLowerCase()
                    )
                  ),
                ].join(", "),
              ],
              description: newParseMedia.description || media?.description,
            };
          });
          break;
        }
      }
    }
  }, [gptData]);

  useEffect(() => {
    if (gptError) {
      toast.error(gptError.message);
    }
  }, [gptError]);

  return {
    handleParseButton,
    loading: gptLoading,
  };
};

export default useGtpParse;
