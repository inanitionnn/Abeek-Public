import { ComponentPropsWithRef, Ref, forwardRef, memo } from "react";
import { GetProfileInfoQuery } from "../../graphql/__generated__/graphql";
import { twMerge } from "tailwind-merge";
import StatsBar from "../../molecules/profile/statsBar";
import MyBlock from "../../atom/myBlock";
import MyHeader from "../../atom/myHeader";

type Props = ComponentPropsWithRef<"div"> & {
  mediaCount: GetProfileInfoQuery["getProfileInfo"]["mediaCount"];
  mediaStats: GetProfileInfoQuery["getProfileInfo"]["mediaStats"];
};

const MediaStatsBlock = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, mediaStats, mediaCount, ...restProps } = props;
    return (
      <div
        ref={ref}
        className={twMerge("flex justify-center w-full my-6", className)}
        {...restProps}
      >
        <MyBlock className="max-w-4xl ring-[24px] ring-neutral ring-opacity-80">
          <div className="flex flex-col gap-2 w-full">
            <StatsBar
              isSmall={false}
              title="Animated Films"
              firstCount={mediaStats?.films?.animated?.allCount}
              secondCount={
                (mediaStats?.films?.animated?.allCount || 0) -
                (mediaStats?.films?.animated?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Anime Films"
              firstCount={mediaStats?.films?.anime?.allCount}
              secondCount={
                (mediaStats?.films?.anime?.allCount || 0) -
                (mediaStats?.films?.anime?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Movies"
              firstCount={mediaStats?.films?.movie?.allCount}
              secondCount={
                (mediaStats?.films?.movie?.allCount || 0) -
                (mediaStats?.films?.movie?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Animated Series"
              firstCount={mediaStats?.series?.animated?.allCount}
              secondCount={
                (mediaStats?.series?.animated?.allCount || 0) -
                (mediaStats?.series?.animated?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Anime Series"
              firstCount={mediaStats?.series?.anime?.allCount}
              secondCount={
                (mediaStats?.series?.anime?.allCount || 0) -
                (mediaStats?.series?.anime?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="TV Series"
              firstCount={mediaStats?.series?.tv?.allCount}
              secondCount={
                (mediaStats?.series?.tv?.allCount || 0) -
                (mediaStats?.series?.tv?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Comics"
              firstCount={mediaStats?.comics?.comics?.allCount}
              secondCount={
                (mediaStats?.comics?.comics?.allCount || 0) -
                (mediaStats?.comics?.comics?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Graphic Novel"
              firstCount={mediaStats?.comics?.graphicNovel?.allCount}
              secondCount={
                (mediaStats?.comics?.graphicNovel?.allCount || 0) -
                (mediaStats?.comics?.graphicNovel?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Manga"
              firstCount={mediaStats?.comics?.manga?.allCount}
              secondCount={
                (mediaStats?.comics?.manga?.allCount || 0) -
                (mediaStats?.comics?.manga?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Manhwa"
              firstCount={mediaStats?.comics?.manhwa?.allCount}
              secondCount={
                (mediaStats?.comics?.manhwa?.allCount || 0) -
                (mediaStats?.comics?.manhwa?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Fiction Books"
              firstCount={mediaStats?.books?.fiction?.allCount}
              secondCount={
                (mediaStats?.books?.fiction?.allCount || 0) -
                (mediaStats?.books?.fiction?.plannedCount || 0)
              }
              max={mediaCount}
            />
            <StatsBar
              isSmall={false}
              title="Non fiction Books"
              firstCount={mediaStats?.books?.nonFiction?.allCount}
              secondCount={
                (mediaStats?.books?.nonFiction?.allCount || 0) -
                (mediaStats?.books?.nonFiction?.plannedCount || 0)
              }
              max={mediaCount}
            />
          </div>
          <div className="flex gap-4 items-center">
            <MyHeader className="font-head font-bold">
              All: {mediaCount}
            </MyHeader>
            <div className="flex items-center gap-2">
              <MyHeader className="font-head font-bold">Media:</MyHeader>
              <div className="w-4 h-4 bg-info rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <MyHeader className="font-head font-bold">Progress:</MyHeader>
              <div className="w-4 h-4 bg-primary rounded-full" />
            </div>
          </div>
        </MyBlock>
      </div>
    );
  })
);
export default MediaStatsBlock;
