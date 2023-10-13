import { memo, useState } from "react";
import MnotificationCard from "../../organisms/notification/notificationCard";
import useGetUserNotifications from "../../hooks/notification/useGetUserNotifications";
import useSetAllWatched from "../../hooks/notification/useSetAllWatched";
import useRemoveFollow from "../../hooks/useRemoveFollow";
import useAddFollow from "../../hooks/useAddFollow";
import { slideAnimation } from "../../constants";
import NotificationSkeleton from "../../molecules/skeletons/notificationSkeleton";

const NotificationBlock = memo(() => {
  const { loading, notifications, setNotifications } =
    useGetUserNotifications();

  useSetAllWatched();

  const [currentFollowId, setCurrentFollowId] = useState("");

  const handleSetFollow = (bool: boolean) => {
    setNotifications((prev) => {
      return (prev || []).map((notification) => {
        if (notification.follower?.id === currentFollowId) {
          return {
            ...notification,
            follower: { ...notification.follower, follow: bool },
          };
        }
        return notification;
      });
    });
  };

  const { handleUnfollow } = useRemoveFollow({
    followId: currentFollowId,
    dataCb: () => handleSetFollow(false),
    errorCb: () => handleSetFollow(true),
  });

  const { handleFollow } = useAddFollow({
    followId: currentFollowId,
    dataCb: () => handleSetFollow(true),
    errorCb: () => handleSetFollow(false),
  });

  const handleUnfollowButton = (followId: string) => {
    setCurrentFollowId(followId);
    handleUnfollow();
  };

  const handleFollowButton = (followId: string) => {
    setCurrentFollowId(followId);
    handleFollow();
  };
  return (
    <>
      {loading ? (
        <NotificationSkeleton />
      ) : (
        <>
          {notifications?.map((notification, index) => (
            <MnotificationCard
              variants={slideAnimation}
              custom={index < 10 ? index : 0}
              notification={notification}
              handleFollow={() =>
                handleFollowButton(notification.follower?.id || "")
              }
              handleUnfollow={() =>
                handleUnfollowButton(notification.follower?.id || "")
              }
            />
          ))}
        </>
      )}
    </>
  );
});

export default NotificationBlock;
