import { useEffect } from "react";
import {
  AcceptWarningDocument,
  AcceptWarningMutation,
  AcceptWarningMutationVariables,
  WarningInput,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

type Props = {
  dataCb?: () => void;
  errorCb?: () => void;
};

const useAcceptWarning = (props: Props) => {
  const { dataCb, errorCb } = props;
  const [
    acceptWarningMutation,
    {
      data: acceptWarningData,
      error: acceptWarningError,
      loading: acceptWarningLoading,
    },
  ] = useMutation<AcceptWarningMutation, AcceptWarningMutationVariables>(
    AcceptWarningDocument
  );

  const handleWarning = (input: WarningInput) => {
    acceptWarningMutation({
      variables: {
        input,
      },
    });
  };

  useEffect(() => {
    if (acceptWarningData) {
      if (dataCb) dataCb();
      toast.success("Warning successfully sent");
    }
  }, [acceptWarningData]);

  useEffect(() => {
    if (acceptWarningError) {
      if (errorCb) errorCb;
      toast.error(acceptWarningError.message);
    }
  }, [acceptWarningError]);

  return {
    handleWarning,
    loading: acceptWarningLoading,
  };
};

export default useAcceptWarning;
