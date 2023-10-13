import { motion } from "framer-motion";
import { memo } from "react";
import { slideAnimation } from "../../constants";

const FollowSkeleton = memo(() => {
  return (
    <>
      <motion.div
        variants={slideAnimation}
        className="animate-pulse flex flex-wrap justify-center gap-8 items-center w-full"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="w-full h-32 sm:w-2/5 bg-base-200 rounded-2xl"></div>
            <div className="flex gap-2 w-full">
              <div className="py-2 px-4 gap-2 w-1/3 sm:w-1/3 bg-base-200 rounded-2xl"></div>
              <div className="p-0 gap-2 w-full bg-base-200 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
});

export default FollowSkeleton;
