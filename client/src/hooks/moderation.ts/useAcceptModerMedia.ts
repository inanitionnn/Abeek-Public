import { useEffect, useState } from "react";
import {
  AcceptModerMediaDocument,
  AcceptModerMediaMutation,
  AcceptModerMediaMutationVariables,
  BookEnum,
  ComicsEnum,
  FilmEnum,
  GetModerMediaQuery,
  MappedMedia,
  MediaEnum,
  SeriesEnum,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { IMAGE_API } from "../../constants";
import { toast } from "react-toastify";

type Props = {
  media: Exclude<
    GetModerMediaQuery["getModerMedia"],
    null | undefined
  >["media"];
  dataCb?: () => void;
  errorCb?: () => void;
};

type AddProps = {
  isPublic?: boolean;
  isChecked?: boolean;
  reportId?: string;
};

const useAcceptModerMedia = (props: Props) => {
  const { media, dataCb, errorCb } = props;
  const [oldImage, setOldImage] = useState("");
  const [
    acceptModerMedia,
    {
      data: acceptModerMediaData,
      error: acceptModerMediaError,
      loading: acceptModerMediaLoading,
    },
  ] = useMutation<AcceptModerMediaMutation, AcceptModerMediaMutationVariables>(
    AcceptModerMediaDocument
  );

  const handleAdd = (props: AddProps) => {
    const { isChecked, isPublic, reportId } = props;
    if (media?.id) {
      let newMedia: MappedMedia = {};
      let mediaType: MediaEnum =
        media?.media ||
        (media?.__typename === "FilmBaseResponse"
          ? MediaEnum.Film
          : media?.__typename === "SeriesModerResponse"
          ? MediaEnum.Series
          : media?.__typename === "ComicsBaseResponse"
          ? MediaEnum.Comics
          : media?.__typename === "BookBaseResponse"
          ? MediaEnum.Book
          : MediaEnum.Film);
      switch (media.__typename) {
        case "FilmBaseResponse": {
          (mediaType = MediaEnum.Film),
            (newMedia = {
              title: media.title,
              filmType: media.filmType || FilmEnum.Movie,
              boxOffice: media.boxOffice,
              budget: media.budget,
              country: media.country,
              directedBy: ((media.directedBy || [])[0] || "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              starring: ((media.starring || [])[0] || "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              genres: ((media.genres ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim().toLowerCase())
                ?.filter((direct) => direct),
              image: media.image?.slice(IMAGE_API.length + 1),
              language: media.language,
              plot: media.plot,
              runTime: media.runTime,
              tags: ((media.tags ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              year: media.year,
            });

          break;
        }
        case "SeriesModerResponse": {
          (mediaType = MediaEnum.Series),
            (newMedia = {
              title: media.title,
              seriesType: media.seriesType || SeriesEnum.Tv,
              country: media.country,
              directedBy: ((media.directedBy || [])[0] || "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              genres: ((media.genres ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim().toLowerCase())
                ?.filter((direct) => direct),
              image: media.image?.slice(IMAGE_API.length + 1),
              language: media.language,
              plot: media.plot,
              tags: ((media.tags ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              startYear: media.startYear,
              endYear: media.endYear,
              seasons: media?.seasons?.map((season) => {
                return {
                  episodes: season.episodes,
                  id: season.id,
                  season: season.season,
                  title: season.title,
                };
              }),
            });

          break;
        }
        case "ComicsBaseResponse": {
          (mediaType = MediaEnum.Comics),
            (newMedia = {
              title: media.title || "",
              comicsType: media.comicsType || ComicsEnum.Comics,
              country: media.country,
              author: ((media.author || [])[0] || "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              description: media.description,
              volumes: media.volumes,
              genres: ((media.genres ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim().toLowerCase())
                ?.filter((direct) => direct),
              image: media.image?.slice(IMAGE_API.length + 1),
              language: media.language,
              tags: ((media.tags ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              startYear: media.startYear,
              endYear: media.endYear,
            });

          break;
        }
        case "BookBaseResponse": {
          (mediaType = MediaEnum.Book),
            (newMedia = {
              title: media.title || "",
              bookType: media.bookType || BookEnum.Fiction,
              country: media.country,
              author: ((media.author ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              description: media.description,
              pages: media.pages,
              genres: ((media.genres ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim().toLowerCase())
                ?.filter((direct) => direct),
              image: media.image?.slice(IMAGE_API.length + 1),
              language: media.language,
              tags: ((media.tags ?? [])[0] ?? "")
                ?.split(",")
                ?.map((direct) => direct.trim())
                ?.filter((direct) => direct),
              year: media.year,
            });
          break;
        }
      }

      acceptModerMedia({
        variables: {
          input: {
            media: newMedia,
            oldImage: oldImage.slice(IMAGE_API.length + 1),
            isPublic: isPublic,
            isChecked: isChecked,
            reportId: reportId,
            mediaId: media?.id,
            mediaType: mediaType,
          },
        },
      });
    } else {
      toast.error("Media don`t have id error");
    }
  };

  useEffect(() => {
    if (acceptModerMediaData) {
      if (dataCb) dataCb();
    }
  }, [acceptModerMediaData]);

  useEffect(() => {
    if (acceptModerMediaError) {
      if (errorCb) errorCb();
      toast.error(acceptModerMediaError.message);
    }
  }, [acceptModerMediaError]);

  return {
    setOldImage,
    handleAccept: handleAdd,
    loading: acceptModerMediaLoading,
  };
};

export default useAcceptModerMedia;
