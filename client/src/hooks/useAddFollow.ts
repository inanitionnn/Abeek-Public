import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import {
  AddFollowDocument,
  AddFollowMutation,
  AddFollowMutationVariables,
} from "../graphql/__generated__/graphql";
import { toast } from "react-toastify";

type Props = {
  followId: string;
  dataCb?: () => void;
  errorCb?: () => void;
};
const useAddFollow = (props: Props) => {
  const { followId, dataCb, errorCb } = props;
  const [
    addFollowMutation,
    { data: addFollowData, error: addFollowError, loading: addFollowLoading },
  ] = useMutation<AddFollowMutation, AddFollowMutationVariables>(
    AddFollowDocument
  );

  const handleFollow = () => {
    addFollowMutation({
      variables: {
        input: followId || "",
      },
    });
  };

  useEffect(() => {
    if (addFollowData) {
      if (dataCb) dataCb();
      toast.success("Follow successfully added");
    }
  }, [addFollowData]);

  useEffect(() => {
    if (addFollowError) {
      if (errorCb) errorCb();
      toast.error(addFollowError.message);
    }
  }, [addFollowError]);

  return { handleFollow, loading: addFollowLoading };
};

export default useAddFollow;
