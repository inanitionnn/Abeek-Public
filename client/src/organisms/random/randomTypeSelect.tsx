import {
  BookEnum,
  ComicsEnum,
  FilmEnum,
  MediaEnum,
  SeriesEnum,
} from "../../graphql/__generated__/graphql";
import MySelect from "../../atom/mySelect";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setBookTypeState,
  setComicsTypeState,
  setFilmTypeState,
  setSeriesTypeState,
} from "../../redux/reducers/typesSlice";

const RandomTypeSelect = memo(() => {
  const dispatch = useAppDispatch();
  const { mediaType, bookType, comicsType, filmType, seriesType } =
    useAppSelector((state) => state.types);

  const handleChangeFilm = (type: FilmEnum | "") => {
    if (type) {
      dispatch(setFilmTypeState(type));
    } else {
      dispatch(setFilmTypeState(null));
    }
  };

  const handleChangeSeries = (type: SeriesEnum | "") => {
    if (type) {
      dispatch(setSeriesTypeState(type));
    } else {
      dispatch(setSeriesTypeState(null));
    }
  };

  const handleChangeComics = (type: ComicsEnum | "") => {
    if (type) {
      dispatch(setComicsTypeState(type));
    } else {
      dispatch(setComicsTypeState(null));
    }
  };

  const handleChangeBook = (type: BookEnum | "") => {
    if (type) {
      dispatch(setBookTypeState(type));
    } else {
      dispatch(setBookTypeState(null));
    }
  };
  return (
    <>
      {mediaType === MediaEnum.Film && (
        <MySelect
          value={filmType || ""}
          onChange={(event) =>
            handleChangeFilm(event.target.value as FilmEnum | "")
          }
        >
          <option value={""}>All</option>
          <option value={FilmEnum.Animated}>Animated</option>
          <option value={FilmEnum.Anime}>Anime</option>
          <option value={FilmEnum.Movie}>Movie</option>
        </MySelect>
      )}
      {mediaType === MediaEnum.Series && (
        <MySelect
          value={seriesType || ""}
          onChange={(event) =>
            handleChangeSeries(event.target.value as SeriesEnum | "")
          }
        >
          <option value={""}>All</option>
          <option value={SeriesEnum.Animated}>Animated</option>
          <option value={SeriesEnum.Anime}>Anime</option>
          <option value={SeriesEnum.Tv}>Tv</option>
        </MySelect>
      )}
      {mediaType === MediaEnum.Comics && (
        <MySelect
          value={comicsType || ""}
          onChange={(event) =>
            handleChangeComics(event.target.value as ComicsEnum | "")
          }
        >
          <option value={""}>All</option>
          <option value={ComicsEnum.Comics}>Comics</option>
          <option value={ComicsEnum.GraphicNovel}>Graphic Novel</option>
          <option value={ComicsEnum.Manga}>Manga</option>
          <option value={ComicsEnum.Manhwa}>Manhwa</option>
        </MySelect>
      )}
      {mediaType === MediaEnum.Book && (
        <MySelect
          value={bookType || ""}
          onChange={(event) =>
            handleChangeBook(event.target.value as BookEnum | "")
          }
        >
          <option value={""}>All</option>
          <option value={BookEnum.Fiction}>Fiction</option>
          <option value={BookEnum.NonFiction}>Non Fiction</option>
        </MySelect>
      )}
    </>
  );
});

export default RandomTypeSelect;
