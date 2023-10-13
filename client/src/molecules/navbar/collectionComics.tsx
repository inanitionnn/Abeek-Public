import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setComicsTypeState,
  setMediaTypeState,
} from "../../redux/reducers/typesSlice";
import { ComicsEnum, MediaEnum } from "../../graphql/__generated__/graphql";
import { ComponentPropsWithoutRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import MyButton from "../../atom/myButton";

type Props = ComponentPropsWithoutRef<"div"> & {};

export const CollectionComics = memo((props: Props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const { mediaType, comicsType } = useAppSelector((state) => state.types);

  return (
    <div
      className={twMerge(
        "h-[26.666666%] flex items-center justify-center gap-2",
        className
      )}
    >
      <div className="py-2 h-full">
        <MyButton
          vvariatns={"navbar"}
          className="h-full px-0 w-16"
          onClick={() => {
            dispatch(setMediaTypeState(MediaEnum.Comics));
            dispatch(setComicsTypeState(null));
          }}
        >
          {comicsType === null && mediaType === MediaEnum.Comics ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
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
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          )}
        </MyButton>
      </div>
      <div className="flex flex-col justify-center items-center h-full w-full py-1">
        {[
          { title: "Comics", val: ComicsEnum.Comics },
          { title: "Graphic Novel", val: ComicsEnum.GraphicNovel },
          { title: "Manga", val: ComicsEnum.Manga },
          { title: "Manhwa", val: ComicsEnum.Manhwa },
        ].map(({ val, title }) => (
          <div className="h-1/4 py-1 w-full">
            <MyButton
              vvariatns={"navbar"}
              vsize={"sm"}
              vwide={"full"}
              className={clsx({
                "h-full justify-start text-start": true,
                "font-black bg-base-200":
                  mediaType === MediaEnum.Comics &&
                  (comicsType === val || comicsType === null),
                "font-normal": !(
                  mediaType === MediaEnum.Comics &&
                  (comicsType === val || comicsType === null)
                ),
              })}
              onClick={() => {
                dispatch(setMediaTypeState(MediaEnum.Comics));
                dispatch(setComicsTypeState(val));
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
