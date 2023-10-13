import React, { ComponentPropsWithoutRef, memo } from "react";
import { WatchedEnum } from "../../graphql/__generated__/graphql";
import { slideAnimation } from "../../constants";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import MMyButton from "../../atom/myButton";
import MyLoading from "../../atom/myLoading";
import MyRate from "../../atom/myRate";
import MMyHeader, { MyHeader } from "../../atom/myHeader";
import MMySelect from "../../atom/mySelect";
import MMyTextarea from "../../atom/myTextarea";
import { MyBlock } from "../../atom/myBlock";
import useUpdateUserMedia from "../../hooks/media/useUpdateUserMedia";

type Props = ComponentPropsWithoutRef<"div"> & {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const MediaEdit = memo((props: Props) => {
  const { setIsEdit } = props;
  const {
    handleNoteChange,
    handleSelectChange,
    handleUpdateUserMedia,
    loading,
    note,
    rate,
    setRate,
    watched,
    seasons,
    setSeasons,
    media,
  } = useUpdateUserMedia({ setIsEdit });

  return (
    <MyBlock className="space-y-4 w-full max-w-[1020px]">
      <MyHeader vsize={"xl"}>{media.title}</MyHeader>
      <div className="divider"></div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 w-full items-center justify-center">
        <motion.div
          variants={slideAnimation}
          custom={0}
          className="relative w-full mt-8"
        >
          <motion.div
            layout
            className="absolute -top-10 left-0 w-full flex justify-start items-center gap-4"
          >
            <MyHeader vsize={"lg"}>Note</MyHeader>
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
            onChange={(event) => handleNoteChange(event)}
            rows={4}
            placeholder="whatever you want"
            className="w-full lg:w-[500px] xl:w-[600px]"
          ></MMyTextarea>
        </motion.div>
        <motion.div
          variants={slideAnimation}
          custom={1}
          className="flex flex-col-reverse gap-4 items-center justify-center min-w-[210px]"
        >
          <AnimatePresence>
            {watched !== WatchedEnum.Planned && (
              <motion.div
                layout
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
                <MyRate rate={rate} setRate={(value) => setRate(value)} />
              </motion.div>
            )}
          </AnimatePresence>

          <MMySelect layout value={watched} onChange={handleSelectChange}>
            <option selected value={WatchedEnum.Planned}>
              Planned
            </option>
            <option value={WatchedEnum.Completed}>Completed</option>
            <option selected value={WatchedEnum.Viewing}>
              Viewing
            </option>
            <option selected value={WatchedEnum.Reviewing}>
              Reviewing
            </option>
            <option value={WatchedEnum.Paused}>Paused</option>
            <option value={WatchedEnum.Abandoned}>Abandoned</option>
          </MMySelect>
        </motion.div>
      </div>

      {seasons.length && watched !== WatchedEnum.Planned ? (
        <div className="flex justify-center">
          <div className="overflow-x-auto sm:min-w-[450px] w-fit">
            <MMyHeader
              vsize={"lg"}
              className="mb-2"
              variants={slideAnimation}
              custom={2}
            >
              Seasons
            </MMyHeader>
            <LayoutGroup>
              <motion.table
                variants={slideAnimation}
                custom={3}
                className="table bg-base-300"
                layout
              >
                {/* head */}
                <thead>
                  <motion.tr className="text-center">
                    <motion.th layout>#</motion.th>
                    <motion.th layout className="sm:table-cell text-start">
                      Title
                    </motion.th>
                    <motion.th variants={slideAnimation}>Rate</motion.th>
                  </motion.tr>
                </thead>
                <tbody>
                  {seasons.map((season) => (
                    <motion.tr key={season.season}>
                      <th className="font-normal text-center">
                        ({season.season})
                      </th>
                      <td className=" sm:table-cell ">
                        {season.title ? season.title : "No title"}
                      </td>
                      <AnimatePresence>
                        <motion.td variants={slideAnimation}>
                          <MyRate
                            className="text-center font-normal font-head tracking-wide"
                            key={season.id}
                            name={`rate-${season.id}`}
                            rate={season.rate || 0}
                            setRate={(value) => {
                              const newSeasonRate = seasons?.map(
                                (prevSeason) => {
                                  if (prevSeason.id === season.id) {
                                    return {
                                      ...prevSeason,
                                      rate: value,
                                    };
                                  } else {
                                    return prevSeason;
                                  }
                                }
                              );

                              const totalRates =
                                newSeasonRate?.reduce((sum, seasonEntry) => {
                                  if (seasonEntry.rate) {
                                    sum += seasonEntry.rate;
                                  }
                                  return sum;
                                }, 0) ?? 0;

                              const countRates =
                                newSeasonRate?.filter(
                                  (seasonEntry) => seasonEntry.rate
                                ).length ?? 1;

                              setRate((setRatePrev) => {
                                const averageRate =
                                  countRates > 0
                                    ? totalRates / countRates
                                    : setRatePrev;
                                return Math.ceil(averageRate);
                              });

                              setSeasons(newSeasonRate);
                            }}
                          />
                        </motion.td>
                      </AnimatePresence>
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </LayoutGroup>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col-reverse md:flex-row gap-4 justify-center">
        <MMyButton
          layout
          variants={slideAnimation}
          vwide={"wide"}
          onClick={() => setIsEdit(false)}
        >
          Back
        </MMyButton>
        <MMyButton
          layout
          variants={slideAnimation}
          vwide={"wide"}
          vvariatns={"primary"}
          onClick={handleUpdateUserMedia}
        >
          {loading ? <MyLoading /> : " Save change"}
        </MMyButton>
      </div>
    </MyBlock>
  );
});

export default MediaEdit;
