import { motion } from "framer-motion";
import { GetModerReportAccountQuery } from "../../graphql/__generated__/graphql";
import { useState } from "react";
import { MyContainer } from "../../atom/myContainer";
import MyHeader from "../../atom/myHeader";
import { MyButton } from "../../atom/myButton";
import ModerWarning from "../../organisms/moderation/moderWarning";
import ModerUserModule from "../../molecules/moderation/moderUserModule";
import useBan from "../../hooks/moderation.ts/useBan";
import useGetAccountReport from "../../hooks/moderation.ts/useGetAccountReport";
import useDeleteReport from "../../hooks/moderation.ts/useDeleteReport";
import useBanReports from "../../hooks/moderation.ts/useBanReports";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MyBgColor from "../../atom/myBgColor";

type GetMedia = Exclude<
  GetModerReportAccountQuery["getModerReportAccount"],
  null | undefined
>;

export default function AccountReportPage() {
  const navigate = useNavigate();
  const [reportId, setReportId] = useState<GetMedia["reportId"]>();
  const [informerUser, setInformerUser] = useState<GetMedia["informerUser"]>();
  const [reportedUser, setReportedUser] = useState<GetMedia["reportedUser"]>();

  const { refetch } = useGetAccountReport({
    setInformerUser,
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

  const [isWarningInformer, setIsWarningInformer] = useState(false);
  const [isWarningReported, setIsWarningReported] = useState(false);

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

  return (
    <>
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative md:ml-[70px] lg:ml-[190px]"
      >
        <img
          src="/posters1.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <MyBgColor>
          <MyContainer className="gap-4">
            <MyHeader vsize={"lg"}>Informer</MyHeader>
            <ModerUserModule
              user={informerUser}
              handleBanReportsButton={handleBanReportsInformerButton}
              handleWarningButton={handleWarningInformerButton}
              handleBanButton={handleBanInformerButton}
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
              user={reportedUser}
              handleWarningButton={handleWarningReportedButton}
              handleBanButton={handleBanReportedButton}
            />

            {isWarningReported ? (
              <ModerWarning
                warningType="account"
                userId={reportedUser?.id}
                setUser={setReportedUser}
              />
            ) : null}

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
