import { memo, useEffect, useState } from "react";
import { setGptLoadingState } from "../../redux/reducers/addPageSlice";
import { toast } from "react-toastify";
import {
  BookParseResponse,
  ComicsParseResponse,
  FilmParseResponse,
  GptMediaParseDocument,
  GptMediaParseQuery,
  GptMediaParseQueryVariables,
  MediaEnum,
  SeriesParseResponse,
} from "../../graphql/__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { motion } from "framer-motion";
import { slideAnimation } from "../../constants";
import CreateGptSkeleton from "../../molecules/skeletons/createGptSkeleton";
import { setTokensState } from "../../redux/reducers/userSlice";
import MediaInfo from "../../molecules/add/mediaInfo";
import MyPrice from "../../atom/myPrice";
import MyButton from "../../atom/myButton";
import { setParseMediaState } from "../../redux/reducers/mediaSlice";

const GptParse = memo(() => {
  const dispatch = useAppDispatch();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const { mediaType } = useAppSelector((state) => state.types);
  const parseMedia = useAppSelector((state) => state.media.parseMedia);
  const { selectedImage, keys } = useAppSelector((state) => state.add);

  const [gtpQuery, { data: gptData, loading: gptLoading, error: gptError }] =
    useLazyQuery<GptMediaParseQuery, GptMediaParseQueryVariables>(
      GptMediaParseDocument
    );

  const handleParseButton = () => {
    let query = "";
    let isAfter2021 = false;
    let mediaType: MediaEnum = MediaEnum.Film;
    let isQuery = false;
    switch (parseMedia.__typename) {
      case "FilmParseResponse": {
        if (parseMedia.plot && parseMedia.year && parseMedia.year > 2021) {
          isQuery = true;
          query = parseMedia.plot;
          isAfter2021 = true;
          mediaType = MediaEnum.Film;
        } else if (parseMedia.year && parseMedia.year <= 2021) {
          isQuery = true;
          query = `film ${parseMedia.title} (${parseMedia.year})`;
          isAfter2021 = false;
          mediaType = MediaEnum.Film;
        } else {
          isQuery = false;
        }
        break;
      }
      case "SeriesParseResponse": {
        if (
          parseMedia.plot &&
          parseMedia.startYear &&
          parseMedia.startYear > 2021
        ) {
          isQuery = true;
          query = parseMedia.plot;
          isAfter2021 = true;
          mediaType = MediaEnum.Series;
        } else if (parseMedia.startYear && parseMedia.startYear <= 2021) {
          isQuery = true;
          query = `series ${parseMedia.title}`;
          isAfter2021 = false;
          mediaType = MediaEnum.Series;
        } else {
          isQuery = false;
        }
        break;
      }
      case "ComicsParseResponse": {
        if (
          parseMedia.description &&
          parseMedia.startYear &&
          parseMedia.startYear > 2021
        ) {
          isQuery = true;
          query = parseMedia.description;
          isAfter2021 = true;
          mediaType = MediaEnum.Comics;
        } else if (parseMedia.startYear && parseMedia.startYear <= 2021) {
          isQuery = true;
          query = `comics ${parseMedia.title}`;
          isAfter2021 = false;
          mediaType = MediaEnum.Comics;
        } else {
          isQuery = false;
        }
        break;
      }
      case "BookParseResponse": {
        if (
          parseMedia.description &&
          parseMedia.year &&
          parseMedia.year > 2021
        ) {
          isQuery = true;
          query = parseMedia.description;
          isAfter2021 = true;
          mediaType = MediaEnum.Book;
        } else if (parseMedia.year && parseMedia.year <= 2021) {
          isQuery = true;
          query = `book ${parseMedia.title} (${parseMedia.year})`;
          isAfter2021 = false;
          mediaType = MediaEnum.Book;
        } else {
          isQuery = false;
        }
        break;
      }
    }
    if (isQuery && isFirstTime) {
      gtpQuery({
        variables: {
          input: {
            keys: keys,
            query: query,
            isAfter2021: isAfter2021,
            mediaType: mediaType,
          },
        },
      });
      setIsFirstTime(false);
    }
  };

  useEffect(() => {
    if (gptData) {
      const { additionalMediaTokens, media, mediaTokens } =
        gptData.gptMediaParse;
      if (media.__typename === "FilmParseResponse") {
        const newParseMedia = parseMedia as FilmParseResponse;
        const newMedia = {
          ...newParseMedia,
          __typename: newParseMedia.__typename || media?.__typename,
          filmType: newParseMedia.filmType || media?.filmType,
          title: newParseMedia.title || media?.title,
          year: newParseMedia.year || media?.year,
          directedBy: !!newParseMedia.directedBy?.length
            ? newParseMedia.directedBy
            : media?.directedBy,
          country: newParseMedia.country || media?.country,
          language: newParseMedia.language || media?.language,
          boxOffice: newParseMedia.boxOffice || media?.boxOffice,
          starring: newParseMedia.starring || media?.starring,
          budget: newParseMedia.budget || media?.budget,
          runTime: newParseMedia.runTime || media?.runTime,
          genres: [
            ...new Set(
              [...(newParseMedia.genres ?? []), ...(media?.genres ?? [])].map(
                (genre) => genre.toLowerCase()
              )
            ),
          ],
          tags: [
            ...new Set(
              [...(newParseMedia.tags ?? []), ...(media?.tags ?? [])].map(
                (tag) => tag.toLowerCase()
              )
            ),
          ],
          plot: media?.plot,
        };
        dispatch(setParseMediaState(newMedia));
      } else if (media.__typename === "SeriesParseResponse") {
        const newParseMedia = parseMedia as SeriesParseResponse;
        const newMedia = {
          ...newParseMedia,
          __typename: newParseMedia.__typename || media?.__typename,
          seriesType: newParseMedia.seriesType || media?.seriesType,
          title: newParseMedia.title || media?.title,
          startYear: newParseMedia.startYear || media?.startYear,
          endYear: newParseMedia.endYear || media?.endYear,
          directedBy: !!newParseMedia.directedBy?.length
            ? newParseMedia.directedBy
            : media?.directedBy,
          country: newParseMedia.country || media?.country,
          language: newParseMedia.language || media?.language,
          genres: [
            ...new Set(
              [...(newParseMedia.genres ?? []), ...(media?.genres ?? [])].map(
                (genre) => genre.toLowerCase()
              )
            ),
          ],
          tags: [
            ...new Set(
              [...(newParseMedia.tags ?? []), ...(media?.tags ?? [])].map(
                (tag) => tag.toLowerCase()
              )
            ),
          ],
          plot: media?.plot,
        };
        dispatch(setParseMediaState(newMedia));
      } else if (media.__typename === "ComicsParseResponse") {
        const newParseMedia = parseMedia as ComicsParseResponse;
        const newMedia = {
          ...newParseMedia,
          __typename: newParseMedia.__typename || media?.__typename,
          comicsType: newParseMedia.comicsType || media?.comicsType,
          title: newParseMedia.title || media?.title,
          startYear: newParseMedia.startYear || media?.startYear,
          endYear: newParseMedia.endYear || media?.endYear,
          author: !!newParseMedia.author?.length
            ? newParseMedia.author
            : media?.author,
          country: newParseMedia.country || media?.country,
          language: newParseMedia.language || media?.language,
          volumes: newParseMedia.volumes || media?.volumes,
          genres: [
            ...new Set(
              [...(newParseMedia.genres ?? []), ...(media?.genres ?? [])].map(
                (genre) => genre.toLowerCase()
              )
            ),
          ],
          tags: [
            ...new Set(
              [...(newParseMedia.tags ?? []), ...(media?.tags ?? [])].map(
                (tag) => tag.toLowerCase()
              )
            ),
          ],
          description: media?.description,
        };
        dispatch(setParseMediaState(newMedia));
      } else if (media.__typename === "BookParseResponse") {
        const newParseMedia = parseMedia as BookParseResponse;
        const newMedia = {
          ...newParseMedia,
          __typename: newParseMedia.__typename || media?.__typename,
          bookType: newParseMedia.bookType || media?.bookType,
          title: newParseMedia.title || media?.title,
          year: newParseMedia.year || media?.year,
          author: !!newParseMedia.author?.length
            ? newParseMedia.author
            : media?.author,
          country: newParseMedia.country || media?.country,
          language: newParseMedia.language || media?.language,
          pages: newParseMedia.pages || media?.pages,
          genres: [
            ...new Set(
              [...(newParseMedia.genres ?? []), ...(media?.genres ?? [])].map(
                (genre) => genre.toLowerCase()
              )
            ),
          ],
          tags: [
            ...new Set(
              [...(newParseMedia.tags ?? []), ...(media?.tags ?? [])].map(
                (tag) => tag.toLowerCase()
              )
            ),
          ],
          description: media?.description,
        };
        dispatch(setParseMediaState(newMedia));
      }

      dispatch(
        setTokensState({
          additionalMediaTokens: additionalMediaTokens,
          mediaTokens: mediaTokens,
        })
      );
      dispatch(setGptLoadingState(false));
    }
  }, [gptData]);

  useEffect(() => {
    if (gptError) {
      toast.error(gptError.message);
      dispatch(setGptLoadingState(false));
    }
  }, [gptError]);

  useEffect(() => {
    if (gptLoading) {
      dispatch(setGptLoadingState(true));
    } else {
      dispatch(setGptLoadingState(false));
    }
  }, [gptLoading]);

  return (
    <>
      <div className="flex flex-col-reverse gap-4 sm:flex-row justify-center items-center">
        <div className="flex gap-4 flex-col items-center">
          {!selectedImage && (
            <div
              className="min-w-[200px] max-w-[200px] min-h-[300px] max-h-[300px] 
              rounded-2xl bg-base-200 drop-shadow-lg
              flex justify-center items-center uppercase font-bold"
            >
              poster
            </div>
          )}
          {selectedImage && (
            <motion.img
              key={selectedImage}
              variants={slideAnimation}
              custom={0}
              src={selectedImage}
              alt="poster"
              className="min-w-[200px] max-w-[200px] min-h-[300px] max-h-[300px] rounded-2xl 
                  contrast-[0.9] drop-shadow  object-cover ring-4 ring-primary"
            />
          )}
          {isFirstTime ? (
            <div
              data-tip={`Improve the plot, add genres, fill in empty fields (if the ${mediaType} was released before 2021)`}
              className="lg:w-[200px] tooltip"
            >
              <MyButton
                vvariatns={"primary"}
                vwide={"wide"}
                className="sm:w-full sm:h-fit py-2"
                onClick={handleParseButton}
              >
                GPT Fix
                <MyPrice price={4} />
              </MyButton>
            </div>
          ) : null}
        </div>
        {gptLoading && <CreateGptSkeleton />}
        {!gptLoading ? (
          <motion.div
            variants={slideAnimation}
            custom={1}
            className={`flex justify-center items-center bg-base-200
         sm:min-h-[300px] lg:min-h-[375px] p-8 shadow-lg rounded-2xl`}
          >
            <MediaInfo />
          </motion.div>
        ) : null}
      </div>
    </>
  );
});
export default GptParse;
