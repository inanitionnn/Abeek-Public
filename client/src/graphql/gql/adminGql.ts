import { gql } from "../__generated__/gql";

export const ADD_ROLE_MUTATION = gql(/* GraphQL */ `
  mutation addRole($input: AddRoleUserInput!) {
    addRole(addRoleUserInput: $input) {
      id
    }
  }
`);

export const UNBAN_MUTATION = gql(/* GraphQL */ `
  mutation unbanUser($input: String!) {
    unbanUser(userEmail: $input) {
      id
    }
  }
`);

export const GET_ALL_USERS_QUERY = gql(/* GraphQL */ `
  query getAllUsers {
    getAllUsers {
      id
      name
      email
      picture
      isBanned
      canSendReport
      createdAt
    }
  }
`);
