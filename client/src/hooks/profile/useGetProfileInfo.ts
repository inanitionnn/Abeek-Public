import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  GetProfileInfoDocument,
  GetProfileInfoQuery,
  GetProfileInfoQueryVariables,
} from "../../graphql/__generated__/graphql";

const useGetProfileInfo = () => {
  const [profile, setProfile] =
    useState<GetProfileInfoQuery["getProfileInfo"]>();
  const {
    data: getUserInfoData,
    error: getUserInfoError,
    loading: getUserInfoLoading,
  } = useQuery<GetProfileInfoQuery, GetProfileInfoQueryVariables>(
    GetProfileInfoDocument,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    if (getUserInfoData) {
      setProfile(getUserInfoData.getProfileInfo);
    }
  }, [getUserInfoData]);

  useEffect(() => {
    if (getUserInfoError) {
      toast.error(getUserInfoError.message);
    }
  }, [getUserInfoError]);

  return {
    profile,
    setProfile,
    loading: getUserInfoLoading,
  };
};

export default useGetProfileInfo;
