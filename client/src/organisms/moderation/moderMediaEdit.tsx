import React, { ChangeEvent, memo } from "react";
import {
  BookEnum,
  ComicsEnum,
  FilmEnum,
  GetModerEditMediaQuery,
  SeriesEnum,
  SeriesModerResponse,
  SeriesSeasonResponse,
} from "../../graphql/__generated__/graphql";
import { Field } from "../../constants";
import { MyTitle } from "../../molecules/myTitle";
import MyTextarea from "../../atom/myTextarea";
import { MyInput } from "../../atom/myInput";
import { MyButton } from "../../atom/myButton";
import { MyBlock } from "../../atom/myBlock";
import { MySelect } from "../../atom/mySelect";
import { MyHeader } from "../../atom/myHeader";
import { getSeasonNumber } from "../../utils/getSeasonNumber";

type Props = {
  media: GetModerEditMediaQuery["getModerEditMedia"];
  setMedia: React.Dispatch<
    React.SetStateAction<GetModerEditMediaQuery["getModerEditMedia"]>
  >;
  fields: Field[];
};

const ModerMediaEdit = memo((props: Props) => {
  const { media, setMedia, fields } = props;

  const handleAddSeason = () => {
    setMedia((prev) => {
      if (((prev as SeriesModerResponse)?.seasons?.length || 0) <= 69) {
        const newSeasonNumber = getSeasonNumber(
          (prev as SeriesModerResponse)?.seasons
        );
        const newSeason: SeriesSeasonResponse = {
          season: newSeasonNumber,
          title: "",
          episodes: 0,
        };

        const newSeasons = [
          ...((prev as SeriesModerResponse)?.seasons || []),
          newSeason,
        ].sort((a, b) => (a.season || 0) - (b.season || 0));

        return {
          ...prev,
          seasons: newSeasons,
        };
      }
      return prev;
    });
  };

  return (
    <>
      <MyBlock>
        <MyTitle title="Type: " vsize={"md"} className="w-32 mx-4">
          {media?.__typename === "FilmBaseResponse" && (
            <MySelect
              value={media?.filmType || FilmEnum.Movie}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setMedia((prev) => {
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
          {media?.__typename === "SeriesModerResponse" && (
            <MySelect
              value={media?.seriesType || SeriesEnum.Tv}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setMedia((prev) => {
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
          {media?.__typename === "ComicsBaseResponse" && (
            <MySelect
              value={media?.comicsType || ComicsEnum.Comics}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setMedia((prev) => {
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
          {media?.__typename === "BookBaseResponse" && (
            <MySelect
              value={media?.bookType || BookEnum.Fiction}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setMedia((prev) => {
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
            return cur.if ? (
              <MyTitle title={cur.title} vsize={"md"} className="w-32 mx-4">
                <MyTextarea
                  placeholder={cur.placeholder}
                  rows={cur.rows || 1}
                  maxLength={cur.maxLength}
                  value={cur.value}
                  onChange={cur.onChange}
                />
              </MyTitle>
            ) : null;
          }
          if (cur.type === "number") {
            return cur.if ? (
              <MyTitle title={cur.title} vsize={"md"} className="w-32 mx-4">
                <MyInput
                  type="text"
                  pattern="\d*"
                  placeholder={cur.placeholder}
                  maxLength={cur.maxLength}
                  value={cur.value}
                  onChange={cur.onChange}
                />
              </MyTitle>
            ) : null;
          }
        })}
      </MyBlock>

      {media?.__typename === "SeriesModerResponse" && (
        <MyBlock>
          <MyHeader vsize={"lg"}>Add seasons</MyHeader>

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
              {media?.seasons?.map((season) => (
                <tr key={season.season}>
                  <th className="font-normal text-center">({season.season})</th>
                  <td className="hidden sm:table-cell ">
                    <MyInput
                      type="text"
                      value={season.title || ""}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setMedia((prev) => {
                          const newSeasons = (
                            prev as SeriesModerResponse
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
                        setMedia((prev) => {
                          const newSeasons = (
                            prev as SeriesModerResponse
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
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center">
            <MyButton vwide={"wide"} onClick={handleAddSeason}>
              Add{" "}
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
        </MyBlock>
      )}
    </>
  );
});

export default ModerMediaEdit;
