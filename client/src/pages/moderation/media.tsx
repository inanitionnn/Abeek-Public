import { motion } from "framer-motion";
import { GetModerMediaQuery } from "../../graphql/__generated__/graphql";
import { useState } from "react";
import { IMAGE_API } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { MyContainer } from "../../atom/myContainer";
import useModerMedia from "../../hooks/moderation.ts/useModerMedia";
import useAcceptModerMedia from "../../hooks/moderation.ts/useAcceptModerMedia";
import { MyBlock } from "../../atom/myBlock";
import ModerMediaInfo from "../../molecules/moderation/moderMediaInfo";
import MyHeader from "../../atom/myHeader";
import { MyParagraph } from "../../atom/myParagraph";
import { MyButton } from "../../atom/myButton";
import ModerMediaEdit from "../../organisms/moderation/moderMediaEdit";
import ModerImageInput from "../../organisms/moderation/moderImageInput";
import ModerWarning from "../../organisms/moderation/moderWarning";
import ModerUserModule from "../../molecules/moderation/moderUserModule";
import useBan from "../../hooks/moderation.ts/useBan";
import { toast } from "react-toastify";
import MyBgColor from "../../atom/myBgColor";
import useModerFields from "../../hooks/moderation.ts/useModerFields";
import useGtpParse from "../../hooks/moderation.ts/useGptParse";
import MyLoading from "../../atom/myLoading";

type getMedia = Exclude<GetModerMediaQuery["getModerMedia"], null | undefined>;

export default function ModerMediaPage() {
  const navigate = useNavigate();
  const [media, setMedia] = useState<getMedia["media"]>();
  const [creator, setCreator] = useState<getMedia["creator"]>();
  const [searchMedia, setSearchMedia] = useState<getMedia["searchMedia"]>();
  const [createdType, setCreatedType] = useState<getMedia["createdType"]>();
  const [report, setReport] = useState<getMedia["report"]>();
  const [isWarning, setIsWarning] = useState(false);
  const [isMediaEdit, setIsMediaEdit] = useState(false);

  const { fields } = useModerFields({ media, setMedia });
  const { handleParseButton, loading: gptLoading } = useGtpParse({
    media,
    setMedia,
  });
  const { moderMediaRefetch } = useModerMedia({
    setMedia,
    setCreatedType,
    setCreator,
    setReport,
    setSearchMedia,
    errorCb: () => {
      navigate("/moderation");
    },
  });

  const { handleAccept, setOldImage } = useAcceptModerMedia({
    media,
    dataCb: () => {
      setMedia(null);
      toast.success("Media was successfully cheked");
      moderMediaRefetch();
    },
  });
  const { handleBan } = useBan();

  const handleLeavePrivate = () => {
    handleAccept({
      isPublic: false,
      isChecked: true,
    });
  };
  const handleAddPublic = () => {
    handleAccept({
      isPublic: true,
      isChecked: true,
    });
  };

  const handleBanButton = () => {
    handleBan({
      banReason: "",
      userId: creator?.id || "",
    });
  };

  const handleWarningButton = () => {
    setIsWarning((prev) => !prev);
  };

  const handleEditMediaButton = () => {
    setIsMediaEdit((prev) => !prev);
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
              handleWarningButton={handleWarningButton}
              handleBanButton={handleBanButton}
              user={creator}
            />

            {isWarning ? (
              <ModerWarning
                warningType="media"
                mediaId={media?.id}
                userId={creator?.id}
                setUser={setCreator}
              />
            ) : null}

            <MyHeader vsize={"lg"}>Creator media-report</MyHeader>
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
              {!gptLoading ? (
                <div className="flex flex-col justify-center md:flex-row gap-4">
                  <MyButton vwide={"wide"} onClick={handleParseButton}>
                    Gpt help
                  </MyButton>
                  <MyButton
                    vwide={"wide"}
                    vvariatns={"primary"}
                    onClick={handleEditMediaButton}
                  >
                    Edit
                  </MyButton>
                </div>
              ) : (
                <MyLoading />
              )}
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

            {!!searchMedia?.length && (
              <>
                <div>
                  <MyHeader vsize={"lg"}>Public media with same name</MyHeader>
                  <MyParagraph>
                    Do not add media that is repeated to public
                  </MyParagraph>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {searchMedia?.map((media) => (
                    <Link to={`/media/${media.media}/${media.id}`}>
                      <MyBlock className="p-4">
                        <img
                          src={IMAGE_API + "/" + media.image}
                          alt="cover"
                          className="w-[200px] h-[300px] rounded-lg"
                        />
                        <div>
                          <MyHeader className="max-w-[200px]">
                            {media.title}
                          </MyHeader>
                          <MyParagraph>
                            {(media.__typename === "ComicsBaseResponse" ||
                              media.__typename === "SeriesBaseResponse") &&
                              `${media.startYear}-${
                                media.endYear ? media.endYear : "????"
                              }`}
                          </MyParagraph>
                          <MyParagraph>
                            {(media.__typename === "FilmBaseResponse" ||
                              media.__typename === "BookBaseResponse") &&
                              media.year}
                          </MyParagraph>
                        </div>
                      </MyBlock>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {!gptLoading ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <MyButton vwide={"wide"} onClick={handleLeavePrivate}>
                  leave at private
                </MyButton>
                <MyButton
                  vwide={"wide"}
                  vvariatns={"primary"}
                  onClick={handleAddPublic}
                >
                  Add to public
                </MyButton>
              </div>
            ) : null}
          </MyContainer>
        </MyBgColor>
      </motion.main>
    </>
  );
}
