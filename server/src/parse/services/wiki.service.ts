import { Injectable, Logger } from '@nestjs/common';
import { Genres } from '../constants';

import wtf from 'wtf_wikipedia';
import wtfSummary from 'wtf-plugin-summary';
import wtfClassify from 'wtf-plugin-classify';
import {
  BookParseResponse,
  ComicsParseResponse,
  FilmParseResponse,
  SeriesParseResponse,
} from 'src/shared/dto';
import { BadRequestError, NotFoundError } from 'src/shared/errors';
import {
  BookEnum,
  ComicsEnum,
  FilmEnum,
  MediaEnum,
  SeriesEnum,
} from 'src/shared/enums';
wtf.extend(wtfSummary);
wtf.extend(wtfClassify);

@Injectable()
export class WikiService {
  private readonly logger = new Logger(WikiService.name);

  // Throw error if query is not english wiki link
  private isEngWikiLinkError(link: string): void {
    const regex = /^(https?:\/\/)?en\.wikipedia\.org\/wiki\/.+$/;
    const isNotEngWikiLink = !regex.test(link.trim());
    if (isNotEngWikiLink) {
      this.logger.warn('This is not link to english wikipedia page');
      this.logger.debug(`Invalid link: (${link})`);
      throw new BadRequestError('This is not link to english wikipedia page');
    }
  }

  private async getPlot(data: any): Promise<string | null> {
    let plotSection = data.section('Plot');
    if (!plotSection) {
      plotSection = data.section('Plot summary');
    }
    if (!plotSection) {
      plotSection = data.section('Overview');
    }
    if (!plotSection) {
      plotSection = data.section('Summary');
    }
    if (!plotSection) {
      plotSection = data.section('Synopsis');
    }
    if (!plotSection) {
      plotSection = data.section('Premise');
    }
    if (!plotSection) {
      plotSection = data.sections()[0];
    }
    if (!plotSection) return null;
    const paragraphs = plotSection.paragraphs();
    if (paragraphs[0]) {
      return paragraphs[0].text();
    } else if (paragraphs[1]) {
      return paragraphs[1].text();
    } else {
      return null;
    }
  }

  // Get genres, tags and types
  private async getGenresAndType(
    wikiTags: any,
  ): Promise<{ genres: string[]; tags: string[]; types: string[] }> {
    const allGenres = Genres.GENRES;
    const allSubGenres = Genres.SUB_GENRES;
    const allAnimeGenres = Genres.ALL_ANIME_GENRES;
    const allKeywords = Genres.ALL_TAGS;
    const allBookGenres = Genres.ALL_BOOK_GENRES;
    const allTypes = Genres.ALL_TYPES;
    const allSeriesGenres = Genres.ALL_SERIES_GENRES;
    const mediaGenres = [
      ...allGenres,
      ...allSubGenres,
      ...allBookGenres,
      ...allSeriesGenres,
      ...allAnimeGenres,
    ].filter((genre) => {
      const regex = new RegExp(
        `(\\b${genre}*(es|s?)\\b)|(\\b${genre}*(?:y|ies)\\b)`,
        'i',
      );
      return wikiTags.some((tag) => regex.test(tag));
    });

    const dublicatedMediaGenres = allGenres.filter((genre) => {
      const regex = new RegExp(`.${genre}|${genre}.`, 'i');
      return mediaGenres.some((genre) => regex.test(genre));
    });

    // clear from 'noir' when have 'neo-noir
    const genres = mediaGenres.filter(
      (genre) => !dublicatedMediaGenres.includes(genre),
    );

    const tags = allKeywords.filter((tag) => {
      const regex = new RegExp(
        `(\\b${tag}*(es|s?)\\b)|(\\b${tag}*(?:y|ies)\\b)`,
        'i',
      );
      return wikiTags.some((tag) => regex.test(tag));
    });

    const types = allTypes.filter((type) => {
      const regex = new RegExp(
        `(\\b${type}*(es|s?)\\b)|(\\b${type}*(?:y|ies)\\b)`,
        'i',
      );
      return wikiTags.some((tag) => regex.test(tag));
    });
    return { genres: genres, tags: tags, types: types };
  }

  private async getRangeYear(
    infobox: any,
    data: any,
  ): Promise<{ startYear: number | null; endYear: number | null }> {
    const regex = new RegExp(`\\b\\d{4}\\b`, 'g');
    let startYear: number | null = null;
    let endYear: number | null = null;
    const firstSection = data.section();
    if (firstSection) {
      const match = firstSection.text().match(regex);
      startYear = match ? parseInt(match[0]) : null;
    }

    if (!infobox) {
      return { startYear: startYear, endYear: endYear };
    }
    const { first, first_aired, last_aired, last, date, startyr, endyr } =
      infobox.json();

    if (first) {
      const match = first.text.match(regex);
      startYear = match ? parseInt(match[0]) : null;
    }
    if (first_aired) {
      const match = first_aired.text.match(regex);
      startYear = match ? parseInt(match[0]) : null;
    }
    if (last) {
      const match = last.text.match(regex);
      endYear = match ? parseInt(match[0]) : null;
    }
    if (last_aired) {
      const match = last_aired.text.match(regex);
      endYear = match ? parseInt(match[0]) : null;
    }
    if (date) {
      const match = date.text.match(regex);
      startYear = match ? parseInt(match[0]) : null;
      endYear = match ? parseInt(match[1]) : null;
    }
    if (startyr) {
      startYear = startyr.number;
    }
    if (endyr) {
      endYear = endyr.number;
    }
    return { startYear: startYear, endYear: endYear };
  }

  // checks if it is a media page
  private cheackSummary(data: any): boolean {
    let summaryData = '';
    try {
      summaryData = data.summary();
    } catch (err) {
      return false;
    }
    const summary = summaryData.toLowerCase();

    if (summary.includes('media franchise')) {
      return true;
    }

    const allBookGenres = Genres.ALL_BOOK_GENRES;
    for (let i = 0; i < allBookGenres.length; i++) {
      if (summary.includes(allBookGenres[i])) {
        return true;
      }
    }
    const allTypes = Genres.ALL_TYPES;
    for (let i = 0; i < allTypes.length; i++) {
      if (summary.includes(allTypes[i])) {
        return true;
      }
    }
    const allGenres = Genres.GENRES;
    for (let i = 0; i < allGenres.length; i++) {
      if (summary.includes(allGenres[i])) {
        return true;
      }
    }
    const allAnimeGenres = Genres.ALL_ANIME_GENRES;
    for (let i = 0; i < allAnimeGenres.length; i++) {
      if (summary.includes(allAnimeGenres[i])) {
        return true;
      }
    }

    return false;
  }

  // checks if it is a media page
  private cheackClassify(data: any): boolean {
    let classifyData: any;
    try {
      classifyData = data.classify();
    } catch (err) {
      return false;
    }
    const obj = classifyData?.details;

    if (!obj) {
      return false;
    }
    if (obj.hasOwnProperty('infobox') && Array.isArray(obj.infobox)) {
      for (const item of obj.infobox) {
        if (item.hasOwnProperty('type')) {
          if (
            item.type === '/Creation/CreativeWork/Film' ||
            item.type === '/Creation/CreativeWork/Book' ||
            item.type === '/Creation/CreativeWork/TVShow'
          )
            return true;
        }
      }
    }

    if (obj.hasOwnProperty('template') && Array.isArray(obj.template)) {
      for (const item of obj.template) {
        if (item.hasOwnProperty('type')) {
          if (
            item.type === '/Creation/CreativeWork/Film' ||
            item.type === '/Creation/CreativeWork/Book' ||
            item.type === '/Creation/CreativeWork/TVShow'
          )
            return true;
        }
      }
    }

    if (obj.hasOwnProperty('section') && Array.isArray(obj.section)) {
      for (const item of obj.section) {
        if (item.hasOwnProperty('type')) {
          if (
            item.type === '/Creation/CreativeWork/Film' ||
            item.type === '/Creation/CreativeWork/Book' ||
            item.type === '/Creation/CreativeWork/TVShow'
          )
            return true;
        }
      }
    }

    if (obj.hasOwnProperty('title') && Array.isArray(obj.title)) {
      for (const item of obj.title) {
        if (item.hasOwnProperty('type')) {
          if (
            item.type === '/Creation/CreativeWork/Film' ||
            item.type === '/Creation/CreativeWork/Book' ||
            item.type === '/Creation/CreativeWork/TVShow'
          )
            return true;
        }
      }
    }

    if (obj.hasOwnProperty('description') && Array.isArray(obj.description)) {
      for (const item of obj.description) {
        if (item.hasOwnProperty('type')) {
          if (
            item.type === '/Creation/CreativeWork/Film' ||
            item.type === '/Creation/CreativeWork/Book' ||
            item.type === '/Creation/CreativeWork/TVShow'
          )
            return true;
        }
      }
    }

    if (obj.hasOwnProperty('category') && Array.isArray(obj.category)) {
      for (const item of obj.category) {
        if (item.hasOwnProperty('type')) {
          if (
            item.type === '/Creation/CreativeWork/Film' ||
            item.type === '/Creation/CreativeWork/Book' ||
            item.type === '/Creation/CreativeWork/TVShow'
          )
            return true;
        }
      }
    }

    return false;
  }

  private getFilmType(types: any): FilmEnum {
    if (types.includes('anime')) {
      return FilmEnum.anime;
    } else if (types.includes('animated') || types.includes('cartoon')) {
      return FilmEnum.animated;
    } else {
      return FilmEnum.movie;
    }
  }

  public async filmParse(link: string): Promise<FilmParseResponse> {
    this.logger.log(`Parse wiki film by url (start)`);

    this.isEngWikiLinkError(link);
    const data: any | null = await wtf.fetch(link);
    if (!data) {
      this.logger.warn('Film not found (no data)');
      throw new NotFoundError('Film not found');
    }
    if (!this.cheackSummary(data)) {
      if (!this.cheackClassify(data)) {
        this.logger.warn('Film not found (summary and classify)');
        throw new NotFoundError('Film not found');
      }
    }
    let filmImage = '';
    if (data.image()) {
      filmImage = data.image().json().url;
    }

    const filmPlot = await this.getPlot(data);

    const filmCategories: string[] = data.categories();
    const {
      genres: filmGenres,
      tags: filmTags,
      types: filmTypes,
    } = await this.getGenresAndType(filmCategories);
    const filmType = this.getFilmType(filmTypes);
    const infobox = data.infobox();
    const { startYear } = await this.getRangeYear(infobox, data);
    let filmTitle: string = data.title();
    let filmDirectedBy: string[] = [];
    let filmRunTime = '';
    let filmStarring: string[] = [];
    let filmCountry = '';
    let filmLanguage = '';
    let filmBudget = '';
    let filmBoxOffice = '';
    if (infobox) {
      const {
        name,
        director,
        runtime,
        starring,
        country,
        language,
        budget,
        gross,
      } = infobox.json();

      if (name) filmTitle = name.text;

      if (director) {
        const textRegex = /\([^)]*\)/g;
        const text = director.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          filmDirectedBy = newText.split('\n\n');
        } else if (newText.includes('\n')) {
          filmDirectedBy = newText.split('\n');
        } else {
          filmDirectedBy = [newText];
        }
      }

      if (starring) {
        const textRegex = /\([^)]*\)/g;
        const text = starring.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          filmStarring = newText.split('\n\n');
        } else if (newText.includes('\n')) {
          filmStarring = newText.split('\n');
        } else {
          filmStarring = [newText];
        }
      }

      if (runtime) {
        const minutes = parseInt(runtime.text.split(' ')[0]);
        filmRunTime = `${(minutes / 60) >> 0}h ${minutes % 60}m`;
      }

      if (filmType === FilmEnum.anime) {
        (filmCountry = 'Japan'), (filmLanguage = 'Japanese');
      }

      if (country) {
        const text = country.text;
        if (text.includes('\n\n')) {
          filmCountry = text.split('\n\n')[0];
        } else if (text.includes('\n')) {
          filmCountry = text.split('\n')[0];
        } else if (text.includes('(')) {
          filmCountry = text.split('(')[0];
        } else {
          filmCountry = text;
        }
      }
      if (budget) {
        const textRegex = /\([^)]*\)/g;
        const text = budget.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          filmBudget = newText.split('\n\n').join(' ');
        } else if (newText.includes('\n')) {
          filmBudget = newText.split('\n').join(' ');
        } else {
          filmBudget = newText;
        }
      }

      if (gross) {
        const textRegex = /\([^)]*\)/g;
        const text = gross.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          filmBoxOffice = newText.split('\n\n').join(' ');
        } else if (newText.includes('\n')) {
          filmBoxOffice = newText.split('\n').join(' ');
        } else {
          filmBoxOffice = newText;
        }
      }

      if (language) {
        const text = language.text;
        if (text.includes('\n\n')) {
          filmLanguage = text.split('\n\n')[0];
        } else if (text.includes('\n')) {
          filmLanguage = text.split('\n')[0];
        } else if (text.includes('(')) {
          filmLanguage = text.split('(')[0];
        } else {
          filmLanguage = text;
        }
      }
    }
    const film = {
      media: MediaEnum.film,
      filmType: filmType,
      title: filmTitle
        ?.replace(/\n/g, ' ')
        .trim()
        .replace(/\s*\([^)]+\)$/, ''),
      year: startYear,
      plot: filmPlot?.trim(),
      country: filmCountry?.trim(),
      language: filmLanguage?.trim(),
      starring: filmStarring,
      directedBy: filmDirectedBy,
      runTime: filmRunTime,
      budget: filmBudget,
      boxOffice: filmBoxOffice,
      genres: filmGenres,
      tags: filmTags,
      image: filmImage,
    };
    this.logger.log(`Parse wiki film by url (end)`);
    return film;
  }

  private getSeriesType(types: any): SeriesEnum {
    if (types.includes('anime')) {
      return SeriesEnum.anime;
    } else if (types.includes('animated')) {
      return SeriesEnum.animated;
    } else {
      return SeriesEnum.tv;
    }
  }

  // convert the title to a encoded version to create a wiki link
  private urlEncodeTitle(title: string): string {
    const encodedTitle = title.replace(/ /g, '_');
    return encodeURIComponent(encodedTitle);
  }

  private async getSeasons(
    data: any,
  ): Promise<{ id: null; season: number; episodes: number; title: string }[]> {
    let newData = data;

    const listRegrex = /^List(s?) of.*episodes$/;
    const oldtitle = data.title();
    const regex = /\(TV series\)/gi;
    let title = oldtitle.replace(regex, '').trim();
    if (!listRegrex.test(title)) {
      title = this.urlEncodeTitle(`List of ${title} episodes`);
      const link = `https://en.wikipedia.org/wiki/${title}`;
      const res = await wtf.fetch(link);
      if (res) {
        newData = res;
      } else return [];
    }
    const seriesSeasons: {
      [key: number]: { episodes: number; title: string };
    } = {};

    if (newData.section('Series overview')) {
      const seasons = newData
        .section('Series overview')
        .templates()
        .map((temp) => temp.json())
        .filter((obj) => obj.template == 'series overview')[0];
      const episodesRegex = /episodes\d+\b/;
      const titleRegex = /auxa\d+\b/;
      for (const key in seasons) {
        if (episodesRegex.test(key)) {
          seriesSeasons[key.slice(8)] = {
            ...seriesSeasons[key.slice(8)],
            episodes: parseInt(seasons[key]),
          };
        }
        if (titleRegex.test(key)) {
          console.log();
          seriesSeasons[key.slice(4)] = {
            ...seriesSeasons[key.slice(4)],
            title: seasons[key],
          };
        }
      }
    }

    const sections = newData.sections().map((section) => section.json().title);
    const sectionRegex = /Season (\d+):\s+([^()]+)/;
    for (const section of sections) {
      const match = section.match(sectionRegex);
      if (match) {
        const seasonNumber = parseInt(match[1], 10);
        const seasonName = match[2].trim();
        seriesSeasons[seasonNumber] = {
          ...seriesSeasons[seasonNumber],
          title: seasonName,
        };
      }
    }

    const seasonsArray = [];

    for (const seasonNumber in seriesSeasons) {
      if (seriesSeasons.hasOwnProperty(seasonNumber)) {
        seasonsArray.push({
          id: null,
          season: parseInt(seasonNumber),
          episodes: seriesSeasons[seasonNumber].episodes || null,
          title: seriesSeasons[seasonNumber].title || '',
        });
      }
    }
    return seasonsArray;
  }

  public async seriesParse(link: string): Promise<SeriesParseResponse> {
    this.logger.log(`Parse wiki series by url (start)`);
    this.isEngWikiLinkError(link);

    const data: any | null = await wtf.fetch(link);
    if (!data) {
      this.logger.warn('Series not found (no data)');
      throw new NotFoundError('Series not found');
    }

    const seriesSeasons = await this.getSeasons(data);

    if (!this.cheackSummary(data)) {
      if (!this.cheackClassify(data)) {
        this.logger.warn('Series not found (summary and classify)');
        throw new NotFoundError('Series not found');
      }
    }
    let seriesImage: string;
    if (data.image()) {
      seriesImage = data.image().json().url;
    }

    let seriesTitle: string;
    const seriesDataTitle = data.title();

    const seriesDataTitleRegrex = /^List of.*episodes$/;
    if (seriesDataTitleRegrex.test(seriesDataTitle)) {
      const words = seriesDataTitle.split(' ');
      words.splice(0, 2);
      words.splice(-1, 1);
      seriesTitle = words.join(' ');
    } else {
      seriesTitle = seriesDataTitle;
    }

    const seriesPlot = await this.getPlot(data);

    const seriesCategories: string[] = data.categories();
    const {
      genres: seriesGenres,
      tags: seriesTags,
      types: seriesTypes,
    } = await this.getGenresAndType(seriesCategories);
    const seriesType = this.getSeriesType(seriesTypes);

    const infobox = data.infobox();
    const { startYear: seriesstartYear, endYear: seriesendYear } =
      await this.getRangeYear(infobox, data);

    let seriesDirectedBy: string[] = [];
    let seriesCountry = '';
    let seriesLanguage = '';
    if (infobox) {
      const { director, country, language } = infobox.json();

      if (seriesType === SeriesEnum.anime) {
        (seriesCountry = 'Japan'), (seriesLanguage = 'Japanese');
      }
      if (director) seriesDirectedBy = director.text.split('\n\n');
      if (country) {
        const text = country.text;
        if (text.includes('\n\n')) {
          seriesCountry = text.split('\n\n')[0];
        } else if (text.includes('\n')) {
          seriesCountry = text.split('\n')[0];
        } else if (text.includes('(')) {
          seriesCountry = text.split('(')[0];
        } else {
          seriesCountry = text;
        }
      }
      if (language) {
        const text = language.text;
        if (text.includes('\n\n')) {
          seriesCountry = text.split('\n\n')[0];
        } else if (text.includes('\n')) {
          seriesCountry = text.split('\n')[0];
        } else if (text.includes('(')) {
          seriesCountry = text.split('(')[0];
        } else {
          seriesCountry = text;
        }
      }
    }
    const series = {
      media: MediaEnum.series,
      seriesType: seriesType,
      title: seriesTitle
        ?.replace(/\n/g, ' ')
        .trim()
        .replace(/\s*\([^)]+\)$/, ''),
      startYear: seriesstartYear,
      endYear: seriesendYear,
      plot: seriesPlot?.trim(),
      country: seriesCountry?.trim(),
      seasons: seriesSeasons,
      language: seriesLanguage?.trim(),
      directedBy: seriesDirectedBy,
      genres: seriesGenres,
      tags: seriesTags,
      image: seriesImage,
    };
    this.logger.log(`Parse wiki series by url (end)`);
    return series;
  }

  private getBookType(types: any): BookEnum {
    if (types.includes('non-fiction')) {
      return BookEnum.nonFiction;
    } else {
      return BookEnum.fiction;
    }
  }

  public async bookParse(link: string): Promise<BookParseResponse> {
    this.logger.log(`Parse wiki book by url (start)`);
    this.isEngWikiLinkError(link);

    const data: any | null = await wtf.fetch(link);
    if (!data) {
      this.logger.warn('Book not found (no data)');
      throw new NotFoundError('Book not found');
    }

    if (!this.cheackSummary(data)) {
      if (!this.cheackClassify(data)) {
        this.logger.warn('Book not found (summary and classify)');
        throw new NotFoundError('Book not found');
      }
    }
    let bookImage: string;
    if (data.image()) {
      bookImage = data.image().json().url;
    }

    const bookPlot = await this.getPlot(data);

    const bookCategories: string[] = data.categories();
    const {
      genres: bookGenres,
      tags: booktags,
      types: bookTypes,
    } = await this.getGenresAndType(bookCategories);
    const bookType = this.getBookType(bookTypes);

    const infobox = data.infobox();
    let bookTitle: string = data.title();
    let bookAuthor: string[];
    let bookLanguage: string;
    let bookPages: number;
    let bookCountry: string;
    if (infobox) {
      const {
        name,
        title,
        author,
        country,
        writer,
        writers,
        issues,
        language,
        pages,
      } = infobox.json();
      if (name) bookTitle = name.text;
      if (title) bookTitle = title.text;
      if (author) {
        const textRegex = /\([^)]*\)/g;
        const text = author.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          bookAuthor = newText.split('\n\n');
        } else if (newText.includes('\n')) {
          bookAuthor = newText.split('\n');
        } else {
          bookAuthor = [newText];
        }
      }

      if (writer) {
        const textRegex = /\([^)]*\)/g;
        const text = writer.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          bookAuthor = newText.split('\n\n');
        } else if (newText.includes('\n')) {
          bookAuthor = newText.split('\n');
        } else {
          bookAuthor = [newText];
        }
      }

      if (writers) {
        const textRegex = /\([^)]*\)/g;
        const text = writers.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          bookAuthor = newText.split('\n\n');
        } else if (newText.includes('\n')) {
          bookAuthor = newText.split('\n');
        } else {
          bookAuthor = [newText];
        }
      }

      if (issues) {
        bookPages = parseInt(issues.text);
      }
      if (pages) {
        bookPages = parseInt(pages.text.split(',').join(''));
      }
      if (country) {
        const text = country.text;
        if (text.includes('\n\n')) {
          bookCountry = text.split('\n\n')[0];
        } else if (text.includes('\n')) {
          bookCountry = text.split('\n')[0];
        } else if (text.includes('(')) {
          bookCountry = text.split('(')[0];
        } else {
          bookCountry = text;
        }
      }
      if (language) {
        const text = language.text;
        if (text.includes('\n\n')) {
          bookLanguage = text.split('\n\n')[0];
        } else if (text.includes('\n')) {
          bookLanguage = text.split('\n')[0];
        } else if (text.includes('(')) {
          bookLanguage = text.split('(')[0];
        } else {
          bookLanguage = text;
        }
      }
    }
    const { startYear: bookYear } = await this.getRangeYear(infobox, data);
    const book = {
      media: MediaEnum.book,
      bookType: bookType,
      title: bookTitle
        ?.replace(/\n/g, ' ')
        .trim()
        .replace(/\s*\([^)]+\)$/, ''),
      author: bookAuthor,
      year: bookYear,
      description: bookPlot?.trim(),
      country: bookCountry?.trim(),
      pages: bookPages,
      language: bookLanguage?.trim(),
      genres: bookGenres,
      tags: booktags,
      image: bookImage,
    };
    this.logger.log(`Parse wiki book by url (end)`);
    return book;
  }

  private getComicsType(types: any): ComicsEnum {
    if (types.includes('manhwa')) {
      return ComicsEnum.manhwa;
    } else if (types.includes('manga') || types.includes('anime')) {
      return ComicsEnum.manga;
    } else if (types.includes('novel')) {
      return ComicsEnum.graphicNovel;
    } else {
      return ComicsEnum.comics;
    }
  }

  public async comicsParse(link: string): Promise<ComicsParseResponse> {
    this.logger.log(`Parse wiki comics by url (start)`);
    this.isEngWikiLinkError(link);

    const data: any | null = await wtf.fetch(link);
    if (!data) {
      this.logger.warn('Series not found (no data)');
      throw new NotFoundError('Comics not found');
    }

    if (!this.cheackSummary(data)) {
      if (!this.cheackClassify(data)) {
        this.logger.warn('Series not found (summary and classify)');
        throw new NotFoundError('Comics not found');
      }
    }
    let comicsImage: string;
    if (data.image()) {
      comicsImage = data.image().json().url;
    }

    const comicsPlot = await this.getPlot(data);

    const comicsCategories: string[] = data.categories();
    const {
      genres: comicsGenres,
      tags: comicstags,
      types: comicsTypes,
    } = await this.getGenresAndType(comicsCategories);
    const comicsType = this.getComicsType(comicsTypes);

    const infobox = data.infobox();
    let comicsTitle: string = data.title();
    let comicsAuthor: string[];
    let comicsLanguage: string;
    let comicsVolumes: number;
    let comicsCountry: string;

    if (infobox) {
      const {
        name,
        title,
        author,
        country,
        writer,
        writers,
        issues,
        language,
        volumes,
      } = infobox.json();
      if (name) comicsTitle = name.text;
      if (title) comicsTitle = title.text;
      if (author) {
        const textRegex = /\([^)]*\)/g;
        const text = author.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          comicsAuthor = newText.split('\n\n');
        } else if (newText.includes('\n')) {
          comicsAuthor = newText.split('\n');
        } else {
          comicsAuthor = [newText];
        }
      }
      if (writer) {
        const textRegex = /\([^)]*\)/g;
        const text = writer.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          comicsAuthor = newText.split('\n\n');
        } else if (newText.includes('\n')) {
          comicsAuthor = newText.split('\n');
        } else {
          comicsAuthor = [newText];
        }
      }
      if (writers) {
        const textRegex = /\([^)]*\)/g;
        const text = writers.text;
        const newText = text.replace(textRegex, '');
        if (newText.includes('\n\n')) {
          comicsAuthor = newText.split('\n\n');
        } else if (newText.includes('\n')) {
          comicsAuthor = newText.split('\n');
        } else {
          comicsAuthor = [newText];
        }
      }
      if (issues) {
        comicsVolumes = parseInt(issues.text.match(/\d+/g)[0]);
      }
      if (volumes) {
        comicsVolumes = parseInt(volumes.text.match(/\d+/g)[0]);
      }
      if (country) {
        const text = country.text;
        if (text.includes('\n\n')) {
          comicsCountry = text.split('\n\n')[0];
        } else if (text.includes('\n')) {
          comicsCountry = text.split('\n')[0];
        } else if (text.includes('(')) {
          comicsCountry = text.split('(')[0];
        } else {
          comicsCountry = text;
        }
      }
      if (language) {
        const text = language.text;
        if (text.includes('\n\n')) {
          comicsLanguage = text.split('\n\n')[0];
        } else if (text.includes('\n')) {
          comicsLanguage = text.split('\n')[0];
        } else if (text.includes('(')) {
          comicsLanguage = text.split('(')[0];
        } else {
          comicsLanguage = text;
        }
      }
    }
    const comicsTitleRegrex = /^List of.*volumes$/;
    if (comicsTitleRegrex.test(comicsTitle)) {
      const words = comicsTitle.split(' ');
      words.splice(0, 2);
      words.splice(-1, 1);
      comicsTitle = words.join(' ');
    }
    const { startYear: comicsstartYear, endYear: comicsendYear } =
      await this.getRangeYear(infobox, data);
    const comics = {
      media: MediaEnum.comics,
      type: comicsType,
      title: comicsTitle
        ?.replace(/\n/g, ' ')
        .trim()
        .replace(/\s*\([^)]+\)$/, ''),
      author: comicsAuthor,
      startYear: comicsstartYear,
      endYear: comicsendYear,
      description: comicsPlot?.trim(),
      country: comicsCountry?.trim(),
      volumes: comicsVolumes,
      language: comicsLanguage?.trim(),
      genres: comicsGenres,
      tags: comicstags,
      image: comicsImage,
    };
    this.logger.log(`Parse wiki comics by url (end)`);
    return comics;
  }
}
