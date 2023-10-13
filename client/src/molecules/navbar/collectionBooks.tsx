import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setBookTypeState,
  setMediaTypeState,
} from "../../redux/reducers/typesSlice";
import { BookEnum, MediaEnum } from "../../graphql/__generated__/graphql";
import { ComponentPropsWithoutRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import MyButton from "../../atom/myButton";

type Props = ComponentPropsWithoutRef<"div"> & {};

export const CollectionBooks = memo((props: Props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const { mediaType, bookType } = useAppSelector((state) => state.types);

  return (
    <div
      className={twMerge(
        "h-[13.333333%] flex items-center justify-center gap-2",
        className
      )}
    >
      <div className="py-2 h-full">
        <MyButton
          vvariatns={"navbar"}
          className="h-full px-0 w-16"
          onClick={() => {
            dispatch(setMediaTypeState(MediaEnum.Book));
            dispatch(setBookTypeState(null));
          }}
        >
          {bookType === null && mediaType === MediaEnum.Book ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          )}
        </MyButton>
      </div>
      <div className="flex flex-col justify-center items-center h-full w-full py-1">
        {[
          { title: "Fiction", val: BookEnum.Fiction },
          { title: "Non Fiction", val: BookEnum.NonFiction },
        ].map(({ val, title }) => (
          <div className="h-1/2 py-1 w-full">
            <MyButton
              vvariatns={"navbar"}
              vsize={"sm"}
              vwide={"full"}
              className={clsx({
                "h-full justify-start text-start": true,
                "font-black bg-base-200":
                  mediaType === MediaEnum.Book &&
                  (bookType === val || bookType === null),
                "font-normal": !(
                  mediaType === MediaEnum.Book &&
                  (bookType === val || bookType === null)
                ),
              })}
              onClick={() => {
                dispatch(setMediaTypeState(MediaEnum.Book));
                dispatch(setBookTypeState(val));
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
