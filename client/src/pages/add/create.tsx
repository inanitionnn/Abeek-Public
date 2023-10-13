import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import {
  setSelectedImageState,
  setStageState,
} from "../../redux/reducers/addPageSlice";
import { motion } from "framer-motion";
import { slideAnimation } from "../../constants";
import MyContainer from "../../atom/myContainer";
import MMyBlock from "../../atom/myBlock";
import { setParseMediaState } from "../../redux/reducers/mediaSlice";

export default function AddCreate() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStageState("start"));
    dispatch(setParseMediaState({}));
    dispatch(setSelectedImageState(""));
  }, []);

  return (
    <>
      <motion.main
        animate="visible"
        initial="hidden"
        className="md:ml-[70px] lg:ml-[190px] relative"
      >
        <img
          src="/posters3.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <div className="bg-base-100 bg-opacity-95">
          <MyContainer vwide={"md"} className="py-0 gap-0 ">
            <div className="relative h-screen grid grid-cols-2 gap-8 py-12 w-full">
              <Link to={"wiki"} className="col-span-2">
                <MMyBlock
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  vvariatns={"create"}
                  className="h-full group relative"
                  variants={slideAnimation}
                  custom={0}
                >
                  <div
                    className="absolute -top-5 -left-5 sm:top-5 sm:left-5 
                bg-primary py-4 sm:py-14 font-bold text-primary-content leading-base px-5 
                rounded-full shadow group-hover:-rotate-12 transition duration-300 ease-out"
                  >
                    Recommend
                  </div>
                  <div className="h-full flex flex-col justify-center items-center gap-6">
                    <div className="flex gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-12 h-12 fill-current group-hover:fill-primary"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <h2 className="font-head font-bold text-lg">Wiki</h2>
                    </div>
                    <p className="text-center px-8">
                      Parse Wikipedia data (+gpt validation)
                    </p>
                    <div
                      className="flex p-4 gap-2 items-center group-hover:bg-primary group-hover:text-primary-content
                  transition duration-300 ease-out rounded-lg bg-base-300 shadow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h3 className="font-bold ">2+</h3>
                    </div>
                  </div>
                </MMyBlock>
              </Link>

              <Link to={"self"} className="col-span-2 sm:col-span-1">
                <MMyBlock
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  vvariatns={"create"}
                  className="h-full group"
                  variants={slideAnimation}
                  custom={1}
                >
                  <div className="h-full flex flex-col justify-center items-center gap-6">
                    <div className="flex gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12 group-hover:stroke-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>

                      <h2 className="font-head font-bold text-lg">Self</h2>
                    </div>
                    <p className="text-center px-8">
                      Filling in information manually
                    </p>
                    <div
                      className="flex p-4 gap-2 items-center group-hover:bg-primary  group-hover:text-primary-content
                   rounded-lg bg-base-300 shadow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h3 className="font-bold ">Free</h3>
                    </div>
                  </div>
                </MMyBlock>
              </Link>

              <Link to={"text"} className="col-span-2 sm:col-span-1">
                <MMyBlock
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  vvariatns={"create"}
                  className="h-full group"
                  variants={slideAnimation}
                  custom={2}
                >
                  <div className="h-full flex flex-col justify-center items-center gap-6">
                    <div className="flex gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12 fill-current group-hover:stroke-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                        />
                      </svg>

                      <h2 className="font-head font-bold text-lg">Text</h2>
                    </div>
                    <p className="text-center px-8">
                      Automatic filling based on your information
                    </p>

                    <div
                      className="flex p-4 gap-2 items-center group-hover:bg-primary  group-hover:text-primary-content
                   rounded-lg bg-base-300 shadow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 01.572-2.759 6.026 6.026 0 012.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0013.5 4.938zM14 12a4 4 0 01-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 001.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 011.315-4.192.447.447 0 01.431-.16A4.001 4.001 0 0114 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h3 className="font-bold ">14+</h3>
                    </div>
                  </div>
                </MMyBlock>
              </Link>
            </div>
          </MyContainer>
        </div>
      </motion.main>
    </>
  );
}
