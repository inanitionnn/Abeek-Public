import useDarkTheme from "../../hooks/useDarkTheme";
import MyThemeSwitcher from "../../atom/myThemeSwitcher";
import { AnimatePresence, motion } from "framer-motion";
import { setlogOutState } from "../../redux/reducers/userSlice";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toast } from "react-toastify";
import { slideAnimation } from "../../constants";
import { ComponentPropsWithRef, Ref, forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import MMyButton from "../../atom/myButton";

type Props = ComponentPropsWithRef<"div"> & {};

const BottomGroup = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isCollection = location.pathname.includes("/collection");

    const { mediaTokens, additionalMediaTokens, isLoggedIn } = useAppSelector(
      (state) => state.user
    );

    const [colorTheme, setTheme] = useDarkTheme();

    const toggleDarkMode = () => {
      setTheme(colorTheme === "light" ? "light" : "dark");
    };
    return (
      <>
        <motion.div
          layout
          ref={ref}
          className={twMerge("space-y-2", className)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLoggedIn && (
            <MMyButton
              layout
              to="/tokens"
              vvariatns={"colorfull"}
              className="w-full"
            >
              <AnimatePresence initial={false}>
                {!isCollection && (
                  <motion.div
                    layout
                    variants={slideAnimation}
                    className=" md:hidden lg:block"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7  group-hover:fill-primary-content  group-hover:stroke-error-content transition ease-out duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div layout>
                <h2 className={`font-bold group-hover:text-primary-content`}>
                  {mediaTokens + additionalMediaTokens}
                </h2>
              </motion.div>
            </MMyButton>
          )}

          <div
            className={clsx({
              flex: true,
              "flex-col-reverse": isCollection,
              "md:flex-col-reverse lg:flex-row": !isCollection,
            })}
          >
            {isLoggedIn ? (
              <MMyButton
                layout
                vvariatns={"navbar"}
                onClick={() => {
                  dispatch(setlogOutState());
                  navigate("/");
                  toast.success("Logged out");
                }}
              >
                <motion.div layout>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              </MMyButton>
            ) : (
              <MMyButton
                layout
                vvariatns={"navbar"}
                onClick={() => {
                  navigate("/login");
                }}
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
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                </motion.div>
              </MMyButton>
            )}

            <MMyButton layout vvariatns={"navbar"} onClick={toggleDarkMode}>
              <MyThemeSwitcher colorTheme={colorTheme} />
            </MMyButton>
          </div>
        </motion.div>
      </>
    );
  })
);
export { BottomGroup };
