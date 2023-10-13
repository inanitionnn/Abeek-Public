import { gql } from "../__generated__/gql";

export const UPDATE_USER_MUTATION = gql(/* GraphQL */ `
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      success
    }
  }
`);

export const SET_ALL_WATCHED_NOTIFICATIONS = gql(/* GraphQL */ `
  mutation setAllWatchedNotifications {
    setAllWatchedNotifications {
      success
    }
  }
`);

export const GET_USER_NOTIFICATIONS_QUERY = gql(/* GraphQL */ `
  query getUserNotifications {
    getUserNotifications {
      id
      type
      notification
      isWatched
      createdAt
      follower {
        id
        name
        picture
        follow
      }
    }
  }
`);
