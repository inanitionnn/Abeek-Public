import React, { memo } from "react";
import MyContainer from "../../atom/myContainer";
import MMyBlock, { MyBlock } from "../../atom/myBlock";
import { CLIENT_URL, IMAGE_API, slideAnimation } from "../../constants";
import MyHeader from "../../atom/myHeader";
import MFollowsInfo from "../../molecules/profile/followsInfo";
import { GetProfileInfoQuery } from "../../graphql/__generated__/graphql";
import MediaStatsBlock from "./mediaStatsBlock";
import MyParagraph from "../../atom/myParagraph";
import { useAppSelector } from "../../hooks/redux";
import SeriesStatsBlock from "../../molecules/profile/seriesStatsBlock";
import ComicsStatsBlock from "../../molecules/profile/comicsStatsBlock";
import FilmsStatsBlock from "../../molecules/profile/filmsStatsBlock";
import BooksStatsBlock from "../../molecules/profile/booksStatsBlock";
import { toast } from "react-toastify";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  profile: GetProfileInfoQuery["getProfileInfo"] | null | undefined;
  setIsFollowersModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFollowsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
};

const ProfileModule = memo((props: Props) => {
  const { setIsEdit, profile, setIsFollowsModal, setIsFollowersModal } = props;

  const { picture, name, id } = useAppSelector((state) => state.user.user);

  const handleShareButton = () => {
    navigator.clipboard.writeText(CLIENT_URL + `/collection/user/${id}`);
    toast.success("The link to your account has been copied");
  };

  return (
    <MyContainer
      vwide={"lg"}
      initial="hidden"
      animate="visible"
      className="justify-center flex-row flex-wrap items-start"
    >
      <>
        <MMyBlock
          variants={slideAnimation}
          custom={0}
          className="relative sm:flex-row pl-6 pr-6  md:pr-12 py-6 w-auto  sm:max-w-[600px]"
        >
          <button
            className="absolute left-3 top-3 md:left-auto right-3"
            onClick={handleShareButton}
          >
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
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
          <button
            className="absolute right-3 top-3 md:right-12"
            onClick={() => setIsEdit(true)}
          >
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>

          <div className="avatar">
            <div className="w-20 sm:w-32 rounded-full bg-base-200">
              {picture ? (
                <img src={IMAGE_API + "/" + picture} className="rounded-full" />
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
          </div>

          <MyHeader
            vsize={"lg"}
            className="text-ellipsis overflow-hidden break-all"
          >
            {name}
          </MyHeader>
        </MMyBlock>

        <MFollowsInfo
          className="w-auto"
          variants={slideAnimation}
          custom={1}
          followerCount={profile?.followerCount || 0}
          followingCount={profile?.followingCount || 0}
          mediaCount={profile?.mediaCount || 0}
          handleFollowers={() => setIsFollowersModal(true)}
          handleFollows={() => setIsFollowsModal(true)}
        />

        <MMyBlock
          variants={slideAnimation}
          custom={2}
          className="relative w-auto"
        >
          <button
            className="absolute top-3 right-3"
            onClick={() => setIsEdit(true)}
          >
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>

          <MyHeader vsize={"lg"}>About</MyHeader>

          <div className="py-4 px-8 bg-base-200 rounded-2xl">
            <MyParagraph vsize={"md"} className="font-bold">
              {profile?.note}
            </MyParagraph>
          </div>
        </MMyBlock>
        <MyBlock className="w-full">
          <MyHeader vsize={"xl"}>Stats</MyHeader>
          <div className="sm:grid grid-cols-1 lg:grid-cols-2 gap-8 space-y-8 sm:space-y-0">
            <FilmsStatsBlock mediaStats={profile?.mediaStats} />
            <SeriesStatsBlock mediaStats={profile?.mediaStats} />
            <ComicsStatsBlock mediaStats={profile?.mediaStats} />
            <BooksStatsBlock mediaStats={profile?.mediaStats} />
            <MediaStatsBlock
              className="lg:col-span-2 pt-6 sm:pt-0"
              mediaCount={profile?.mediaCount}
              mediaStats={profile?.mediaStats}
            />
          </div>
        </MyBlock>
      </>
    </MyContainer>
  );
});

export default ProfileModule;
