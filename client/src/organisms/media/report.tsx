import { motion } from "framer-motion";
import {
  ChangeEvent,
  ComponentPropsWithRef,
  Ref,
  forwardRef,
  memo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { MediaEnum, ReportEnum } from "../../graphql/__generated__/graphql";
import MyLoading from "../../atom/myLoading";
import MyButton from "../../atom/myButton";
import MMyTextarea from "../../atom/myTextarea";
import MyHeader from "../../atom/myHeader";
import useReport from "../../hooks/useReport";

type Props = ComponentPropsWithRef<"div"> & {
  setIsReport: React.Dispatch<React.SetStateAction<boolean>>;
  mediaId: string;
  mediaType: MediaEnum;
};

const Report = memo(
  forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
    const { className, setIsReport, mediaId, mediaType, ...restProps } = props;
    const [report, setReport] = useState("");
    const handleReportChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setReport(event.target.value);
    };

    const { handleReport, loading: reportLoading } = useReport({
      dataCb: () => {
        setIsReport(false);
        setReport("");
      },
    });

    const handleSendReport = () => {
      if (report) {
        handleReport({
          mediaId: mediaId,
          mediaType: mediaType,
          report: report,
          reportType: ReportEnum.Media,
        });
      }
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          "relative mx-8 pt-8 md:mx-20 lg:mx-8 flex flex-col items-center lg:items-start gap-4",
          className
        )}
        {...restProps}
      >
        <div className="absolute -top-0 left-0 w-full flex justify-start items-center gap-4">
          <MyHeader>Report</MyHeader>
          <div
            className="tooltip "
            data-tip="You can report an incorrect field or an incorrect image. Then the mods will fix it"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <MMyTextarea
          layout
          rows={4}
          value={report}
          onChange={(event) => handleReportChange(event)}
          placeholder="Please change pic. Correct year is 2005. Add comedy to genres and monsters to tags. Etc"
        ></MMyTextarea>
        {reportLoading ? (
          <MyLoading />
        ) : (
          <MyButton vwide={"wide"} onClick={handleSendReport}>
            Send report
          </MyButton>
        )}
      </div>
    );
  })
);

const MReport = motion(Report);
export default MReport;
