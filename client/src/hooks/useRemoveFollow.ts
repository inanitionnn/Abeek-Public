import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import {
  RemoveFollowDocument,
  RemoveFollowMutation,
  RemoveFollowMutationVariables,
} from "../graphql/__generated__/graphql";
import { toast } from "react-toastify";

type Props = {
  followId: string;
  dataCb?: () => void;
  errorCb?: () => void;
};

const useRemoveFollow = (props: Props) => {
  const { dataCb, errorCb, followId } = props;
  const [
    removeFollowMutation,
    {
      data: removeFollowData,
      error: removeFollowError,
      loading: removeFollowLoading,
    },
  ] = useMutation<RemoveFollowMutation, RemoveFollowMutationVariables>(
    RemoveFollowDocument
  );

  const handleUnfollow = () => {
    if (!followId) {
      toast.error("No follow id error");
      return;
    }
    removeFollowMutation({
      variables: {
        input: followId,
      },
    });
  };

  useEffect(() => {
    if (removeFollowData) {
      if (dataCb) dataCb();
      toast.success("Follow successfully removed");
    }
  }, [removeFollowData]);

  useEffect(() => {
    if (removeFollowError) {
      if (errorCb) errorCb();
      toast.error(removeFollowError.message);
    }
  }, [removeFollowError]);

  return { handleUnfollow, loading: removeFollowLoading };
};

export default useRemoveFollow;
