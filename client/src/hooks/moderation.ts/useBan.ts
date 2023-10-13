import { useEffect } from "react";
import {
  BanUserDocument,
  BanUserInput,
  BanUserMutation,
  BanUserMutationVariables,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const useBan = () => {
  const [
    banUserMutation,
    { data: banUserData, error: banUserError, loading: banUserLoading },
  ] = useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument);

  const handleBan = (input: BanUserInput) => {
    banUserMutation({
      variables: {
        input,
      },
    });
  };

  useEffect(() => {
    if (banUserData) {
      toast.success("Warning successfully ban user");
    }
  }, [banUserData]);

  useEffect(() => {
    if (banUserError) {
      toast.error(banUserError.message);
    }
  }, [banUserError]);

  return {
    handleBan,
    loading: banUserLoading,
  };
};

export default useBan;
