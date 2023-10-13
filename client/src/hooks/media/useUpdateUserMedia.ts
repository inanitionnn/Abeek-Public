import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  SeriesSeasonRateResponse,
  UpdateUserMediaDocument,
  UpdateUserMediaMutation,
  UpdateUserMediaMutationVariables,
  WatchedEnum,
} from "../../graphql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../redux";
import { setGetMediaState } from "../../redux/reducers/mediaSlice";
import { deepArrayEqual } from "../../utils/deepEqual";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const useUpdateUserMedia = (props: Props) => {
  const { setIsEdit } = props;
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.media.getMedia);
  const [watched, setWatched] = useState<WatchedEnum>(WatchedEnum.Planned);
  const [note, setNote] = useState("");
  const [rate, setRate] = useState(5);
  const [seasons, setSeasons] = useState<SeriesSeasonRateResponse[]>([]);

  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWatched(event.target.value as WatchedEnum);
  };

  const [
    updateUserMediaMutation,
    {
      data: updateUserMediaData,
      loading: updateUserMediaLoading,
      error: updateUserMediaError,
    },
  ] = useMutation<UpdateUserMediaMutation, UpdateUserMediaMutationVariables>(
    UpdateUserMediaDocument
  );

  const handleUpdateUserMedia = () => {
    if (
      media?.note !== note ||
      media?.rate !== rate ||
      media?.watched !== watched ||
      (media?.__typename === "SeriesMediaResponse" &&
        !deepArrayEqual(media.seasons || [], seasons))
    ) {
      const mediaSeasons = seasons?.map((season) => {
        const { __typename, ...omitSeason } = season;
        return omitSeason;
      });

      updateUserMediaMutation({
        variables: {
          input: {
            mediaId: media?.id || "",
            note: note,
            rate: watched === WatchedEnum.Planned ? 0 : rate,
            watched: watched,
            seasons: mediaSeasons,
          },
        },
      });
      if (watched === WatchedEnum.Planned) setRate(0);
    }
  };

  useEffect(() => {
    if (updateUserMediaData) {
      if (media.__typename === "SeriesMediaResponse") {
        dispatch(setGetMediaState({ ...media, seasons: seasons }));
      }

      dispatch(
        setGetMediaState({ ...media, note: note, rate: rate, watched: watched })
      );

      setIsEdit(false);

      toast.success("Data has been successfully updated");
    }
  }, [updateUserMediaData]);

  useEffect(() => {
    if (updateUserMediaError) {
      toast.error(updateUserMediaError.message);
    }
  }, [updateUserMediaError]);

  useEffect(() => {
    setNote(media?.note || "");
    setRate(media?.rate || 0);
    setWatched(media?.watched || WatchedEnum.Planned);
    if (media.__typename === "SeriesMediaResponse") {
      setSeasons(media?.seasons || []);
    }
  }, []);

  return {
    media,
    handleNoteChange,
    note,
    setRate,
    rate,
    handleSelectChange,
    watched,
    handleUpdateUserMedia,
    seasons,
    setSeasons,
    loading: updateUserMediaLoading,
  };
};

export default useUpdateUserMedia;
