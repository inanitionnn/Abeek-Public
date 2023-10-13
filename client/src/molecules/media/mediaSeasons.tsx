import { Ref, forwardRef, memo } from "react";
import MyHeader from "../../atom/myHeader";
import {
  SeriesMediaResponse,
  WatchedEnum,
} from "../../graphql/__generated__/graphql";
import { motion } from "framer-motion";

type Props = {
  seasons: SeriesMediaResponse["seasons"];
  watched: WatchedEnum | null | undefined;
};

export const MediaSeasons = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { seasons, watched } = props;
    const newSeasons = seasons?.filter((season) => !!season.id);
    const isTitle: boolean =
      (seasons?.filter((season) => !!season.title).length ?? 0) > 0;

    return (
      <div ref={ref} className="flex justify-center">
        <div className="overflow-x-auto sm:min-w-[450px] w-fit">
          <MyHeader vsize={"lg"}>Seasons</MyHeader>

          <table className="table bg-base-300">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>#</th>
                {isTitle ? (
                  <th className="sm:table-cell text-start">Title</th>
                ) : null}
                <th>Episodes</th>

                {watched !== WatchedEnum.Planned && <th>Rate</th>}
              </tr>
            </thead>
            <tbody>
              {(newSeasons || []).map((season) => (
                <tr key={season.season}>
                  <th className="font-normal text-center">({season.season})</th>
                  {isTitle ? (
                    <td className=" sm:table-cell ">
                      {season.title ? season.title : "---"}
                    </td>
                  ) : null}

                  <td className="text-center">{season.episodes}</td>

                  {watched !== WatchedEnum.Planned && season.rate && (
                    <td className="flex gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <MyHeader> {season.rate}</MyHeader>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  })
);

const MMediaSeasons = motion(MediaSeasons);
export default MMediaSeasons;
