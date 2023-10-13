import { motion } from "framer-motion";
import { memo } from "react";
import { slideAnimation } from "../../constants";

const CreateWikiSkeleton = memo(() => {
  return (
    <>
      <motion.div variants={slideAnimation} className="w-full ">
        <div className="rounded-2xl shadow-lg flex justify-center items-center gap-8 p-8 bg-base-200">
          <div className="animate-pulse rounded-2xl bg-base-300  h-60 w-40  md:h-72 md:w-48"></div>
          <div className="animate-pulse">
            <div className="space-y-2">
              <div className="h-6 bg-base-300 rounded-2xl w-[12rem] sm:w-[16rem]"></div>
              <div className="h-3 bg-base-300 rounded-2xl w-[5rem] sm:w-[7rem]"></div>
              <div className="h-3 bg-base-300 rounded-2xl w-[7rem] sm:w-[12rem]"></div>
              <div className="h-3 bg-base-300 rounded-2xl w-[6rem] sm:w-[10rem]"></div>
              <div className="h-3 bg-base-300 rounded-2xl w-[10rem] sm:w-[20rem]"></div>
            </div>
            <div className="flex gap-4 mt-4 flex-col-reverse lg:flex-row">
              <div className="bg-base-300 md:w-56 h-12 rounded-2xl"></div>
              <div className="bg-base-300 md:w-56 h-12 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
});

export default CreateWikiSkeleton;
