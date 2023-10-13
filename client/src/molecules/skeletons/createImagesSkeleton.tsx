import { memo } from "react";

const CreateImagesSkeleton = memo(() => {
  return (
    <>
      <div className="space-y-4 px-8">
        <div className="animate-pulse flex gap-4">
          <div className="w-full h-12 bg-base-300 rounded-lg"></div>
          <div className="w-16 h-12 bg-base-200 rounded-lg"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-[3rem]">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse w-[70px] h-[105px] lg:w-[80px] lg:h-[120px] rounded-lg bg-base-300"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
});
export default CreateImagesSkeleton;
