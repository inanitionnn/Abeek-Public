import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  WikiMediaParseDocument,
  WikiMediaParseQuery,
  WikiMediaParseQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { setKeysState, setStageState } from "../../redux/reducers/addPageSlice";
import CreateWikiSkeleton from "../../molecules/skeletons/createWikiSkeleton";
import { AnimatePresence } from "framer-motion";
import { opacityAnimation } from "../../constants";
import { setTokensState } from "../../redux/reducers/userSlice";
import MMyBlock from "../../atom/myBlock";
import MyParagraph from "../../atom/myParagraph";
import MyButton from "../../atom/myButton";
import MyHeader from "../../atom/myHeader";
import { setParseMediaState } from "../../redux/reducers/mediaSlice";
import { findEmptyFields } from "../../utils/findEmptyKeys";

const WikiParse = memo(() => {
  const dispatch = useAppDispatch();
  const { mediaType } = useAppSelector((state) => state.types);
  const { parseMedia } = useAppSelector((state) => state.media);
  const { addInput } = useAppSelector((state) => state.add);
  const handleClickNext = () => {
    dispatch(setStageState("images"));
  };

  const handleClickBack = () => {
    dispatch(setStageState("start"));
  };

  const {
    data: wikiData,
    loading: wikiLoading,
    error: wikiError,
  } = useQuery<WikiMediaParseQuery, WikiMediaParseQueryVariables>(
    WikiMediaParseDocument,
    {
      variables: {
        input: {
          mediaType: mediaType,
          query: addInput,
        },
      },
    }
  );
  useEffect(() => {
    if (wikiData) {
      if (wikiData) {
        const { media, additionalMediaTokens, mediaTokens } =
          wikiData.wikiMediaParse;
        dispatch(setParseMediaState(media));

        dispatch(
          setTokensState({
            additionalMediaTokens: additionalMediaTokens,
            mediaTokens: mediaTokens,
          })
        );
        const emptyKeys = findEmptyFields(media);
        dispatch(setKeysState(emptyKeys));
      }
    }
  }, [wikiData]);

  useEffect(() => {
    if (wikiError) {
      toast.error(wikiError.message);
      dispatch(setStageState("start"));
    }
  }, [wikiError]);

  return (
    <>
      {wikiLoading && <CreateWikiSkeleton />}
      <AnimatePresence>
        {!wikiLoading && parseMedia && (
          <MMyBlock
            initial="hidden"
            animate="visible"
            variants={opacityAnimation}
            className=" sm:flex-row justify-around gap-8"
          >
            <img
              src={parseMedia.image || ""}
              className="rounded-2xl h-60 w-40 md:h-72 md:w-48 object-cover"
            />
            <div>
              <MyHeader vsize={"lg"} className="text-start line-clamp-2">
                {parseMedia.title || ""}
              </MyHeader>

              <MyParagraph className="text-start">
                Year:{" "}
                {(parseMedia.__typename === "ComicsParseResponse" ||
                  parseMedia.__typename === "SeriesParseResponse") &&
                  (parseMedia.startYear
                    ? `${parseMedia.startYear} - ${
                        parseMedia.endYear ? parseMedia.endYear : "????"
                      }`
                    : "")}
                {(parseMedia.__typename === "FilmParseResponse" ||
                  parseMedia.__typename === "BookParseResponse") &&
                  parseMedia.year}
              </MyParagraph>
              {(parseMedia.__typename === "FilmParseResponse" ||
                parseMedia.__typename === "SeriesParseResponse") &&
                parseMedia.directedBy &&
                !!parseMedia.directedBy?.length && (
                  <MyParagraph className="text-start line-clamp-2">
                    Directed by: {parseMedia?.directedBy?.join(", ") || ""}
                  </MyParagraph>
                )}

              {(parseMedia.__typename === "ComicsParseResponse" ||
                parseMedia.__typename === "BookParseResponse") && (
                <MyParagraph className="text-start">
                  Author: {parseMedia?.author?.join(", ") || ""}
                </MyParagraph>
              )}

              {!!parseMedia.country && (
                <MyParagraph className="text-start">
                  Country: {parseMedia.country || ""}
                </MyParagraph>
              )}

              {!!parseMedia.genres?.length && (
                <MyParagraph className="text-start line-clamp-2">
                  Genres: {parseMedia.genres?.slice(0, 3).join(", ") || ""}
                </MyParagraph>
              )}

              <div className="flex gap-4 mt-4 flex-col-reverse lg:flex-row">
                <MyButton
                  vwide={"full"}
                  className="sm:w-60"
                  onClick={handleClickBack}
                >
                  Back!
                </MyButton>
                <MyButton
                  vwide={"full"}
                  vvariatns={"primary"}
                  className="sm:w-60"
                  onClick={handleClickNext}
                >
                  Next!
                </MyButton>
              </div>
            </div>
          </MMyBlock>
        )}
      </AnimatePresence>
    </>
  );
});
export default WikiParse;
