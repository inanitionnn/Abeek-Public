import { MediaEnum } from 'src/shared/enums';

export class Promts {
  static getSearchTitlePrompt(mediaType: MediaEnum): string {
    return `You have to guess the ${mediaType} and respond only with json filled with information in English. Fields: title string, year number`;
  }

  static getPlotPromt(mediaType: MediaEnum): string {
    return `As briefly as possible, without spoilers and introductions, paraphrase the description of the ${
      mediaType === 'film'
        ? 'film plot'
        : mediaType === 'series'
        ? 'series plot'
        : mediaType === 'book'
        ? 'book'
        : mediaType === 'comics'
        ? 'comics'
        : ''
    } that the user will give you`;
  }

  static readonly StartJSONPromt = `You're a knowledgeable geek. Your job is to fill in the data about different media perfectly. Fill in the json with information in English, based on user query and your data. If you don't find something write null. Json fields:`;

  static readonly StartParsePromt =
    "You're a knowledgeable geek. Your job is to fill in the data about different media perfectly. Reply only json file filled with data in english. If you don't find something write null. If unable to find data return {}. Json file has only the following fields:";

  static readonly SeriesJsonPromt = `seriesType string field can be Anime or Animated or TV
  title string field
  startYear number field
  endYear number field
  plot string field as briefly as possible without spoilers and an introduction, only the plot
  country  string field
  directedBy array of strings
  language string field
  seasons array of objects field [{
    season number field
    episodes number field
    title string field
    }]
  genres array of string field
  tags array of string field`;

  static readonly SeriesPromts = {
    seriesType: 'seriesType string field can be Anime or Animated or TV',
    title: 'title string field',
    startYear: 'startYear number field',
    endYear: 'endYear number field',
    plot: 'plot string field as briefly as possible without spoilers and an introduction, only the plot',
    country: 'country string field',
    directedBy: 'directedBy array of strings',
    language: 'language string field',
    genres: 'genres array of string field',
    tags: 'tags array of string field',
  };

  static readonly FilmJsonPromts = `filmType string field can be Anime or Animated or Movie
  title string field
  year number field
  plot string field as briefly as possible without spoilers and an introduction, only the plot
  runTime string field is time movie runs in "*h *m" format
  budget string field is films budget in "$* million" format
  boxOffice string field is money that film collected in the "$* million" format
  country  string field
  directedBy array of string field
  starring array of string field
  language string field
  genres array of string field
  tags array of string field`;

  static readonly FilmPromts = {
    filmType: 'filmType string field can be Anime or Animated or Movie',
    title: 'title string field',
    year: 'year number field',
    plot: 'plot string field as briefly as possible without spoilers and an introduction, only the plot',
    runTime: 'runTime string field is time movie runs in "*h *m" format',
    budget: 'budget string field is films budget in "$* million" format',
    boxOffice:
      'boxOffice string field is money that film collected in the "$* million" format',
    country: 'country  string field',
    directedBy: 'directedBy array of string field',
    starring: 'starring array of string field',
    language: 'language string field',
    genres: 'genres array of string field',
    tags: 'tags array of string field',
  };

  static readonly BookJsonPromts = `bookType string field can be Fiction or NonFiction
  title string field
  author array of string field
  country  string field
  year number field
  description string field as briefly as possible without spoilers and an introduction
  language string field
  pages number field
  genres array of string field
  tags array of string field`;

  static readonly BookPromts = {
    bookType: 'bookType string field can be Fiction or NonFiction',
    title: 'title string field',
    author: 'author array of string field',
    country: 'country  string field',
    year: 'year number field',
    description:
      'description string field as briefly as possible without spoilers and an introduction',
    language: 'language string field',
    pages: 'pages number field',
    genres: 'genres array of string field',
    tags: 'tags array of string field',
  };

  static readonly ComicsJsonPromts = `comicsType string field can be Comics or GraphicNovel or Manga of Manhwa
  title string field
  startYear number field
  endYear number field
  description string field as briefly as possible without spoilers and an introduction
  country  string field
  author array of string field
  language string field
  volumes number field
  genres array of string field
  tags array of string field`;

  static readonly ComicsPromts = {
    comicsType:
      'comicsType string field can be Comics or GraphicNovel or Manga of Manhwa',
    title: 'title string field',
    startYear: 'startYear number field',
    endYear: 'endYear number field',
    description:
      'description string field as briefly as possible without spoilers and an introduction',
    country: 'country  string field',
    author: 'author array of string field',
    language: 'language string field',
    volumes: 'volumes number field',
    genres: 'genres array of string field',
    tags: 'tags array of string field',
  };
}
