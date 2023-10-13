import loadable from "@loadable/component";
import { useAppSelector } from "../../hooks/redux";
import { LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import { slideAnimation } from "../../constants";
import { memo } from "react";
import useCollectionQuery from "../../hooks/collection/useCollectionQuery";
import CollectionSkeleton from "../../molecules/skeletons/collectionSkeleton";

const AsyncSmallCollectionCard = loadable(
  () => import("../../molecules/collection/smallCollectionCard")
);

const AsyncMediumCollectionCard = loadable(
  () => import("../../molecules/collection/mediumCollectionCard")
);

const AsyncBigCollectionCard = loadable(
  () => import("../../molecules/collection/bigCollectionCard")
);

type Props = {
  followId: string;
};

const CollectionMedia = memo((props: Props) => {
  const { followId } = props;
  const cartSize = useAppSelector((state) => state.collection.size);
  const { intersectionRef, loading, mediaArray } = useCollectionQuery({
    followId: followId,
    fetchCount: 30,
  });

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        <LayoutGroup>
          {mediaArray?.map((media, _) => {
            return (
              <Link
                to={
                  followId
                    ? `/media/${media.media}/${media.id}/user/${followId}`
                    : `/media/${media.media}/${media.id}`
                }
              >
                {cartSize === "small" ? (
                  <AsyncSmallCollectionCard
                    layout
                    custom={0}
                    variants={slideAnimation}
                    key={media.id}
                    media={media}
                  />
                ) : cartSize === "medium" ? (
                  <AsyncMediumCollectionCard
                    layout
                    custom={0}
                    variants={slideAnimation}
                    key={media.id}
                    media={media}
                  />
                ) : cartSize === "big" ? (
                  <AsyncBigCollectionCard
                    layout
                    custom={0}
                    variants={slideAnimation}
                    key={media.id}
                    media={media}
                  />
                ) : (
                  <></>
                )}
              </Link>
            );
          })}
        </LayoutGroup>
        {loading ? <CollectionSkeleton /> : null}
      </div>
      <div className="w-full h-6 bg-transparent" ref={intersectionRef} />
    </>
  );
});

export default CollectionMedia;
