import { AnimatePresence, motion } from "framer-motion";
import React, { ComponentPropsWithRef, Dispatch, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { slideUpAnimation } from "../constants";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithRef<"div"> & {
  isModal: boolean;
  setIsModal: Dispatch<React.SetStateAction<any>>;
};
const MyDropdown = (props: Props) => {
  const { children, className, isModal, setIsModal } = props;
  const formRef = useRef<HTMLDivElement>(null);
  useClickOutside(formRef, () => setIsModal("none"));
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isModal && (
          <motion.div
            ref={formRef}
            variants={slideUpAnimation}
            exit="end"
            animate="visible"
            initial="hidden"
            className={twMerge(
              "absolute w-36 bottom-0 right-2 z-10",
              className
            )}
          >
            <ul className="bg-base-300 rounded-2xl flex flex-col gap-1 items-center px-4 py-2">
              {children}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MyDropdown;
