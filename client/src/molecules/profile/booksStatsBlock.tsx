import StatsBar from "../../molecules/profile/statsBar";
import {
  BookEnum,
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

const BooksStatsBlock = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, mediaStats, ...restProps } = props;
    const [media, setMedia] = useState(mediaStats?.books?.all);
    const [booksType, setBooksType] = useState<BookEnum | null>(null);

    useEffect(() => {
      setMedia(mediaStats?.books?.all);
    }, []);

    useEffect(() => {
      switch (booksType) {
        case null: {
          setMedia(mediaStats?.books?.all);
          break;
        }
        case BookEnum.Fiction: {
          setMedia(mediaStats?.books?.fiction);
          break;
        }
        case BookEnum.NonFiction: {
          setMedia(mediaStats?.books?.nonFiction);
          break;
        }
      }
    }, [booksType]);

    return (
      <div ref={ref} className={twMerge("", className)} {...restProps}>
        <div className="grid grid-cols-3 grid-rows-1 gap-1">
          <MyButton
            vvariatns={booksType === null ? "statsOn" : "statsOff"}
            onClick={() => setBooksType(null)}
          >
            All
          </MyButton>
          <MyButton
            vvariatns={booksType === BookEnum.Fiction ? "statsOn" : "statsOff"}
            onClick={() => setBooksType(BookEnum.Fiction)}
          >
            {BookEnum.Fiction}
          </MyButton>
          <MyButton
            vvariatns={
              booksType === BookEnum.NonFiction ? "statsOn" : "statsOff"
            }
            onClick={() => setBooksType(BookEnum.NonFiction)}
          >
            Non <br /> Fiction
          </MyButton>
        </div>
        <MyBlock className="rounded-t-none bg-neutral p-6">
          <MyBlock>
            <MyHeader vsize={"lg"}>
              {booksType === BookEnum.Fiction && "Fiction Books"}
              {booksType === BookEnum.NonFiction && "Non Fiction Books"}
              {booksType === null && "All Books"}
            </MyHeader>
            <div className="flex flex-col gap-2">
              <StatsBar
                title="Planned"
                firstCount={
                  media?.plannedCount ?? mediaStats?.books?.all?.plannedCount
                }
                max={media?.allCount ?? mediaStats?.books?.all?.allCount}
              />
              <StatsBar
                title="Completed"
                firstCount={
                  media?.completedCount ??
                  mediaStats?.books?.all?.completedCount
                }
                max={media?.allCount ?? mediaStats?.books?.all?.allCount}
              />
              <StatsBar
                title="Paused"
                firstCount={
                  media?.pausedCount ?? mediaStats?.books?.all?.pausedCount
                }
                max={media?.allCount ?? mediaStats?.books?.all?.allCount}
              />
              <StatsBar
                title="Abandoned"
                firstCount={
                  media?.abandonedCount ??
                  mediaStats?.books?.all?.abandonedCount
                }
                max={media?.allCount ?? mediaStats?.books?.all?.allCount}
              />
              <StatsBar
                title="Viewing"
                firstCount={
                  media?.viewingCount ?? mediaStats?.books?.all?.viewingCount
                }
                max={media?.allCount ?? mediaStats?.books?.all?.allCount}
              />
              <StatsBar
                title="Reviewing"
                firstCount={
                  media?.reviewingCount ??
                  mediaStats?.books?.all?.reviewingCount
                }
                max={media?.allCount ?? mediaStats?.books?.all?.reviewingCount}
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
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <MyHeader className="font-head font-bold">
                  {media?.allCount ?? mediaStats?.books?.all?.allCount}
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
                    mediaStats?.books?.all?.averageRating}
                </MyHeader>
              </div>
            </div>
          </MyBlock>
        </MyBlock>
      </div>
    );
  })
);

export default BooksStatsBlock;
