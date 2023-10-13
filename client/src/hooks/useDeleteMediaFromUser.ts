import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import {
  DeleteMediaFromCollectionDocument,
  DeleteMediaFromCollectionMutation,
  DeleteMediaFromCollectionMutationVariables,
} from "../graphql/__generated__/graphql";
import { toast } from "react-toastify";

type Props = {
  mediaId: string | null | undefined;
  dataCb?: () => void;
  handleCb?: () => void;
  errorCb?: () => void;
};

const useDeleteMediaFromUser = (props: Props) => {
  const { mediaId, dataCb, handleCb, errorCb } = props;
  const [
    deleteMediaMutations,
    {
      data: deleteMediaData,
      error: deleteMediaError,
      loading: deleteMediaLoading,
    },
  ] = useMutation<
    DeleteMediaFromCollectionMutation,
    DeleteMediaFromCollectionMutationVariables
  >(DeleteMediaFromCollectionDocument);

  const handleDeleteMediaFromUser = () => {
    deleteMediaMutations({
      variables: {
        input: mediaId || "",
      },
    });
    if (handleCb) handleCb();
  };
  useEffect(() => {
    if (deleteMediaData) {
      if (dataCb) dataCb();
    }
  }, [deleteMediaData]);

  useEffect(() => {
    if (deleteMediaError) {
      if (errorCb) errorCb();

      toast.error(deleteMediaError?.message);
    }
  }, [deleteMediaError]);

  return { handleDeleteMediaFromUser, loading: deleteMediaLoading };
};

export default useDeleteMediaFromUser;
