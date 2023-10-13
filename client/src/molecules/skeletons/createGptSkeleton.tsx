import { memo } from "react";

const CreateGptSkeleton = memo(() => {
  return (
    <>
      <div
        className={` sm:min-h-[300px] lg:min-h-[375px] p-8 shadow-lg rounded-2xl w-full bg-base-200 flex items-center`}
      >
        <div
          role="status"
          className="animate-pulse flex flex-col gap-3 items-star"
        >
          <div className="h-2 bg-base-300 rounded-full dark:bg-gray-700 w-[12rem] sm:w-[17rem] "></div>
          <div className="h-2 bg-base-100 rounded-full w-[5rem] sm:w-[10rem] "></div>
          <div className="h-2 bg-base-300 rounded-full w-[7rem] sm:w-[12rem] "></div>
          <div className="h-2 bg-base-100 rounded-full w-[9rem] sm:w-[14rem] "></div>
          <div className="h-2 bg-base-300 rounded-full w-[5rem] sm:w-[10rem] "></div>
          <div className="h-2 bg-base-100 rounded-full w-[11rem] sm:w-[16rem] "></div>
          <div className="h-2 bg-base-300 rounded-full w-[17rem] sm:w-[22rem] "></div>
          <div className="h-2 bg-base-100 rounded-full w-[9rem] sm:w-[14rem] "></div>
          <div className="h-2 bg-base-300 rounded-full w-[15rem] sm:w-[20rem] "></div>
          <div className="h-2 bg-base-100 rounded-full w-[13rem] sm:w-[18rem]"></div>
          <div className="h-2 bg-base-300 rounded-full w-[17rem] sm:w-[22rem] "></div>
          <div className="h-2 bg-base-100 rounded-full w-[9rem] sm:w-[14rem] "></div>
          <div className="h-2 bg-base-300 rounded-full w-[15rem] sm:w-[20rem] "></div>
          <div className="h-2 bg-base-100 rounded-full w-[13rem] sm:w-[18rem]"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
});

export default CreateGptSkeleton;
