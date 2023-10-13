import React, { memo, useState } from "react";
import MyBlock from "../../atom/myBlock";
import MyButton from "../../atom/myButton";
import MyTextarea from "../../atom/myTextarea";
import {
  GetModerReportMediaQuery,
  WarningEnum,
  WarningObjectEnum,
} from "../../graphql/__generated__/graphql";
import MyParagraph from "../../atom/myParagraph";
import MyHeader from "../../atom/myHeader";
import useAcceptWarning from "../../hooks/moderation.ts/useAcceptWarning";
import { toast } from "react-toastify";

type Props = {
  userId: string | null | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<
      Exclude<
        GetModerReportMediaQuery["getModerReportMedia"],
        null | undefined
      >["creator"]
    >
  >;
} & (
  | {
      warningType: "media";
      mediaId: string | null | undefined;
    }
  | {
      warningType: "note";
      mediaId: string | null | undefined;
      deleteMediaNote: () => void;
    }
  | {
      warningType: "report" | "account";
    }
);

const ModerWarning = memo((props: Props) => {
  const { warningType, userId, setUser } = props;

  let mediaId: string | undefined | null = null;

  if (warningType === "media" || warningType === "note") {
    mediaId = props.mediaId;
  }

  const deleteUserImage = () => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        picture: "",
      };
    });
  };

  const deleteUserName = () => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        name: "Deleted",
      };
    });
  };

  const deleteUserNote = () => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        note: "Deleted",
      };
    });
  };

  const { handleWarning } = useAcceptWarning({
    dataCb: () => {
      switch (warningObjectValue) {
        case WarningObjectEnum.AccountImage: {
          deleteUserImage();
          break;
        }
        case WarningObjectEnum.AccountName: {
          deleteUserName();
          break;
        }
        case WarningObjectEnum.AccountNote: {
          deleteUserNote();
          break;
        }
        case WarningObjectEnum.MediaNote: {
          if (warningType === "note") {
            props.deleteMediaNote();
          }
          break;
        }
      }
    },
  });

  const [warningText, setWarningText] = useState<string>("");
  const [warningValue, setWarningValue] = useState<WarningEnum | null>(null);
  const [warningObjectValue, setWarningObjectValue] =
    useState<WarningObjectEnum | null>(null);

  const handleWarningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWarningValue(event.target.value as WarningEnum);
  };

  const handleWarningObjectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWarningObjectValue(event.target.value as WarningObjectEnum);
  };

  const handleSendButton = () => {
    if (warningValue && warningObjectValue) {
      handleWarning({
        userId: userId || "",
        mediaId,
        warning: warningValue,
        warningObject: warningObjectValue,
        description: warningText,
      });
    } else {
      toast.error("Please select warning type");
    }
  };
  return (
    <MyBlock>
      <div>
        <MyHeader vsize={"lg"}>Warning</MyHeader>
        <MyParagraph>
          Automatically deletes user avatar, user name, user note, media note.
          But does not automatically edit the media itself
        </MyParagraph>
      </div>
      <div className="flex gap-4 justify-center flex-wrap w-full">
        <MyBlock className="p-4 bg-base-200 items-end w-auto">
          <div className="flex items-center gap-2">
            <MyParagraph className="text-end">Account Image</MyParagraph>
            <input
              type="radio"
              id="option"
              name="radio-2"
              className="radio"
              value={WarningObjectEnum.AccountImage}
              checked={warningObjectValue === WarningObjectEnum.AccountImage}
              onChange={handleWarningObjectChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <MyParagraph className="text-end">Account Name</MyParagraph>
            <input
              type="radio"
              id="option2"
              name="radio-2"
              className="radio"
              value={WarningObjectEnum.AccountName}
              checked={warningObjectValue === WarningObjectEnum.AccountName}
              onChange={handleWarningObjectChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <MyParagraph className="text-end">Account Note</MyParagraph>
            <input
              type="radio"
              id="option2"
              name="radio-2"
              className="radio"
              value={WarningObjectEnum.AccountNote}
              checked={warningObjectValue === WarningObjectEnum.AccountNote}
              onChange={handleWarningObjectChange}
            />
          </div>
          {warningType === "media" ? (
            <div className="flex items-center gap-2">
              <MyParagraph className="text-end">Media</MyParagraph>
              <input
                type="radio"
                id="option2"
                name="radio-2"
                className="radio"
                value={WarningObjectEnum.Media}
                checked={warningObjectValue === WarningObjectEnum.Media}
                onChange={handleWarningObjectChange}
              />
            </div>
          ) : null}
          {warningType === "note" ? (
            <div className="flex items-center gap-2">
              <MyParagraph className="text-end">Media Note</MyParagraph>
              <input
                type="radio"
                id="option2"
                name="radio-2"
                className="radio"
                value={WarningObjectEnum.MediaNote}
                checked={warningObjectValue === WarningObjectEnum.MediaNote}
                onChange={handleWarningObjectChange}
              />
            </div>
          ) : null}
          {warningType === "report" ? (
            <div className="flex items-center gap-2">
              <MyParagraph className="text-end">Report</MyParagraph>
              <input
                type="radio"
                id="option2"
                name="radio-2"
                className="radio"
                value={WarningObjectEnum.Report}
                checked={warningObjectValue === WarningObjectEnum.Report}
                onChange={handleWarningObjectChange}
              />
            </div>
          ) : null}
        </MyBlock>
        <MyBlock className="p-4 bg-base-200 items-end w-auto">
          <div className="flex items-center gap-2">
            <MyParagraph className="text-end">Copyright</MyParagraph>
            <input
              type="radio"
              id="option1"
              name="radio-1"
              className="radio"
              value={WarningEnum.Copyright}
              checked={warningValue === WarningEnum.Copyright}
              onChange={handleWarningChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <MyParagraph className="text-end">Pornography</MyParagraph>
            <input
              type="radio"
              id="option1"
              name="radio-1"
              className="radio"
              value={WarningEnum.Pornography}
              checked={warningValue === WarningEnum.Pornography}
              onChange={handleWarningChange}
            />
          </div>
          {warningType === "media" || warningType === "report" ? (
            <div className="flex items-center gap-2">
              <MyParagraph className="text-end">Spam</MyParagraph>
              <input
                type="radio"
                id="option1"
                name="radio-1"
                className="radio"
                value={WarningEnum.Spam}
                checked={warningValue === WarningEnum.Spam}
                onChange={handleWarningChange}
              />
            </div>
          ) : null}

          <div className="flex items-center gap-2">
            <MyParagraph className="text-end">Violence</MyParagraph>
            <input
              type="radio"
              id="option1"
              name="radio-1"
              className="radio"
              value={WarningEnum.Violence}
              checked={warningValue === WarningEnum.Violence}
              onChange={handleWarningChange}
            />
          </div>
        </MyBlock>
        <MyTextarea
          value={warningText}
          rows={4}
          onChange={(event) => setWarningText(event.target.value)}
          className="max-w-[400px]"
          placeholder="Describe in more detail if you think it's necessary. (This message will be seen by both the user and the next moderator)"
        ></MyTextarea>
      </div>
      <MyButton vvariatns={"primary"} vwide={"wide"} onClick={handleSendButton}>
        Send
      </MyButton>
    </MyBlock>
  );
});

export default ModerWarning;
