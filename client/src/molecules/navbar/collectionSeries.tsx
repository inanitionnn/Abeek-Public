import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setMediaTypeState,
  setSeriesTypeState,
} from "../../redux/reducers/typesSlice";
import { MediaEnum, SeriesEnum } from "../../graphql/__generated__/graphql";
import { ComponentPropsWithoutRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import MyButton from "../../atom/myButton";

type Props = ComponentPropsWithoutRef<"div"> & {};

export const CollectionSeries = memo((props: Props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const { mediaType, seriesType } = useAppSelector((state) => state.types);

  return (
    <div
      className={twMerge(
        "h-1/5 flex items-center justify-center gap-2",
        className
      )}
    >
      <div className="py-2 h-full">
        <MyButton
          vvariatns={"navbar"}
          className="h-full px-0 w-16"
          onClick={() => {
            dispatch(setMediaTypeState(MediaEnum.Series));
            dispatch(setSeriesTypeState(null));
          }}
        >
          {seriesType === null && mediaType === MediaEnum.Series ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
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
          )}
        </MyButton>
      </div>
      <div className="flex flex-col justify-center items-center h-full w-full py-1">
        {[
          { title: "Animated", val: SeriesEnum.Animated },
          { title: "Anime", val: SeriesEnum.Anime },
          { title: "TV", val: SeriesEnum.Tv },
        ].map(({ val, title }) => (
          <div className="h-1/3 py-1 w-full">
            <MyButton
              vvariatns={"navbar"}
              vwide={"full"}
              vsize={"sm"}
              className={clsx({
                "h-full justify-start": true,
                "font-black bg-base-200":
                  mediaType === MediaEnum.Series &&
                  (seriesType === val || seriesType === null),
                "font-normal": !(
                  mediaType === MediaEnum.Series &&
                  (seriesType === val || seriesType === null)
                ),
              })}
              onClick={() => {
                dispatch(setMediaTypeState(MediaEnum.Series));
                dispatch(setSeriesTypeState(val));
              }}
            >
              {title}
            </MyButton>
          </div>
        ))}
      </div>
    </div>
  );
});
