import StatsBar from "./statsBar";
import {
  FilmEnum,
  GetProfileInfoQuery,
} from "../../graphql/__generated__/graphql";
import {
  ComponentPropsWithRef,
  Ref,
  forwardRef,
  memo,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import MyButton from "../../atom/myButton";
import MyBlock from "../../atom/myBlock";
import MyHeader from "../../atom/myHeader";

type Props = ComponentPropsWithRef<"div"> & {
  mediaStats: GetProfileInfoQuery["getProfileInfo"]["mediaStats"];
};

const FilmsStatsBlock = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, mediaStats, ...restProps } = props;
    const [media, setMedia] = useState(mediaStats?.films?.all);
    const [filmType, setFilmType] = useState<FilmEnum | null>(null);

    useEffect(() => {
      switch (filmType) {
        case null: {
          setMedia(mediaStats?.films?.all);
          break;
        }
        case FilmEnum.Animated: {
          setMedia(mediaStats?.films?.animated);
          break;
        }
        case FilmEnum.Anime: {
          setMedia(mediaStats?.films?.anime);
          break;
        }
        case FilmEnum.Movie: {
          setMedia(mediaStats?.films?.movie);
          break;
        }
      }
    }, [filmType]);

    return (
      <div ref={ref} className={twMerge("", className)} {...restProps}>
        <div className="grid grid-cols-4 grid-rows-1 gap-1">
          <MyButton
            vvariatns={filmType === null ? "statsOn" : "statsOff"}
            onClick={() => setFilmType(null)}
          >
            All
          </MyButton>
          <MyButton
            vvariatns={filmType === FilmEnum.Animated ? "statsOn" : "statsOff"}
            onClick={() => setFilmType(FilmEnum.Animated)}
          >
            {FilmEnum.Animated}
          </MyButton>
          <MyButton
            vvariatns={filmType === FilmEnum.Anime ? "statsOn" : "statsOff"}
            onClick={() => setFilmType(FilmEnum.Anime)}
          >
            {FilmEnum.Anime}
          </MyButton>
          <MyButton
            vvariatns={filmType === FilmEnum.Movie ? "statsOn" : "statsOff"}
            onClick={() => setFilmType(FilmEnum.Movie)}
          >
            {FilmEnum.Movie}
          </MyButton>
        </div>
        <MyBlock className="rounded-t-none bg-neutral p-6">
          <MyBlock>
            <MyHeader vsize={"lg"}>
              {filmType === FilmEnum.Animated && "Animated Films"}
              {filmType === FilmEnum.Anime && "Anime Films"}
              {filmType === FilmEnum.Movie && "Movies"}
              {filmType === null && "All Films"}
            </MyHeader>
            <div className="flex flex-col gap-2">
              <StatsBar
                title="Planned"
                firstCount={
                  media?.plannedCount ?? mediaStats?.films?.all?.plannedCount
                }
                max={media?.allCount ?? mediaStats?.films?.all?.allCount}
              />
              <StatsBar
                title="Completed"
                firstCount={
                  media?.completedCount ??
                  mediaStats?.films?.all?.completedCount
                }
                max={media?.allCount ?? mediaStats?.films?.all?.allCount}
              />
              <StatsBar
                title="Paused"
                firstCount={
                  media?.pausedCount ?? mediaStats?.films?.all?.pausedCount
                }
                max={media?.allCount ?? mediaStats?.films?.all?.allCount}
              />
              <StatsBar
                title="Abandoned"
                firstCount={
                  media?.abandonedCount ??
                  mediaStats?.films?.all?.abandonedCount
                }
                max={media?.allCount ?? mediaStats?.films?.all?.allCount}
              />
              <StatsBar
                title="Viewing"
                firstCount={
                  media?.viewingCount ?? mediaStats?.films?.all?.viewingCount
                }
                max={media?.allCount ?? mediaStats?.films?.all?.allCount}
              />
              <StatsBar
                title="Reviewing"
                firstCount={
                  media?.reviewingCount ??
                  mediaStats?.films?.all?.reviewingCount
                }
                max={media?.allCount ?? mediaStats?.films?.all?.reviewingCount}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                  />
                </svg>
                <MyHeader className="font-head font-bold">
                  {media?.allCount ?? mediaStats?.films?.all?.allCount}
                </MyHeader>
              </div>

              <div
                className="flex items-center gap-2 tooltip"
                data-tip="average rating"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>

                <MyHeader className="font-head font-bold">
                  {media?.averageRating ??
                    mediaStats?.films?.all?.averageRating}
                </MyHeader>
              </div>
            </div>
          </MyBlock>
        </MyBlock>
      </div>
    );
  })
);

export default FilmsStatsBlock;
