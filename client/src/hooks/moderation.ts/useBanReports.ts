import { useEffect } from "react";
import {
  BanReportsUserDocument,
  BanReportsUserMutation,
  BanReportsUserMutationVariables,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const useBanReports = () => {
  const [
    banUserMutation,
    {
      data: banReportsUserData,
      error: banReportsUserError,
      loading: banReportsUserLoading,
    },
  ] = useMutation<BanReportsUserMutation, BanReportsUserMutationVariables>(
    BanReportsUserDocument
  );

  const handleBan = (userId: string) => {
    banUserMutation({
      variables: {
        input: userId,
      },
    });
  };

  useEffect(() => {
    if (banReportsUserData) {
      toast.success("Warning successfully ban user");
    }
  }, [banReportsUserData]);

  useEffect(() => {
    if (banReportsUserError) {
      toast.error(banReportsUserError.message);
    }
  }, [banReportsUserError]);

  return {
    handleBan,
    loading: banReportsUserLoading,
  };
};

export default useBanReports;
