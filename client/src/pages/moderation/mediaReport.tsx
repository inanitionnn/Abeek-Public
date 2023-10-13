import { motion } from "framer-motion";
import { GetModerReportMediaQuery } from "../../graphql/__generated__/graphql";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useGetMediaReport from "../../hooks/moderation.ts/useGetMediaReport";
import useAcceptModerMedia from "../../hooks/moderation.ts/useAcceptModerMedia";
import MyContainer from "../../atom/myContainer";
import MyHeader from "../../atom/myHeader";
import ModerUserModule from "../../molecules/moderation/moderUserModule";
import ModerWarning from "../../organisms/moderation/moderWarning";
import MyBlock from "../../atom/myBlock";
import MyButton from "../../atom/myButton";
import useDeleteReport from "../../hooks/moderation.ts/useDeleteReport";
import useBan from "../../hooks/moderation.ts/useBan";
import useBanReports from "../../hooks/moderation.ts/useBanReports";
import { MyParagraph } from "../../atom/myParagraph";
import ModerImageInput from "../../organisms/moderation/moderImageInput";
import MyBgColor from "../../atom/myBgColor";
import ModerMediaInfo from "../../molecules/moderation/moderMediaInfo";
import useModerFields from "../../hooks/moderation.ts/useModerFields";
import ModerMediaEdit from "../../organisms/moderation/moderMediaEdit";

type getMedia = Exclude<
  GetModerReportMediaQuery["getModerReportMedia"],
  null | undefined
>;

export default function MediaReportPage() {
  const navigate = useNavigate();
  const [media, setMedia] = useState<getMedia["media"] | null>();
  const [createdType, setCreatedType] = useState<getMedia["createdType"]>();
  const [creator, setCreator] = useState<getMedia["creator"]>();
  const [informer, setInformer] = useState<getMedia["informer"]>();
  const [report, setReport] = useState<getMedia["report"]>();
  const [reportId, setReportId] = useState<getMedia["reportId"]>();

  const [isWarningInformer, setIsWarningInformer] = useState(false);
  const [isWarningReported, setIsWarningReported] = useState(false);
  const [isMediaEdit, setIsMediaEdit] = useState(false);

  const { fields } = useModerFields({ media, setMedia });

  const { refetch } = useGetMediaReport({
    setMedia,
    setCreatedType,
    setCreator,
    setInformer,
    setReport,
    setReportId,
    errorCb: () => {
      navigate("/moderation");
    },
  });
  const { handleBan } = useBan();
  const { handleBan: handleReportBan } = useBanReports();
  const { handleAccept, setOldImage } = useAcceptModerMedia({
    media,
    dataCb: () => {
      setMedia(undefined);
      toast.success("Media was successfully cheked");
      refetch();
    },
  });
  const { handleDeleteReport } = useDeleteReport({
    dataCb: () => {
      setMedia(undefined);
      toast.success("Media was successfully cheked");
      refetch();
    },
  });

  const handleEditMediaButton = () => {
    setIsMediaEdit((prev) => !prev);
  };

  const handleSaveButton = () => {
    handleAccept({
      reportId: reportId || "",
    });
  };

  const handleNextButton = () => {
    handleDeleteReport(reportId || "");
  };

  const handleBanReportsInformerButton = () => {
    handleReportBan(informer?.id || "");
  };

  const handleBanReportedButton = () => {
    handleBan({
      banReason: "",
      userId: creator?.id || "",
    });
  };

  const handleBanInformerButton = () => {
    handleBan({
      banReason: "",
      userId: informer?.id || "",
    });
  };

  const handleWarningInformerButton = () => {
    setIsWarningInformer((prev) => !prev);
  };

  const handleWarningReportedButton = () => {
    setIsWarningReported((prev) => !prev);
  };

  const deleteMediaNote = () => {
    setMedia((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        note: "",
      };
    });
  };

  return (
    <>
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative md:ml-[70px] lg:ml-[190px]"
      >
        <img
          src="/posters6.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <MyBgColor>
          <MyContainer className="gap-4">
            <MyHeader vsize={"lg"}>Creator</MyHeader>
            <ModerUserModule
              handleWarningButton={handleWarningReportedButton}
              handleBanButton={handleBanReportedButton}
              user={creator}
            />

            {isWarningReported ? (
              <ModerWarning
                warningType="note"
                userId={creator?.id}
                mediaId={media?.id}
                setUser={setCreator}
                deleteMediaNote={deleteMediaNote}
              />
            ) : null}

            <MyHeader vsize={"lg"}>Informer </MyHeader>
            <ModerUserModule
              handleWarningButton={handleWarningInformerButton}
              handleBanReportsButton={handleBanReportsInformerButton}
              handleBanButton={handleBanInformerButton}
              user={informer}
            />
            {isWarningInformer ? (
              <ModerWarning
                warningType="report"
                userId={informer?.id}
                setUser={setInformer}
              />
            ) : null}

            <MyHeader vsize={"lg"}>Informer media-report</MyHeader>
            <MyBlock className="p-4">
              <MyParagraph>{report}</MyParagraph>
            </MyBlock>

            <MyHeader vsize={"lg"}>Media</MyHeader>
            <MyBlock>
              <ModerMediaInfo
                media={media}
                createdType={createdType}
                creatorId={creator?.id}
              />
              <MyButton
                vwide={"wide"}
                vvariatns={"primary"}
                onClick={handleEditMediaButton}
              >
                Edit
              </MyButton>
            </MyBlock>

            {isMediaEdit ? (
              <>
                <ModerImageInput
                  media={media}
                  setMedia={setMedia}
                  setOldImage={setOldImage}
                />
                <ModerMediaEdit
                  media={media}
                  setMedia={setMedia}
                  fields={fields}
                />
              </>
            ) : null}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <MyButton vwide={"wide"} onClick={handleNextButton}>
                next
              </MyButton>
              <MyButton
                vwide={"wide"}
                vvariatns={"primary"}
                onClick={handleSaveButton}
              >
                Save
              </MyButton>
            </div>
          </MyContainer>
        </MyBgColor>
      </motion.main>
    </>
  );
}
