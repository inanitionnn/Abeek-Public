import { Ref, forwardRef, memo } from "react";
import { motion } from "framer-motion";
import { WatchedEnum } from "../../graphql/__generated__/graphql";

type Props = {
  tags: string[] | null | undefined;
  genres: string[] | null | undefined;
  watched: WatchedEnum | null | undefined;
};

export const MediaTags = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { tags, genres, watched } = props;
    return (
      <div ref={ref} className="flex gap-2 flex-wrap justify-center">
        {(genres || []).map((genre) => (
          <div className="badge badge-neutral text-sm tracking-wide leading-sm">
            {genre}
          </div>
        ))}
        {watched !== WatchedEnum.Planned &&
          (tags || []).map((tag) => (
            <div className="badge ring-1 ring-neutral text-sm tracking-wide leading-sm">
              {tag}
            </div>
          ))}
      </div>
    );
  })
);
const MMediaTags = motion(MediaTags);
export default MMediaTags;
