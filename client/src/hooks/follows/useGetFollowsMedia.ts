import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  GetFollowsMediaDocument,
  GetFollowsMediaQuery,
  GetFollowsMediaQueryVariables,
} from "../../graphql/__generated__/graphql";

type Props = {
  count: number;
  dataCb?: () => void;
  errorCb?: () => void;
};

const useGetFollowsMedia = (props: Props) => {
  const { dataCb, errorCb, count } = props;
  const [followMedia, setFollowMedia] = useState<
    GetFollowsMediaQuery["getFollowsMedia"]
  >([]);
  const [page, setPage] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const handleLoadMore = () => {
    if (canLoadMore) {
      setPage((prev) => prev + 1);
    }
  };

  const {
    data: getFollowsMediaData,
    error: getFollowsMediaError,
    loading: getFollowsMediaLoading,
  } = useQuery<GetFollowsMediaQuery, GetFollowsMediaQueryVariables>(
    GetFollowsMediaDocument,
    {
      variables: {
        input: {
          count: count,
          page: page,
        },
      },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (getFollowsMediaData) {
      if (dataCb) dataCb();
      if ((getFollowsMediaData.getFollowsMedia?.length ?? 0) < count) {
        setCanLoadMore(false);
      }
      setFollowMedia((prev) => [
        ...(prev || []),
        ...(getFollowsMediaData.getFollowsMedia || []),
      ]);
    }
  }, [getFollowsMediaData]);

  useEffect(() => {
    if (getFollowsMediaError) {
      if (errorCb) errorCb();
      toast.error(getFollowsMediaError.message);
    }
  }, [getFollowsMediaError]);

  return {
    handleLoadMore,
    canLoadMore,
    media: followMedia,
    loading: getFollowsMediaLoading,
  };
};

export default useGetFollowsMedia;
