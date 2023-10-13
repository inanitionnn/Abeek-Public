import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  SetAllWatchedNotificationsDocument,
  SetAllWatchedNotificationsMutation,
  SetAllWatchedNotificationsMutationVariables,
} from "../../graphql/__generated__/graphql";
import { setNotificationCountState } from "../../redux/reducers/userSlice";
import { useAppDispatch } from "../redux";

// type Props = {};

const useSetAllWatched = () => {
  // const {} = props;
  const dispatch = useAppDispatch();
  const [
    setWatchedMutation,
    {
      data: setWatchedData,
      error: setWatchedError,
      loading: setWatchedLoading,
    },
  ] = useMutation<
    SetAllWatchedNotificationsMutation,
    SetAllWatchedNotificationsMutationVariables
  >(SetAllWatchedNotificationsDocument);

  useEffect(() => {
    setWatchedMutation();
  }, []);

  useEffect(() => {
    if (setWatchedData) {
      dispatch(setNotificationCountState(0));
    }
  }, [setWatchedData]);

  useEffect(() => {
    if (setWatchedError) {
      toast.error(setWatchedError.message);
    }
  }, [setWatchedError]);

  return {
    loading: setWatchedLoading,
  };
};

export default useSetAllWatched;
