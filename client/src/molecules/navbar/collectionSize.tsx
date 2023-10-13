import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ComponentPropsWithoutRef, memo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DropdownType, sizeType } from "../../constants";
import { setSizeState } from "../../redux/reducers/collectionSlice";
import MyButton from "../../atom/myButton";
import MyDropdown from "../../atom/myDropdown";

type Props = ComponentPropsWithoutRef<"div"> & {};

export const CollectionSize = memo((props: Props) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const { size } = useAppSelector((state) => state.collection);

  const [isDropdown, setIsDropdown] = useState<DropdownType>("none");

  return (
    <div className={twMerge("flex h-1/3", className)}>
      <MyButton
        disabled={isDropdown !== "none"}
        vvariatns={"navbar"}
        vsize={"sm"}
        vwide={"full"}
        className="justify-start h-full"
        onClick={() => setIsDropdown("size")}
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
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
          />
        </svg>

        <p className="capitalize">{size}</p>
      </MyButton>
      <MyDropdown isModal={isDropdown === "size"} setIsModal={setIsDropdown}>
        {(
          [
            { title: "Big", val: "big" },
            { title: "Medium", val: "medium" },
            { title: "Small", val: "small" },
          ] as { title: string; val: sizeType }[]
        ).map(({ val, title }) => (
          <li className="w-full">
            <MyButton
              vsize={"sm"}
              vwide={"full"}
              vvariatns={"navbar"}
              onClick={() => {
                dispatch(setSizeState(val));
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
