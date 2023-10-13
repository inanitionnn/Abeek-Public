import { gql } from "../__generated__/gql";

// Title + year by description
export const GPT_TITLE_PARSE_QUERY = gql(/* GraphQL */ `
  query gptTitleParse($input: QueryInput!) {
    gptTitleParse(queryInput: $input) {
      title
      year
      mediaTokens
      additionalMediaTokens
    }
  }
`);

// Parse wiki by title
export const WIKI_MEDIA_PARSE_QUERY = gql(/* GraphQL */ `
  query wikiMediaParse($input: QueryInput!) {
    wikiMediaParse(queryInput: $input) {
      mediaTokens
      additionalMediaTokens
      media {
        ... on FilmParseResponse {
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
        ... on SeriesParseResponse {
          seriesType
          title
          startYear
          endYear
          country
          plot
          language
          directedBy
          seasons {
            season
            title
            episodes
          }
          genres
          tags
          image
        }
        ... on ComicsParseResponse {
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
        ... on BookParseResponse {
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

// Parse posters/covers
export const IMAGE_PARSE_QUERY = gql(/* GraphQL */ `
  query imageParse($input: ImagesInput!) {
    imageParse(imagesInput: $input) {
      links
      mediaTokens
      additionalMediaTokens
    }
  }
`);

// Parse some fields by gpt
export const GPT_MEDIA_PARSE_QUERY = gql(/* GraphQL */ `
  query gptMediaParse($input: GptInput!) {
    gptMediaParse(gptInput: $input) {
      mediaTokens
      additionalMediaTokens
      media {
        ... on FilmParseResponse {
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
        ... on SeriesParseResponse {
          seriesType
          title
          startYear
          endYear
          country
          plot
          language
          directedBy
          genres
          tags
          image
        }
        ... on ComicsParseResponse {
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
        ... on BookParseResponse {
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
