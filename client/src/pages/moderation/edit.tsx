import { useState } from "react";
import {
  GetModerEditMediaQuery,
  MediaEnum,
} from "../../graphql/__generated__/graphql";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MyButton from "../../atom/myButton";
import MyContainer from "../../atom/myContainer";
import MyBlock from "../../atom/myBlock";
import useAcceptModerMedia from "../../hooks/moderation.ts/useAcceptModerMedia";
import useModerEditMedia from "../../hooks/moderation.ts/useModerEditMedia";
import ModerImageInput from "../../organisms/moderation/moderImageInput";
import ModerMediaInfo from "../../molecules/moderation/moderMediaInfo";
import MyBgColor from "../../atom/myBgColor";
import ModerMediaEdit from "../../organisms/moderation/moderMediaEdit";
import useModerFields from "../../hooks/moderation.ts/useModerFields";
import useGtpParse from "../../hooks/moderation.ts/useGptParse";
import MyLoading from "../../atom/myLoading";

export default function EditPage() {
  const navigate = useNavigate();

  const { type, id } = useParams<{ type: MediaEnum; id: string }>();

  const [media, setMedia] =
    useState<GetModerEditMediaQuery["getModerEditMedia"]>();

  const { handleParseButton, loading: gptLoading } = useGtpParse({
    media,
    setMedia,
  });
  useModerEditMedia({
    setMedia,
    id,
    type,
  });
  const { fields } = useModerFields({ media, setMedia });
  const { handleAccept, setOldImage } = useAcceptModerMedia({
    media: media,
    dataCb: () => {
      toast.success("Media success updated");
      navigate(-1);
    },
  });

  const handleSaveButton = () => {
    handleAccept({});
  };

  return (
    <>
      <motion.main
        initial="hidden"
        animate="visible"
        className="relative md:ml-[70px] lg:ml-[190px]"
      >
        <img
          src="/posters7.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <MyBgColor>
          <MyContainer className="gap-4">
            <MyBlock>
              <ModerMediaInfo media={media} />
            </MyBlock>

            <ModerImageInput
              media={media}
              setMedia={setMedia}
              setOldImage={setOldImage}
            />
            <ModerMediaEdit media={media} setMedia={setMedia} fields={fields} />
            {!gptLoading ? (
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
                <MyButton vwide={"wide"} onClick={handleParseButton}>
                  Gpt help
                </MyButton>
                <MyButton
                  vwide={"wide"}
                  vvariatns={"primary"}
                  onClick={handleSaveButton}
                >
                  Save
                </MyButton>
              </div>
            ) : (
              <MyLoading />
            )}
          </MyContainer>
        </MyBgColor>
      </motion.main>
    </>
  );
}
