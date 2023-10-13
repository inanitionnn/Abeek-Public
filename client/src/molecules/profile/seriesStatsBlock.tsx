import StatsBar from "../../molecules/profile/statsBar";
import {
  GetProfileInfoQuery,
  SeriesEnum,
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

const SeriesStatsBlock = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, mediaStats, ...restProps } = props;
    const [media, setMedia] = useState(mediaStats?.series?.all);
    const [seriesType, setSeriesType] = useState<SeriesEnum | null>(null);

    useEffect(() => {
      switch (seriesType) {
        case null: {
          setMedia(mediaStats?.series?.all);
          break;
        }
        case SeriesEnum.Animated: {
          setMedia(mediaStats?.series?.animated);
          break;
        }
        case SeriesEnum.Anime: {
          setMedia(mediaStats?.series?.anime);
          break;
        }
        case SeriesEnum.Tv: {
          setMedia(mediaStats?.series?.tv);
          break;
        }
      }
    }, [seriesType]);

    return (
      <div ref={ref} className={twMerge("", className)} {...restProps}>
        <div className="grid grid-cols-4 grid-rows-1 gap-1">
          <MyButton
            vvariatns={seriesType === null ? "statsOn" : "statsOff"}
            onClick={() => setSeriesType(null)}
          >
            All
          </MyButton>
          <MyButton
            vvariatns={
              seriesType === SeriesEnum.Animated ? "statsOn" : "statsOff"
            }
            onClick={() => setSeriesType(SeriesEnum.Animated)}
          >
            {SeriesEnum.Animated}
          </MyButton>
          <MyButton
            vvariatns={seriesType === SeriesEnum.Anime ? "statsOn" : "statsOff"}
            onClick={() => setSeriesType(SeriesEnum.Anime)}
          >
            {SeriesEnum.Anime}
          </MyButton>
          <MyButton
            vvariatns={seriesType === SeriesEnum.Tv ? "statsOn" : "statsOff"}
            onClick={() => setSeriesType(SeriesEnum.Tv)}
          >
            {SeriesEnum.Tv}
          </MyButton>
        </div>
        <MyBlock className="rounded-t-none bg-neutral p-6">
          <MyBlock>
            <MyHeader vsize={"lg"}>
              {seriesType === SeriesEnum.Animated && "Animated Series"}
              {seriesType === SeriesEnum.Anime && "Anime Series"}
              {seriesType === SeriesEnum.Tv && "TV Series"}
              {seriesType === null && "All Series"}
            </MyHeader>
            <div className="flex flex-col gap-2">
              <StatsBar
                title="Planned"
                firstCount={
                  media?.plannedCount ?? mediaStats?.series?.all?.plannedCount
                }
                max={media?.allCount ?? mediaStats?.series?.all?.allCount}
              />
              <StatsBar
                title="Completed"
                firstCount={
                  media?.completedCount ??
                  mediaStats?.series?.all?.completedCount
                }
                max={media?.allCount ?? mediaStats?.series?.all?.allCount}
              />
              <StatsBar
                title="Paused"
                firstCount={
                  media?.pausedCount ?? mediaStats?.series?.all?.pausedCount
                }
                max={media?.allCount ?? mediaStats?.series?.all?.allCount}
              />
              <StatsBar
                title="Abandoned"
                firstCount={
                  media?.abandonedCount ??
                  mediaStats?.series?.all?.abandonedCount
                }
                max={media?.allCount ?? mediaStats?.series?.all?.allCount}
              />
              <StatsBar
                title="Viewing"
                firstCount={
                  media?.viewingCount ?? mediaStats?.series?.all?.viewingCount
                }
                max={media?.allCount ?? mediaStats?.series?.all?.allCount}
              />
              <StatsBar
                title="Reviewing"
                firstCount={
                  media?.reviewingCount ??
                  mediaStats?.series?.all?.reviewingCount
                }
                max={media?.allCount ?? mediaStats?.series?.all?.reviewingCount}
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
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </svg>
                <MyHeader className="font-head font-bold">
                  {media?.allCount ?? mediaStats?.series?.all?.allCount}
                </MyHeader>
              </div>

              <div
                className="flex items-center gap-2 tooltip"
                data-tip="average ratinga"
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
                    mediaStats?.series?.all?.averageRating}
                </MyHeader>
              </div>
            </div>
          </MyBlock>
        </MyBlock>
      </div>
    );
  })
);

export default SeriesStatsBlock;
