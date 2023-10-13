import React, {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useEffect,
  useState,
} from "react";
import {
  DownloadFileByLinkDocument,
  DownloadFileByLinkQuery,
  DownloadFileByLinkQueryVariables,
  GetModerEditMediaQuery,
} from "../../graphql/__generated__/graphql";
import { toast } from "react-toastify";
import { useLazyQuery } from "@apollo/client";

import { MyInput } from "../../atom/myInput";
import { MyButton } from "../../atom/myButton";
import { MyBlock } from "../../atom/myBlock";
import MyLoading from "../../atom/myLoading";
import { IMAGE_API } from "../../constants";

type Props = {
  setOldImage: (link: string) => void;
  media: GetModerEditMediaQuery["getModerEditMedia"];
  setMedia: React.Dispatch<
    React.SetStateAction<
      GetModerEditMediaQuery["getModerEditMedia"] | undefined
    >
  >;
};

const ModerImageInput = memo((props: Props) => {
  const { media, setMedia, setOldImage } = props;
  const [imageInput, setImageInput] = useState<string>("");

  const [
    downloadFileByLinkQuery,
    {
      data: downloadFileByLinkData,
      loading: downloadFileByLinkLoading,
      error: downloadFileByLinkError,
    },
  ] = useLazyQuery<DownloadFileByLinkQuery, DownloadFileByLinkQueryVariables>(
    DownloadFileByLinkDocument
  );

  const handleImageInput = (link: string) => {
    downloadFileByLinkQuery({
      variables: {
        input: link,
      },
    });
  };

  useEffect(() => {
    if (downloadFileByLinkData) {
      setOldImage(media?.image || "");
      const link = downloadFileByLinkData.downloadFileByLink.link;

      setTimeout(() => {
        setMedia((prev) => {
          return { ...prev, image: IMAGE_API + "/" + link };
        });
        setImageInput("");
      }, 100);
    }
  }, [downloadFileByLinkData]);

  useEffect(() => {
    if (downloadFileByLinkError) {
      toast.error(downloadFileByLinkError.message);
      setImageInput("");
    }
  }, [downloadFileByLinkError]);

  return (
    <>
      <MyBlock className="flex-row">
        <MyInput
          type="text"
          value={imageInput}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setImageInput(event.target.value);
          }}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              handleImageInput(imageInput);
            }
          }}
          placeholder="Link to the image..."
        />

        {downloadFileByLinkLoading ? (
          <MyLoading />
        ) : (
          <MyButton onClick={() => handleImageInput(imageInput)}>Add</MyButton>
        )}
      </MyBlock>
    </>
  );
});

export default ModerImageInput;
