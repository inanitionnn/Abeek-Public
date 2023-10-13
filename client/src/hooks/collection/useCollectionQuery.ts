import { useState, useEffect } from "react";
import { useAppSelector } from "../redux";
import {
  GetUserMediaDocument,
  GetUserMediaQuery,
  GetUserMediaQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

type Props = {
  fetchCount: number;
  followId: string;
};

export default function useCollectionQuery(props: Props) {
  const { fetchCount, followId } = props;

  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(true);

  const [mediaArray, setMediaArray] = useState<
    GetUserMediaQuery["getUserMedia"]
  >([]);

  const userId = useAppSelector((state) => state.user.user.id);
  const { bookType, comicsType, filmType, mediaType, seriesType } =
    useAppSelector((state) => state.types);
  const { sorted, watched } = useAppSelector((state) => state.collection);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data: getUserMediaData,
    error: getUserMediaError,
    loading: getUserMediaLoading,
    refetch: getUserMediaRefetch,
  } = useQuery<GetUserMediaQuery, GetUserMediaQueryVariables>(
    GetUserMediaDocument,
    {
      variables: {
        input: {
          count: fetchCount,
          page: 0,
          mediaTYpe: mediaType,
          bookType: bookType,
          comicsType: comicsType,
          filmType: filmType,
          seriesType: seriesType,
          sorted: sorted,
          watched: watched,
          userId: followId || userId,
        },
      },

      fetchPolicy: "no-cache",
    }
  );
  useEffect(() => {
    getUserMediaRefetch({
      input: {
        count: fetchCount,
        page: page,
        mediaTYpe: mediaType,
        bookType: bookType,
        comicsType: comicsType,
        filmType: filmType,
        seriesType: seriesType,
        sorted: sorted,
        watched: watched,
        userId: followId || userId,
      },
    });
  }, [page]);

  useEffect(() => {
    setMediaArray([]);
    setPage(0);
    setIsLoading(true);
    setIsLoadMore(true);
  }, [
    mediaType,
    filmType,
    seriesType,
    comicsType,
    bookType,
    sorted,
    watched,
    userId,
  ]);

  useEffect(() => {
    if (inView && !isLoading && isLoadMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (getUserMediaData) {
      setIsLoading(false);
      if ((getUserMediaData.getUserMedia || []).length < fetchCount) {
        setIsLoadMore(false);
      }

      setMediaArray((prev) => {
        return [...(prev || []), ...(getUserMediaData.getUserMedia || [])];
      });
    }
  }, [getUserMediaData]);

  useEffect(() => {
    if (getUserMediaError) {
      toast.error(getUserMediaError.message);
    }
  }, [getUserMediaError]);

  return {
    loading: getUserMediaLoading,
    intersectionRef: ref,
    mediaArray: mediaArray,
  };
}
