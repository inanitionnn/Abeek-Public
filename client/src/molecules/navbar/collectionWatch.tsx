import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ComponentPropsWithoutRef, memo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DropdownType } from "../../constants";
import { WatchedEnum } from "../../graphql/__generated__/graphql";
import { setWatchedState } from "../../redux/reducers/collectionSlice";
import MyButton from "../../atom/myButton";
import MyDropdown from "../../atom/myDropdown";

type Props = ComponentPropsWithoutRef<"div"> & {};

const CollectionWatch = memo((props: Props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const { watched } = useAppSelector((state) => state.collection);

  const [isDropdown, setIsDropdown] = useState<DropdownType>("none");

  return (
    <div className={twMerge("flex h-1/3", className)}>
      <MyButton
        disabled={isDropdown !== "none"}
        vvariatns={"navbar"}
        vsize={"sm"}
        vwide={"full"}
        className="justify-start h-full"
        onClick={() => setIsDropdown("watch")}
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
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="capitalize ">{watched || "all"}</p>
      </MyButton>
      <MyDropdown isModal={isDropdown === "watch"} setIsModal={setIsDropdown}>
        {[
          { title: "All", val: null },
          { title: "Rated", val: WatchedEnum.Rated },
          { title: "Planned", val: WatchedEnum.Planned },
          { title: "Completed", val: WatchedEnum.Completed },
          { title: "Viewing", val: WatchedEnum.Viewing },
          { title: "Reviewing", val: WatchedEnum.Reviewing },
          { title: "Paused", val: WatchedEnum.Paused },
          { title: "Abandoned", val: WatchedEnum.Abandoned },
        ].map(({ val, title }) => (
          <li className="w-full">
            <MyButton
              vsize={"sm"}
              vwide={"full"}
              vvariatns={"navbar"}
              onClick={() => {
                dispatch(setWatchedState(val));
                setIsDropdown("none");
              }}
            >
              {title}
            </MyButton>
          </li>
        ))}
      </MyDropdown>
    </div>
  );
});
export default CollectionWatch;
