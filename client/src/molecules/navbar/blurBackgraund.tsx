import { motion } from "framer-motion";
import { memo } from "react";

const blurBackgraund = memo(() => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.4 },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.4 },
      }}
      className="fixed top-0 right-0 left-0 h-full  backdrop-contrast-75 backdrop-blur-sm z-10 md:hidden"
    />
  );
});

export default blurBackgraund;
