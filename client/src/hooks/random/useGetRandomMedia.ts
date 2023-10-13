import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  GetRandomMediaDocument,
  GetRandomMediaQuery,
  GetRandomMediaQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useAppSelector } from "../redux";

type Props = {
  isGenres: boolean;
  inUserMedia: boolean;
  count: number;
  genres: string[] | null;
  fromYear: number | null;
  toYear: number | null;
  setMedia: React.Dispatch<
    React.SetStateAction<GetRandomMediaQuery["getRandomMedia"]>
  >;
};

const useGetRandomMedia = (props: Props) => {
  const { count, genres, fromYear, toYear, inUserMedia, setMedia } = props;
  const { bookType, comicsType, filmType, mediaType, seriesType } =
    useAppSelector((state) => state.types);

  const [
    getRandomMediaQuery,
    {
      data: getRandomMediaData,
      error: getRandomMediaError,
      loading: getRandomMediaLoading,
    },
  ] = useLazyQuery<GetRandomMediaQuery, GetRandomMediaQueryVariables>(
    GetRandomMediaDocument,
    { fetchPolicy: "no-cache" }
  );

  const handleGetRandomMedia = () => {
    getRandomMediaQuery({
      variables: {
        input: {
          count: count,
          InUserMedia: inUserMedia,
          mediaType: mediaType,
          bookType: bookType,
          comicsType: comicsType,
          filmType: filmType,
          seriesType: seriesType,
          fromYear: fromYear,
          toYear: toYear,
          genres: genres,
        },
      },
      fetchPolicy: "no-cache",
    });
  };

  useEffect(() => {
    if (getRandomMediaData) {
      setMedia(getRandomMediaData.getRandomMedia);
    }
  }, [getRandomMediaData]);

  useEffect(() => {
    if (getRandomMediaError) {
      toast.error(getRandomMediaError.message);
    }
  }, [getRandomMediaError]);
  return {
    handleGetRandomMedia,
    loading: getRandomMediaLoading,
  };
};

export default useGetRandomMedia;
