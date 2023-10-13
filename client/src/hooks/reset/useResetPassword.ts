import { useMutation } from "@apollo/client";
import {
  ResetPasswordDocument,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from "../../graphql/__generated__/graphql";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useResetPassword = () => {
  const [
    resetPasswordMutation,
    {
      data: resetPasswordData,
      error: resetPasswordError,
      loading: resetPasswordLoading,
    },
  ] = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    ResetPasswordDocument
  );

  const handleReset = (resetLink: string, password: string) => {
    resetPasswordMutation({
      variables: {
        input: {
          password: password,
          resetLink: resetLink,
        },
      },
    });
  };

  useEffect(() => {
    if (resetPasswordData) {
      toast.success("Your password has been successfully updated");
    }
  }, [resetPasswordData]);

  useEffect(() => {
    if (resetPasswordError) {
      toast.error(resetPasswordError.message);
    }
  }, [resetPasswordError]);

  return { handleReset, loading: resetPasswordLoading };
};

export default useResetPassword;
