import { gql } from "../__generated__/gql";

export const DELETE_REPORT_MUTATION = gql(/* GraphQL */ `
  mutation deleteReport($input: String!) {
    deleteReport(reportId: $input) {
      success
    }
  }
`);

export const BAN_USER_MUTATION = gql(/* GraphQL */ `
  mutation banUser($input: BanUserInput!) {
    banUser(banUserInput: $input) {
      id
    }
  }
`);

export const BAN_REPORTS_USER_MUTATION = gql(/* GraphQL */ `
  mutation banReportsUser($input: String!) {
    banReportsUser(userId: $input) {
      id
    }
  }
`);

export const ACCEPT_WARNING_MUTATION = gql(/* GraphQL */ `
  mutation acceptWarning($input: WarningInput!) {
    acceptWarning(warningInput: $input) {
      success
    }
  }
`);

export const GET_MODER_EDIT_MEDIA_QUERY = gql(/* GraphQL */ `
  query getModerEditMedia($input: GetModerEditMediaInput!) {
    getModerEditMedia(getModerEditMediaInput: $input) {
      ... on FilmBaseResponse {
        id
        media
        filmType
        title
        year
        country
        plot
        language
        directedBy
        starring
        runTime
        boxOffice
        budget
        genres
        tags
        image
      }
      ... on SeriesModerResponse {
        id
        media
        seriesType
        title
        startYear
        endYear
        country
        plot
        language
        directedBy
        seasons {
          id
          season
          title
          episodes
        }
        genres
        tags
        image
      }
      ... on ComicsBaseResponse {
        id
        media
        comicsType
        title
        author
        startYear
        endYear
        country
        description
        language
        volumes
        genres
        tags
        image
      }
      ... on BookBaseResponse {
        id
        media
        bookType
        title
        author
        year
        country
        description
        language
        pages
        genres
        tags
        image
      }
    }
  }
`);

export const ACCEPT_MODER_MEDIA_MUTATION = gql(/* GraphQL */ `
  mutation acceptModerMedia($input: AcceptModerMediaInput!) {
    acceptModerMedia(acceptModerMediaInput: $input) {
      success
    }
  }
`);

export const GET_MODER_REPORT_NOTE_QUERY = gql(/* GraphQL */ `
  query getModerReportNote {
    getModerReportNote {
      reportId
      mediaId
      note
      reportedUser {
        id
        name
        picture
        warnings
        canSendReport
        isBanned
        note
      }
      informerUser {
        id
        name
        picture
        warnings
        canSendReport
        isBanned
        note
      }
    }
  }
`);

export const GET_MODER_REPORT_ACCOUNT_QUERY = gql(/* GraphQL */ `
  query getModerReportAccount {
    getModerReportAccount {
      reportId
      reportedUser {
        id
        name
        picture
        warnings
        canSendReport
        isBanned
        note
      }
      informerUser {
        id
        name
        picture
        warnings
        canSendReport
        isBanned
        note
      }
    }
  }
`);

export const GET_MODER_REPORT_MEDIA_QUERY = gql(/* GraphQL */ `
  query getModerReportMedia {
    getModerReportMedia {
      report
      reportId
      createdType
      informer {
        id
        name
        picture
        warnings
        canSendReport
        isBanned
        note
      }
      creator {
        id
        name
        picture
        warnings
        canSendReport
        isBanned
        note
      }
      media {
        ... on FilmBaseResponse {
          id
          media
          filmType
          title
          year
          country
          plot
          language
          directedBy
          starring
          runTime
          boxOffice
          budget
          genres
          tags
          image
        }
        ... on SeriesModerResponse {
          id
          media
          seriesType
          title
          startYear
          endYear
          country
          plot
          language
          directedBy
          seasons {
            id
            season
            title
            episodes
          }
          genres
          tags
          image
        }
        ... on ComicsBaseResponse {
          id
          media
          comicsType
          title
          author
          startYear
          endYear
          country
          description
          language
          volumes
          genres
          tags
          image
        }
        ... on BookBaseResponse {
          id
          media
          bookType
          title
          author
          year
          country
          description
          language
          pages
          genres
          tags
          image
        }
      }
    }
  }
`);

export const GET_MODER_MEDIA_QUERY = gql(/* GraphQL */ `
  query getModerMedia {
    getModerMedia {
      report
      createdType
      creator {
        id
        name
        picture
        warnings
        canSendReport
        isBanned
        note
      }
      searchMedia {
        ... on FilmBaseResponse {
          id
          media
          title
          year
          image
        }
        ... on SeriesBaseResponse {
          id
          media
          title
          startYear
          endYear
          image
        }
        ... on ComicsBaseResponse {
          id
          media
          title
          startYear
          endYear
          image
        }
        ... on BookBaseResponse {
          id
          media
          title
          year
          image
        }
      }
      media {
        ... on FilmBaseResponse {
          id
          media
          filmType
          title
          year
          country
          plot
          language
          directedBy
          starring
          runTime
          boxOffice
          budget
          genres
          tags
          image
        }
        ... on SeriesModerResponse {
          id
          media
          seriesType
          title
          startYear
          endYear
          country
          plot
          language
          directedBy
          seasons {
            id
            season
            title
            episodes
          }
          genres
          tags
          image
        }
        ... on ComicsBaseResponse {
          id
          media
          comicsType
          title
          author
          startYear
          endYear
          country
          description
          language
          volumes
          genres
          tags
          image
        }
        ... on BookBaseResponse {
          id
          media
          bookType
          title
          author
          year
          country
          description
          language
          pages
          genres
          tags
          image
        }
      }
    }
  }
`);

export const GET_MODER_MEDIA_COUNT_QUERY = gql(/* GraphQL */ `
  query getModerMediaCount {
    getModerMediaCount {
      reportsCount {
        note
        account
        media
      }
      mediaCount
    }
  }
`);
