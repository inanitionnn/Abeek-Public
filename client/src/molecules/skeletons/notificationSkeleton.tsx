import { motion } from "framer-motion";
import { memo } from "react";
import { slideAnimation } from "../../constants";

const NotificationSkeleton = memo(() => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          variants={slideAnimation}
          key={index}
          className="animate-pulse w-full h-20
             bg-base-200 rounded-2xl"
        ></motion.div>
      ))}
    </>
  );
});

export default NotificationSkeleton;
