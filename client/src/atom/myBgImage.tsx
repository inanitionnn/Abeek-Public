import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../utils/cn";

const bgVariants = cva("bg-center bg-cover bg-fixed", {
  variants: {
    vvariatns: {
      fixed: "bg-fixed h-full",
      default: "h-screen",
    },
  },
  defaultVariants: {
    vvariatns: "default",
  },
});

type Props = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof bgVariants> & {};

const MyBgImage = (props: Props) => {
  const { className, children, vvariatns } = props;
  return (
    <div className={cn(bgVariants({ vvariatns }), className)}>{children}</div>
  );
};

export default MyBgImage;
