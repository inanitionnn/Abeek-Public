import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { cn } from "../utils/cn";
import { motion } from "framer-motion";
import { VariantProps, cva } from "class-variance-authority";

const paragraphVariants = cva("text-center break-words", {
  variants: {
    vsize: {
      sm: "text-sm tracking-wide leading-sm",
      md: "text-base leading-base",
      lg: "text-lg leading-lg",
    },
  },
  defaultVariants: {
    vsize: "md",
  },
});

type Props = ComponentPropsWithRef<"p"> &
  VariantProps<typeof paragraphVariants> & {};

export const MyParagraph = forwardRef(
  (props: Props, ref: Ref<HTMLParagraphElement>) => {
    const { className, vsize, children, ...restProps } = props;
    return (
      <p
        className={cn(paragraphVariants({ vsize, className }))}
        ref={ref}
        {...restProps}
      >
        {children}
      </p>
    );
  }
);
const MMyParagraph = motion(MyParagraph);
export default MMyParagraph;
