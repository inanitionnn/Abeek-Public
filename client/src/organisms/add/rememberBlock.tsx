import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";
import {
  ChangeEvent,
  KeyboardEvent,
  Ref,
  forwardRef,
  memo,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setAddInputState,
  setStageState,
} from "../../redux/reducers/addPageSlice";
import {
  GptTitleParseDocument,
  GptTitleParseQuery,
  GptTitleParseQueryVariables,
  MediaEnum,
} from "../../graphql/__generated__/graphql";
import { setTokensState } from "../../redux/reducers/userSlice";

import { motion } from "framer-motion";
import MyTextarea from "../../atom/myTextarea";
import MyButton from "../../atom/myButton";
import MyPrice from "../../atom/myPrice";
import MyParagraph from "../../atom/myParagraph";
import MyLoading from "../../atom/myLoading";
import MyBlock from "../../atom/myBlock";
import MyHeader from "../../atom/myHeader";

const RememberBlock = memo(
  forwardRef((_, ref: Ref<HTMLDivElement>) => {
    const dispatch = useAppDispatch();

    const mediaType = useAppSelector((state) => state.types.mediaType);
    const stage = useAppSelector((state) => state.add.stage);
    const [searchQuery, setSearchQuery] = useState("");

    const setClear = () => {
      if (stage === "default" || stage === "search") {
        dispatch(setStageState("default"));
      }
    };

    useEffect(() => {
      setSearchQuery("");
    }, [mediaType]);

    const [
      gptTitleQuery,
      { data: gptTitleData, loading: gptTitleLoading, error: gptTitleError },
    ] = useLazyQuery<GptTitleParseQuery, GptTitleParseQueryVariables>(
      GptTitleParseDocument
    );

    const parseTitle = () => {
      setClear();
      if (searchQuery !== "") {
        gptTitleQuery({
          variables: {
            input: {
              mediaType: mediaType,
              query: searchQuery,
            },
          },
        });
      }
    };

    useEffect(() => {
      if (gptTitleData) {
        const { title, year, mediaTokens, additionalMediaTokens } =
          gptTitleData.gptTitleParse;
        if (stage === "default" || stage === "search") {
          dispatch(setAddInputState(title));
        } else {
          dispatch(setAddInputState(`${title} ${year ? year : ""}`));
        }
        dispatch(
          setTokensState({
            additionalMediaTokens: additionalMediaTokens,
            mediaTokens: mediaTokens,
          })
        );
        setSearchQuery("");
      }
    }, [gptTitleData]);

    useEffect(() => {
      if (gptTitleError) {
        toast.error(gptTitleError.message);
        setSearchQuery("");
      }
    }, [gptTitleError]);

    return (
      <MyBlock ref={ref}>
        <MyHeader>
          Reminds the {mediaType}{" "}
          {stage === "default" || stage === "search" ? "title" : "title (year)"}{" "}
          by description
        </MyHeader>

        <div className="flex flex-col md:flex-row  items-center gap-4 w-full">
          <MyTextarea
            value={searchQuery}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setSearchQuery(event.target.value);
            }}
            onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
              if (event.key === "Enter") {
                parseTitle();
              }
            }}
            placeholder={`${
              mediaType === MediaEnum.Film
                ? "Cartoon about a green man with a donkey"
                : mediaType === MediaEnum.Series
                ? "Series about a man who sells drugs"
                : mediaType === MediaEnum.Comics
                ? "manga about a pirate looking for treasure"
                : mediaType === MediaEnum.Book
                ? "fiction book about a man's transformation into a cockroach"
                : ""
            }`}
            maxLength={200}
          ></MyTextarea>
          <MyButton className="md:w-auto" vwide={"wide"} onClick={parseTitle}>
            Get title
            <MyPrice price={2} />
          </MyButton>
        </div>
        <MyParagraph>
          Works only with {mediaType} created before 2021!
        </MyParagraph>
        {gptTitleLoading && <MyLoading />}
      </MyBlock>
    );
  })
);

const MRememberBlock = motion(RememberBlock);
export default MRememberBlock;
