import { NotificationEnum } from 'src/shared/enums';

export type addNotificationProps = {
  type: NotificationEnum;
  userId?: string;
  followerId?: string;
  notification?: string;
  isAllUser?: boolean;
};
