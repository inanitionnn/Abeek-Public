import { ComponentPropsWithoutRef, Ref, forwardRef, memo } from "react";
import { IMAGE_API } from "../../constants";
import { useAppSelector } from "../../hooks/redux";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import MyHeader from "../../atom/myHeader";
import MyButton from "../../atom/myButton";
import MyLoading from "../../atom/myLoading";
import MyParagraph from "../../atom/myParagraph";
import { ReportEnum } from "../../graphql/__generated__/graphql";
import useReport from "../../hooks/useReport";
import useAddFollow from "../../hooks/useAddFollow";
import useRemoveFollow from "../../hooks/useRemoveFollow";
import useGetFollowInfo from "../../hooks/collection/useGetFollowInfo";

type Props = ComponentPropsWithoutRef<"div"> & {
  followId: string;
};

const CollectionProfile = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, followId, ...restProps } = props;
    const {
      isLoggedIn,
      user: { id: userId },
    } = useAppSelector((state) => state.user);

    const {
      loading: getProfileLoading,
      profile,
      setProfile,
    } = useGetFollowInfo({ followId });

    const setFollow = (bool: boolean) => {
      setProfile((prev) => {
        if (!prev) {
          return prev;
        }
        return { ...prev, follow: bool };
      });
    };

    const { handleFollow, loading: followLoading } = useAddFollow({
      followId: followId,
      dataCb: () => setFollow(true),
      errorCb: () => setFollow(false),
    });

    const { handleUnfollow, loading: unfollowLoading } = useRemoveFollow({
      followId: followId,
      dataCb: () => setFollow(false),
      errorCb: () => setFollow(true),
    });

    const { handleReport } = useReport({});
    const handleReportButton = () => {
      handleReport({
        reportType: ReportEnum.Account,
        userId: followId,
      });
    };

    return (
      <div
        ref={ref}
        className={twMerge("flex justify-center mb-16", className)}
        {...restProps}
      >
        <div className="max-w-[840px]">
          {getProfileLoading ? (
            <MyLoading />
          ) : (
            <div className="space-y-8 w-full py-8 px-16 rounded-2xl bg-base-300  relative">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 justify-center items-center ">
                <button
                  className="absolute w-9 h-9  bg-error top-4 right-4
            rounded-full flex items-center justify-center tooltip tooltip-left"
                  data-tip="Report the user for incorrect data"
                  onClick={handleReportButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 stroke-error-content"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </button>

                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-base-200">
                    {profile?.picture ? (
                      <img
                        src={IMAGE_API + "/" + profile?.picture}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-12 h-12 sm:w-16 sm:h-16"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <MyHeader className="max-w-[150px] break-words">
                    {profile?.name}
                  </MyHeader>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2 bg-base-200 rounded-2xl">
                  <div className="flex justify-between p-3 gap-1">
                    <MyHeader>Films: </MyHeader>
                    <MyHeader>{profile?.filmCount}</MyHeader>
                  </div>
                  <div className="flex justify-between p-3 gap-1">
                    <MyHeader>Books: </MyHeader>
                    <MyHeader>{profile?.bookCount}</MyHeader>
                  </div>
                  <div className="flex justify-between p-3 gap-1">
                    <MyHeader>Series: </MyHeader>
                    <MyHeader>{profile?.seriesCount}</MyHeader>
                  </div>
                  <div className="flex justify-between p-3 gap-1">
                    <MyHeader>Comics: </MyHeader>
                    <MyHeader>{profile?.comicsCount}</MyHeader>
                  </div>
                </div>
              </div>
              {profile?.note ? (
                <div className="p-4 rounded-2xl bg-base-200 ">
                  <MyParagraph>{profile?.note}</MyParagraph>
                </div>
              ) : null}

              <div className="flex justify-center">
                {isLoggedIn &&
                !(userId === followId) &&
                !(followLoading || unfollowLoading) ? (
                  !profile?.follow ? (
                    <MyButton
                      vwide={"wide"}
                      vvariatns={"primary"}
                      onClick={handleFollow}
                    >
                      Follow
                    </MyButton>
                  ) : (
                    <MyButton vwide={"wide"} onClick={handleUnfollow}>
                      Unfollow
                    </MyButton>
                  )
                ) : null}
                {(followLoading || unfollowLoading) && <MyLoading />}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  })
);

const MCollectionProfile = motion(CollectionProfile);
export default MCollectionProfile;
