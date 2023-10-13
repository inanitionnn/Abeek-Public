import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import {
  AddMediaToUserDocument,
  AddMediaToUserMutation,
  AddMediaToUserMutationVariables,
  MediaEnum,
  WatchedEnum,
} from "../graphql/__generated__/graphql";
import { toast } from "react-toastify";

type Props = {
  mediaId: string | null | undefined;
  mediaType: MediaEnum | null | undefined;
  dataCb?: () => void;
  handleCb?: () => void;
  errorCb?: () => void;
};

const useAddMediaToUser = (props: Props) => {
  const { mediaId, mediaType, dataCb, handleCb, errorCb } = props;
  const [
    addMediaToUserMutation,
    {
      data: addMediaToUserData,
      loading: addMediaToUserLoading,
      error: addMediaToUserError,
    },
  ] = useMutation<AddMediaToUserMutation, AddMediaToUserMutationVariables>(
    AddMediaToUserDocument
  );

  const handleAddMediaToUser = () => {
    addMediaToUserMutation({
      variables: {
        input: {
          mediaId: mediaId || "",
          mediaType: mediaType || MediaEnum.Film,
          note: null,
          rate: null,
          watched: WatchedEnum.Planned,
        },
      },
    });
    if (handleCb) handleCb();
  };
  useEffect(() => {
    if (addMediaToUserData) {
      if (dataCb) dataCb();
    }
  }, [addMediaToUserData]);

  useEffect(() => {
    if (addMediaToUserError) {
      if (errorCb) errorCb();
      toast.error(addMediaToUserError?.message);
    }
  }, [addMediaToUserError]);

  return { handleAddMediaToUser, loading: addMediaToUserLoading };
};

export default useAddMediaToUser;
