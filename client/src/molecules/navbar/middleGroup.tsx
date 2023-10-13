import { ComponentPropsWithRef, Ref, forwardRef, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { IMAGE_API, slideAnimation } from "../../constants";
import { useAppSelector } from "../../hooks/redux";
import { twMerge } from "tailwind-merge";
import MMyParagraph from "../../atom/myParagraph";
import MMyButton from "../../atom/myButton";

type Props = ComponentPropsWithRef<"div"> & {};

const MiddleGroup = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className } = props;
    const location = useLocation();

    const isCollection = location.pathname.includes("/collection");
    const isAdd = location.pathname.includes("/add");
    const isProfile = location.pathname === "/profile";
    const isSearch = location.pathname === "/search";
    const isRandom = location.pathname === "/random";
    const isFollows = location.pathname === "/follows";
    const isModeration = location.pathname.includes("/moderation");
    const isNotification = location.pathname === "/notifications";

    const { notificationCount, role, user } = useAppSelector(
      (state) => state.user
    );

    const isModerator = role === "m" || role === "a";

    return (
      <>
        <div ref={ref} className={twMerge("flex flex-col gap-1", className)}>
          <MMyButton
            vvariatns={"navbar"}
            vwide={"full"}
            to="/collection"
            className={clsx({
              "justify-start h-14": true,
              "bg-base-200": isCollection,
            })}
          >
            <motion.div layout>
              {isCollection ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              ) : (
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
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              )}
            </motion.div>
            <AnimatePresence>
              {!isCollection && (
                <MMyParagraph
                  variants={slideAnimation}
                  className="md:hidden lg:block"
                >
                  Collection
                </MMyParagraph>
              )}
            </AnimatePresence>
          </MMyButton>
          <MMyButton
            vvariatns={"navbar"}
            vwide={"full"}
            to="/search"
            className={clsx({
              "justify-start h-14": true,
              "bg-base-200": isSearch,
            })}
          >
            <motion.div layout>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={`${isSearch ? 2 : 1.5}`}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </motion.div>
            <AnimatePresence>
              {!isCollection && (
                <MMyParagraph
                  variants={slideAnimation}
                  className="md:hidden lg:block"
                >
                  Search
                </MMyParagraph>
              )}
            </AnimatePresence>
          </MMyButton>
          <MMyButton
            vvariatns={"navbar"}
            vwide={"full"}
            to="/add"
            className={clsx({
              "justify-start h-14": true,
              "bg-base-200": isAdd,
            })}
          >
            <motion.div layout>
              {isAdd ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </motion.div>

            <AnimatePresence>
              {!isCollection && (
                <MMyParagraph
                  variants={slideAnimation}
                  className="md:hidden lg:block"
                >
                  Add
                </MMyParagraph>
              )}
            </AnimatePresence>
          </MMyButton>
          <MMyButton
            vvariatns={"navbar"}
            vwide={"full"}
            to="/random"
            className={clsx({
              "justify-start h-14": true,
              "bg-base-200": isRandom,
            })}
          >
            <motion.div layout>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={`${isRandom ? 2 : 1.5}`}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </motion.div>

            <AnimatePresence>
              {!isCollection && (
                <MMyParagraph
                  variants={slideAnimation}
                  className="md:hidden lg:block"
                >
                  Random
                </MMyParagraph>
              )}
            </AnimatePresence>
          </MMyButton>
          <MMyButton
            vvariatns={"navbar"}
            vwide={"full"}
            to="/follows"
            className={clsx({
              "justify-start h-14": true,
              "bg-base-200": isFollows,
            })}
          >
            <motion.div layout>
              {isFollows ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                </svg>
              ) : (
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
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              )}
            </motion.div>

            <AnimatePresence>
              {!isCollection && (
                <MMyParagraph
                  variants={slideAnimation}
                  className="md:hidden lg:block"
                >
                  Follows
                </MMyParagraph>
              )}
            </AnimatePresence>
          </MMyButton>
          {!!isModerator ? (
            <MMyButton
              vvariatns={"navbar"}
              vwide={"full"}
              to="/moderation"
              className={clsx({
                "justify-start h-14": true,
                "bg-base-200": isModeration,
              })}
            >
              <motion.div layout>
                {isModeration ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                )}
              </motion.div>

              <AnimatePresence>
                {!isCollection ? (
                  <MMyParagraph
                    variants={slideAnimation}
                    className="md:hidden lg:block"
                  >
                    Moderation
                  </MMyParagraph>
                ) : null}
              </AnimatePresence>
            </MMyButton>
          ) : null}
          <MMyButton
            vvariatns={"navbar"}
            vwide={"full"}
            to="/notifications"
            className={clsx({
              "justify-start h-14 relative": true,
              "bg-base-200": isNotification,
            })}
          >
            {!!notificationCount && (
              <span className="absolute -right-1 -top-1 bg-primary px-2 text-primary-content text-sm font-bold font-head rounded-full">
                {notificationCount}
              </span>
            )}

            <motion.div layout className="">
              {isNotification ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              )}
            </motion.div>
            <AnimatePresence>
              {!isCollection && (
                <MMyParagraph
                  variants={slideAnimation}
                  className="md:hidden lg:block"
                >
                  Notification
                </MMyParagraph>
              )}
            </AnimatePresence>
          </MMyButton>
          <MMyButton
            vvariatns={"navbar"}
            vwide={"full"}
            to="/profile"
            className={clsx({
              "justify-start h-14": true,
              "bg-base-200": isProfile,
            })}
          >
            <motion.div
              layout
              className={clsx({
                "w-7 h-7 rounded-full bg-base-200  ring-offset-base-200 ring-base-content transition duration-300 ease-out":
                  true,
                "ring-[2px] ring-offset-2": isProfile,
                "ring-[1.5px] ring-offset-1": !isProfile,
              })}
            >
              {user.picture ? (
                <img
                  src={IMAGE_API + "/" + user.picture}
                  className="rounded-full"
                />
              ) : (
                <div className="flex  justify-center items-center w-full h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              )}
            </motion.div>

            <AnimatePresence>
              {!isCollection && (
                <MMyParagraph
                  variants={slideAnimation}
                  className="md:hidden lg:block"
                >
                  Profile
                </MMyParagraph>
              )}
            </AnimatePresence>
          </MMyButton>
        </div>
      </>
    );
  })
);

export default MiddleGroup;
