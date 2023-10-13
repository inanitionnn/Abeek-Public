import { registerEnumType } from '@nestjs/graphql';

export enum RolesEnum {
  User = 'u',
  Moder = 'm',
  Admin = 'a',
}
registerEnumType(RolesEnum, {
  name: 'RolesEnum',
});
export enum WatchedEnum {
  reviewing = 'revi',
  viewing = 'view',
  rated = 'rate',
  completed = 'comp',
  abandoned = 'aban',
  paused = 'paus',
  planned = 'plan',
}
registerEnumType(WatchedEnum, {
  name: 'WatchedEnum',
});

export enum SeriesEnum {
  animated = 'Animated',
  anime = 'Anime',
  tv = 'TV',
}
registerEnumType(SeriesEnum, {
  name: 'SeriesEnum',
});

export enum FilmEnum {
  animated = 'Animated',
  anime = 'Anime',
  movie = 'Movie',
}
registerEnumType(FilmEnum, {
  name: 'FilmEnum',
});

export enum BookEnum {
  fiction = 'Fiction',
  nonFiction = 'NonFiction',
}
registerEnumType(BookEnum, {
  name: 'BookEnum',
});

export enum ComicsEnum {
  comics = 'Comics',
  graphicNovel = 'GraphicNovel',
  manga = 'Manga',
  manhwa = 'Manhwa',
}
registerEnumType(ComicsEnum, {
  name: 'ComicsEnum',
});

export enum MediaEnum {
  film = 'film',
  series = 'series',
  book = 'book',
  comics = 'comics',
}
registerEnumType(MediaEnum, {
  name: 'MediaEnum',
});

export enum CreatedEnum {
  gpt = 'gpt',
  wiki = 'wiki',
  text = 'text',
  self = 'self',
}
registerEnumType(CreatedEnum, {
  name: 'CreatedEnum',
});

export enum FoldersEnum {
  trashCan = 'trashCan',
  users = 'users',
  films = 'films',
  series = 'series',
  comics = 'comics',
  books = 'books',
}

export enum SortedEnum {
  rateDesc = 'rateDesc',
  rateAsc = 'rateAsc',
  yearDesc = 'yearDesc',
  yearAsc = 'yearAsc',
  titleDesc = 'titleDesc',
  titleAsc = 'titleAsc',
  dateAsc = 'dateAsc',
  dateDesc = 'dateDesc',
}

registerEnumType(SortedEnum, {
  name: 'SortedEnum',
});

export enum ChangedEnum {
  AddToCollection = 'coll',
  changeWatchType = 'watc',
  changeRate = 'rate',
  changeNote = 'note',
}
registerEnumType(ChangedEnum, {
  name: 'ChangedEnum',
});

export enum NotificationEnum {
  tokens = 'toke',
  newRole = 'role',
  follow = 'foll',
  unfollow = 'unf',
  base = 'base',
  update = 'upd',
  warning = 'warn',
  ban = 'ban',
}
registerEnumType(NotificationEnum, {
  name: 'NotificationEnum',
});

export enum ReportEnum {
  account = 'acco',
  note = 'note',
  media = 'medi',
}
registerEnumType(ReportEnum, {
  name: 'ReportEnum',
});

export enum WarningEnum {
  spam = 'spam',
  violence = 'viol',
  pornography = 'porn',
  copyright = 'copy',
}
registerEnumType(WarningEnum, {
  name: 'WarningEnum',
});

export enum WarningObjectEnum {
  accountImage = 'accountImage',
  accountNote = 'accountNote',
  accountName = 'accountName',
  mediaNote = 'mediaNote',
  media = 'media',
  report = 'report',
}
registerEnumType(WarningObjectEnum, {
  name: 'WarningObjectEnum',
});
