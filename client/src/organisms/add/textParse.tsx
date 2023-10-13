import { ChangeEvent, useState, useEffect, memo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  GptMediaParseDocument,
  GptMediaParseQuery,
  GptMediaParseQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { setStageState } from "../../redux/reducers/addPageSlice";
import { setTokensState } from "../../redux/reducers/userSlice";
import { toast } from "react-toastify";
import MyBlock from "../../atom/myBlock";
import MyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import MyTextarea from "../../atom/myTextarea";
import MyPrice from "../../atom/myPrice";
import MyButton from "../../atom/myButton";
import MyLoading from "../../atom/myLoading";
import { setParseMediaState } from "../../redux/reducers/mediaSlice";

const CreateTextParse = memo(() => {
  const dispatch = useAppDispatch();

  const mediaType = useAppSelector((state) => state.types.mediaType);
  const [query, setQuery] = useState("");

  const [gtpQuery, { data: gptData, loading: gptLoading, error: gptError }] =
    useLazyQuery<GptMediaParseQuery, GptMediaParseQueryVariables>(
      GptMediaParseDocument
    );

  const parseText = () => {
    if (query) {
      gtpQuery({
        variables: {
          input: {
            mediaType: mediaType,
            query: query,
            isJson: true,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (gptData) {
      const { additionalMediaTokens, media, mediaTokens } =
        gptData.gptMediaParse;
      dispatch(setParseMediaState(media));
      dispatch(
        setTokensState({
          additionalMediaTokens,
          mediaTokens,
        })
      );
      dispatch(setStageState("parse"));
    }
  }, [gptData]);

  useEffect(() => {
    if (gptError) {
      toast.error(gptError.message);
    }
  }, [gptError]);

  return (
    <>
      <MyBlock>
        <MyHeader>Automatic filling of fields</MyHeader>
        <MyParagraph vsize={"sm"}>
          Copy information about {mediaType} from any website, and then gpt will
          fill in {mediaType} fields
        </MyParagraph>

        <MyTextarea
          value={query}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
            setQuery(event.target.value);
          }}
          vsize={"lg"}
          rows={25}
          placeholder={"Some long description..."}
          maxLength={2000}
        ></MyTextarea>
        <MyParagraph vsize={"sm"}>
          works only with English (i.e., without hieroglyphics, Cyrillic, etc.)
        </MyParagraph>

        <MyButton
          vvariatns={"primary"}
          vwide={"wide"}
          className="md:w-auto"
          onClick={parseText}
        >
          Parse text
          <MyPrice price={20} />
        </MyButton>

        {gptLoading && <MyLoading />}
      </MyBlock>
    </>
  );
});
export default CreateTextParse;
