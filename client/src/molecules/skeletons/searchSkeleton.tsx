import { motion } from "framer-motion";
import { memo } from "react";
import { slideAnimation } from "../../constants";

const SearchSkeleton = memo(() => {
  return (
    <>
      <motion.div
        variants={slideAnimation}
        className="animate-pulse flex flex-wrap gap-8 items-center justify-center"
      >
        {Array.from({ length: 9 }).map((_) => (
          <div className="flex flex-row p-6 w-auto bg-base-200 gap-4 rounded-2xl">
            <div className="min-w-[100px] max-w-[100px] h-[150px] bg-base-300 rounded-2xl" />
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-4 bg-base-300 rounded-2xl" />
                <div className="w-16 h-2 bg-base-300 rounded-2xl" />
                <div className="w-20 h-2 bg-base-300 rounded-2xl" />
              </div>

              <div className="w-32 h-12 rounded-2xl bg-base-300" />
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
});

export default SearchSkeleton;
