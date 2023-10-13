import { memo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  GetRandomMediaQuery,
  MediaEnum,
} from "../../graphql/__generated__/graphql";
import { setMediaTypeState } from "../../redux/reducers/typesSlice";
import useGetGenres from "../../hooks/random/useGetGenres";
import useGetRandomMedia from "../../hooks/random/useGetRandomMedia";
import MMyContainer from "../../atom/myContainer";
import { motion } from "framer-motion";
import MyHeader from "../../atom/myHeader";
import MySelect from "../../atom/mySelect";
import { IMAGE_API, slideAnimation } from "../../constants";
import MMyBlock from "../../atom/myBlock";
import RandomTypeSelect from "../../organisms/random/randomTypeSelect";
import MyButton from "../../atom/myButton";
import MyInput from "../../atom/myInput";
import RangeSlider from "../../atom/rangeSlider";
import clsx from "clsx";
import { Link } from "react-router-dom";
import MyParagraph from "../../atom/myParagraph";
import RandomSkeleton from "../../molecules/skeletons/randomSkeleton";

const RandomBlock = memo(() => {
  const dispatch = useAppDispatch();
  const [inUserMedia, setInUserMedia] = useState<boolean>(true);
  const [isYears, setIsYears] = useState<boolean>(false);
  const [isGenres, setIsGenres] = useState<boolean>(false);

  const [genres, setGenres] = useState<string[]>([]);
  const [mediaGenres, setMediaGenres] = useState<string[]>([]);

  const [count, setCount] = useState<number>(1);

  const [fromYear, setFromYear] = useState<number>(1990);
  const [toYear, setToYear] = useState<number>(new Date().getFullYear());

  const [media, setMedia] = useState<
    GetRandomMediaQuery["getRandomMedia"] | null
  >(null);

  const { mediaType } = useAppSelector((state) => state.types);

  const handleTypeSelect = (type: MediaEnum) => {
    dispatch(setMediaTypeState(type));
  };

  const toggleGenre = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setGenres((prev) => [...prev, genre]);
    }
  };
  useGetGenres({
    inUserMedia,
    isGenres,
    setMediaGenres,
    dataCb: () => setGenres([]),
  });

  const { handleGetRandomMedia, loading: getMediaLoading } = useGetRandomMedia({
    count,
    inUserMedia,
    isGenres,
    setMedia,
    toYear: isYears ? toYear : null,
    fromYear: isYears ? fromYear : null,
    genres: isGenres ? genres : null,
  });

  return (
    <>
      <MMyContainer
        initial="hidden"
        animate="visible"
        className="justify-start"
      >
        <motion.div
          variants={slideAnimation}
          custom={0}
          className="flex items-center gap-2 justify-center"
        >
          <MyHeader vsize={"lg"}>Get random</MyHeader>
          <MySelect
            value={mediaType}
            onChange={(event) =>
              handleTypeSelect(event.target.value as MediaEnum)
            }
          >
            <option value={MediaEnum.Film}>Film</option>
            <option value={MediaEnum.Series}>Series</option>
            <option value={MediaEnum.Comics}>Comics</option>
            <option value={MediaEnum.Book}>Book</option>
          </MySelect>
        </motion.div>
        <MMyBlock variants={slideAnimation} custom={1}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between w-full">
            <div className="flex gap-2 items-center">
              <MyHeader>Type: </MyHeader>
              <RandomTypeSelect />
            </div>
            <div className="flex gap-2 items-center">
              <MyHeader className="text-base font-bold font-head">
                In my collection
              </MyHeader>

              <input
                type="checkbox"
                checked={inUserMedia}
                className="checkbox checkbox-primary"
                onChange={(event) => setInUserMedia(event.target.checked)}
              />
            </div>
          </div>

          <div className="flex justify-between  flex-col gap-4 sm:flex-row w-full">
            <div className="flex gap-2 items-center">
              <MyHeader>Count: </MyHeader>

              <MyButton
                vvariatns={"primary"}
                vsize={"sm"}
                className="btn-circle"
                onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </MyButton>
              <MyInput
                type="number"
                max={20}
                min={1}
                className="text-center"
                value={count}
                onChange={(event) =>
                  setCount(
                    Math.max(
                      Math.min(parseInt(event.target.value, 10) | 0, 20),
                      1
                    )
                  )
                }
              />
              <MyButton
                vvariatns={"primary"}
                vsize={"sm"}
                className="btn-circle"
                onClick={() => setCount((prev) => Math.min(prev + 1, 20))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </MyButton>
            </div>
            <div className="flex items-center gap-2">
              <MyHeader>Years</MyHeader>
              <input
                type="checkbox"
                checked={isYears}
                className="checkbox checkbox-primary"
                onChange={(event) => setIsYears(event.target.checked)}
              />
            </div>
          </div>
          {isYears && (
            <>
              <div className="flex gap-4 flex-col sm:flex-row items-center justify-end w-full">
                <MyInput
                  type="number"
                  max={toYear}
                  min={mediaType === MediaEnum.Book ? -10000 : 0}
                  className="text-center w-auto"
                  value={fromYear}
                  onChange={(event) =>
                    setFromYear(parseInt(event.target.value, 10))
                  }
                />

                <RangeSlider
                  className="w-full h-12 "
                  max={new Date().getFullYear()}
                  min={
                    MediaEnum.Film || MediaEnum.Series
                      ? 1970
                      : MediaEnum.Comics
                      ? 1950
                      : MediaEnum.Book
                      ? 1600
                      : 0
                  }
                  value={[fromYear, toYear]}
                  onChange={([newFromYear, newToYear]) => {
                    setFromYear(newFromYear);
                    setToYear(newToYear);
                  }}
                />
                <MyInput
                  type="number"
                  max={new Date().getFullYear()}
                  min={fromYear}
                  className="text-center w-auto"
                  value={toYear}
                  onChange={(event) =>
                    setToYear(parseInt(event.target.value, 10))
                  }
                />
              </div>
            </>
          )}
          <div className="flex gap-2 items-center w-full">
            <MyHeader>Genres: </MyHeader>
            <input
              type="checkbox"
              checked={isGenres}
              className="checkbox checkbox-primary"
              onChange={(event) => setIsGenres(event.target.checked)}
            />
          </div>
          {isGenres && (
            <div className="flex flex-wrap px-2 gap-2 w-full">
              {mediaGenres.map((genre) => (
                <button
                  onClick={() => toggleGenre(genre)}
                  className={clsx({
                    "badge badge-lg": true,
                    "badge-primary": genres.includes(genre),
                    "badge-neutral": !genres.includes(genre),
                  })}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
          <div className="flex justify-center pt-4">
            <MyButton
              vvariatns={"primary"}
              vwide={"wide"}
              onClick={handleGetRandomMedia}
            >
              Random
            </MyButton>
          </div>
        </MMyBlock>
        {getMediaLoading ? <RandomSkeleton /> : null}
        {!getMediaLoading ? (
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {media?.map((media) => (
              <Link to={`/media/${media.media}/${media.id}`}>
                <div className="flex items-center h-full bg-base-200 rounded-2xl shadow p-4 max-w-[440px] gap-4">
                  <img
                    className="w-[100px] h-[150px] md:w-[150px] md:h-[225px] object-cover rounded-2xl shadow contrast-[0.95]"
                    src={IMAGE_API + "/" + media.image}
                    alt="cover"
                  />
                  <div className="flex flex-col h-full justify-between py-2 gap-4">
                    <div>
                      <MyHeader
                        vsize={"lg"}
                        className="text-start line-clamp-3 mb-1"
                      >
                        {media.title}
                      </MyHeader>

                      <MyParagraph className="text-start">
                        {media.country}
                      </MyParagraph>

                      <MyParagraph className="text-start">
                        {(media?.__typename === "ComicsBaseResponse" ||
                          media?.__typename === "SeriesBaseResponse") &&
                          (media.startYear
                            ? `${media.startYear} - ${
                                media.endYear ? media.endYear : "????"
                              }`
                            : "")}
                        {(media?.__typename === "FilmBaseResponse" ||
                          media?.__typename === "BookBaseResponse") &&
                          media.year}
                      </MyParagraph>

                      <MyParagraph className="text-start">
                        {((media?.__typename === "ComicsBaseResponse" ||
                          media?.__typename === "BookBaseResponse") &&
                          media.author) ||
                          ""}
                        {media?.__typename === "FilmBaseResponse" &&
                          media.directedBy}
                      </MyParagraph>

                      <MyParagraph className="text-start">
                        (
                        {media?.__typename === "ComicsBaseResponse" &&
                          media.comicsType}
                        {media?.__typename === "SeriesBaseResponse" &&
                          media.seriesType + " series"}
                        {media?.__typename === "BookBaseResponse" &&
                          media.bookType + " book"}
                        {media?.__typename === "FilmBaseResponse" &&
                          media.filmType}
                        )
                      </MyParagraph>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {media.genres?.slice(0, 6).map((genre) => (
                        <div className="badge">{genre}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </MMyContainer>
    </>
  );
});

export default RandomBlock;
