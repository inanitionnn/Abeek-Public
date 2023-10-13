import { motion } from "framer-motion";
import { memo } from "react";
import { slideAnimation } from "../../constants";

const CollectionSkeleton = memo(() => {
  return (
    <>
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          variants={slideAnimation}
          key={index}
          className="animate-pulse w-[100px] h-[150px] sm:w-[150px] sm:h-[225px] lg:w-[180px] lg:h-[270px]
             bg-base-200 rounded-2xl"
        ></motion.div>
      ))}
    </>
  );
});

export default CollectionSkeleton;
