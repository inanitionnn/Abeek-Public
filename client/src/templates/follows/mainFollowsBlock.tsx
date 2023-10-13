import { memo } from "react";
import FollowBlock from "../../organisms/follows/followBlock";
import MyButton from "../../atom/myButton";
import useGetFollowsMedia from "../../hooks/follows/useGetFollowsMedia";
import MyLoading from "../../atom/myLoading";
import FollowSkeleton from "../../molecules/skeletons/followSkeleton";

const MainFollowsBlock = memo(() => {
  const { handleLoadMore, loading, media, canLoadMore } = useGetFollowsMedia({
    count: 15,
  });
  return (
    <>
      {loading ? <FollowSkeleton /> : null}
      {!loading ? (
        <>
          {[...(media || [])].map((media, index) => (
            <FollowBlock index={index} media={media} key={index} />
          ))}
          {canLoadMore ? (
            <div className="flex justify-center">
              <MyButton
                vvariatns={"primary"}
                vwide={"wide"}
                onClick={handleLoadMore}
              >
                Load more
              </MyButton>
            </div>
          ) : null}
        </>
      ) : (
        <MyLoading />
      )}
    </>
  );
});
export default MainFollowsBlock;
