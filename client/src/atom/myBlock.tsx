import { VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { cn } from "../utils/cn";

const blockVariants = cva(
  "rounded-2xl shadow p-8 flex w-full flex-col gap-4 justify-center items-center bg-opacity-80",
  {
    variants: {
      vvariatns: {
        create: "bg-base-200",
        default: "bg-base-300",
      },
    },
    defaultVariants: {
      vvariatns: "default",
    },
  }
);

type Props = ComponentPropsWithRef<"div"> &
  VariantProps<typeof blockVariants> & {};

export const MyBlock = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  const { children, vvariatns, className, ...restProps } = props;
  return (
    <div
      ref={ref}
      className={cn(blockVariants({ vvariatns, className }))}
      {...restProps}
    >
      {children}
    </div>
  );
});
const MMyBlock = motion(MyBlock);
export default MMyBlock;
