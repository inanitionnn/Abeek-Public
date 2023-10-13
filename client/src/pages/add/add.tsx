import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setAddInputState,
  setStageState,
} from "../../redux/reducers/addPageSlice";
import { useNavigate } from "react-router-dom";
import { slideAnimation } from "../../constants";
import { motion } from "framer-motion";
import MSearchMediaCard from "../../molecules/add/searchMediaCard";
import AddModal from "../../organisms/add/addModal";
import loadable from "@loadable/component";
import { setMediaTypeState } from "../../redux/reducers/typesSlice";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import MyContainer from "../../atom/myContainer";
import MyHeader from "../../atom/myHeader";
import MySelect from "../../atom/mySelect";
import MMyHeader from "../../atom/myHeader";
import MMyButton from "../../atom/myButton";
import { setSearchMediaState } from "../../redux/reducers/mediaSlice";
import AddSearchSleleton from "../../molecules/skeletons/addSearchSkeleton";
import FooterBlock from "../../templates/footer";

const MRememberBlock = loadable(
  () => import("../../organisms/add/rememberBlock")
);
const MSearchBlock = loadable(() => import("../../organisms/add/searchModule"));

export default function Add() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mediaType = useAppSelector((state) => state.types.mediaType);
  const searchMedia = useAppSelector((state) => state.media.searchMedia);
  const { searchLoading, stage } = useAppSelector((state) => state.add);

  const [isModal, setIsModal] = useState(false);
  const [mediaId, setMediaId] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch(setMediaTypeState(value as MediaEnum));
    dispatch(setStageState("default"));
    dispatch(setAddInputState(""));
    dispatch(setSearchMediaState([]));
  };

  const handleAddMedia = (mediaId: string) => {
    setMediaId(mediaId);
    setIsModal(true);
  };

  const setClear = () => {
    dispatch(setAddInputState(""));
    dispatch(setStageState("default"));
  };

  const handleCreateNew = () => {
    navigate("create");
    dispatch(setStageState("start"));
  };

  useEffect(() => {
    setClear();
  }, []);

  return (
    <>
      <motion.main
        className="md:ml-[70px] lg:ml-[190px] relative"
        animate="visible"
        initial="hidden"
      >
        <AddModal mediaId={mediaId} isModal={isModal} setIsModal={setIsModal} />
        <img
          src="/posters1.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <div className="bg-base-100 bg-opacity-95">
          <MyContainer vwide={"md"} className="justify-start">
            <motion.div
              variants={slideAnimation}
              custom={0}
              className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <MyHeader vsize={"lg"}>You want to add</MyHeader>
              <MySelect value={mediaType} onChange={handleSelectChange}>
                <option selected value={MediaEnum.Film}>
                  Film
                </option>
                <option value={MediaEnum.Series}>Series</option>
                <option value={MediaEnum.Comics}>Comics</option>
                <option value={MediaEnum.Book}>Book</option>
              </MySelect>
            </motion.div>
            <motion.div variants={slideAnimation} custom={1} className="w-full">
              <MRememberBlock />
            </motion.div>
            <motion.div variants={slideAnimation} custom={2} className="w-full">
              <MSearchBlock />
            </motion.div>

            {searchLoading && <AddSearchSleleton />}

            {stage === "search" && !searchLoading ? (
              <div className="flex flex-col items-center justify-center gap-8">
                {searchMedia && !!searchMedia.length ? (
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
                ) : (
                  <MMyHeader variants={slideAnimation} vsize={"lg"}>
                    <span className="capitalize">{mediaType}</span> not found
                  </MMyHeader>
                )}

                <MMyButton
                  variants={slideAnimation}
                  vvariatns={"primary"}
                  onClick={handleCreateNew}
                >
                  Create new
                </MMyButton>
              </div>
            ) : null}
          </MyContainer>
          <FooterBlock />
        </div>
      </motion.main>
    </>
  );
}
