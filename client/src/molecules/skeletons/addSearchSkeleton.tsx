import { motion } from "framer-motion";
import { slideAnimation } from "../../constants";
import { memo } from "react";

const AddSearchSleleton = memo(() => {
  return (
    <motion.div
      variants={slideAnimation}
      className="flex flex-wrap justify-center gap-8 mt-[3rem]"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse w-auto h-[200px] rounded-2xl bg-base-200 p-6"
        >
          <div className="flex gap-4">
            <div className="h-[150px] w-[100px] bg-base-300 rounded-2xl"></div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="w-24 h-4 bg-base-300 rounded-2xl" />
                <div className="h-2 bg-base-300 rounded-full w-16"></div>
                <div className="flex gap-2">
                  <div className="h-2 bg-base-300 rounded-full w-10"></div>
                  <div className="h-2 bg-base-300 rounded-full w-12"></div>
                </div>
              </div>
              <div className="bg-base-300 rounded-2xl w-32 h-12"></div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
});
export default AddSearchSleleton;
