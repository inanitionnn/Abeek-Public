import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ComponentPropsWithoutRef, memo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DropdownType } from "../../constants";
import { SortedEnum } from "../../graphql/__generated__/graphql";
import { setSortedState } from "../../redux/reducers/collectionSlice";
import MyButton from "../../atom/myButton";
import MyDropdown from "../../atom/myDropdown";

type Props = ComponentPropsWithoutRef<"div"> & {};

export const CollectionSort = memo((props: Props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const { sorted } = useAppSelector((state) => state.collection);

  const [isDropdown, setIsDropdown] = useState<DropdownType>("none");

  return (
    <div className={twMerge("flex h-1/3", className)}>
      <MyButton
        disabled={isDropdown !== "none"}
        vvariatns={"navbar"}
        vsize={"sm"}
        vwide={"full"}
        className="justify-start h-full"
        onClick={() => {
          setIsDropdown("order");
        }}
      >
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
            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
          />
        </svg>

        <div className="capitalize flex justify-center items-center gap-2">
          {[
            SortedEnum.DateDesc,
            SortedEnum.RateDesc,
            SortedEnum.TitleDesc,
            SortedEnum.YearDesc,
          ].includes(sorted) && sorted
            ? sorted.slice(0, -4)
            : sorted.slice(0, -3)}
          {[
            SortedEnum.DateDesc,
            SortedEnum.RateDesc,
            SortedEnum.TitleDesc,
            SortedEnum.YearDesc,
          ].includes(sorted) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </MyButton>
      <MyDropdown isModal={isDropdown === "order"} setIsModal={setIsDropdown}>
        {[
          { title: "Date", val: SortedEnum.DateAsc },
          { title: "Date", val: SortedEnum.DateDesc },
          { title: "Rate", val: SortedEnum.RateAsc },
          { title: "Rate", val: SortedEnum.RateDesc },
          { title: "Title", val: SortedEnum.TitleAsc },
          { title: "Title", val: SortedEnum.TitleDesc },
          { title: "Year", val: SortedEnum.YearAsc },
          { title: "Year", val: SortedEnum.YearDesc },
        ].map(({ val, title }, index) => (
          <li className="w-full">
            <MyButton
              vsize={"sm"}
              vwide={"full"}
              vvariatns={"navbar"}
              onClick={() => {
                dispatch(setSortedState(val));
                setIsDropdown("none");
              }}
            >
              <div className="flex justify-center items-center gap-2">
                {title}
                {index % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </MyButton>
          </li>
        ))}
      </MyDropdown>
    </div>
  );
});
