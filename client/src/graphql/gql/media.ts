import { gql } from "../__generated__/gql";

export const GET_USER_INFO_QUERY = gql(/* GraphQL */ `
  query getProfileInfo {
    getProfileInfo {
      note
      followerCount
      followingCount
      mediaCount
      mediaStats {
        films {
          all {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          animated {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          anime {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          movie {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
        }
        series {
          all {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          animated {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          anime {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          tv {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
        }
        comics {
          all {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          comics {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          graphicNovel {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          manga {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          manhwa {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
        }
        books {
          all {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          fiction {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
          nonFiction {
            allCount
            completedCount
            plannedCount
            abandonedCount
            pausedCount
            reviewingCount
            viewingCount
            averageRating
          }
        }
      }
    }
  }
`);

export const DELETE_MEDIA_FROM_COLLECTION_MUTATION = gql(/* GraphQL */ `
  mutation deleteMediaFromCollection($input: String!) {
    deleteMediaFromCollection(mediaId: $input) {
      success
    }
  }
`);

export const GET_FOLLOWS_MEDIA_QUERY = gql(/* GraphQL */ `
  query getFollowsMedia($input: GetFollowsMediaInput!) {
    getFollowsMedia(getFollowsMediaInput: $input) {
      user {
        id
        name
        picture
      }
      userMedia {
        updatedAt
        changed
        watched
        rate
        note
      }
      media {
        ... on FilmBaseResponse {
          id
          media
          filmType
          title
          image
          year
          directedBy
        }
        ... on SeriesBaseResponse {
          id
          media
          seriesType
          title
          image
          startYear
          endYear
        }
        ... on ComicsBaseResponse {
          id
          media
          comicsType
          title
          image
          startYear
          endYear
          author
        }
        ... on BookBaseResponse {
          id
          media
          bookType
          title
          image
          author
          year
        }
      }
    }
  }
`);

export const GET_NEAREST_MEDIA_QUERY = gql(/* GraphQL */ `
  query getNearMedia($input: GetNearestMediaInput!) {
    getNearMedia(getNearestMediaInput: $input) {
      ... on FilmSearchResponse {
        id
        media
        filmType
        title
        image
        inUserMedia
        year
        directedBy
      }
      ... on SeriesSearchResponse {
        id
        media
        seriesType
        title
        image
        inUserMedia
        startYear
        endYear
      }
      ... on ComicsSearchResponse {
        id
        media
        comicsType
        title
        image
        inUserMedia
        startYear
        endYear
        author
      }
      ... on BookSearchResponse {
        id
        media
        bookType
        title
        image
        inUserMedia
        author
        year
      }
    }
  }
`);

export const EMBEDDING_SEARCH_QUERY = gql(/* GraphQL */ `
  query embeddingSearch($input: EmbeddingSearchInput!) {
    embeddingSearch(embeddingSearchInput: $input) {
      ... on FilmSearchResponse {
        id
        filmType
        title
        image
        inUserMedia
        year
        directedBy
      }
      ... on SeriesSearchResponse {
        id
        seriesType
        title
        image
        inUserMedia
        startYear
        endYear
      }
      ... on ComicsSearchResponse {
        id
        comicsType
        title
        image
        inUserMedia
        startYear
        endYear
        author
      }
      ... on BookSearchResponse {
        id
        bookType
        title
        image
        inUserMedia
        author
        year
      }
    }
  }
`);

export const GET_GENRES_QUERY = gql(/* GraphQL */ `
  query getGenres($input: GetGenresInput!) {
    getGenres(getGenresInput: $input) {
      genres
    }
  }
`);

export const UPDATE_USER_MEDIA_MUTATION = gql(/* GraphQL */ `
  mutation updateUserMedia($input: UpdateUserMediaInput!) {
    updateUserMedia(updateUserMediaInput: $input) {
      success
    }
  }
`);

export const ADD_MEDIA_TO_USER_QUERY = gql(/* GraphQL */ `
  mutation addMediaToUser($input: AddMediaInput!) {
    addMediaToUser(addMediaInput: $input) {
      success
    }
  }
`);

export const ADD_REPORT_MUTATION = gql(/* GraphQL */ `
  mutation addReport($input: AddReportInput!) {
    addReport(addReportInput: $input) {
      success
    }
  }
`);

export const GET_RANDOM_MEDIA_QUERY = gql(/* GraphQL */ `
  query getRandomMedia($input: GetRandomMediaInput!) {
    getRandomMedia(getRandomMediaInput: $input) {
      ... on FilmBaseResponse {
        id
        media
        filmType
        title
        country
        genres
        image
        year
        directedBy
      }
      ... on SeriesBaseResponse {
        id
        media
        seriesType
        title
        country
        genres
        image
        startYear
        endYear
      }
      ... on ComicsBaseResponse {
        id
        media
        comicsType
        title
        country
        genres
        image
        startYear
        endYear
        author
      }
      ... on BookBaseResponse {
        id
        media
        bookType
        title
        country
        genres
        image
        author
        year
      }
    }
  }
`);

export const GET_USER_MEDIA_QUERY = gql(/* GraphQL */ `
  query getUserMedia($input: GetUserMediaInput!) {
    getUserMedia(getUserMediaInput: $input) {
      ... on FilmMediaResponse {
        id
        media
        filmType
        title
        country
        genres
        image
        year
        directedBy
        rate
        watched
      }
      ... on SeriesMediaResponse {
        id
        media
        seriesType
        title
        country
        genres
        image
        startYear
        endYear
        rate
        watched
      }
      ... on ComicsMediaResponse {
        id
        media
        comicsType
        title
        country
        genres
        image
        startYear
        endYear
        author
        rate
        watched
      }
      ... on BookMediaResponse {
        id
        media
        bookType
        title
        country
        genres
        image
        author
        year
        rate
        watched
      }
    }
  }
`);

export const GET_MEDIA_QUERY = gql(/* GraphQL */ `
  query getMedia($input: GetMediaInput!) {
    getMedia(getMediaInput: $input) {
      ... on FilmMediaResponse {
        id
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
        inUserMedia
        isPublic
        note
        rate
        watched
      }
      ... on SeriesMediaResponse {
        id
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
          rate
        }
        genres
        tags
        image
        inUserMedia
        isPublic
        note
        rate
        watched
      }
      ... on ComicsMediaResponse {
        id
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
        inUserMedia
        isPublic
        note
        rate
        watched
      }
      ... on BookMediaResponse {
        id
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
        inUserMedia
        isPublic
        note
        rate
        watched
      }
    }
  }
`);

export const SEARCH_MEDIA_QUERY = gql(/* GraphQL */ `
  query searchMedia($input: SearchInput!) {
    searchMedia(searchInput: $input) {
      ... on FilmSearchResponse {
        id
        filmType
        title
        image
        inUserMedia
        year
        directedBy
      }
      ... on SeriesSearchResponse {
        id
        seriesType
        title
        image
        inUserMedia
        startYear
        endYear
      }
      ... on ComicsSearchResponse {
        id
        comicsType
        title
        image
        inUserMedia
        startYear
        endYear
        author
      }
      ... on BookSearchResponse {
        id
        bookType
        title
        image
        inUserMedia
        author
        year
      }
    }
  }
`);

export const CREATE_MEDIA_QUERY = gql(/* GraphQL */ `
  mutation createMedia($input: CreateMediaInput!) {
    createMedia(createMediaInput: $input) {
      success
    }
  }
`);
