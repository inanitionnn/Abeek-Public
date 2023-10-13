import { useEffect } from "react";
import {
  GetModerReportMediaDocument,
  GetModerReportMediaQuery,
  GetModerReportMediaQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { IMAGE_API } from "../../constants";

type GetMedia = Exclude<
  GetModerReportMediaQuery["getModerReportMedia"],
  null | undefined
>;

type Props = {
  setMedia: React.Dispatch<
    React.SetStateAction<GetMedia["media"] | undefined | null>
  >;
  setCreatedType: React.Dispatch<React.SetStateAction<GetMedia["createdType"]>>;
  setCreator: React.Dispatch<React.SetStateAction<GetMedia["creator"]>>;
  setInformer: React.Dispatch<React.SetStateAction<GetMedia["informer"]>>;
  setReport: React.Dispatch<React.SetStateAction<GetMedia["report"]>>;
  setReportId: React.Dispatch<React.SetStateAction<GetMedia["reportId"]>>;
  errorCb?: () => void;
};

const useGetMediaReport = (props: Props) => {
  const {
    setMedia,
    setCreatedType,
    setCreator,
    setInformer,
    setReport,
    setReportId,
    errorCb,
  } = props;

  const {
    data: moderMediaData,
    error: moderMediaError,
    loading: moderMediaLoading,
    refetch: moderMediaRefetch,
  } = useQuery<GetModerReportMediaQuery, GetModerReportMediaQueryVariables>(
    GetModerReportMediaDocument,
    {
      fetchPolicy: "no-cache",
    }
  );
  useEffect(() => {
    if (moderMediaData) {
      const response = moderMediaData.getModerReportMedia;
      setCreatedType(response?.createdType);
      setCreator(response?.creator);
      setInformer(response?.informer);
      setReport(response?.report);
      setReportId(response?.reportId);

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
    loading: moderMediaLoading,
    refetch: moderMediaRefetch,
  };
};

export default useGetMediaReport;
