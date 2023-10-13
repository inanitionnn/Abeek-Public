import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithRef<"select"> & {};

export const MySelect = forwardRef(
  (props: Props, ref: Ref<HTMLSelectElement>) => {
    const { className, children, ...restProps } = props;
    return (
      <select
        className={twMerge(
          "select select-primary rounded-2xl text-base select-md bg-primary text-primary-content",
          className
        )}
        ref={ref}
        {...restProps}
      >
        {children}
      </select>
    );
  }
);
const MMySelect = motion(MySelect);
export default MMySelect;
