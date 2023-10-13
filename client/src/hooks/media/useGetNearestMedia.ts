import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  GetNearMediaDocument,
  GetNearMediaQuery,
  GetNearMediaQueryVariables,
  MediaEnum,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";

type Props = {
  mediaId: string | null | undefined;
  mediaType: MediaEnum | null | undefined;
};

const useGetNearestMedia = (props: Props) => {
  const { mediaId, mediaType } = props;
  const [nearestMedia, setNearestMedia] = useState<
    GetNearMediaQuery["getNearMedia"] | null
  >(null);
  const { data: getNearestMediaData, error: getNearestMediaError } = useQuery<
    GetNearMediaQuery,
    GetNearMediaQueryVariables
  >(GetNearMediaDocument, {
    variables: {
      input: {
        count: 9,
        mediaId: mediaId || "",
        mediaType: mediaType || MediaEnum.Film,
      },
    },
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (getNearestMediaData) {
      setNearestMedia(getNearestMediaData.getNearMedia);
    }
  }, [getNearestMediaData]);
  useEffect(() => {
    if (getNearestMediaError) {
      toast.error(getNearestMediaError.message);
    }
  }, [getNearestMediaError]);

  return { nearestMedia };
};

export default useGetNearestMedia;
