import loadable from "@loadable/component";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import { motion } from "framer-motion";
import { slideAnimation } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setStageState } from "../../redux/reducers/addPageSlice";
import MMyHeader from "../../atom/myHeader";
import MMyButton from "../../atom/myButton";

const AsyncModule = loadable(
  (props: { module: string }) =>
    import(`../../organisms/add/${props.module}.tsx`),
  {
    cacheKey: (props) => props.module,
  }
);

export default function ImagesStage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isWiki = location.pathname === "/add/create/wiki";
  const isText = location.pathname === "/add/create/text";

  const { mediaType } = useAppSelector((state) => state.types);
  const { gptLoading, imagesLoading } = useAppSelector((state) => state.add);
  const handleDeleteButton = () => {
    navigate("/add");
  };
  const handleBackButton = () => {
    if (isText) {
      dispatch(setStageState("parse"));
    } else {
      dispatch(setStageState("start"));
    }
  };
  const handleNextButton = () => {
    dispatch(setStageState("final"));
  };

  return (
    <>
      <MMyHeader variants={slideAnimation} custom={0} vsize={"xl"}>
        Select{" "}
        {mediaType === MediaEnum.Book || mediaType === MediaEnum.Comics
          ? "cover"
          : "poster"}{" "}
        for {mediaType}
      </MMyHeader>

      <motion.div variants={slideAnimation} custom={1} className="w-full">
        <AsyncModule module="gptParse" />
      </motion.div>

      <motion.div variants={slideAnimation} custom={2} className="w-full">
        <AsyncModule module="imagesParse" />
      </motion.div>

      {!gptLoading && !imagesLoading && (
        <>
          <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-4">
            {isWiki ? (
              <MMyButton
                variants={slideAnimation}
                custom={3}
                vwide={"wide"}
                onClick={handleDeleteButton}
              >
                Delete {mediaType}
              </MMyButton>
            ) : (
              <MMyButton
                variants={slideAnimation}
                custom={3}
                vwide={"wide"}
                onClick={handleBackButton}
              >
                Back
              </MMyButton>
            )}

            <MMyButton
              variants={slideAnimation}
              custom={4}
              vvariatns={"primary"}
              vwide={"wide"}
              onClick={handleNextButton}
            >
              Next
            </MMyButton>
          </div>
        </>
      )}

      <motion.ul variants={slideAnimation} custom={5} className="steps">
        <li className="step step-primary">Start</li>
        {isWiki && <li className="step step-primary">Parse Wiki</li>}

        <li className="step step-primary">
          Select{" "}
          {mediaType === MediaEnum.Book || mediaType === MediaEnum.Comics
            ? "cover"
            : "poster"}{" "}
          for {mediaType}
        </li>
        <li className="step">Final</li>
      </motion.ul>
    </>
  );
}
