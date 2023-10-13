import clsx from "clsx";
import { ComponentPropsWithRef, Ref, forwardRef, memo } from "react";
import {
  GetUserNotificationsQuery,
  NotificationEnum,
} from "../../graphql/__generated__/graphql";
import timeAgo from "../../utils/timeAgo";
import MyHeader from "../../atom/myHeader";
import { Link } from "react-router-dom";
import { IMAGE_API } from "../../constants";
import MyButton from "../../atom/myButton";
import MyParagraph from "../../atom/myParagraph";
import { motion } from "framer-motion";
import { MyBlock } from "../../atom/myBlock";

type Props = ComponentPropsWithRef<"div"> & {
  notification: Exclude<
    GetUserNotificationsQuery["getUserNotifications"],
    null | undefined
  >[0];
  handleUnfollow: (followId: string) => void;
  handleFollow: (followId: string) => void;
};

export const notificationCard = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { notification, handleUnfollow, handleFollow, ...restProps } = props;
    return (
      <MyBlock
        ref={ref}
        className={clsx({
          "border-error border-dashed":
            notification.type === NotificationEnum.Ban,
          "border-warning border-dashed":
            notification.type === NotificationEnum.Warning,
          "border-info border-dashed":
            notification.type === NotificationEnum.Update ||
            notification.type === NotificationEnum.Tokens ||
            notification.type === NotificationEnum.NewRole,
          "md:flex items-center justify-between border-dotted":
            notification.type === NotificationEnum.Follow ||
            notification.type === NotificationEnum.Unfollow,
          "space-y-2": !(
            notification.type === NotificationEnum.Base ||
            notification.type === NotificationEnum.Follow ||
            notification.type === NotificationEnum.Unfollow
          ),
          "rounded-2xl p-3 border-[2px] bg-base-200": true,
        })}
        {...restProps}
      >
        <div
          className={clsx({
            "w-full": true,
            "md:flex items-center justify-between":
              notification.type === NotificationEnum.Follow ||
              notification.type === NotificationEnum.Unfollow,
            "space-y-2": !(
              notification.type === NotificationEnum.Follow ||
              notification.type === NotificationEnum.Unfollow
            ),
          })}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <MyHeader vsize={"sm"} className="p-2 rounded-2xl bg-base-300">
              {timeAgo(notification.createdAt)}
            </MyHeader>
            <div className="flex items-center gap-2">
              <div>
                {notification.type === NotificationEnum.Tokens && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                    />
                  </svg>
                )}
                {notification.type === NotificationEnum.Follow && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                )}
                {notification.type === NotificationEnum.Unfollow && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                )}
                {(notification.type === NotificationEnum.NewRole ||
                  notification.type === NotificationEnum.Update) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                    />
                  </svg>
                )}
                {notification.type === NotificationEnum.Ban && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                )}
                {notification.type === NotificationEnum.Warning && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                )}
              </div>
              <MyHeader className="text-start">
                {notification.type === NotificationEnum.Tokens &&
                  "You have received tokens"}
                {notification.type === NotificationEnum.Ban &&
                  "You has been banned"}
                {notification.type === NotificationEnum.Follow &&
                  "You have new follower"}
                {notification.type === NotificationEnum.NewRole &&
                  "You have been assigned a new role"}
                {notification.type === NotificationEnum.Unfollow &&
                  "You have lost a follower"}
                {notification.type === NotificationEnum.Update && "Update!!!"}
                {notification.type === NotificationEnum.Warning && "Warning!!!"}
              </MyHeader>
            </div>
          </div>

          {notification.type === NotificationEnum.Follow ||
          notification.type === NotificationEnum.Unfollow ? (
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Link to={`/collection/user/${notification.follower?.id}`}>
                <div
                  className="flex gap-4 items-center p-2 hover:bg-base-300 rounded-2xl 
          transition duration-300 ease-out"
                >
                  <div className="ring-[1.5px] p-1 ring-current rounded-full bg-base-200">
                    {notification.follower?.picture ? (
                      <img
                        src={IMAGE_API + "/" + notification.follower?.picture}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    )}
                  </div>
                  <MyHeader className="text-start break-words">
                    {notification.follower?.name}
                  </MyHeader>
                </div>
              </Link>
              {notification.follower?.follow ? (
                <MyButton
                  onClick={() =>
                    handleUnfollow(notification.follower?.id || "")
                  }
                >
                  Unfollow
                </MyButton>
              ) : (
                <MyButton
                  vvariatns={"primary"}
                  onClick={() => handleFollow(notification.follower?.id || "")}
                >
                  Follow
                </MyButton>
              )}
            </div>
          ) : (
            <MyParagraph className="text-start">
              {notification.notification}
            </MyParagraph>
          )}
        </div>
      </MyBlock>
    );
  })
);

const MnotificationCard = motion(notificationCard);
export default MnotificationCard;
