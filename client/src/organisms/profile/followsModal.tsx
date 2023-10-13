import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { IMAGE_API, opacityAnimation } from "../../constants";
import { useQuery } from "@apollo/client";
import {
  GetUserFollowsDocument,
  GetUserFollowsQuery,
  GetUserFollowsQueryVariables,
} from "../../graphql/__generated__/graphql";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import MyHeader from "../../atom/myHeader";

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
};

const FollowsModal = (props: Props) => {
  const { setIsModal, isModal } = props;
  const formRef = useRef<HTMLDivElement>(null);

  const clickOutside = () => {
    setIsModal(false);
  };

  useClickOutside(formRef, clickOutside);

  const { data: getUserFollowsData, error: getUserFollowsError } = useQuery<
    GetUserFollowsQuery,
    GetUserFollowsQueryVariables
  >(GetUserFollowsDocument, {
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (getUserFollowsError) {
      toast.error(getUserFollowsError.message);
    }
  }, [getUserFollowsError]);

  return (
    <AnimatePresence mode="wait">
      {isModal && (
        <motion.div
          variants={opacityAnimation}
          exit="end"
          animate="visible"
          initial="hidden"
          className="fixed top-0 left-0 right-0 h-full overflow-y-auto z-40
            flex justify-center py-16 items-start backdrop-blur-sm backdrop-contrast-75 "
        >
          <div
            ref={formRef}
            className="relative bg-base-300 md:ml-[102px] lg:ml-[222px] rounded-2xl
              flex flex-wrap justify-center gap-8 items-center p-8 border-base-200 border-4 w-[860px] mx-8 pt-16"
          >
            <label
              className="btn btn-circle absolute top-2 right-2 swap bg-base-100 z-50
              group swap-rotate border-2 border-primary hover:bg-primary "
            >
              <input type="checkbox" checked={isModal} />
              <svg
                onClick={() => setIsModal(false)}
                className="swap-on fill-current group-hover:fill-primary-content"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
            {getUserFollowsData?.getUserFollows.map((follow) => (
              <Link
                to={`/collection/user/${follow?.id}`}
                className="flex flex-col items-center sm:flex-row gap-4 bg-base-200 p-4 rounded-2xl"
              >
                <div className="w-20 h-20 flex justify-center items-center ring-[1.5px] p-1 ring-current rounded-full bg-base-200">
                  {follow?.picture ? (
                    <img
                      src={IMAGE_API + "/" + follow?.picture}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  )}
                </div>

                <MyHeader
                  vsize={"md"}
                  className="text-ellipsis overflow-hidden break-all"
                >
                  {follow.name}
                </MyHeader>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default FollowsModal;
