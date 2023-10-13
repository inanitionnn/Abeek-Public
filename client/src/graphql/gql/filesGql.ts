import { gql } from "../__generated__/gql";

export const DOWNLOAD_FILE_BY_LINK_QUERY = gql(/* GraphQL */ `
  query downloadFileByLink($input: String!) {
    downloadFileByLink(url: $input) {
      link
    }
  }
`);
