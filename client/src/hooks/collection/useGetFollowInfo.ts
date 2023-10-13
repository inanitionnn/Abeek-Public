import { useEffect, useState } from "react";
import {
  GetFollowInfoDocument,
  GetFollowInfoQuery,
  GetFollowInfoQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../redux";
import { toast } from "react-toastify";

type Props = {
  followId: string | null | undefined;
};

const useGetFollowInfo = (props: Props) => {
  const { followId } = props;
  const [profile, setProfile] = useState<
    GetFollowInfoQuery["getFollowInfo"] | null
  >(null);
  const { id: userId } = useAppSelector((state) => state.user.user);

  const {
    data: getFollowInfoData,
    error: getFollowInfoError,
    loading: getFollowInfoLoading,
  } = useQuery<GetFollowInfoQuery, GetFollowInfoQueryVariables>(
    GetFollowInfoDocument,
    {
      variables: {
        input: {
          followId: followId || "",
          userId: userId ? userId : null,
        },
      },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (getFollowInfoData) {
      console.log(getFollowInfoData.getFollowInfo);
      setProfile(getFollowInfoData.getFollowInfo);
    }
  }, [getFollowInfoData]);

  useEffect(() => {
    if (getFollowInfoError) {
      toast.error(getFollowInfoError.message);
    }
  }, [getFollowInfoError]);

  return { loading: getFollowInfoLoading, setProfile, profile };
};

export default useGetFollowInfo;
