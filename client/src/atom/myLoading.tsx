import { ComponentPropsWithRef, Ref, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithRef<"div"> & {};

const MyLoading = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
  const { className, ...restProp } = props;
  return (
    <div
      ref={ref}
      className={twMerge("flex justify-center", className)}
      {...restProp}
    >
      <span className="loading loading-infinity loading-lg" />
    </div>
  );
});
export default MyLoading;
