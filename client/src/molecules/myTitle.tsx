import { ComponentPropsWithoutRef, Ref, forwardRef, memo } from "react";
import { VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import MyHeader, { headerVariants } from "../atom/myHeader";

type Props = ComponentPropsWithoutRef<"h3"> &
  VariantProps<typeof headerVariants> & {
    title: string;
  };

const MyTitle = memo(
  forwardRef(
    (
      { className, vsize, title, children, ...props }: Props,
      ref: Ref<HTMLDivElement>
    ) => {
      return (
        <div
          className={
            "flex flex-col md:flex-row md:gap-2 items-start md:items-center w-full"
          }
          ref={ref}
          {...props}
        >
          <MyHeader
            vsize={vsize}
            className={twMerge("text-start md:text-end", className)}
          >
            {title}
          </MyHeader>
          {children}
        </div>
      );
    }
  )
);
const MMyTitle = motion(MyTitle);
export { MyTitle, MMyTitle };
