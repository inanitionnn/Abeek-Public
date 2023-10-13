import { ComponentPropsWithoutRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import MyParagraph from "../../atom/myParagraph";
import MyHeader from "../../atom/myHeader";

type Props = ComponentPropsWithoutRef<"div"> & {
  title: string;
  firstCount: number | null | undefined;
  secondCount?: number | null | undefined;
  max: number | null | undefined;
  isSmall?: boolean;
};

const StatsBar = memo((props: Props) => {
  const {
    className,
    firstCount,
    secondCount,
    max,
    isSmall = true,
    title,
    ...restProps
  } = props;
  return (
    <div
      className={twMerge("flex justify-between items-center gap-2", className)}
      {...restProps}
    >
      {isSmall ? (
        <>
          <MyParagraph className="font-bold basis-20 text-end">
            {title}
          </MyParagraph>
          <div className="relative w-28 sm:w-56">
            <progress
              className={clsx({
                "absolute top-0 right-0 z-10 progress w-full": true,
                "progress-info":
                  secondCount !== undefined && secondCount !== null,
                "progress-primary": !secondCount,
              })}
              value={firstCount || 0}
              max={max || 100}
            />
            <progress
              className="absolute top-0 right-0 z-20
             progress progress-primary w-full"
              value={secondCount || 0}
              max={max || 100}
            />
          </div>
          <MyHeader>
            {secondCount ? secondCount : ""}

            {secondCount ? "/" : ""}
            {firstCount}
          </MyHeader>
        </>
      ) : (
        <>
          <MyParagraph className="font-bold basis-32 sm:basis-52 text-end">
            {title}
          </MyParagraph>
          <div className="relative w-full min-w-28 sm:min-w-56">
            <progress
              className={clsx({
                "absolute -top-0 right-0 z-10 progress w-full": true,
                "progress-info":
                  secondCount !== undefined && secondCount !== null,
                "progress-primary": !secondCount,
              })}
              value={firstCount || 0}
              max={max || 100}
            />
            <progress
              className="absolute top-0 right-0 z-20
             progress progress-primary w-full"
              value={secondCount || 0}
              max={max || 100}
            />
          </div>
          <MyHeader className="basis-20">
            {secondCount !== null && secondCount !== undefined
              ? secondCount
              : ""}

            {secondCount !== null && secondCount !== undefined ? " / " : ""}
            {firstCount}
          </MyHeader>
        </>
      )}
    </div>
  );
});
export default StatsBar;
