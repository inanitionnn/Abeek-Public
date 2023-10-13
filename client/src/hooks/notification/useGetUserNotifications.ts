import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  GetUserNotificationsDocument,
  GetUserNotificationsQuery,
  GetUserNotificationsQueryVariables,
} from "../../graphql/__generated__/graphql";

// type Props = {};

const useGetUserNotifications = () => {
  // const {} = props;
  const [notifications, setNotifications] =
    useState<GetUserNotificationsQuery["getUserNotifications"]>();

  const {
    data: getUserNotificationData,
    error: getUserNotificationError,
    loading: getUserNotificationLoading,
  } = useQuery<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>(
    GetUserNotificationsDocument,
    {
      fetchPolicy: "no-cache",
    }
  );
  useEffect(() => {
    if (getUserNotificationData) {
      setNotifications(getUserNotificationData.getUserNotifications);
    }
  }, [getUserNotificationData]);

  useEffect(() => {
    if (getUserNotificationError) {
      toast.error(getUserNotificationError?.message);
    }
  }, [getUserNotificationError]);

  return {
    notifications,
    setNotifications,
    loading: getUserNotificationLoading,
  };
};

export default useGetUserNotifications;
