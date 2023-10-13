import { gql } from "../__generated__/gql";

export const GET_USER_FOLLOWERS_QUERY = gql(/* GraphQL */ `
  query getUserFollowers {
    getUserFollowers {
      id
      name
      picture
    }
  }
`);
export const GET_USER_FOLLOWS_QUERY = gql(/* GraphQL */ `
  query getUserFollows {
    getUserFollows {
      id
      name
      picture
    }
  }
`);

export const REMOVE_FOLLOW_MUTATION = gql(/* GraphQL */ `
  mutation removeFollow($input: String!) {
    removeFollow(followId: $input) {
      success
    }
  }
`);

export const ADD_FOLLOW_MUTATION = gql(/* GraphQL */ `
  mutation addFollow($input: String!) {
    addFollow(followId: $input) {
      success
    }
  }
`);

export const GET_FOLLOW_INFO_QUERY = gql(/* GraphQL */ `
  query getFollowInfo($input: GetFollowInput!) {
    getFollowInfo(getFollowInput: $input) {
      id
      name
      picture
      note
      filmCount
      seriesCount
      comicsCount
      bookCount
      follow
    }
  }
`);
