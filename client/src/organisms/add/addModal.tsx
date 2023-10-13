import React, {
  ChangeEvent,
  Dispatch,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { IMAGE_API, opacityAnimation } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  AddMediaToUserDocument,
  AddMediaToUserMutation,
  AddMediaToUserMutationVariables,
  FilmEnum,
  WatchedEnum,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { setAddInputState } from "../../redux/reducers/addPageSlice";
import MyHeader from "../../atom/myHeader";
import MyRate from "../../atom/myRate";
import MMySelect from "../../atom/mySelect";
import MyLoading from "../../atom/myLoading";
import MMyTextarea from "../../atom/myTextarea";
import MyButton from "../../atom/myButton";
import { setSearchMediaState } from "../../redux/reducers/mediaSlice";

type ModalProps = {
  mediaId: string;
  isModal: boolean;
  setIsModal: Dispatch<React.SetStateAction<boolean>>;
};

const AddModal = memo((props: ModalProps) => {
  const { mediaId, setIsModal, isModal } = props;
  const dispatch = useAppDispatch();
  const searchMedia = useAppSelector((state) => state.media.searchMedia)?.find(
    (val) => val.id === mediaId
  );

  const mediaType = useAppSelector((state) => state.types.mediaType);
  const formRef = useRef<HTMLDivElement>(null);

  const [watched, setWatched] = useState<WatchedEnum>(WatchedEnum.Planned);
  const [rate, setRate] = useState(5);
  const [note, setNote] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setWatched(value as WatchedEnum);
  };

  const clickOutside = () => {
    setWatched(WatchedEnum.Planned);
    setRate(5);
    setNote("");
    setIsModal(false);
  };

  useClickOutside(formRef, clickOutside);

  const [
    addMediaMutation,
    { data: addMediaData, error: addMediaError, loading: addMediaLoading },
  ] = useMutation<AddMediaToUserMutation, AddMediaToUserMutationVariables>(
    AddMediaToUserDocument
  );

  const handleAddMedia = () => {
    addMediaMutation({
      variables: {
        input: {
          mediaId: mediaId,
          mediaType: mediaType,
          note: note,
          rate: watched === WatchedEnum.Planned ? null : rate,
          watched: watched,
        },
      },
    });
  };

  useEffect(() => {
    if (addMediaData) {
      toast.success(`Your media is successfully added`);
      setIsModal(false);
      dispatch(setAddInputState(""));
      dispatch(setSearchMediaState(null));
    }
  }, [addMediaData]);

  useEffect(() => {
    if (addMediaError) {
      toast.error(addMediaError.message);
    }
  }, [addMediaError]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isModal && (
          <motion.div
            variants={opacityAnimation}
            exit="end"
            animate="visible"
            initial="hidden"
            className="fixed top-0 left-0 right-0 h-full overflow-y-auto z-20
            flex justify-center items-center backdrop-blur-sm backdrop-contrast-75 "
          >
            <div
              ref={formRef}
              className="relative bg-base-300 md:ml-[102px] lg:ml-[222px] rounded-2xl shadow-lg
              flex justify-center gap-8 items-center p-8 border-base-200 border-4 w-[860px] mx-8"
            >
              <label
                className="btn btn-circle absolute top-5 right-5 swap bg-base-100
              group swap-rotate border-2 border-primary hover:bg-primary md:hidden"
              >
                <input type="checkbox" checked={isModal} />
                <svg
                  onClick={() => setIsModal(false)}
                  className="swap-on fill-current group-hover:fill-primary-content"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512"
                >
                  <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                </svg>
              </label>

              <img
                src={IMAGE_API + "/" + (searchMedia?.image || "")}
                alt="poster"
                className="hidden lg:block lg:w-[200px] lg:h-[300px]  rounded-lg contrast-[0.9]"
              />

              <div className="w-full">
                <MyHeader vsize={"lg"}>{searchMedia?.title}</MyHeader>

                <div>
                  <MyHeader>
                    {searchMedia?.__typename === "FilmSearchResponse" && (
                      <>
                        {searchMedia.year}
                        {searchMedia.year
                          ? ` | ${searchMedia.directedBy}`
                          : searchMedia.directedBy}
                        {searchMedia.year || searchMedia.directedBy
                          ? ` | ${searchMedia.filmType} ${
                              searchMedia.filmType !== FilmEnum.Movie
                                ? "film"
                                : ""
                            }`
                          : `${searchMedia.filmType} ${
                              searchMedia.filmType !== FilmEnum.Movie
                                ? "film"
                                : ""
                            }`}
                      </>
                    )}
                    {searchMedia?.__typename === "BookSearchResponse" && (
                      <>
                        {searchMedia.year}
                        {searchMedia.year
                          ? ` | ${searchMedia.author}`
                          : searchMedia.author}
                        {searchMedia.year || searchMedia.author
                          ? ` | ${searchMedia.bookType} book`
                          : `${searchMedia.bookType} book`}
                      </>
                    )}
                    {searchMedia?.__typename === "ComicsSearchResponse" && (
                      <>
                        {searchMedia.startYear
                          ? `${searchMedia?.startYear} - ${
                              searchMedia?.endYear
                                ? searchMedia?.endYear
                                : "????"
                            }`
                          : ""}
                        {searchMedia.startYear
                          ? ` | ${searchMedia.author}`
                          : searchMedia.author}
                        {searchMedia.startYear || searchMedia.author
                          ? ` | ${searchMedia.comicsType}`
                          : `${searchMedia.comicsType}`}
                      </>
                    )}
                    {searchMedia?.__typename === "SeriesSearchResponse" && (
                      <>
                        {searchMedia.startYear
                          ? `${searchMedia?.startYear} - ${
                              searchMedia?.endYear
                                ? searchMedia?.endYear
                                : "????"
                            }`
                          : ""}
                        {searchMedia.startYear
                          ? ` | ${searchMedia.seriesType} series`
                          : `${searchMedia.seriesType} series`}
                      </>
                    )}
                  </MyHeader>
                  <div className="divider"></div>
                  <LayoutGroup>
                    <div className="flex flex-col-reverse sm:flex-row gap-2 items-center justify-center">
                      <div className="flex flex-col-reverse gap-4 items-center justify-center">
                        <AnimatePresence>
                          {watched !== WatchedEnum.Planned && (
                            <motion.div
                              initial={{
                                opacity: 0,
                              }}
                              animate={{
                                x: 0,
                                opacity: 1,
                                transition: { duration: 0.4 },
                              }}
                              exit={{
                                opacity: 0,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <MyRate rate={rate} setRate={setRate} />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <MMySelect
                          layout
                          value={watched}
                          onChange={handleSelectChange}
                        >
                          <option selected value={WatchedEnum.Planned}>
                            Planned
                          </option>
                          <option value={WatchedEnum.Completed}>
                            Completed
                          </option>
                          <option value={WatchedEnum.Viewing}>Viewing</option>
                          <option value={WatchedEnum.Reviewing}>
                            Reviewing
                          </option>
                          <option value={WatchedEnum.Paused}>Paused</option>
                          <option value={WatchedEnum.Abandoned}>
                            Abandoned
                          </option>
                        </MMySelect>
                      </div>

                      <motion.div
                        layout
                        className="divider sm:divider-horizontal"
                      ></motion.div>
                      <div className="relative w-full">
                        <motion.div
                          layout
                          className="w-full flex justify-center items-center gap-4 mb-2"
                        >
                          <MyHeader>Note</MyHeader>
                          <div
                            className="tooltip "
                            data-tip="Only you and your friends can see this text."
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </motion.div>

                        <MMyTextarea
                          layout
                          value={note}
                          onChange={(
                            event: ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            setNote(event.target.value);
                          }}
                          placeholder="Your note..."
                        ></MMyTextarea>
                      </div>
                    </div>
                  </LayoutGroup>
                  <div className="divider"></div>
                  <div className="flex justify-center">
                    {addMediaLoading ? (
                      <MyLoading />
                    ) : (
                      <MyButton
                        vvariatns={"primary"}
                        vwide={"wide"}
                        onClick={handleAddMedia}
                      >
                        Add {mediaType} to my collection
                      </MyButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
export default AddModal;
