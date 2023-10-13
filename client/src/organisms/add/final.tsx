import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { slideAnimation } from "../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  BookEnum,
  ComicsEnum,
  CreateMediaDocument,
  CreateMediaMutation,
  CreateMediaMutationVariables,
  CreatedEnum,
  FilmEnum,
  MappedParseMedia,
  MediaEnum,
  SeriesEnum,
  SeriesSeasonRateInput,
  SeriesSeasonResponse,
  WatchedEnum,
} from "../../graphql/__generated__/graphql";
import { toast } from "react-toastify";
import MMediaInfo from "../../molecules/add/mediaInfo";
import { setStageState } from "../../redux/reducers/addPageSlice";
import MMyButton from "../../atom/myButton";
import MyLoading from "../../atom/myLoading";
import MyTextarea from "../../atom/myTextarea";
import MyHeader from "../../atom/myHeader";
import MMySelect from "../../atom/mySelect";
import MyRate from "../../atom/myRate";

type seasonRate = {
  rate: number | null;
  season: number | null;
};

const Final = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isWiki = location.pathname === "/add/create/wiki";
  const isText = location.pathname === "/add/create/text";

  const parseMedia = useAppSelector((state) => state.media.parseMedia);
  const selectedImage = useAppSelector((state) => state.add.selectedImage);

  const [watched, setWatched] = useState<WatchedEnum>(WatchedEnum.Planned);
  const [report, setReport] = useState("");
  const [note, setNote] = useState("");
  const [rate, setRate] = useState(5);

  const initialSeasonsRate: seasonRate[] =
    parseMedia.__typename === "SeriesParseResponse"
      ? parseMedia.seasons?.map((season: SeriesSeasonResponse) => {
          return { rate: null, season: season.season || null };
        }) || []
      : [];

  const [seasonsRate, setSeasonsRate] =
    useState<seasonRate[]>(initialSeasonsRate);

  const seriesSeasons: SeriesSeasonRateInput[] =
    parseMedia.__typename === "SeriesParseResponse"
      ? seasonsRate.map((item: seasonRate) => {
          const season = item.season;
          const matchedSeason = parseMedia.seasons?.find(
            (seriesSeason) => seriesSeason.season === season
          );
          const { __typename, ...restSeriesSeason } = matchedSeason || {};

          return { ...item, ...restSeriesSeason };
        })
      : [];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setWatched(value as WatchedEnum);
  };

  const handleDeleteButton = () => {
    // navigate("/add");
    dispatch(setStageState("images"));
  };

  const [
    createMediaMutation,
    {
      data: createMediaData,
      loading: createMediaLoading,
      error: createMediaError,
    },
  ] = useMutation<CreateMediaMutation, CreateMediaMutationVariables>(
    CreateMediaDocument
  );

  const handleNextButton = () => {
    let media: MappedParseMedia = {};
    let mediaType: MediaEnum = MediaEnum.Film;

    switch (parseMedia.__typename) {
      case "FilmParseResponse": {
        (mediaType = MediaEnum.Film),
          (media = {
            title: parseMedia.title,
            filmType: parseMedia.filmType || FilmEnum.Movie,
            boxOffice: parseMedia.boxOffice,
            budget: parseMedia.budget,
            country: parseMedia.country,
            directedBy: parseMedia.directedBy,
            starring: parseMedia.starring,
            genres: parseMedia.genres,
            image: selectedImage,
            language: parseMedia.language,
            plot: parseMedia.plot,
            runTime: parseMedia.runTime,
            tags: parseMedia.tags,
            year: parseMedia.year,
          });
        break;
      }
      case "SeriesParseResponse": {
        (mediaType = MediaEnum.Series),
          (media = {
            title: parseMedia.title,
            seriesType: parseMedia.seriesType || SeriesEnum.Tv,
            country: parseMedia.country,
            directedBy: parseMedia.directedBy,
            genres: parseMedia.genres,
            image: selectedImage,
            language: parseMedia.language,
            plot: parseMedia.plot,
            tags: parseMedia.tags,
            startYear: parseMedia.startYear,
            endYear: parseMedia.endYear,
            seasons: seriesSeasons,
          });

        break;
      }
      case "ComicsParseResponse": {
        (mediaType = MediaEnum.Comics),
          (media = {
            title: parseMedia.title || "",
            comicsType: parseMedia.comicsType || ComicsEnum.Comics,
            country: parseMedia.country,
            author: parseMedia.author,
            description: parseMedia.description,
            volumes: parseMedia.volumes,
            genres: parseMedia.genres,
            image: selectedImage,
            language: parseMedia.language,
            tags: parseMedia.tags,
            startYear: parseMedia.startYear,
            endYear: parseMedia.endYear,
          });

        break;
      }
      case "BookParseResponse": {
        (mediaType = MediaEnum.Book),
          (media = {
            title: parseMedia.title || "",
            bookType: parseMedia.bookType || BookEnum.Fiction,
            country: parseMedia.country,
            author: parseMedia.author,
            description: parseMedia.description,
            pages: parseMedia.pages,
            genres: parseMedia.genres,
            image: selectedImage,
            language: parseMedia.language,
            tags: parseMedia.tags,
            year: parseMedia.year,
          });
        break;
      }
    }

    createMediaMutation({
      variables: {
        input: {
          mediaType: mediaType,
          createdType: isWiki
            ? CreatedEnum.Wiki
            : isText
            ? CreatedEnum.Text
            : CreatedEnum.Self,
          note: note === "" ? null : note,
          report: report === "" ? null : report,
          watched: watched,
          rate: watched === WatchedEnum.Planned ? null : rate,
          media: media,
        },
      },
    });
  };

  useEffect(() => {
    if (createMediaData) {
      navigate("/add");
      toast.success("Your film has been successfully added");
    }
  }, [createMediaData]);

  useEffect(() => {
    if (createMediaError) {
      toast.error(createMediaError.message);
    }
  }, [createMediaError]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full gap-12">
        {parseMedia && (
          <>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center ">
              {!selectedImage && (
                <div
                  className="min-w-[200px] max-w-[200px] min-h-[300px] max-h-[300px]  rounded-2xl bg-base-200
                  contrast-[0.9] drop-shadow-lg flex justify-center items-center uppercase font-bold text-center"
                >
                  You don`t select the{" "}
                  {parseMedia.__typename === "FilmParseResponse" ||
                  parseMedia.__typename === "SeriesParseResponse"
                    ? "poster"
                    : "cover"}
                </div>
              )}

              {selectedImage && (
                <motion.img
                  variants={slideAnimation}
                  custom={2}
                  src={selectedImage}
                  alt="poster"
                  className="min-w-[200px] max-w-[200px] min-h-[300px] max-h-[300px] rounded-2xl 
                  contrast-[0.9] drop-shadow-lg object-cover ring-4 ring-primary"
                />
              )}
              <motion.div
                variants={slideAnimation}
                custom={3}
                className="flex justify-center bg-base-200 items-center sm:min-h-[225px] lg:min-h-[300px] p-8 shadow-lg rounded-2xl"
              >
                <MMediaInfo />
              </motion.div>
            </div>
            <LayoutGroup>
              <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-12 items-center justify-center">
                <AnimatePresence>
                  {watched !== WatchedEnum.Planned && (
                    <motion.div variants={slideAnimation}>
                      <MyRate name="rate-main" rate={rate} setRate={setRate} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  className="hidden sm:block"
                  layout
                  variants={slideAnimation}
                  custom={4}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </motion.div>
                <MMySelect
                  layout
                  variants={slideAnimation}
                  custom={5}
                  value={watched}
                  onChange={handleSelectChange}
                >
                  <option selected value={WatchedEnum.Planned}>
                    Planned
                  </option>
                  <option value={WatchedEnum.Completed}>Completed</option>
                  <option value={WatchedEnum.Viewing}>Viewing</option>
                  <option value={WatchedEnum.Reviewing}>Reviewing</option>
                  <option value={WatchedEnum.Paused}>Paused</option>
                  <option value={WatchedEnum.Abandoned}>Abandoned</option>
                </MMySelect>
              </div>
            </LayoutGroup>
            {parseMedia.__typename === "SeriesParseResponse" && (
              <div className="overflow-x-auto sm:min-w-[450px] w-fit">
                <h4 className="text-center text-lg leading-lg mb-2 font-head font-bold">
                  Seasons
                </h4>
                <LayoutGroup>
                  <motion.table
                    variants={slideAnimation}
                    custom={6}
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
                        <motion.th layout>Episodes</motion.th>
                        <AnimatePresence initial={false}>
                          {watched !== WatchedEnum.Planned && (
                            <motion.th variants={slideAnimation}>
                              Rate
                            </motion.th>
                          )}
                        </AnimatePresence>
                      </motion.tr>
                    </thead>
                    <tbody>
                      {parseMedia.seasons?.map((season) => (
                        <motion.tr key={season.season}>
                          <th className="font-normal text-center">
                            ({season.season})
                          </th>
                          <td className=" sm:table-cell ">
                            {season.title ? season.title : "No title"}
                          </td>
                          <td className="text-center">{season.episodes}</td>
                          <AnimatePresence>
                            {watched !== WatchedEnum.Planned && (
                              <motion.td variants={slideAnimation}>
                                <MyRate
                                  className="text-center font-normal font-head tracking-wide"
                                  key={season.season}
                                  name={`rate-${season.season}`}
                                  rate={
                                    seasonsRate.find(
                                      (seasonRate) =>
                                        seasonRate.season === season.season
                                    )?.rate || 0
                                  }
                                  setRate={(value) => {
                                    // when seasonRate changes, I set Rate as the average value of seasonRate
                                    setSeasonsRate((prev) => {
                                      const newSeasonRate = prev.map(
                                        (seasonRate) => {
                                          if (
                                            seasonRate.season === season.season
                                          ) {
                                            return {
                                              ...seasonRate,
                                              rate: value,
                                            };
                                          } else {
                                            return seasonRate;
                                          }
                                        }
                                      );

                                      const totalRates = newSeasonRate.reduce(
                                        (sum, seasonEntry) => {
                                          if (seasonEntry.rate !== null) {
                                            return sum + seasonEntry.rate;
                                          }
                                          return sum;
                                        },
                                        0
                                      );

                                      const countRates = newSeasonRate.filter(
                                        (seasonEntry) =>
                                          seasonEntry.rate !== null
                                      ).length;

                                      setRate((setRatePrev) => {
                                        const averageRate =
                                          countRates > 0
                                            ? totalRates / countRates
                                            : setRatePrev;
                                        return Math.ceil(averageRate);
                                      });

                                      return newSeasonRate;
                                    });
                                  }}
                                />
                              </motion.td>
                            )}
                          </AnimatePresence>
                        </motion.tr>
                      ))}
                    </tbody>
                  </motion.table>
                </LayoutGroup>
              </div>
            )}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row w-full gap-8"
            >
              <motion.div
                variants={slideAnimation}
                custom={0}
                className="relative w-full sm:w-1/2"
              >
                <div className="w-full flex justify-center items-center gap-4 mb-2">
                  <MyHeader vsize={"lg"}>Report</MyHeader>
                  <div
                    className="sm:tooltip"
                    data-tip={`You can report an incorrect field. Or recommend something to add.`}
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
                </div>

                <MyTextarea
                  value={report}
                  rows={5}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    setReport(event.target.value);
                  }}
                  placeholder="year not specified, wrong type, add action to genres, etc."
                ></MyTextarea>
              </motion.div>
              <motion.div
                variants={slideAnimation}
                custom={1}
                className="relative sm:w-1/2"
              >
                <div className="w-full flex justify-center items-center gap-4 mb-2">
                  <MyHeader
                    vsize={"lg"}
                    className="text-center font-head font-bold text-lg"
                  >
                    Note
                  </MyHeader>
                  <div
                    className="sm:tooltip "
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
                </div>

                <MyTextarea
                  value={note}
                  rows={5}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                    setNote(event.target.value);
                  }}
                  placeholder="whatever you want"
                ></MyTextarea>
              </motion.div>
            </motion.div>
          </>
        )}
        {createMediaLoading ? (
          <MyLoading />
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col-reverse md:flex-row gap-8 md:gap-8"
          >
            <MMyButton
              variants={slideAnimation}
              vwide={"wide"}
              onClick={handleDeleteButton}
            >
              Back
            </MMyButton>

            <MMyButton
              variants={slideAnimation}
              custom={1}
              vvariatns={"primary"}
              vwide={"wide"}
              onClick={handleNextButton}
            >
              Add to my collection
            </MMyButton>
          </motion.div>
        )}
      </div>
    </>
  );
});

export default Final;
