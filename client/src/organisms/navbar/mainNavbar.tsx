import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { slideAnimation } from "../../constants";
import { clsx } from "clsx";
import MMyButton from "../../atom/myButton";
import MiddleGroup from "../../molecules/navbar/middleGroup";
import { BottomGroup } from "../../molecules/navbar/bottomGroup";
import { memo } from "react";

const BigNavbar = memo(() => {
  const location = useLocation();
  const isCollection = location.pathname.includes("/collection");

  return (
    <>
      <LayoutGroup>
        <motion.div
          layout
          initial="hidden"
          animate="visible"
          className={clsx({
            "fixed h-full top-0 left-0 border-base-200 border-r-[1px] py-4 px-2 z-50 bg-base-100":
              true,
            "w-[70px]": isCollection,
            "w-[190px] md:w-[70px] lg:w-[190px]": !isCollection,
          })}
        >
          <div className=" h-full flex flex-col items-center justify-between">
            <MMyButton
              to={`/`}
              vsize={"lg"}
              vvariatns={"navbar"}
              vwide={"full"}
              className="font-head "
            >
              <motion.div layout>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  />
                </svg>
              </motion.div>
              <AnimatePresence>
                {!isCollection && (
                  <motion.h1
                    variants={slideAnimation}
                    layout
                    className={`text-lg md:hidden lg:block`}
                  >
                    Abeek
                  </motion.h1>
                )}
              </AnimatePresence>
            </MMyButton>

            <MiddleGroup />
            <BottomGroup />
          </div>
        </motion.div>
      </LayoutGroup>
    </>
  );
});

export default BigNavbar;
