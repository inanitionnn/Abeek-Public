import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { cn } from "../utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";

const containerVariants = cva(
  "mx-auto px-10 min-h-screen flex flex-col justify-center items-center gap-12 py-16",
  {
    variants: {
      vwide: {
        sm: "max-w-[860px]",
        md: "max-w-[1020px]",
        lg: "max-w-[1400px]",
      },
    },
    defaultVariants: {
      vwide: "md",
    },
  }
);

type Props = ComponentPropsWithRef<"div"> &
  VariantProps<typeof containerVariants> & {};

export const MyContainer = forwardRef(
  (props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, vwide, children, ...restProps } = props;
    return (
      <div
        className={cn(containerVariants({ vwide, className }))}
        ref={ref}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);
const MMyContainer = motion(MyContainer);
export default MMyContainer;
