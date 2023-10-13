import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { cn } from "../utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";

export const headerVariants = cva(
  "text-center font-bold font-head break-words",
  {
    variants: {
      vsize: {
        sm: "text-sm leading-sm",
        md: "text-base leading-base",
        lg: "text-lg leading-lg",
        xl: "text-xl tracking-tight leading-xl xl:text-2xl xl:leading-2xl",
      },
    },
    defaultVariants: {
      vsize: "md",
    },
  }
);

type Props = ComponentPropsWithRef<"h3"> &
  VariantProps<typeof headerVariants> & {};

export const MyHeader = forwardRef(
  (props: Props, ref: Ref<HTMLHeadingElement>) => {
    const { className, vsize, children, ...restProps } = props;
    return (
      <h3
        className={cn(headerVariants({ vsize, className }))}
        ref={ref}
        {...restProps}
      >
        {children}
      </h3>
    );
  }
);
const MMyHeader = motion(MyHeader);
export default MMyHeader;
