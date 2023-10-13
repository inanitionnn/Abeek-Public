import { gql } from "../__generated__/gql";

export const LOGIN_MUTATION = gql(/* GraphQL */ `
  mutation Login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      id
      email
      picture
      name
      token
    }
  }
`);
export const REGISTRATION_MUTATION = gql(/* GraphQL */ `
  mutation Registration($input: RegistrationInput!) {
    registration(registrationInput: $input) {
      success
    }
  }
`);

export const FORGOT_PASSWORD_MUTATION = gql(/* GraphQL */ `
  mutation forgotPassword($input: String!) {
    forgotPassword(email: $input) {
      success
    }
  }
`);

export const RESET_PASSWORD_MUTATION = gql(/* GraphQL */ `
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $input) {
      success
    }
  }
`);

export const ACTIVATE_MUTATION = gql(/* GraphQL */ `
  mutation activate($input: String!) {
    activate(link: $input) {
      id
      email
      picture
      name
      token
    }
  }
`);

export const REFRESH_MUTATION = gql(/* GraphQL */ `
  mutation Refresh {
    refresh {
      token
    }
  }
`);

export const LOGOUT_MUTATION = gql(/* GraphQL */ `
  mutation Logout {
    logout {
      success
    }
  }
`);

// const GET_USER_QUERY = gql(/* GraphQL */ `
//   query GetUser {
//     getUser {
//       id
//       name
//       email
//     }
//   }
// `);

// const GET_GOOGLE_QUERY = gql(/* GraphQL */ `
//   query GetGoogleUser {
//     getGoogleUser {
//       id
//       email
//       name
//       token
//     }
//   }
// `);
