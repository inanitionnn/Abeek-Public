import React, { ChangeEvent, memo, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import {
  BookEnum,
  BookParseResponse,
  ComicsEnum,
  ComicsParseResponse,
  FilmEnum,
  FilmParseResponse,
  MediaEnum,
  SeriesEnum,
  SeriesParseResponse,
  WikiMediaParseQuery,
} from "../../graphql/__generated__/graphql";
import { useNavigate } from "react-router-dom";
import { MyTitle } from "../../molecules/myTitle";
import MyBlock from "../../atom/myBlock";
import MySelect from "../../atom/mySelect";
import MyTextarea from "../../atom/myTextarea";
import MyInput from "../../atom/myInput";
import MyButton from "../../atom/myButton";
import useAddFields from "../../hooks/add/useAddFields";

const CreateInputFields = memo(() => {
  const navigate = useNavigate();
  const handleDeleteButton = () => {
    navigate("/add");
  };
  const [parseMedia, setParseMedia] =
    useState<WikiMediaParseQuery["wikiMediaParse"]["media"]>();

  const mediaType = useAppSelector((state) => state.types.mediaType);
  const { fields, handleNextButton } = useAddFields({
    parseMedia,
    setParseMedia,
  });

  return (
    <>
      <MyBlock>
        <MyTitle title="Type: " className="w-32 mx-4">
          {mediaType === MediaEnum.Film && (
            <MySelect
              value={
                (parseMedia as FilmParseResponse)?.filmType || FilmEnum.Movie
              }
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setParseMedia((prev) => {
                  return {
                    ...prev,
                    filmType: event.target.value as FilmEnum,
                  };
                })
              }
            >
              <option value={FilmEnum.Animated}>Animated</option>
              <option value={FilmEnum.Anime}>Anime</option>
              <option value={FilmEnum.Movie}>Movie</option>
            </MySelect>
          )}
          {mediaType === MediaEnum.Series && (
            <MySelect
              value={
                (parseMedia as SeriesParseResponse)?.seriesType || SeriesEnum.Tv
              }
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setParseMedia((prev) => {
                  return {
                    ...prev,
                    seriesType: event.target.value as SeriesEnum,
                  };
                })
              }
            >
              <option value={SeriesEnum.Animated}>Animated</option>
              <option value={SeriesEnum.Anime}>Anime</option>
              <option value={SeriesEnum.Tv}>Tv</option>
            </MySelect>
          )}
          {mediaType === MediaEnum.Comics && (
            <MySelect
              value={
                (parseMedia as ComicsParseResponse)?.comicsType ||
                ComicsEnum.Comics
              }
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setParseMedia((prev) => {
                  return {
                    ...prev,
                    comicsType: event.target.value as ComicsEnum,
                  };
                })
              }
            >
              <option value={ComicsEnum.Comics}>Comics</option>
              <option value={ComicsEnum.GraphicNovel}>GraphicNovel</option>
              <option value={ComicsEnum.Manga}>Manga</option>
              <option value={ComicsEnum.Manhwa}>Manhwa</option>
            </MySelect>
          )}
          {mediaType === MediaEnum.Book && (
            <MySelect
              value={
                (parseMedia as BookParseResponse)?.bookType || BookEnum.Fiction
              }
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setParseMedia((prev) => {
                  return {
                    ...prev,
                    bookType: event.target.value as BookEnum,
                  };
                })
              }
            >
              <option value={BookEnum.Fiction}>Fiction</option>
              <option value={BookEnum.NonFiction}>NonFiction</option>
            </MySelect>
          )}
        </MyTitle>
        {fields.map((cur) => {
          if (cur.type === "text") {
            return (
              cur.if && (
                <MyTitle title={cur.title} vsize={"md"} className="w-32 mx-4">
                  <MyTextarea
                    placeholder={cur.placeholder}
                    rows={cur.rows || 1}
                    maxLength={cur.maxLength}
                    value={cur.value}
                    onChange={cur.onChange}
                  />
                </MyTitle>
              )
            );
          }
          if (cur.type === "number") {
            return (
              cur.if && (
                <MyTitle title={cur.title} vsize={"md"} className="w-32 mx-4">
                  <MyInput
                    vsize={"lg"}
                    type="text"
                    pattern="\d*"
                    placeholder={cur.placeholder}
                    maxLength={cur.maxLength}
                    value={cur.value}
                    onChange={cur.onChange}
                  />
                </MyTitle>
              )
            );
          }
        })}
      </MyBlock>
      {mediaType === MediaEnum.Series && (
        <div className="rounded-2xl shadow bg-base-300 p-8 space-y-2 mt-8">
          <h3 className="font-head font-bold text-base text-center">
            Add seasons
          </h3>

          <table className="table bg-base-300">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th className="hidden sm:table-cell">Title</th>
                <th>Episodes</th>
              </tr>
            </thead>
            <tbody>
              {(parseMedia as SeriesParseResponse)?.seasons?.map((season) => (
                <tr key={season.season}>
                  <th className="text-center font-bold">{season.season}</th>
                  <td className="hidden sm:table-cell ">
                    <MyInput
                      type="text"
                      value={season.title || ""}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setParseMedia((prev) => {
                          const newSeasons = (
                            prev as SeriesParseResponse
                          )?.seasons?.map((oldSeason) => {
                            if (oldSeason.season === season.season) {
                              return {
                                ...season,
                                title: event.target.value,
                              };
                            }
                            return oldSeason;
                          });

                          return {
                            ...prev,
                            seasons: newSeasons,
                          };
                        });
                      }}
                    />
                  </td>
                  <td>
                    <MyInput
                      type="text"
                      pattern="\d*"
                      maxLength={4}
                      value={season.episodes || ""}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setParseMedia((prev) => {
                          const newSeasons = (
                            prev as SeriesParseResponse
                          )?.seasons?.map((oldSeason) => {
                            if (oldSeason.season === season.season) {
                              return {
                                ...season,
                                episodes:
                                  parseInt(event.target.value, 10) || null,
                              };
                            }
                            return oldSeason;
                          });
                          return {
                            ...prev,
                            seasons: newSeasons,
                          };
                        })
                      }
                    />
                  </td>
                  <td>
                    <MyButton
                      className="rounded-full"
                      onClick={() =>
                        setParseMedia((prev) => {
                          const newSeasons = (
                            prev as SeriesParseResponse
                          )?.seasons?.filter(
                            (_, index) => index < (season.season || 0) - 1
                          );

                          return {
                            ...prev,
                            seasons: newSeasons,
                          };
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </MyButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center">
            <MyButton
              vwide={"wide"}
              onClick={() =>
                setParseMedia((prev) => {
                  if (
                    ((prev as SeriesParseResponse)?.seasons?.length || 0) <= 69
                  ) {
                    const newSeason = {
                      season:
                        ((prev as SeriesParseResponse)?.seasons?.length || 0) +
                        1,
                      title: "",
                      episodes: 0,
                    };

                    const newSeasons = [
                      ...((prev as SeriesParseResponse)?.seasons || []),
                      newSeason,
                    ];

                    return {
                      ...prev,
                      seasons: newSeasons,
                    };
                  }
                  return prev;
                })
              }
            >
              Add Season{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            </MyButton>
          </div>
        </div>
      )}
      <div className="flex flex-col-reverse items-center gap-4 md:flex-row justify-center mt-8">
        <MyButton vwide={"wide"} onClick={handleDeleteButton}>
          Back
        </MyButton>
        <MyButton
          vwide={"wide"}
          vvariatns={"primary"}
          onClick={handleNextButton}
        >
          Next
        </MyButton>
      </div>
    </>
  );
});
export default CreateInputFields;
