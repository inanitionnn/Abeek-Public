import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { cn } from "../utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { motion } from "framer-motion";

const textareaVariants = cva(
  "textarea bg-base-200 shadow w-full text-start text-sm leading-sm sm:text-base leading-base rounded-2xl break-words",
  {
    variants: {
      vsize: {
        default: "textarea-md",
        lg: "textarea-lg p-4",
      },
    },
    defaultVariants: {
      vsize: "default",
    },
  }
);

type Props = ComponentPropsWithRef<"textarea"> &
  VariantProps<typeof textareaVariants> & {};

export const MyTextarea = forwardRef(
  (props: Props, ref: Ref<HTMLTextAreaElement>) => {
    const { className, vsize, children, ...restProps } = props;
    return (
      <textarea
        className={cn(textareaVariants({ vsize, className }))}
        ref={ref}
        {...restProps}
      >
        {children}
      </textarea>
    );
  }
);
const MMyTextarea = motion(MyTextarea);
export default MMyTextarea;
