import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils/cn";

const bgVariants = cva("bg-base-100", {
  variants: {
    vopacity: {
      strong: "bg-opacity-[0.95]",
      medium: "bg-opacity-[0.70]",
      weak: "bg-opacity-[0.30]",
    },
  },
  defaultVariants: {
    vopacity: "strong",
  },
});

type Props = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof bgVariants> & {};

const MyBgColor = (props: Props) => {
  const { className, children, vopacity } = props;
  return (
    <div className={cn(bgVariants({ vopacity }), className)}>{children}</div>
  );
};

export default MyBgColor;
