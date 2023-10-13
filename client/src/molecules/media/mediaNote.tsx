import { Ref, forwardRef, memo } from "react";
import MyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import { motion } from "framer-motion";

type Props = {
  followId: string | null | undefined;
  userId: string | null | undefined;
  note: string;
  handleSendReport: () => void;
};

export const MediaNote = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { note, handleSendReport, followId, userId } = props;

    return (
      <div
        ref={ref}
        className="relative max-w-[700px] w-full mx-auto pr-8 space-y-2"
      >
        {followId && userId ? (
          <button
            className="w-9 h-9  bg-error absolute top-14 -right-4
  rounded-full flex items-center justify-center tooltip tooltip-left"
            data-tip="Report this user note"
            onClick={handleSendReport}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 stroke-error-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </button>
        ) : null}

        <MyHeader vsize={"lg"}>Note</MyHeader>
        <div className="relative w-full rounded-2xl bg-base-200 p-4 shadow">
          <MyParagraph className="text-start">{note}</MyParagraph>
        </div>
      </div>
    );
  })
);
const MMediaNote = motion(MediaNote);
export default MMediaNote;
