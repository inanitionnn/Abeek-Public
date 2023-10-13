import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { cn } from "../utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const buttonVariants = cva("btn rounded-2xl", {
  variants: {
    vvariatns: {
      primary: "btn-primary",
      warning: "btn-warning",
      error: "btn-error",
      disabled:
        "bg-success border-0 hover:bg-success no-animation cursor-default",
      neutral: "btn-neutral",
      statsOn:
        "rounded-b-none bg-neutral bg-opacity-80 hover:bg-opacity-80 text-primary-content border-0 hover:bg-neutral cursor-default no-animation",
      statsOff:
        "rounded-b-none bg-base-200 bg-opacity-80 hover:bg-opacity-80 text-base-content border-0 hover:bg-neutral-focus no-animation hover:text-primary-content transition duration-200 ease-out",
      colorfull:
        "group flex items-center justify-center text-current font-normal capitalize gap-4 bg-transparent hover:bg-gradient-to-br from-primary to-secondary ring-2 ring-primary hover:ring-0 border-0 transition ease-out duration-300",
      navbar:
        "group hover:bg-base-200 bg-transparent border-0 gap-4 text-current transition ease-out duration-300 font-normal leading-sm capitalize flex justify-center items-center",
    },
    vwide: {
      default: "w-auto",
      wide: "w-60",
      full: "w-full",
    },
    vsize: {
      sm: "btn-sm text-sm leading-sm ",
      md: "btn-md",
      lg: "btn-lg",
    },
  },
  defaultVariants: {
    vvariatns: "neutral",
    vwide: "default",
    vsize: "md",
  },
});

type Props = ComponentPropsWithRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    to?: string;
  };

export const MyButton = forwardRef(
  (props: Props, ref: Ref<HTMLButtonElement>) => {
    const { to, className, vwide, vsize, vvariatns, children, ...restProps } =
      props;
    if (to) {
      return (
        <Link to={to} className="w-full">
          <button
            className={cn(
              buttonVariants({ vsize, vwide, vvariatns, className })
            )}
            ref={ref}
            {...restProps}
          >
            {children}
          </button>
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ vsize, vwide, vvariatns, className }))}
        ref={ref}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);
const MMyButton = motion(MyButton);
export default MMyButton;
