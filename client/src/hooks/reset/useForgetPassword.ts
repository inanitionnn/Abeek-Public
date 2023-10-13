import { useMutation } from "@apollo/client";
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from "../../graphql/__generated__/graphql";
import { useEffect } from "react";
import { toast } from "react-toastify";

const useForgetPassword = () => {
  const [
    forgotPasswordMutation,
    {
      data: forgotPasswordData,
      error: forgotPasswordError,
      loading: forgotPasswordLoading,
    },
  ] = useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument
  );

  const handleForgot = (email: string) => {
    forgotPasswordMutation({
      variables: { input: email },
    });
  };

  useEffect(() => {
    if (forgotPasswordData) {
      toast.success("Check your email");
    }
  }, [forgotPasswordData]);

  useEffect(() => {
    if (forgotPasswordError) {
      toast.error(forgotPasswordError.message);
    }
  }, [forgotPasswordError]);

  return { handleForgot, loading: forgotPasswordLoading };
};

export default useForgetPassword;
