import React, { useEffect } from "react";
import {
  GetModerMediaDocument,
  GetModerMediaQuery,
  GetModerMediaQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { IMAGE_API } from "../../constants";

type GetMedia = Exclude<GetModerMediaQuery["getModerMedia"], null | undefined>;

type Props = {
  setMedia: React.Dispatch<React.SetStateAction<GetMedia["media"]>>;
  setCreator: React.Dispatch<React.SetStateAction<GetMedia["creator"]>>;
  setSearchMedia: React.Dispatch<React.SetStateAction<GetMedia["searchMedia"]>>;
  setCreatedType: React.Dispatch<React.SetStateAction<GetMedia["createdType"]>>;
  setReport: React.Dispatch<React.SetStateAction<GetMedia["report"]>>;
  errorCb?: () => void;
};

const useModerMedia = (props: Props) => {
  const {
    setMedia,
    setCreatedType,
    setCreator,
    setReport,
    setSearchMedia,
    errorCb,
  } = props;

  const {
    data: moderMediaData,
    error: moderMediaError,
    loading: moderMediaLoading,
    refetch: moderMediaRefetch,
  } = useQuery<GetModerMediaQuery, GetModerMediaQueryVariables>(
    GetModerMediaDocument,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (moderMediaData) {
      const response = moderMediaData.getModerMedia;

      setCreatedType(response?.createdType);
      setCreator(response?.creator);
      setReport(response?.report);
      setSearchMedia(response?.searchMedia);

      const moderMedia = response?.media;
      switch (moderMedia?.__typename) {
        case "FilmBaseResponse": {
          setMedia({
            ...moderMedia,
            starring: [(moderMedia.starring || []).join(", ")],
            directedBy: [(moderMedia.directedBy || []).join(", ")],
            genres: [(moderMedia.genres || []).join(", ")],
            tags: [(moderMedia.tags || []).join(", ")],
            image: moderMedia?.image ? IMAGE_API + "/" + moderMedia?.image : "",
          });
          break;
        }
        case "SeriesModerResponse": {
          setMedia({
            ...moderMedia,
            directedBy: [(moderMedia.directedBy || []).join(", ")],
            genres: [(moderMedia.genres || []).join(", ")],
            tags: [(moderMedia.tags || []).join(", ")],
            image: moderMedia?.image ? IMAGE_API + "/" + moderMedia?.image : "",
          });
          break;
        }
        case "BookBaseResponse":
        case "ComicsBaseResponse": {
          setMedia({
            ...moderMedia,
            author: [(moderMedia.author || []).join(", ")],
            genres: [(moderMedia.genres || []).join(", ")],
            tags: [(moderMedia.tags || []).join(", ")],
            image: moderMedia?.image ? IMAGE_API + "/" + moderMedia?.image : "",
          });
          break;
        }
      }
    }
  }, [moderMediaData]);

  useEffect(() => {
    if (moderMediaError) {
      if (moderMediaError.graphQLErrors[0].extensions.code === "NOT_FOUND") {
        if (errorCb) errorCb();
        toast.success(moderMediaError.message);
      } else {
        toast.error(moderMediaError.message);
      }
    }
  }, [moderMediaError]);

  return {
    moderMediaRefetch,
    loading: moderMediaLoading,
  };
};

export default useModerMedia;
