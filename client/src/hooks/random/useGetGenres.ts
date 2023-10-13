import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  GetGenresDocument,
  GetGenresQuery,
  GetGenresQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useAppSelector } from "../redux";

type Props = {
  isGenres: boolean;
  inUserMedia: boolean;
  setMediaGenres: React.Dispatch<React.SetStateAction<string[]>>;
  dataCb?: () => void;
  errorCb?: () => void;
};

const useGetGenres = (props: Props) => {
  const { inUserMedia, isGenres, setMediaGenres, dataCb, errorCb } = props;
  const { bookType, comicsType, filmType, mediaType, seriesType } =
    useAppSelector((state) => state.types);

  const [
    getGenresQuery,
    { data: getGenresData, error: getGenresError, loading: getGenresLoading },
  ] = useLazyQuery<GetGenresQuery, GetGenresQueryVariables>(GetGenresDocument);

  useEffect(() => {
    if (isGenres) {
      getGenresQuery({
        variables: {
          input: {
            inUserMedia: inUserMedia,
            mediaType: mediaType,
            bookType: bookType,
            comicsType: comicsType,
            filmType: filmType,
            seriesType: seriesType,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [
    isGenres,
    inUserMedia,
    mediaType,
    bookType,
    filmType,
    seriesType,
    comicsType,
  ]);

  useEffect(() => {
    if (getGenresData) {
      if (dataCb) dataCb();

      setMediaGenres(getGenresData.getGenres?.genres || []);
    }
  }, [getGenresData]);

  useEffect(() => {
    if (getGenresError) {
      if (errorCb) errorCb();
      toast.error(getGenresError?.message);
    }
  }, [getGenresError]);

  return {
    loading: getGenresLoading,
  };
};

export default useGetGenres;
