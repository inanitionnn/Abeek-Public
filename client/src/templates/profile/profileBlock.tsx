import loadable from "@loadable/component";
import { memo, useState } from "react";
import useGetProfileInfo from "../../hooks/profile/useGetProfileInfo";
import ProfileModule from "../../organisms/profile/profileModule";
import MyLoading from "../../atom/myLoading";

const AsyncEditProfile = loadable(
  () => import("../../organisms/profile/editProfile")
);

const AsyncFollowsModal = loadable(
  () => import("../../organisms/profile/followsModal")
);

const AsyncFollowersModal = loadable(
  () => import("../../organisms/profile/followersModal")
);
const ProfileBlock = memo(() => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isFollowsModal, setIsFollowsModal] = useState<boolean>(false);
  const [isFollowersModal, setIsFollowersModal] = useState<boolean>(false);

  const { loading, profile, setProfile } = useGetProfileInfo();
  return (
    <>
      <AsyncFollowersModal
        isModal={isFollowersModal}
        setIsModal={setIsFollowersModal}
      />
      <AsyncFollowsModal
        isModal={isFollowsModal}
        setIsModal={setIsFollowsModal}
      />

      {loading ? <MyLoading /> : null}
      {isEdit ? (
        <AsyncEditProfile
          isEdit={isEdit}
          oldNote={profile?.note || ""}
          setIsEdit={setIsEdit}
          setProfile={setProfile}
        />
      ) : (
        <ProfileModule
          isEdit={isEdit}
          profile={profile}
          setIsEdit={setIsEdit}
          setIsFollowersModal={setIsFollowersModal}
          setIsFollowsModal={setIsFollowsModal}
        />
      )}
    </>
  );
});

export default ProfileBlock;
