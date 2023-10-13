import StatsBar from "../../molecules/profile/statsBar";
import {
  ComicsEnum,
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

const ComicsStatsBlock = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, mediaStats, ...restProps } = props;
    const [media, setMedia] = useState(mediaStats?.comics?.all);
    const [comicsType, setComicsType] = useState<ComicsEnum | null>(null);

    useEffect(() => {
      switch (comicsType) {
        case null: {
          setMedia(mediaStats?.comics?.all);
          break;
        }
        case ComicsEnum.Comics: {
          setMedia(mediaStats?.comics?.comics);
          break;
        }
        case ComicsEnum.GraphicNovel: {
          setMedia(mediaStats?.comics?.graphicNovel);
          break;
        }
        case ComicsEnum.Manga: {
          setMedia(mediaStats?.comics?.manga);
          break;
        }
        case ComicsEnum.Manhwa: {
          setMedia(mediaStats?.comics?.manhwa);
          break;
        }
      }
    }, [comicsType]);

    return (
      <div ref={ref} className={twMerge("", className)} {...restProps}>
        <div className="grid grid-cols-5 grid-rows-1 gap-1">
          <MyButton
            vvariatns={comicsType === null ? "statsOn" : "statsOff"}
            onClick={() => setComicsType(null)}
          >
            All
          </MyButton>
          <MyButton
            vvariatns={
              comicsType === ComicsEnum.Comics ? "statsOn" : "statsOff"
            }
            onClick={() => setComicsType(ComicsEnum.Comics)}
          >
            {ComicsEnum.Comics}
          </MyButton>
          <MyButton
            vvariatns={
              comicsType === ComicsEnum.GraphicNovel ? "statsOn" : "statsOff"
            }
            onClick={() => setComicsType(ComicsEnum.GraphicNovel)}
          >
            Graphic <br /> Novel
          </MyButton>
          <MyButton
            vvariatns={comicsType === ComicsEnum.Manga ? "statsOn" : "statsOff"}
            onClick={() => setComicsType(ComicsEnum.Manga)}
          >
            {ComicsEnum.Manga}
          </MyButton>
          <MyButton
            vvariatns={
              comicsType === ComicsEnum.Manhwa ? "statsOn" : "statsOff"
            }
            onClick={() => setComicsType(ComicsEnum.Manhwa)}
          >
            {ComicsEnum.Manhwa}
          </MyButton>
        </div>
        <MyBlock className="rounded-t-none bg-neutral p-6">
          <MyBlock>
            <MyHeader vsize={"lg"}>
              {comicsType === ComicsEnum.Comics && "Comics"}
              {comicsType === ComicsEnum.GraphicNovel && "Graphic Novel"}
              {comicsType === ComicsEnum.Manga && "Manga"}
              {comicsType === ComicsEnum.Manhwa && "Manhwa"}
              {comicsType === null && "All Comics"}
            </MyHeader>
            <div className="flex flex-col gap-2">
              <StatsBar
                title="Planned"
                firstCount={
                  media?.plannedCount ?? mediaStats?.comics?.all?.plannedCount
                }
                max={media?.allCount ?? mediaStats?.comics?.all?.allCount}
              />
              <StatsBar
                title="Completed"
                firstCount={
                  media?.completedCount ??
                  mediaStats?.comics?.all?.completedCount
                }
                max={media?.allCount ?? mediaStats?.comics?.all?.allCount}
              />
              <StatsBar
                title="Paused"
                firstCount={
                  media?.pausedCount ?? mediaStats?.comics?.all?.pausedCount
                }
                max={media?.allCount ?? mediaStats?.comics?.all?.allCount}
              />
              <StatsBar
                title="Abandoned"
                firstCount={
                  media?.abandonedCount ??
                  mediaStats?.comics?.all?.abandonedCount
                }
                max={media?.allCount ?? mediaStats?.comics?.all?.allCount}
              />
              <StatsBar
                title="Viewing"
                firstCount={
                  media?.viewingCount ?? mediaStats?.comics?.all?.viewingCount
                }
                max={media?.allCount ?? mediaStats?.comics?.all?.allCount}
              />
              <StatsBar
                title="Reviewing"
                firstCount={
                  media?.reviewingCount ??
                  mediaStats?.comics?.all?.reviewingCount
                }
                max={media?.allCount ?? mediaStats?.comics?.all?.reviewingCount}
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
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                <MyHeader className="font-head font-bold">
                  {media?.allCount ?? mediaStats?.comics?.all?.allCount}
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
                    mediaStats?.comics?.all?.averageRating}
                </MyHeader>
              </div>
            </div>
          </MyBlock>
        </MyBlock>
      </div>
    );
  })
);

export default ComicsStatsBlock;
