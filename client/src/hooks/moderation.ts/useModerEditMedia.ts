import React, { useEffect } from "react";
import {
  GetModerEditMediaDocument,
  GetModerEditMediaQuery,
  GetModerEditMediaQueryVariables,
  MediaEnum,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { IMAGE_API } from "../../constants";

type Props = {
  id: string | null | undefined;
  type: MediaEnum | null | undefined;
  setMedia: React.Dispatch<
    React.SetStateAction<
      GetModerEditMediaQuery["getModerEditMedia"] | undefined
    >
  >;
};

const useModerEditMedia = (props: Props) => {
  const { setMedia, id, type } = props;

  const {
    data: moderMediaData,
    error: moderMediaError,
    loading: moderMediaLoading,
  } = useQuery<GetModerEditMediaQuery, GetModerEditMediaQueryVariables>(
    GetModerEditMediaDocument,
    {
      variables: {
        input: {
          mediaId: id || "",
          mediaType: type || MediaEnum.Film,
        },
      },
      fetchPolicy: "no-cache",
    }
  );
  useEffect(() => {
    if (moderMediaData) {
      switch (moderMediaData.getModerEditMedia?.__typename) {
        case "FilmBaseResponse": {
          setMedia({
            ...moderMediaData.getModerEditMedia,
            starring: [
              (moderMediaData.getModerEditMedia.starring || []).join(", "),
            ],
            directedBy: [
              (moderMediaData.getModerEditMedia.directedBy || []).join(", "),
            ],
            genres: [
              (moderMediaData.getModerEditMedia.genres || []).join(", "),
            ],
            tags: [(moderMediaData.getModerEditMedia.tags || []).join(", ")],
            image: moderMediaData.getModerEditMedia?.image
              ? IMAGE_API + "/" + moderMediaData.getModerEditMedia?.image
              : "",
          });
          break;
        }
        case "SeriesModerResponse": {
          setMedia({
            ...moderMediaData.getModerEditMedia,
            directedBy: [
              (moderMediaData.getModerEditMedia.directedBy || []).join(", "),
            ],
            genres: [
              (moderMediaData.getModerEditMedia.genres || []).join(", "),
            ],
            tags: [(moderMediaData.getModerEditMedia.tags || []).join(", ")],
            image: moderMediaData.getModerEditMedia?.image
              ? IMAGE_API + "/" + moderMediaData.getModerEditMedia?.image
              : "",
          });
          break;
        }
        case "ComicsBaseResponse":
        case "BookBaseResponse": {
          setMedia({
            ...moderMediaData.getModerEditMedia,
            author: [
              (moderMediaData.getModerEditMedia.author || []).join(", "),
            ],
            genres: [
              (moderMediaData.getModerEditMedia.genres || []).join(", "),
            ],
            tags: [(moderMediaData.getModerEditMedia.tags || []).join(", ")],
            image: moderMediaData.getModerEditMedia?.image
              ? IMAGE_API + "/" + moderMediaData.getModerEditMedia?.image
              : "",
          });
          break;
        }
      }
    }
  }, [moderMediaData]);

  useEffect(() => {
    if (moderMediaError) {
      toast.error(moderMediaError.message);
    }
  }, [moderMediaError]);

  return {
    loading: moderMediaLoading,
  };
};

export default useModerEditMedia;
