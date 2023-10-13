import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  GetMediaDocument,
  GetMediaQuery,
  GetMediaQueryVariables,
  MediaEnum,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { useAppDispatch } from "../redux";
import { setGetMediaState } from "../../redux/reducers/mediaSlice";

type Props = {
  mediaId: string | null | undefined;
  mediaType: MediaEnum | null | undefined;
  followId: string | null | undefined;
  userId: string | null | undefined;
};

const useGetMediaQuery = (props: Props) => {
  const { mediaId, mediaType, followId, userId } = props;
  const dispatch = useAppDispatch();
  const {
    data: getMediaData,
    error: getMediaError,
    loading: getMediaLoading,
  } = useQuery<GetMediaQuery, GetMediaQueryVariables>(GetMediaDocument, {
    variables: {
      input: {
        mediaId: mediaId || null,
        mediaType: mediaType || null,
        followId: followId,
        userId: userId,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (getMediaData) {
      dispatch(setGetMediaState(getMediaData.getMedia));
    }
  }, [getMediaData]);

  useEffect(() => {
    if (getMediaError) {
      toast.error(getMediaError.message);
    }
  }, [getMediaError]);
  return { loading: getMediaLoading };
};

export default useGetMediaQuery;
