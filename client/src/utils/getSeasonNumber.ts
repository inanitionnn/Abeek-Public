import { SeriesSeasonResponse } from "../graphql/__generated__/graphql";

export const getSeasonNumber = (
  seasons: SeriesSeasonResponse[] | null | undefined
): number => {
  const seasonNumberArr = seasons?.map((season) => season.season);
  for (let i = 1; i <= 100; i++) {
    if (!seasonNumberArr?.includes(i)) {
      return i;
    }
  }

  return 0;
};
