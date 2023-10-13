import { motion } from "framer-motion";
import { GetModerReportNoteQuery } from "../../graphql/__generated__/graphql";
import { useState } from "react";
import { MyContainer } from "../../atom/myContainer";
import MyHeader from "../../atom/myHeader";
import { MyButton } from "../../atom/myButton";
import ModerWarning from "../../organisms/moderation/moderWarning";
import ModerUserModule from "../../molecules/moderation/moderUserModule";
import useBan from "../../hooks/moderation.ts/useBan";
import useDeleteReport from "../../hooks/moderation.ts/useDeleteReport";
import useBanReports from "../../hooks/moderation.ts/useBanReports";
import { toast } from "react-toastify";
import { MyBlock } from "../../atom/myBlock";
import { MyParagraph } from "../../atom/myParagraph";
import useGetNoteReport from "../../hooks/moderation.ts/useGetNoteReport";
import { useNavigate } from "react-router-dom";
import MyBgColor from "../../atom/myBgColor";

type GetMedia = Exclude<
  GetModerReportNoteQuery["getModerReportNote"],
  null | undefined
>;

export default function NoteReportPage() {
  const navigate = useNavigate();
  const [informerUser, setInformerUser] = useState<GetMedia["informerUser"]>();
  const [mediaId, setMediaId] = useState<GetMedia["mediaId"]>();
  const [note, setNote] = useState<GetMedia["note"]>();
  const [reportId, setReportId] = useState<GetMedia["reportId"]>();
  const [reportedUser, setReportedUser] = useState<GetMedia["reportedUser"]>();

  const [isWarningInformer, setIsWarningInformer] = useState(false);
  const [isWarningReported, setIsWarningReported] = useState(false);

  const { refetch } = useGetNoteReport({
    setInformerUser,
    setMediaId,
    setNote,
    setReportedUser,
    setReportId,
    errorCb: () => {
      navigate("/moderation");
    },
  });
  const { handleDeleteReport } = useDeleteReport({
    dataCb: () => {
      toast.success("Report was successfully deleted");
      refetch();
    },
  });
  const { handleBan } = useBan();
  const { handleBan: handleBanReports } = useBanReports();

  const handleNextButton = () => {
    handleDeleteReport(reportId || "");
  };

  const handleBanReportsInformerButton = () => {
    handleBanReports(informerUser?.id || "");
  };

  const handleBanReportedButton = () => {
    handleBan({
      banReason: "",
      userId: reportedUser?.id || "",
    });
  };

  const handleBanInformerButton = () => {
    handleBan({
      banReason: "",
      userId: informerUser?.id || "",
    });
  };

  const handleWarningInformerButton = () => {
    setIsWarningInformer((prev) => !prev);
  };

  const handleWarningReportedButton = () => {
    setIsWarningReported((prev) => !prev);
  };

  const deleteMediaNoteReported = () => {
    setNote("Deleted");
  };

  return (
    <>
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative md:ml-[70px] lg:ml-[190px]"
      >
        <img
          src="/posters3.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <MyBgColor>
          <MyContainer className="gap-4">
            <MyHeader vsize={"lg"}>Informer</MyHeader>
            <ModerUserModule
              handleWarningButton={handleWarningInformerButton}
              handleBanReportsButton={handleBanReportsInformerButton}
              handleBanButton={handleBanInformerButton}
              user={informerUser}
            />

            {isWarningInformer ? (
              <ModerWarning
                warningType="report"
                userId={informerUser?.id}
                setUser={setInformerUser}
              />
            ) : null}

            <MyHeader vsize={"lg"}>Reported</MyHeader>
            <ModerUserModule
              handleWarningButton={handleWarningReportedButton}
              handleBanButton={handleBanReportedButton}
              user={reportedUser}
            />

            {isWarningReported ? (
              <ModerWarning
                warningType="note"
                userId={reportedUser?.id}
                mediaId={mediaId}
                deleteMediaNote={deleteMediaNoteReported}
                setUser={setReportedUser}
              />
            ) : null}

            <MyHeader vsize={"lg"}>Reported media note</MyHeader>
            <MyBlock className="p-4">
              <MyParagraph>{note}</MyParagraph>
            </MyBlock>

            <div className="flex justify-center mt-4">
              <MyButton
                vwide={"wide"}
                vvariatns={"primary"}
                onClick={handleNextButton}
              >
                Next (delete report)
              </MyButton>
            </div>
          </MyContainer>
        </MyBgColor>
      </motion.main>
    </>
  );
}
