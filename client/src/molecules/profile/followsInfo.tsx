import { ComponentPropsWithRef, Ref, forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import MyHeader from "../../atom/myHeader";
import MyBlock from "../../atom/myBlock";
type Props = ComponentPropsWithRef<"div"> & {
  mediaCount: number;
  followerCount: number;
  followingCount: number;
  handleFollows: () => void;
  handleFollowers: () => void;
};
const FollowsInfo = memo(
  forwardRef(
    (
      {
        className,
        followerCount,
        followingCount,
        handleFollowers,
        handleFollows,
        mediaCount,
      }: Props,
      ref: Ref<HTMLDivElement>
    ) => {
      return (
        <MyBlock
          ref={ref}
          className={twMerge("sm:flex-row gap-2 p-2 w-full", className)}
        >
          <div className="w-full sm:w-1/3 flex sm:flex-col justify-center items-center gap-2 p-4 h-full">
            <MyHeader>{mediaCount}</MyHeader>
            <MyHeader>Media</MyHeader>
          </div>

          <button
            className="w-full sm:w-1/3 flex sm:flex-col justify-center items-center gap-2
               p-4 h-full hover:bg-base-200 rounded-2xl transition duration-300 ease-out"
            onClick={handleFollowers}
          >
            <MyHeader>{followerCount}</MyHeader>
            <MyHeader>Followers</MyHeader>
          </button>

          <button
            className="w-full sm:w-1/3 flex sm:flex-col justify-center items-center gap-2
               p-4 h-full hover:bg-base-200 rounded-2xl transition duration-300 ease-out"
            onClick={handleFollows}
          >
            <MyHeader>{followingCount}</MyHeader>
            <MyHeader>Follows</MyHeader>
          </button>
        </MyBlock>
      );
    }
  )
);
const MFollowsInfo = motion(FollowsInfo);
export default MFollowsInfo;
