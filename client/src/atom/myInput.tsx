import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { cn } from "../utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";

const inputVariants = cva(
  "input bg-base-200 shadow rounded-2xl w-full sm:text-base",
  {
    variants: {
      vsize: {
        default: "input-md",
        lg: "input-lg p-4 h-14",
      },
    },
    defaultVariants: {
      vsize: "default",
    },
  }
);

type Props = ComponentPropsWithRef<"input"> &
  VariantProps<typeof inputVariants> & {};

export const MyInput = forwardRef(
  (props: Props, ref: Ref<HTMLInputElement>) => {
    const { className, vsize, children, ...restProps } = props;
    return (
      <input
        className={cn(inputVariants({ vsize, className }))}
        ref={ref}
        {...restProps}
      >
        {children}
      </input>
    );
  }
);
const MMyInput = motion(MyInput);
export default MMyInput;
