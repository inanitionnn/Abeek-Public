import { motion } from "framer-motion";
import {
  KeyboardEvent,
  ChangeEvent,
  useEffect,
  forwardRef,
  Ref,
  memo,
} from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setAddInputState,
  setSearchLoadingState,
  setStageState,
} from "../../redux/reducers/addPageSlice";
import {
  MediaEnum,
  SearchMediaDocument,
  SearchMediaQuery,
  SearchMediaQueryVariables,
} from "../../graphql/__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import MyHeader from "../../atom/myHeader";
import MyBlock from "../../atom/myBlock";
import MyInput from "../../atom/myInput";
import MyButton from "../../atom/myButton";
import { setSearchMediaState } from "../../redux/reducers/mediaSlice";

const SearchModule = memo(
  forwardRef((_, ref: Ref<HTMLDivElement>) => {
    const dispatch = useAppDispatch();

    const mediaType = useAppSelector((state) => state.types.mediaType);
    const addInput = useAppSelector((state) => state.add.addInput);

    const [
      searchMediaQuery,
      {
        data: searchMediaData,
        loading: searchMediaLoading,
        error: searchMediaError,
      },
    ] = useLazyQuery<SearchMediaQuery, SearchMediaQueryVariables>(
      SearchMediaDocument
    );

    useEffect(() => {
      if (searchMediaData) {
        dispatch(setSearchMediaState(searchMediaData.searchMedia));
        dispatch(setSearchLoadingState(false));
      }
    }, [searchMediaData]);

    useEffect(() => {
      if (searchMediaError) {
        toast.error(searchMediaError.message);
        dispatch(setStageState("default"));
        dispatch(setSearchLoadingState(false));
      }
    }, [searchMediaError]);

    useEffect(() => {
      if (searchMediaLoading) {
        dispatch(setSearchLoadingState(true));
      } else {
        dispatch(setSearchLoadingState(false));
      }
    }, [searchMediaLoading]);

    const handleSearchQuery = () => {
      if (addInput) {
        dispatch(setSearchMediaState([]));
        dispatch(setStageState("search"));
        searchMediaQuery({
          variables: {
            input: {
              query: addInput,
              mediaType: mediaType,
            },
          },
          fetchPolicy: "no-cache",
        });
      }
    };

    return (
      <>
        <MyBlock ref={ref}>
          <MyHeader>Search the {mediaType} by title</MyHeader>

          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            <MyInput
              value={addInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                dispatch(setAddInputState(event.target.value));
              }}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  handleSearchQuery();
                }
              }}
              placeholder={`${
                mediaType === MediaEnum.Film
                  ? "Shrek"
                  : mediaType === MediaEnum.Series
                  ? "Breaking Bad"
                  : mediaType === MediaEnum.Comics
                  ? "One piece"
                  : mediaType === MediaEnum.Book
                  ? "The Metamorphosis"
                  : ""
              }`}
              maxLength={120}
            ></MyInput>
            <MyButton
              vvariatns={"primary"}
              onClick={handleSearchQuery}
              vwide={"wide"}
              className="md:w-auto"
            >
              Search
            </MyButton>
          </div>
        </MyBlock>
      </>
    );
  })
);

const MSearchModule = motion(SearchModule);
export default MSearchModule;
