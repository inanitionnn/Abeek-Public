/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AcceptModerMediaInput = {
  isChecked?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  media: MappedMedia;
  mediaId: Scalars['String']['input'];
  mediaType: MediaEnum;
  oldImage?: InputMaybe<Scalars['String']['input']>;
  reportId?: InputMaybe<Scalars['String']['input']>;
};

export type AddMediaInput = {
  mediaId: Scalars['String']['input'];
  mediaType: MediaEnum;
  note?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Int']['input']>;
  watched?: InputMaybe<WatchedEnum>;
};

export type AddReportInput = {
  mediaId?: InputMaybe<Scalars['String']['input']>;
  mediaType?: InputMaybe<MediaEnum>;
  report?: InputMaybe<Scalars['String']['input']>;
  reportType: ReportEnum;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type AddRoleUserInput = {
  role: RolesEnum;
  userEmail: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
};

export type BanUserInput = {
  banReason: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type BookBaseResponse = {
  __typename?: 'BookBaseResponse';
  author?: Maybe<Array<Scalars['String']['output']>>;
  bookType?: Maybe<BookEnum>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  pages?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export enum BookEnum {
  Fiction = 'fiction',
  NonFiction = 'nonFiction'
}

export type BookMediaResponse = {
  __typename?: 'BookMediaResponse';
  author?: Maybe<Array<Scalars['String']['output']>>;
  bookType?: Maybe<BookEnum>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inUserMedia?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  note?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  watched?: Maybe<WatchedEnum>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type BookParseResponse = {
  __typename?: 'BookParseResponse';
  author?: Maybe<Array<Scalars['String']['output']>>;
  bookType?: Maybe<BookEnum>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  pages?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type BookSearchResponse = {
  __typename?: 'BookSearchResponse';
  author?: Maybe<Array<Scalars['String']['output']>>;
  bookType?: Maybe<BookEnum>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inUserMedia?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  pages?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type BooksStatsResponse = {
  __typename?: 'BooksStatsResponse';
  all?: Maybe<MediaStatsResponse>;
  fiction?: Maybe<MediaStatsResponse>;
  nonFiction?: Maybe<MediaStatsResponse>;
};

export enum ChangedEnum {
  AddToCollection = 'AddToCollection',
  ChangeNote = 'changeNote',
  ChangeRate = 'changeRate',
  ChangeWatchType = 'changeWatchType'
}

export type ComicsBaseResponse = {
  __typename?: 'ComicsBaseResponse';
  author?: Maybe<Array<Scalars['String']['output']>>;
  comicsType?: Maybe<ComicsEnum>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  volumes?: Maybe<Scalars['Int']['output']>;
};

export enum ComicsEnum {
  Comics = 'comics',
  GraphicNovel = 'graphicNovel',
  Manga = 'manga',
  Manhwa = 'manhwa'
}

export type ComicsMediaResponse = {
  __typename?: 'ComicsMediaResponse';
  author?: Maybe<Array<Scalars['String']['output']>>;
  comicsType?: Maybe<ComicsEnum>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inUserMedia?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  note?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  volumes?: Maybe<Scalars['Int']['output']>;
  watched?: Maybe<WatchedEnum>;
};

export type ComicsParseResponse = {
  __typename?: 'ComicsParseResponse';
  author?: Maybe<Array<Scalars['String']['output']>>;
  comicsType?: Maybe<ComicsEnum>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  volumes?: Maybe<Scalars['Int']['output']>;
};

export type ComicsSearchResponse = {
  __typename?: 'ComicsSearchResponse';
  author?: Maybe<Array<Scalars['String']['output']>>;
  comicsType?: Maybe<ComicsEnum>;
  country?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inUserMedia?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  volumes?: Maybe<Scalars['Int']['output']>;
};

export type ComicsStatsResponse = {
  __typename?: 'ComicsStatsResponse';
  all?: Maybe<MediaStatsResponse>;
  comics?: Maybe<MediaStatsResponse>;
  graphicNovel?: Maybe<MediaStatsResponse>;
  manga?: Maybe<MediaStatsResponse>;
  manhwa?: Maybe<MediaStatsResponse>;
};

export type CreateMediaInput = {
  createdType: CreatedEnum;
  media: MappedParseMedia;
  mediaType: MediaEnum;
  note?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Int']['input']>;
  report?: InputMaybe<Scalars['String']['input']>;
  watched?: InputMaybe<WatchedEnum>;
};

export enum CreatedEnum {
  Gpt = 'gpt',
  Self = 'self',
  Text = 'text',
  Wiki = 'wiki'
}

export type EmbeddingSearchInput = {
  count: Scalars['Int']['input'];
  mediaType: MediaEnum;
  message: Scalars['String']['input'];
};

export type FilmBaseResponse = {
  __typename?: 'FilmBaseResponse';
  boxOffice?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  filmType?: Maybe<FilmEnum>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  plot?: Maybe<Scalars['String']['output']>;
  runTime?: Maybe<Scalars['String']['output']>;
  starring?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export enum FilmEnum {
  Animated = 'animated',
  Anime = 'anime',
  Movie = 'movie'
}

export type FilmMediaResponse = {
  __typename?: 'FilmMediaResponse';
  boxOffice?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  filmType?: Maybe<FilmEnum>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inUserMedia?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  note?: Maybe<Scalars['String']['output']>;
  plot?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  runTime?: Maybe<Scalars['String']['output']>;
  starring?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  watched?: Maybe<WatchedEnum>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type FilmParseResponse = {
  __typename?: 'FilmParseResponse';
  boxOffice?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  filmType?: Maybe<FilmEnum>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  plot?: Maybe<Scalars['String']['output']>;
  runTime?: Maybe<Scalars['String']['output']>;
  starring?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type FilmSearchResponse = {
  __typename?: 'FilmSearchResponse';
  boxOffice?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  filmType?: Maybe<FilmEnum>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inUserMedia?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  plot?: Maybe<Scalars['String']['output']>;
  runTime?: Maybe<Scalars['String']['output']>;
  starring?: Maybe<Array<Scalars['String']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type FilmsStatsResponse = {
  __typename?: 'FilmsStatsResponse';
  all?: Maybe<MediaStatsResponse>;
  animated?: Maybe<MediaStatsResponse>;
  anime?: Maybe<MediaStatsResponse>;
  movie?: Maybe<MediaStatsResponse>;
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
};

export type FollowUser = {
  __typename?: 'FollowUser';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
};

export type Follower = {
  __typename?: 'Follower';
  email?: Maybe<Scalars['String']['output']>;
  follow?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
};

export type GenresResponse = {
  __typename?: 'GenresResponse';
  genres?: Maybe<Array<Scalars['String']['output']>>;
};

export type GetFollowInput = {
  followId: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type GetFollowsMediaInput = {
  count: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type GetGenresInput = {
  bookType?: InputMaybe<BookEnum>;
  comicsType?: InputMaybe<ComicsEnum>;
  filmType?: InputMaybe<FilmEnum>;
  inUserMedia: Scalars['Boolean']['input'];
  mediaType: MediaEnum;
  seriesType?: InputMaybe<SeriesEnum>;
};

export type GetMediaInput = {
  followId?: InputMaybe<Scalars['String']['input']>;
  mediaId?: InputMaybe<Scalars['String']['input']>;
  mediaType?: InputMaybe<MediaEnum>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type GetMediaType = BookMediaResponse | ComicsMediaResponse | FilmMediaResponse | SeriesMediaResponse;

export type GetModerEditMediaInput = {
  mediaId: Scalars['String']['input'];
  mediaType: MediaEnum;
};

export type GetModerMediaCountResponse = {
  __typename?: 'GetModerMediaCountResponse';
  mediaCount?: Maybe<Scalars['Int']['output']>;
  reportsCount?: Maybe<ReportsCountResponse>;
};

export type GetNearestMediaInput = {
  count: Scalars['Int']['input'];
  mediaId: Scalars['String']['input'];
  mediaType: MediaEnum;
};

export type GetRandomMediaInput = {
  InUserMedia: Scalars['Boolean']['input'];
  bookType?: InputMaybe<BookEnum>;
  comicsType?: InputMaybe<ComicsEnum>;
  count: Scalars['Int']['input'];
  filmType?: InputMaybe<FilmEnum>;
  fromYear?: InputMaybe<Scalars['Int']['input']>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  mediaType: MediaEnum;
  seriesType?: InputMaybe<SeriesEnum>;
  toYear?: InputMaybe<Scalars['Int']['input']>;
};

export type GetUserMediaInput = {
  bookType?: InputMaybe<BookEnum>;
  comicsType?: InputMaybe<ComicsEnum>;
  count: Scalars['Int']['input'];
  filmType?: InputMaybe<FilmEnum>;
  mediaTYpe: MediaEnum;
  page: Scalars['Int']['input'];
  seriesType?: InputMaybe<SeriesEnum>;
  sorted?: InputMaybe<SortedEnum>;
  userId?: InputMaybe<Scalars['String']['input']>;
  watched?: InputMaybe<WatchedEnum>;
};

export type GptInput = {
  isAfter2021?: InputMaybe<Scalars['Boolean']['input']>;
  isAllFields?: InputMaybe<Scalars['Boolean']['input']>;
  isJson?: InputMaybe<Scalars['Boolean']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  mediaType: MediaEnum;
  query: Scalars['String']['input'];
};

export type ImageResponse = {
  __typename?: 'ImageResponse';
  link: Scalars['String']['output'];
};

export type ImagesInput = {
  count: Scalars['Int']['input'];
  mediaType: MediaEnum;
  query: Scalars['String']['input'];
};

export type ImagesResponse = {
  __typename?: 'ImagesResponse';
  additionalMediaTokens: Scalars['Int']['output'];
  links?: Maybe<Array<Scalars['String']['output']>>;
  mediaTokens: Scalars['Int']['output'];
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MappedMedia = {
  author?: InputMaybe<Array<Scalars['String']['input']>>;
  bookType?: InputMaybe<BookEnum>;
  boxOffice?: InputMaybe<Scalars['String']['input']>;
  budget?: InputMaybe<Scalars['String']['input']>;
  comicsType?: InputMaybe<ComicsEnum>;
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  directedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  endYear?: InputMaybe<Scalars['Int']['input']>;
  filmType?: InputMaybe<FilmEnum>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  image?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<MediaEnum>;
  pages?: InputMaybe<Scalars['Int']['input']>;
  plot?: InputMaybe<Scalars['String']['input']>;
  runTime?: InputMaybe<Scalars['String']['input']>;
  seasons?: InputMaybe<Array<SeriesSeasonInput>>;
  seriesType?: InputMaybe<SeriesEnum>;
  starring?: InputMaybe<Array<Scalars['String']['input']>>;
  startYear?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  volumes?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type MappedParseMedia = {
  author?: InputMaybe<Array<Scalars['String']['input']>>;
  bookType?: InputMaybe<BookEnum>;
  boxOffice?: InputMaybe<Scalars['String']['input']>;
  budget?: InputMaybe<Scalars['String']['input']>;
  comicsType?: InputMaybe<ComicsEnum>;
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  directedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  endYear?: InputMaybe<Scalars['Int']['input']>;
  filmType?: InputMaybe<FilmEnum>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  image?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<MediaEnum>;
  pages?: InputMaybe<Scalars['Int']['input']>;
  plot?: InputMaybe<Scalars['String']['input']>;
  runTime?: InputMaybe<Scalars['String']['input']>;
  seasons?: InputMaybe<Array<SeriesSeasonRateInput>>;
  seriesType?: InputMaybe<SeriesEnum>;
  starring?: InputMaybe<Array<Scalars['String']['input']>>;
  startYear?: InputMaybe<Scalars['Int']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  volumes?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type MediaBaseType = BookBaseResponse | ComicsBaseResponse | FilmBaseResponse | SeriesBaseResponse;

export enum MediaEnum {
  Book = 'book',
  Comics = 'comics',
  Film = 'film',
  Series = 'series'
}

export type MediaFollowResponse = {
  __typename?: 'MediaFollowResponse';
  media?: Maybe<MediaBaseType>;
  user?: Maybe<FollowUser>;
  userMedia?: Maybe<UserMediaResponse>;
};

export type MediaModerResponse = {
  __typename?: 'MediaModerResponse';
  createdType?: Maybe<CreatedEnum>;
  creator?: Maybe<User>;
  media?: Maybe<MediaModerType>;
  report?: Maybe<Scalars['String']['output']>;
  searchMedia?: Maybe<Array<MediaBaseType>>;
};

export type MediaModerType = BookBaseResponse | ComicsBaseResponse | FilmBaseResponse | SeriesModerResponse;

export type MediaParseResponse = {
  __typename?: 'MediaParseResponse';
  additionalMediaTokens: Scalars['Int']['output'];
  media: MediaParseType;
  mediaTokens: Scalars['Int']['output'];
};

export type MediaParseType = BookParseResponse | ComicsParseResponse | FilmParseResponse | SeriesParseResponse;

export type MediaReportResponse = {
  __typename?: 'MediaReportResponse';
  createdType?: Maybe<CreatedEnum>;
  creator?: Maybe<User>;
  informer?: Maybe<User>;
  media: MediaModerType;
  report?: Maybe<Scalars['String']['output']>;
  reportId?: Maybe<Scalars['String']['output']>;
};

export type MediaSearchType = BookSearchResponse | ComicsSearchResponse | FilmSearchResponse | SeriesSearchResponse;

export type MediaStatsResponse = {
  __typename?: 'MediaStatsResponse';
  abandonedCount?: Maybe<Scalars['Int']['output']>;
  allCount?: Maybe<Scalars['Int']['output']>;
  averageRating?: Maybe<Scalars['Float']['output']>;
  completedCount?: Maybe<Scalars['Int']['output']>;
  pausedCount?: Maybe<Scalars['Int']['output']>;
  plannedCount?: Maybe<Scalars['Int']['output']>;
  reviewingCount?: Maybe<Scalars['Int']['output']>;
  viewingCount?: Maybe<Scalars['Int']['output']>;
};

export type ModerReportAccountResponse = {
  __typename?: 'ModerReportAccountResponse';
  informerUser?: Maybe<User>;
  reportId: Scalars['String']['output'];
  reportedUser?: Maybe<User>;
};

export type ModerReportNoteResponse = {
  __typename?: 'ModerReportNoteResponse';
  informerUser?: Maybe<User>;
  mediaId?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  reportId: Scalars['String']['output'];
  reportedUser?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptModerMedia?: Maybe<SuccessResponse>;
  acceptWarning: SuccessResponse;
  activate: AuthResponse;
  addFollow: SuccessResponse;
  addMediaToUser: SuccessResponse;
  addReport?: Maybe<SuccessResponse>;
  addRole: User;
  banReportsUser: User;
  banUser: User;
  createMedia: SuccessResponse;
  deleteMediaFromCollection?: Maybe<SuccessResponse>;
  deleteReport: SuccessResponse;
  forgotPassword: SuccessResponse;
  login: AuthResponse;
  logout: SuccessResponse;
  refresh: TokenResponse;
  registration: SuccessResponse;
  removeFollow: SuccessResponse;
  resetPassword: SuccessResponse;
  setAllWatchedNotifications: SuccessResponse;
  unbanUser: User;
  updateUser: SuccessResponse;
  updateUserMedia?: Maybe<SuccessResponse>;
};


export type MutationAcceptModerMediaArgs = {
  acceptModerMediaInput: AcceptModerMediaInput;
};


export type MutationAcceptWarningArgs = {
  warningInput: WarningInput;
};


export type MutationActivateArgs = {
  link: Scalars['String']['input'];
};


export type MutationAddFollowArgs = {
  followId: Scalars['String']['input'];
};


export type MutationAddMediaToUserArgs = {
  addMediaInput: AddMediaInput;
};


export type MutationAddReportArgs = {
  addReportInput: AddReportInput;
};


export type MutationAddRoleArgs = {
  addRoleUserInput: AddRoleUserInput;
};


export type MutationBanReportsUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationBanUserArgs = {
  banUserInput: BanUserInput;
};


export type MutationCreateMediaArgs = {
  createMediaInput: CreateMediaInput;
};


export type MutationDeleteMediaFromCollectionArgs = {
  mediaId: Scalars['String']['input'];
};


export type MutationDeleteReportArgs = {
  reportId: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRegistrationArgs = {
  registrationInput: RegistrationInput;
};


export type MutationRemoveFollowArgs = {
  followId: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationUnbanUserArgs = {
  userEmail: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserMediaArgs = {
  updateUserMediaInput: UpdateUserMediaInput;
};

export enum NotificationEnum {
  Ban = 'ban',
  Base = 'base',
  Follow = 'follow',
  NewRole = 'newRole',
  Tokens = 'tokens',
  Unfollow = 'unfollow',
  Update = 'update',
  Warning = 'warning'
}

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  createdAt?: Maybe<Scalars['Date']['output']>;
  follower?: Maybe<Follower>;
  followerId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isWatched?: Maybe<Scalars['Boolean']['output']>;
  notification?: Maybe<Scalars['String']['output']>;
  type: NotificationEnum;
  userId: Scalars['String']['output'];
};

export type ProfileInfoReponse = {
  __typename?: 'ProfileInfoReponse';
  followerCount?: Maybe<Scalars['Int']['output']>;
  followingCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  mediaCount?: Maybe<Scalars['Int']['output']>;
  mediaStats?: Maybe<StatsReponse>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  downloadFileByLink: ImageResponse;
  embeddingSearch?: Maybe<Array<MediaSearchType>>;
  getAllUsers: Array<User>;
  getFollowInfo: GetFollowInfoResponse;
  getFollowsMedia?: Maybe<Array<MediaFollowResponse>>;
  getGenres?: Maybe<GenresResponse>;
  getMedia: GetMediaType;
  getModerEditMedia?: Maybe<MediaModerType>;
  getModerMedia?: Maybe<MediaModerResponse>;
  getModerMediaCount?: Maybe<GetModerMediaCountResponse>;
  getModerReportAccount?: Maybe<ModerReportAccountResponse>;
  getModerReportMedia?: Maybe<MediaReportResponse>;
  getModerReportNote?: Maybe<ModerReportNoteResponse>;
  getNearMedia?: Maybe<Array<MediaSearchType>>;
  getProfileInfo: ProfileInfoReponse;
  getRandomMedia?: Maybe<Array<MediaBaseType>>;
  getUserFollowers: Array<FollowResponse>;
  getUserFollows: Array<FollowResponse>;
  getUserMedia?: Maybe<Array<GetMediaType>>;
  getUserNotifications: Array<NotificationResponse>;
  gptMediaParse: MediaParseResponse;
  gptTitleParse: TitleResponse;
  imageParse: ImagesResponse;
  searchMedia?: Maybe<Array<MediaSearchType>>;
  wikiMediaParse: MediaParseResponse;
};


export type QueryDownloadFileByLinkArgs = {
  url: Scalars['String']['input'];
};


export type QueryEmbeddingSearchArgs = {
  embeddingSearchInput: EmbeddingSearchInput;
};


export type QueryGetFollowInfoArgs = {
  getFollowInput: GetFollowInput;
};


export type QueryGetFollowsMediaArgs = {
  getFollowsMediaInput: GetFollowsMediaInput;
};


export type QueryGetGenresArgs = {
  getGenresInput: GetGenresInput;
};


export type QueryGetMediaArgs = {
  getMediaInput: GetMediaInput;
};


export type QueryGetModerEditMediaArgs = {
  getModerEditMediaInput: GetModerEditMediaInput;
};


export type QueryGetNearMediaArgs = {
  getNearestMediaInput: GetNearestMediaInput;
};


export type QueryGetRandomMediaArgs = {
  getRandomMediaInput: GetRandomMediaInput;
};


export type QueryGetUserMediaArgs = {
  getUserMediaInput: GetUserMediaInput;
};


export type QueryGptMediaParseArgs = {
  gptInput: GptInput;
};


export type QueryGptTitleParseArgs = {
  queryInput: QueryInput;
};


export type QueryImageParseArgs = {
  imagesInput: ImagesInput;
};


export type QuerySearchMediaArgs = {
  searchInput: SearchInput;
};


export type QueryWikiMediaParseArgs = {
  queryInput: QueryInput;
};

export type QueryInput = {
  mediaType: MediaEnum;
  query: Scalars['String']['input'];
};

export type RegistrationInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum ReportEnum {
  Account = 'account',
  Media = 'media',
  Note = 'note'
}

export type ReportsCountResponse = {
  __typename?: 'ReportsCountResponse';
  account?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Scalars['Int']['output']>;
  note?: Maybe<Scalars['Int']['output']>;
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  resetLink: Scalars['String']['input'];
};

export enum RolesEnum {
  Admin = 'Admin',
  Moder = 'Moder',
  User = 'User'
}

export type SearchInput = {
  mediaType: MediaEnum;
  query: Scalars['String']['input'];
};

export type SeriesBaseResponse = {
  __typename?: 'SeriesBaseResponse';
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  plot?: Maybe<Scalars['String']['output']>;
  seriesType?: Maybe<SeriesEnum>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum SeriesEnum {
  Animated = 'animated',
  Anime = 'anime',
  Tv = 'tv'
}

export type SeriesMediaResponse = {
  __typename?: 'SeriesMediaResponse';
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inUserMedia?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  note?: Maybe<Scalars['String']['output']>;
  plot?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  seasons?: Maybe<Array<SeriesSeasonRateResponse>>;
  seriesType?: Maybe<SeriesEnum>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  watched?: Maybe<WatchedEnum>;
};

export type SeriesModerResponse = {
  __typename?: 'SeriesModerResponse';
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  plot?: Maybe<Scalars['String']['output']>;
  seasons?: Maybe<Array<SeriesSeasonResponse>>;
  seriesType?: Maybe<SeriesEnum>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SeriesParseResponse = {
  __typename?: 'SeriesParseResponse';
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  image?: Maybe<Scalars['String']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  plot?: Maybe<Scalars['String']['output']>;
  seasons?: Maybe<Array<SeriesSeasonResponse>>;
  seriesType?: Maybe<SeriesEnum>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SeriesSearchResponse = {
  __typename?: 'SeriesSearchResponse';
  country?: Maybe<Scalars['String']['output']>;
  directedBy?: Maybe<Array<Scalars['String']['output']>>;
  endYear?: Maybe<Scalars['Int']['output']>;
  genres?: Maybe<Array<Scalars['String']['output']>>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  inUserMedia?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  language?: Maybe<Scalars['String']['output']>;
  media?: Maybe<MediaEnum>;
  plot?: Maybe<Scalars['String']['output']>;
  seriesType?: Maybe<SeriesEnum>;
  startYear?: Maybe<Scalars['Int']['output']>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SeriesSeasonInput = {
  episodes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SeriesSeasonRateInput = {
  episodes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SeriesSeasonRateResponse = {
  __typename?: 'SeriesSeasonRateResponse';
  episodes?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SeriesSeasonResponse = {
  __typename?: 'SeriesSeasonResponse';
  episodes?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  season?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SeriesStatsResponse = {
  __typename?: 'SeriesStatsResponse';
  all?: Maybe<MediaStatsResponse>;
  animated?: Maybe<MediaStatsResponse>;
  anime?: Maybe<MediaStatsResponse>;
  tv?: Maybe<MediaStatsResponse>;
};

export enum SortedEnum {
  DateAsc = 'dateAsc',
  DateDesc = 'dateDesc',
  RateAsc = 'rateAsc',
  RateDesc = 'rateDesc',
  TitleAsc = 'titleAsc',
  TitleDesc = 'titleDesc',
  YearAsc = 'yearAsc',
  YearDesc = 'yearDesc'
}

export type StatsReponse = {
  __typename?: 'StatsReponse';
  books?: Maybe<BooksStatsResponse>;
  comics?: Maybe<ComicsStatsResponse>;
  films?: Maybe<FilmsStatsResponse>;
  series?: Maybe<SeriesStatsResponse>;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  success: Scalars['Boolean']['output'];
};

export type TitleResponse = {
  __typename?: 'TitleResponse';
  additionalMediaTokens: Scalars['Int']['output'];
  mediaTokens: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  token: Scalars['ID']['output'];
};

export type UpdateUserInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserMediaInput = {
  mediaId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Int']['input']>;
  seasons?: InputMaybe<Array<SeriesSeasonRateInput>>;
  watched?: InputMaybe<WatchedEnum>;
};

export type User = {
  __typename?: 'User';
  activationLink?: Maybe<Scalars['ID']['output']>;
  additionalMediaTokens: Scalars['Int']['output'];
  banReason?: Maybe<Scalars['ID']['output']>;
  canSendReport: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActivated: Scalars['Boolean']['output'];
  isBanned: Scalars['Boolean']['output'];
  mediaTokens: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  resetPasswordLink?: Maybe<Scalars['ID']['output']>;
  role: RolesEnum;
  warnings?: Maybe<Array<Scalars['String']['output']>>;
};

export type UserMediaResponse = {
  __typename?: 'UserMediaResponse';
  changed?: Maybe<Array<ChangedEnum>>;
  mediaId?: Maybe<Scalars['String']['output']>;
  mediaType?: Maybe<MediaEnum>;
  note?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  watched?: Maybe<WatchedEnum>;
};

export enum WarningEnum {
  Copyright = 'copyright',
  Pornography = 'pornography',
  Spam = 'spam',
  Violence = 'violence'
}

export type WarningInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  mediaId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  warning: WarningEnum;
  warningObject: WarningObjectEnum;
};

export enum WarningObjectEnum {
  AccountImage = 'accountImage',
  AccountName = 'accountName',
  AccountNote = 'accountNote',
  Media = 'media',
  MediaNote = 'mediaNote',
  Report = 'report'
}

export enum WatchedEnum {
  Abandoned = 'abandoned',
  Completed = 'completed',
  Paused = 'paused',
  Planned = 'planned',
  Rated = 'rated',
  Reviewing = 'reviewing',
  Viewing = 'viewing'
}

export type GetFollowInfoResponse = {
  __typename?: 'getFollowInfoResponse';
  bookCount?: Maybe<Scalars['Int']['output']>;
  comicsCount?: Maybe<Scalars['Int']['output']>;
  filmCount?: Maybe<Scalars['Int']['output']>;
  follow?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  seriesCount?: Maybe<Scalars['Int']['output']>;
};

export type AddRoleMutationVariables = Exact<{
  input: AddRoleUserInput;
}>;


export type AddRoleMutation = { __typename?: 'Mutation', addRole: { __typename?: 'User', id: string } };

export type UnbanUserMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type UnbanUserMutation = { __typename?: 'Mutation', unbanUser: { __typename?: 'User', id: string } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: string, name: string, email: string, picture?: string | null, isBanned: boolean, canSendReport: boolean, createdAt: any }> };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', id: string, email: string, picture?: string | null, name: string, token: string } };

export type RegistrationMutationVariables = Exact<{
  input: RegistrationInput;
}>;


export type RegistrationMutation = { __typename?: 'Mutation', registration: { __typename?: 'SuccessResponse', success: boolean } };

export type ForgotPasswordMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'SuccessResponse', success: boolean } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'SuccessResponse', success: boolean } };

export type ActivateMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type ActivateMutation = { __typename?: 'Mutation', activate: { __typename?: 'AuthResponse', id: string, email: string, picture?: string | null, name: string, token: string } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'TokenResponse', token: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'SuccessResponse', success: boolean } };

export type DownloadFileByLinkQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DownloadFileByLinkQuery = { __typename?: 'Query', downloadFileByLink: { __typename?: 'ImageResponse', link: string } };

export type GetUserFollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFollowersQuery = { __typename?: 'Query', getUserFollowers: Array<{ __typename?: 'FollowResponse', id: string, name: string, picture?: string | null }> };

export type GetUserFollowsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFollowsQuery = { __typename?: 'Query', getUserFollows: Array<{ __typename?: 'FollowResponse', id: string, name: string, picture?: string | null }> };

export type RemoveFollowMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type RemoveFollowMutation = { __typename?: 'Mutation', removeFollow: { __typename?: 'SuccessResponse', success: boolean } };

export type AddFollowMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type AddFollowMutation = { __typename?: 'Mutation', addFollow: { __typename?: 'SuccessResponse', success: boolean } };

export type GetFollowInfoQueryVariables = Exact<{
  input: GetFollowInput;
}>;


export type GetFollowInfoQuery = { __typename?: 'Query', getFollowInfo: { __typename?: 'getFollowInfoResponse', id: string, name: string, picture?: string | null, note?: string | null, filmCount?: number | null, seriesCount?: number | null, comicsCount?: number | null, bookCount?: number | null, follow?: boolean | null } };

export type GetProfileInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileInfoQuery = { __typename?: 'Query', getProfileInfo: { __typename?: 'ProfileInfoReponse', note?: string | null, followerCount?: number | null, followingCount?: number | null, mediaCount?: number | null, mediaStats?: { __typename?: 'StatsReponse', films?: { __typename?: 'FilmsStatsResponse', all?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, animated?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, anime?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, movie?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null } | null, series?: { __typename?: 'SeriesStatsResponse', all?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, animated?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, anime?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, tv?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null } | null, comics?: { __typename?: 'ComicsStatsResponse', all?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, comics?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, graphicNovel?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, manga?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, manhwa?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null } | null, books?: { __typename?: 'BooksStatsResponse', all?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, fiction?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null, nonFiction?: { __typename?: 'MediaStatsResponse', allCount?: number | null, completedCount?: number | null, plannedCount?: number | null, abandonedCount?: number | null, pausedCount?: number | null, reviewingCount?: number | null, viewingCount?: number | null, averageRating?: number | null } | null } | null } | null } };

export type DeleteMediaFromCollectionMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DeleteMediaFromCollectionMutation = { __typename?: 'Mutation', deleteMediaFromCollection?: { __typename?: 'SuccessResponse', success: boolean } | null };

export type GetFollowsMediaQueryVariables = Exact<{
  input: GetFollowsMediaInput;
}>;


export type GetFollowsMediaQuery = { __typename?: 'Query', getFollowsMedia?: Array<{ __typename?: 'MediaFollowResponse', user?: { __typename?: 'FollowUser', id: string, name: string, picture?: string | null } | null, userMedia?: { __typename?: 'UserMediaResponse', updatedAt?: any | null, changed?: Array<ChangedEnum> | null, watched?: WatchedEnum | null, rate?: number | null, note?: string | null } | null, media?: { __typename?: 'BookBaseResponse', id?: string | null, media?: MediaEnum | null, bookType?: BookEnum | null, title?: string | null, image?: string | null, author?: Array<string> | null, year?: number | null } | { __typename?: 'ComicsBaseResponse', id?: string | null, media?: MediaEnum | null, comicsType?: ComicsEnum | null, title?: string | null, image?: string | null, startYear?: number | null, endYear?: number | null, author?: Array<string> | null } | { __typename?: 'FilmBaseResponse', id?: string | null, media?: MediaEnum | null, filmType?: FilmEnum | null, title?: string | null, image?: string | null, year?: number | null, directedBy?: Array<string> | null } | { __typename?: 'SeriesBaseResponse', id?: string | null, media?: MediaEnum | null, seriesType?: SeriesEnum | null, title?: string | null, image?: string | null, startYear?: number | null, endYear?: number | null } | null }> | null };

export type GetNearMediaQueryVariables = Exact<{
  input: GetNearestMediaInput;
}>;


export type GetNearMediaQuery = { __typename?: 'Query', getNearMedia?: Array<{ __typename?: 'BookSearchResponse', id?: string | null, media?: MediaEnum | null, bookType?: BookEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, author?: Array<string> | null, year?: number | null } | { __typename?: 'ComicsSearchResponse', id?: string | null, media?: MediaEnum | null, comicsType?: ComicsEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, startYear?: number | null, endYear?: number | null, author?: Array<string> | null } | { __typename?: 'FilmSearchResponse', id?: string | null, media?: MediaEnum | null, filmType?: FilmEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, year?: number | null, directedBy?: Array<string> | null } | { __typename?: 'SeriesSearchResponse', id?: string | null, media?: MediaEnum | null, seriesType?: SeriesEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, startYear?: number | null, endYear?: number | null }> | null };

export type EmbeddingSearchQueryVariables = Exact<{
  input: EmbeddingSearchInput;
}>;


export type EmbeddingSearchQuery = { __typename?: 'Query', embeddingSearch?: Array<{ __typename?: 'BookSearchResponse', id?: string | null, bookType?: BookEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, author?: Array<string> | null, year?: number | null } | { __typename?: 'ComicsSearchResponse', id?: string | null, comicsType?: ComicsEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, startYear?: number | null, endYear?: number | null, author?: Array<string> | null } | { __typename?: 'FilmSearchResponse', id?: string | null, filmType?: FilmEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, year?: number | null, directedBy?: Array<string> | null } | { __typename?: 'SeriesSearchResponse', id?: string | null, seriesType?: SeriesEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, startYear?: number | null, endYear?: number | null }> | null };

export type GetGenresQueryVariables = Exact<{
  input: GetGenresInput;
}>;


export type GetGenresQuery = { __typename?: 'Query', getGenres?: { __typename?: 'GenresResponse', genres?: Array<string> | null } | null };

export type UpdateUserMediaMutationVariables = Exact<{
  input: UpdateUserMediaInput;
}>;


export type UpdateUserMediaMutation = { __typename?: 'Mutation', updateUserMedia?: { __typename?: 'SuccessResponse', success: boolean } | null };

export type AddMediaToUserMutationVariables = Exact<{
  input: AddMediaInput;
}>;


export type AddMediaToUserMutation = { __typename?: 'Mutation', addMediaToUser: { __typename?: 'SuccessResponse', success: boolean } };

export type AddReportMutationVariables = Exact<{
  input: AddReportInput;
}>;


export type AddReportMutation = { __typename?: 'Mutation', addReport?: { __typename?: 'SuccessResponse', success: boolean } | null };

export type GetRandomMediaQueryVariables = Exact<{
  input: GetRandomMediaInput;
}>;


export type GetRandomMediaQuery = { __typename?: 'Query', getRandomMedia?: Array<{ __typename?: 'BookBaseResponse', id?: string | null, media?: MediaEnum | null, bookType?: BookEnum | null, title?: string | null, country?: string | null, genres?: Array<string> | null, image?: string | null, author?: Array<string> | null, year?: number | null } | { __typename?: 'ComicsBaseResponse', id?: string | null, media?: MediaEnum | null, comicsType?: ComicsEnum | null, title?: string | null, country?: string | null, genres?: Array<string> | null, image?: string | null, startYear?: number | null, endYear?: number | null, author?: Array<string> | null } | { __typename?: 'FilmBaseResponse', id?: string | null, media?: MediaEnum | null, filmType?: FilmEnum | null, title?: string | null, country?: string | null, genres?: Array<string> | null, image?: string | null, year?: number | null, directedBy?: Array<string> | null } | { __typename?: 'SeriesBaseResponse', id?: string | null, media?: MediaEnum | null, seriesType?: SeriesEnum | null, title?: string | null, country?: string | null, genres?: Array<string> | null, image?: string | null, startYear?: number | null, endYear?: number | null }> | null };

export type GetUserMediaQueryVariables = Exact<{
  input: GetUserMediaInput;
}>;


export type GetUserMediaQuery = { __typename?: 'Query', getUserMedia?: Array<{ __typename?: 'BookMediaResponse', id?: string | null, media?: MediaEnum | null, bookType?: BookEnum | null, title?: string | null, country?: string | null, genres?: Array<string> | null, image?: string | null, author?: Array<string> | null, year?: number | null, rate?: number | null, watched?: WatchedEnum | null } | { __typename?: 'ComicsMediaResponse', id?: string | null, media?: MediaEnum | null, comicsType?: ComicsEnum | null, title?: string | null, country?: string | null, genres?: Array<string> | null, image?: string | null, startYear?: number | null, endYear?: number | null, author?: Array<string> | null, rate?: number | null, watched?: WatchedEnum | null } | { __typename?: 'FilmMediaResponse', id?: string | null, media?: MediaEnum | null, filmType?: FilmEnum | null, title?: string | null, country?: string | null, genres?: Array<string> | null, image?: string | null, year?: number | null, directedBy?: Array<string> | null, rate?: number | null, watched?: WatchedEnum | null } | { __typename?: 'SeriesMediaResponse', id?: string | null, media?: MediaEnum | null, seriesType?: SeriesEnum | null, title?: string | null, country?: string | null, genres?: Array<string> | null, image?: string | null, startYear?: number | null, endYear?: number | null, rate?: number | null, watched?: WatchedEnum | null }> | null };

export type GetMediaQueryVariables = Exact<{
  input: GetMediaInput;
}>;


export type GetMediaQuery = { __typename?: 'Query', getMedia: { __typename?: 'BookMediaResponse', id?: string | null, bookType?: BookEnum | null, title?: string | null, author?: Array<string> | null, year?: number | null, country?: string | null, description?: string | null, language?: string | null, pages?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null, inUserMedia?: boolean | null, isPublic?: boolean | null, note?: string | null, rate?: number | null, watched?: WatchedEnum | null } | { __typename?: 'ComicsMediaResponse', id?: string | null, comicsType?: ComicsEnum | null, title?: string | null, author?: Array<string> | null, startYear?: number | null, endYear?: number | null, country?: string | null, description?: string | null, language?: string | null, volumes?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null, inUserMedia?: boolean | null, isPublic?: boolean | null, note?: string | null, rate?: number | null, watched?: WatchedEnum | null } | { __typename?: 'FilmMediaResponse', id?: string | null, filmType?: FilmEnum | null, title?: string | null, year?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, starring?: Array<string> | null, runTime?: string | null, boxOffice?: string | null, budget?: string | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null, inUserMedia?: boolean | null, isPublic?: boolean | null, note?: string | null, rate?: number | null, watched?: WatchedEnum | null } | { __typename?: 'SeriesMediaResponse', id?: string | null, seriesType?: SeriesEnum | null, title?: string | null, startYear?: number | null, endYear?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null, inUserMedia?: boolean | null, isPublic?: boolean | null, note?: string | null, rate?: number | null, watched?: WatchedEnum | null, seasons?: Array<{ __typename?: 'SeriesSeasonRateResponse', id?: string | null, season?: number | null, title?: string | null, episodes?: number | null, rate?: number | null }> | null } };

export type SearchMediaQueryVariables = Exact<{
  input: SearchInput;
}>;


export type SearchMediaQuery = { __typename?: 'Query', searchMedia?: Array<{ __typename?: 'BookSearchResponse', id?: string | null, bookType?: BookEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, author?: Array<string> | null, year?: number | null } | { __typename?: 'ComicsSearchResponse', id?: string | null, comicsType?: ComicsEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, startYear?: number | null, endYear?: number | null, author?: Array<string> | null } | { __typename?: 'FilmSearchResponse', id?: string | null, filmType?: FilmEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, year?: number | null, directedBy?: Array<string> | null } | { __typename?: 'SeriesSearchResponse', id?: string | null, seriesType?: SeriesEnum | null, title?: string | null, image?: string | null, inUserMedia?: boolean | null, startYear?: number | null, endYear?: number | null }> | null };

export type CreateMediaMutationVariables = Exact<{
  input: CreateMediaInput;
}>;


export type CreateMediaMutation = { __typename?: 'Mutation', createMedia: { __typename?: 'SuccessResponse', success: boolean } };

export type DeleteReportMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DeleteReportMutation = { __typename?: 'Mutation', deleteReport: { __typename?: 'SuccessResponse', success: boolean } };

export type BanUserMutationVariables = Exact<{
  input: BanUserInput;
}>;


export type BanUserMutation = { __typename?: 'Mutation', banUser: { __typename?: 'User', id: string } };

export type BanReportsUserMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type BanReportsUserMutation = { __typename?: 'Mutation', banReportsUser: { __typename?: 'User', id: string } };

export type AcceptWarningMutationVariables = Exact<{
  input: WarningInput;
}>;


export type AcceptWarningMutation = { __typename?: 'Mutation', acceptWarning: { __typename?: 'SuccessResponse', success: boolean } };

export type GetModerEditMediaQueryVariables = Exact<{
  input: GetModerEditMediaInput;
}>;


export type GetModerEditMediaQuery = { __typename?: 'Query', getModerEditMedia?: { __typename?: 'BookBaseResponse', id?: string | null, media?: MediaEnum | null, bookType?: BookEnum | null, title?: string | null, author?: Array<string> | null, year?: number | null, country?: string | null, description?: string | null, language?: string | null, pages?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'ComicsBaseResponse', id?: string | null, media?: MediaEnum | null, comicsType?: ComicsEnum | null, title?: string | null, author?: Array<string> | null, startYear?: number | null, endYear?: number | null, country?: string | null, description?: string | null, language?: string | null, volumes?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'FilmBaseResponse', id?: string | null, media?: MediaEnum | null, filmType?: FilmEnum | null, title?: string | null, year?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, starring?: Array<string> | null, runTime?: string | null, boxOffice?: string | null, budget?: string | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'SeriesModerResponse', id?: string | null, media?: MediaEnum | null, seriesType?: SeriesEnum | null, title?: string | null, startYear?: number | null, endYear?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null, seasons?: Array<{ __typename?: 'SeriesSeasonResponse', id?: string | null, season?: number | null, title?: string | null, episodes?: number | null }> | null } | null };

export type AcceptModerMediaMutationVariables = Exact<{
  input: AcceptModerMediaInput;
}>;


export type AcceptModerMediaMutation = { __typename?: 'Mutation', acceptModerMedia?: { __typename?: 'SuccessResponse', success: boolean } | null };

export type GetModerReportNoteQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModerReportNoteQuery = { __typename?: 'Query', getModerReportNote?: { __typename?: 'ModerReportNoteResponse', reportId: string, mediaId?: string | null, note?: string | null, reportedUser?: { __typename?: 'User', id: string, name: string, picture?: string | null, warnings?: Array<string> | null, canSendReport: boolean, isBanned: boolean, note?: string | null } | null, informerUser?: { __typename?: 'User', id: string, name: string, picture?: string | null, warnings?: Array<string> | null, canSendReport: boolean, isBanned: boolean, note?: string | null } | null } | null };

export type GetModerReportAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModerReportAccountQuery = { __typename?: 'Query', getModerReportAccount?: { __typename?: 'ModerReportAccountResponse', reportId: string, reportedUser?: { __typename?: 'User', id: string, name: string, picture?: string | null, warnings?: Array<string> | null, canSendReport: boolean, isBanned: boolean, note?: string | null } | null, informerUser?: { __typename?: 'User', id: string, name: string, picture?: string | null, warnings?: Array<string> | null, canSendReport: boolean, isBanned: boolean, note?: string | null } | null } | null };

export type GetModerReportMediaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModerReportMediaQuery = { __typename?: 'Query', getModerReportMedia?: { __typename?: 'MediaReportResponse', report?: string | null, reportId?: string | null, createdType?: CreatedEnum | null, informer?: { __typename?: 'User', id: string, name: string, picture?: string | null, warnings?: Array<string> | null, canSendReport: boolean, isBanned: boolean, note?: string | null } | null, creator?: { __typename?: 'User', id: string, name: string, picture?: string | null, warnings?: Array<string> | null, canSendReport: boolean, isBanned: boolean, note?: string | null } | null, media: { __typename?: 'BookBaseResponse', id?: string | null, media?: MediaEnum | null, bookType?: BookEnum | null, title?: string | null, author?: Array<string> | null, year?: number | null, country?: string | null, description?: string | null, language?: string | null, pages?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'ComicsBaseResponse', id?: string | null, media?: MediaEnum | null, comicsType?: ComicsEnum | null, title?: string | null, author?: Array<string> | null, startYear?: number | null, endYear?: number | null, country?: string | null, description?: string | null, language?: string | null, volumes?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'FilmBaseResponse', id?: string | null, media?: MediaEnum | null, filmType?: FilmEnum | null, title?: string | null, year?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, starring?: Array<string> | null, runTime?: string | null, boxOffice?: string | null, budget?: string | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'SeriesModerResponse', id?: string | null, media?: MediaEnum | null, seriesType?: SeriesEnum | null, title?: string | null, startYear?: number | null, endYear?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null, seasons?: Array<{ __typename?: 'SeriesSeasonResponse', id?: string | null, season?: number | null, title?: string | null, episodes?: number | null }> | null } } | null };

export type GetModerMediaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModerMediaQuery = { __typename?: 'Query', getModerMedia?: { __typename?: 'MediaModerResponse', report?: string | null, createdType?: CreatedEnum | null, creator?: { __typename?: 'User', id: string, name: string, picture?: string | null, warnings?: Array<string> | null, canSendReport: boolean, isBanned: boolean, note?: string | null } | null, searchMedia?: Array<{ __typename?: 'BookBaseResponse', id?: string | null, media?: MediaEnum | null, title?: string | null, year?: number | null, image?: string | null } | { __typename?: 'ComicsBaseResponse', id?: string | null, media?: MediaEnum | null, title?: string | null, startYear?: number | null, endYear?: number | null, image?: string | null } | { __typename?: 'FilmBaseResponse', id?: string | null, media?: MediaEnum | null, title?: string | null, year?: number | null, image?: string | null } | { __typename?: 'SeriesBaseResponse', id?: string | null, media?: MediaEnum | null, title?: string | null, startYear?: number | null, endYear?: number | null, image?: string | null }> | null, media?: { __typename?: 'BookBaseResponse', id?: string | null, media?: MediaEnum | null, bookType?: BookEnum | null, title?: string | null, author?: Array<string> | null, year?: number | null, country?: string | null, description?: string | null, language?: string | null, pages?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'ComicsBaseResponse', id?: string | null, media?: MediaEnum | null, comicsType?: ComicsEnum | null, title?: string | null, author?: Array<string> | null, startYear?: number | null, endYear?: number | null, country?: string | null, description?: string | null, language?: string | null, volumes?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'FilmBaseResponse', id?: string | null, media?: MediaEnum | null, filmType?: FilmEnum | null, title?: string | null, year?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, starring?: Array<string> | null, runTime?: string | null, boxOffice?: string | null, budget?: string | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'SeriesModerResponse', id?: string | null, media?: MediaEnum | null, seriesType?: SeriesEnum | null, title?: string | null, startYear?: number | null, endYear?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null, seasons?: Array<{ __typename?: 'SeriesSeasonResponse', id?: string | null, season?: number | null, title?: string | null, episodes?: number | null }> | null } | null } | null };

export type GetModerMediaCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModerMediaCountQuery = { __typename?: 'Query', getModerMediaCount?: { __typename?: 'GetModerMediaCountResponse', mediaCount?: number | null, reportsCount?: { __typename?: 'ReportsCountResponse', note?: number | null, account?: number | null, media?: number | null } | null } | null };

export type GptTitleParseQueryVariables = Exact<{
  input: QueryInput;
}>;


export type GptTitleParseQuery = { __typename?: 'Query', gptTitleParse: { __typename?: 'TitleResponse', title: string, year?: number | null, mediaTokens: number, additionalMediaTokens: number } };

export type WikiMediaParseQueryVariables = Exact<{
  input: QueryInput;
}>;


export type WikiMediaParseQuery = { __typename?: 'Query', wikiMediaParse: { __typename?: 'MediaParseResponse', mediaTokens: number, additionalMediaTokens: number, media: { __typename?: 'BookParseResponse', bookType?: BookEnum | null, title?: string | null, author?: Array<string> | null, year?: number | null, country?: string | null, description?: string | null, language?: string | null, pages?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'ComicsParseResponse', comicsType?: ComicsEnum | null, title?: string | null, author?: Array<string> | null, startYear?: number | null, endYear?: number | null, country?: string | null, description?: string | null, language?: string | null, volumes?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'FilmParseResponse', filmType?: FilmEnum | null, title?: string | null, year?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, starring?: Array<string> | null, runTime?: string | null, boxOffice?: string | null, budget?: string | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'SeriesParseResponse', seriesType?: SeriesEnum | null, title?: string | null, startYear?: number | null, endYear?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null, seasons?: Array<{ __typename?: 'SeriesSeasonResponse', season?: number | null, title?: string | null, episodes?: number | null }> | null } } };

export type ImageParseQueryVariables = Exact<{
  input: ImagesInput;
}>;


export type ImageParseQuery = { __typename?: 'Query', imageParse: { __typename?: 'ImagesResponse', links?: Array<string> | null, mediaTokens: number, additionalMediaTokens: number } };

export type GptMediaParseQueryVariables = Exact<{
  input: GptInput;
}>;


export type GptMediaParseQuery = { __typename?: 'Query', gptMediaParse: { __typename?: 'MediaParseResponse', mediaTokens: number, additionalMediaTokens: number, media: { __typename?: 'BookParseResponse', bookType?: BookEnum | null, title?: string | null, author?: Array<string> | null, year?: number | null, country?: string | null, description?: string | null, language?: string | null, pages?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'ComicsParseResponse', comicsType?: ComicsEnum | null, title?: string | null, author?: Array<string> | null, startYear?: number | null, endYear?: number | null, country?: string | null, description?: string | null, language?: string | null, volumes?: number | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'FilmParseResponse', filmType?: FilmEnum | null, title?: string | null, year?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, starring?: Array<string> | null, runTime?: string | null, boxOffice?: string | null, budget?: string | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } | { __typename?: 'SeriesParseResponse', seriesType?: SeriesEnum | null, title?: string | null, startYear?: number | null, endYear?: number | null, country?: string | null, plot?: string | null, language?: string | null, directedBy?: Array<string> | null, genres?: Array<string> | null, tags?: Array<string> | null, image?: string | null } } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'SuccessResponse', success: boolean } };

export type SetAllWatchedNotificationsMutationVariables = Exact<{ [key: string]: never; }>;


export type SetAllWatchedNotificationsMutation = { __typename?: 'Mutation', setAllWatchedNotifications: { __typename?: 'SuccessResponse', success: boolean } };

export type GetUserNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserNotificationsQuery = { __typename?: 'Query', getUserNotifications: Array<{ __typename?: 'NotificationResponse', id: string, type: NotificationEnum, notification?: string | null, isWatched?: boolean | null, createdAt?: any | null, follower?: { __typename?: 'Follower', id?: string | null, name?: string | null, picture?: string | null, follow?: boolean | null } | null }> };


export const AddRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddRoleUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addRoleUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddRoleMutation, AddRoleMutationVariables>;
export const UnbanUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unbanUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unbanUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UnbanUserMutation, UnbanUserMutationVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"canSendReport"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Registration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegistrationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registrationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RegistrationMutation, RegistrationMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"forgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ActivateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"activate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"link"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ActivateMutation, ActivateMutationVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const DownloadFileByLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"downloadFileByLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadFileByLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]} as unknown as DocumentNode<DownloadFileByLinkQuery, DownloadFileByLinkQueryVariables>;
export const GetUserFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]} as unknown as DocumentNode<GetUserFollowersQuery, GetUserFollowersQueryVariables>;
export const GetUserFollowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserFollows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserFollows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}}]}}]} as unknown as DocumentNode<GetUserFollowsQuery, GetUserFollowsQueryVariables>;
export const RemoveFollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeFollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveFollowMutation, RemoveFollowMutationVariables>;
export const AddFollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addFollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddFollowMutation, AddFollowMutationVariables>;
export const GetFollowInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFollowInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetFollowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getFollowInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"filmCount"}},{"kind":"Field","name":{"kind":"Name","value":"seriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"comicsCount"}},{"kind":"Field","name":{"kind":"Name","value":"bookCount"}},{"kind":"Field","name":{"kind":"Name","value":"follow"}}]}}]}}]} as unknown as DocumentNode<GetFollowInfoQuery, GetFollowInfoQueryVariables>;
export const GetProfileInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProfileInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProfileInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"mediaStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"films"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"movie"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"graphicNovel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"manga"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"manhwa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"all"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fiction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nonFiction"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allCount"}},{"kind":"Field","name":{"kind":"Name","value":"completedCount"}},{"kind":"Field","name":{"kind":"Name","value":"plannedCount"}},{"kind":"Field","name":{"kind":"Name","value":"abandonedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pausedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewingCount"}},{"kind":"Field","name":{"kind":"Name","value":"averageRating"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetProfileInfoQuery, GetProfileInfoQueryVariables>;
export const DeleteMediaFromCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMediaFromCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMediaFromCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mediaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteMediaFromCollectionMutation, DeleteMediaFromCollectionMutationVariables>;
export const GetFollowsMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFollowsMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetFollowsMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowsMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getFollowsMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"changed"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowsMediaQuery, GetFollowsMediaQueryVariables>;
export const GetNearMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getNearMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetNearestMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNearMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getNearestMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<GetNearMediaQuery, GetNearMediaQueryVariables>;
export const EmbeddingSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"embeddingSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmbeddingSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"embeddingSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"embeddingSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<EmbeddingSearchQuery, EmbeddingSearchQueryVariables>;
export const GetGenresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGenres"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetGenresInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGenres"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getGenresInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genres"}}]}}]}}]} as unknown as DocumentNode<GetGenresQuery, GetGenresQueryVariables>;
export const UpdateUserMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUserMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMediaMutation, UpdateUserMediaMutationVariables>;
export const AddMediaToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addMediaToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMediaToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddMediaToUserMutation, AddMediaToUserMutationVariables>;
export const AddReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addReportInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddReportMutation, AddReportMutationVariables>;
export const GetRandomMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRandomMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetRandomMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRandomMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getRandomMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<GetRandomMediaQuery, GetRandomMediaQueryVariables>;
export const GetUserMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getUserMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmMediaResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesMediaResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsMediaResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookMediaResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserMediaQuery, GetUserMediaQueryVariables>;
export const GetMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmMediaResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"starring"}},{"kind":"Field","name":{"kind":"Name","value":"runTime"}},{"kind":"Field","name":{"kind":"Name","value":"boxOffice"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesMediaResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsMediaResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"volumes"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookMediaResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"watched"}}]}}]}}]}}]} as unknown as DocumentNode<GetMediaQuery, GetMediaQueryVariables>;
export const SearchMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookSearchResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"inUserMedia"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<SearchMediaQuery, SearchMediaQueryVariables>;
export const CreateMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<CreateMediaMutation, CreateMediaMutationVariables>;
export const DeleteReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reportId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteReportMutation, DeleteReportMutationVariables>;
export const BanUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"banUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BanUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"banUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BanUserMutation, BanUserMutationVariables>;
export const BanReportsUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"banReportsUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banReportsUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BanReportsUserMutation, BanReportsUserMutationVariables>;
export const AcceptWarningDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"acceptWarning"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WarningInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptWarning"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"warningInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AcceptWarningMutation, AcceptWarningMutationVariables>;
export const GetModerEditMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getModerEditMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetModerEditMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getModerEditMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getModerEditMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"starring"}},{"kind":"Field","name":{"kind":"Name","value":"runTime"}},{"kind":"Field","name":{"kind":"Name","value":"boxOffice"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesModerResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"volumes"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]} as unknown as DocumentNode<GetModerEditMediaQuery, GetModerEditMediaQueryVariables>;
export const AcceptModerMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"acceptModerMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AcceptModerMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptModerMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acceptModerMediaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AcceptModerMediaMutation, AcceptModerMediaMutationVariables>;
export const GetModerReportNoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getModerReportNote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getModerReportNote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportId"}},{"kind":"Field","name":{"kind":"Name","value":"mediaId"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"reportedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"canSendReport"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"informerUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"canSendReport"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<GetModerReportNoteQuery, GetModerReportNoteQueryVariables>;
export const GetModerReportAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getModerReportAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getModerReportAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportId"}},{"kind":"Field","name":{"kind":"Name","value":"reportedUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"canSendReport"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"informerUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"canSendReport"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]}}]} as unknown as DocumentNode<GetModerReportAccountQuery, GetModerReportAccountQueryVariables>;
export const GetModerReportMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getModerReportMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getModerReportMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"reportId"}},{"kind":"Field","name":{"kind":"Name","value":"createdType"}},{"kind":"Field","name":{"kind":"Name","value":"informer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"canSendReport"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"canSendReport"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"starring"}},{"kind":"Field","name":{"kind":"Name","value":"runTime"}},{"kind":"Field","name":{"kind":"Name","value":"boxOffice"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesModerResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"volumes"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetModerReportMediaQuery, GetModerReportMediaQueryVariables>;
export const GetModerMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getModerMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getModerMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"report"}},{"kind":"Field","name":{"kind":"Name","value":"createdType"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"warnings"}},{"kind":"Field","name":{"kind":"Name","value":"canSendReport"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"starring"}},{"kind":"Field","name":{"kind":"Name","value":"runTime"}},{"kind":"Field","name":{"kind":"Name","value":"boxOffice"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesModerResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"volumes"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookBaseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetModerMediaQuery, GetModerMediaQueryVariables>;
export const GetModerMediaCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getModerMediaCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getModerMediaCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reportsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"account"}},{"kind":"Field","name":{"kind":"Name","value":"media"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}}]}}]}}]} as unknown as DocumentNode<GetModerMediaCountQuery, GetModerMediaCountQueryVariables>;
export const GptTitleParseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gptTitleParse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gptTitleParse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"mediaTokens"}},{"kind":"Field","name":{"kind":"Name","value":"additionalMediaTokens"}}]}}]}}]} as unknown as DocumentNode<GptTitleParseQuery, GptTitleParseQueryVariables>;
export const WikiMediaParseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"wikiMediaParse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wikiMediaParse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaTokens"}},{"kind":"Field","name":{"kind":"Name","value":"additionalMediaTokens"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmParseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"starring"}},{"kind":"Field","name":{"kind":"Name","value":"runTime"}},{"kind":"Field","name":{"kind":"Name","value":"boxOffice"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesParseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsParseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"volumes"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookParseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<WikiMediaParseQuery, WikiMediaParseQueryVariables>;
export const ImageParseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"imageParse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImagesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imageParse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"imagesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"}},{"kind":"Field","name":{"kind":"Name","value":"mediaTokens"}},{"kind":"Field","name":{"kind":"Name","value":"additionalMediaTokens"}}]}}]}}]} as unknown as DocumentNode<ImageParseQuery, ImageParseQueryVariables>;
export const GptMediaParseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gptMediaParse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GptInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gptMediaParse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gptInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaTokens"}},{"kind":"Field","name":{"kind":"Name","value":"additionalMediaTokens"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FilmParseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filmType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"starring"}},{"kind":"Field","name":{"kind":"Name","value":"runTime"}},{"kind":"Field","name":{"kind":"Name","value":"boxOffice"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesParseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seriesType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"plot"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"directedBy"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComicsParseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comicsType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"startYear"}},{"kind":"Field","name":{"kind":"Name","value":"endYear"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"volumes"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BookParseResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookType"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GptMediaParseQuery, GptMediaParseQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const SetAllWatchedNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setAllWatchedNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setAllWatchedNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SetAllWatchedNotificationsMutation, SetAllWatchedNotificationsMutationVariables>;
export const GetUserNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserNotifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"notification"}},{"kind":"Field","name":{"kind":"Name","value":"isWatched"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"follow"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserNotificationsQuery, GetUserNotificationsQueryVariables>;