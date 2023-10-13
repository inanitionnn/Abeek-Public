import { useEffect } from "react";
import {
  UnbanUserDocument,
  UnbanUserMutation,
  UnbanUserMutationVariables,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

type Props = {
  dataCb?: () => void;
  errorCb?: () => void;
};

const useUnban = (props: Props) => {
  const { dataCb, errorCb } = props;
  const [
    unbanUserMutation,
    { data: unbanUserData, error: unbanUserError, loading: unbanUserLoading },
  ] = useMutation<UnbanUserMutation, UnbanUserMutationVariables>(
    UnbanUserDocument
  );

  const handleUnban = (userEmail: string) => {
    unbanUserMutation({
      variables: {
        input: userEmail,
      },
    });
  };

  useEffect(() => {
    if (unbanUserData) {
      if (dataCb) dataCb();
      toast.success("Successfully unban user");
    }
  }, [unbanUserData]);

  useEffect(() => {
    if (unbanUserError) {
      if (errorCb) errorCb();
      toast.error(unbanUserError.message);
    }
  }, [unbanUserError]);

  return {
    handleUnban,
    loading: unbanUserLoading,
  };
};

export default useUnban;
