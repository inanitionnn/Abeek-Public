import { motion } from "framer-motion";
import { memo } from "react";
import { slideAnimation } from "../../constants";

const RandomSkeleton = memo(() => {
  return (
    <>
      <motion.div
        variants={slideAnimation}
        className="animate-pulse flex flex-wrap justify-center gap-8 items-center"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex gap-4 p-4 bg-base-200 rounded-2xl">
            <div className="bg-base-300 w-[100px] h-[150px] md:w-[150px] md:h-[225px] rounded-2xl"></div>
            <div className="flex flex-col justify-between py-6">
              <div className="flex flex-col gap-3 items-start">
                <div className="h-6 bg-base-300 rounded-full w-32"></div>
                <div className="h-3 bg-base-300 rounded-full w-28"></div>
                <div className="h-3 bg-base-300 rounded-full w-16"></div>
                <div className="h-3 bg-base-300 rounded-full w-10"></div>
                <div className="h-3 bg-base-300 rounded-full w-14"></div>
              </div>
              <div className="flex flex-wrap max-w-[250px] gap-2">
                <div className="h-4 bg-base-300 rounded-full w-24"></div>
                <div className="h-4 bg-base-300 rounded-full w-28"></div>
                <div className="h-4 bg-base-300 rounded-full w-20"></div>
                <div className="h-4 bg-base-300 rounded-full w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
});

export default RandomSkeleton;
