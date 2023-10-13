import { ChangeEvent, memo, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useEmbeddingSearch from "../../hooks/search/useEmbeddingSearch";
import { AnimatePresence, motion } from "framer-motion";
import MyHeader from "../../atom/myHeader";
import MySelect from "../../atom/mySelect";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import MyTextarea from "../../atom/myTextarea";
import MyParagraph from "../../atom/myParagraph";
import MyButton from "../../atom/myButton";
import MSearchMediaCard from "../../molecules/add/searchMediaCard";
import MMyBlock from "../../atom/myBlock";
import MyLoading from "../../atom/myLoading";
import MyPrice from "../../atom/myPrice";
import { setMediaTypeState } from "../../redux/reducers/typesSlice";
import { slideAnimation } from "../../constants";
import SearchSkeleton from "../../molecules/skeletons/searchSkeleton";
import { setSearchMediaState } from "../../redux/reducers/mediaSlice";

type Props = {
  setMediaId: React.Dispatch<React.SetStateAction<string>>;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBlock = memo((props: Props) => {
  const { setMediaId, setIsModal } = props;
  const dispatch = useAppDispatch();

  const mediaType = useAppSelector((state) => state.types.mediaType);
  const searchMedia = useAppSelector((state) => state.media.searchMedia);

  const [query, setQuery] = useState<string>("");
  const [count, setCount] = useState<number>(3);

  const { handleSearch, loading } = useEmbeddingSearch({ count, query });

  useEffect(() => {
    setQuery("");
    dispatch(setSearchMediaState(null));
  }, []);

  const handleAddMedia = (mediaId: string) => {
    setMediaId(mediaId);
    setIsModal(true);
  };
  return (
    <>
      <motion.div
        variants={slideAnimation}
        custom={0}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <MyHeader vsize={"lg"}>You want to find</MyHeader>
        <MySelect
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        >
          <option selected value={1}>
            1
          </option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </MySelect>
        <MySelect
          value={mediaType}
          onChange={(e) =>
            dispatch(setMediaTypeState(e.target.value as MediaEnum))
          }
        >
          <option selected value={MediaEnum.Film}>
            Films
          </option>
          <option value={MediaEnum.Series}>Series</option>
          <option value={MediaEnum.Comics}>Comics</option>
          <option value={MediaEnum.Book}>Books</option>
        </MySelect>
      </motion.div>
      <MMyBlock variants={slideAnimation} custom={1}>
        <MyHeader>Search {mediaType} by query</MyHeader>
        <div className="flex flex-col md:flex-row  items-center gap-4 w-full">
          <MyTextarea
            value={query}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setQuery(event.target.value);
            }}
            placeholder={`Between 2010 and 2014 drama about driver with Ryan Gosling`}
            maxLength={200}
          ></MyTextarea>

          <MyButton
            vwide={"wide"}
            vvariatns={"primary"}
            className="md:w-auto"
            onClick={handleSearch}
          >
            Search
            <MyPrice price={2} />
          </MyButton>
        </div>
        <MyParagraph vsize={"sm"} className="text-center max-w-2xl">
          This search works on recomendation system, so you can write anything
          about {mediaType} and the search will return you the most similar{" "}
          {mediaType} to the description
        </MyParagraph>
        {loading && <MyLoading />}
      </MMyBlock>

      <AnimatePresence>
        {searchMedia && !!searchMedia?.length ? (
          <div className="flex flex-wrap gap-8 items-center justify-center">
            {searchMedia?.map((_, index) => (
              <MSearchMediaCard
                key={index}
                variants={slideAnimation}
                custom={index}
                handleAddMedia={handleAddMedia}
                index={index}
              />
            ))}
          </div>
        ) : null}
      </AnimatePresence>

      {loading ? <SearchSkeleton /> : null}
    </>
  );
});

export default SearchBlock;
