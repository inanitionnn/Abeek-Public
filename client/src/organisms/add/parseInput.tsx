import { KeyboardEvent, ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setAddInputState,
  setSelectedImageState,
  setStageState,
} from "../../redux/reducers/addPageSlice";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import MyBlock from "../../atom/myBlock";
import MyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import MyInput from "../../atom/myInput";
import MyButton from "../../atom/myButton";
import MyPrice from "../../atom/myPrice";
import { setParseMediaState } from "../../redux/reducers/mediaSlice";

const ParseInput = () => {
  const dispatch = useAppDispatch();
  const mediaType = useAppSelector((state) => state.types.mediaType);
  const addInput = useAppSelector((state) => state.add.addInput);

  const [oldQuery, setOldQuery] = useState("");

  const setParseStage = () => {
    if (!addInput) {
      toast("Empty query");
    }
    if (oldQuery === addInput) {
      toast("Same query");
    }
    setOldQuery(addInput);
    dispatch(setParseMediaState({}));
    dispatch(setSelectedImageState(""));
    dispatch(setStageState("parse"));
  };

  return (
    <>
      <MyBlock>
        <div className="flex sm:gap-1 flex-col md:flex-row">
          <MyHeader>Parses {mediaType} by title (year)</MyHeader>
          <MyParagraph>or link to the English Wikipedia</MyParagraph>
        </div>
        <div className="flex flex-col w-full items-center gap-6">
          <div className="flex flex-col w-full md:flex-row items-center md:items-start gap-6">
            <MyInput
              value={addInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                dispatch(setAddInputState(event.target.value));
              }}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  setParseStage();
                }
              }}
              placeholder={`${
                mediaType === MediaEnum.Film
                  ? "Shrek (2001)"
                  : mediaType === MediaEnum.Series
                  ? "Breaking Bad (2008)"
                  : mediaType === MediaEnum.Comics
                  ? "One piece (1997)"
                  : mediaType === MediaEnum.Book
                  ? "The Metamorphosis (1915)"
                  : ""
              }`}
              maxLength={120}
            ></MyInput>

            <MyButton
              vwide={"wide"}
              vvariatns={"primary"}
              className="md:w-auto"
              onClick={setParseStage}
            >
              Parse
              <MyPrice price={2} />
            </MyButton>
          </div>
          <MyParagraph>
            If your {mediaType} is not found, add the year (you can use the
            Remind function above).
          </MyParagraph>
        </div>
      </MyBlock>
    </>
  );
};

export default ParseInput;
