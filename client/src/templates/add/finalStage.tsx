import loadable from "@loadable/component";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import { motion } from "framer-motion";
import { slideAnimation } from "../../constants";
import { useAppSelector } from "../../hooks/redux";
import { useLocation } from "react-router-dom";
import MyParagraph from "../../atom/myParagraph";
import MyHeader from "../../atom/myHeader";

const AsyncModule = loadable(
  (props: { module: string }) =>
    import(`../../organisms/add/${props.module}.tsx`),
  {
    cacheKey: (props) => props.module,
  }
);

export default function FinalStage() {
  const location = useLocation();

  const isWiki = location.pathname === "/add/create/wiki";
  const isText = location.pathname === "/add/create/text";

  const { mediaType } = useAppSelector((state) => state.types);

  return (
    <>
      <motion.div variants={slideAnimation} custom={0} className="space-y-2">
        <MyHeader vsize={"xl"}>Final stage</MyHeader>
        <MyParagraph>
          Here you can rate, write a report or leave a note
        </MyParagraph>
      </motion.div>

      <motion.div variants={slideAnimation} custom={2} className="w-full">
        <AsyncModule module="final" />
      </motion.div>
      <motion.ul variants={slideAnimation} custom={10} className="steps">
        <li className="step step-primary">Start</li>
        {isWiki && <li className="step step-primary">Parse Wiki</li>}
        {isText && <li className="step step-primary">Validation</li>}
        <li className="step step-primary">
          Select{" "}
          {mediaType === MediaEnum.Book || mediaType === MediaEnum.Comics
            ? "cover"
            : "poster"}{" "}
          for {mediaType}
        </li>
        <li className="step step-primary">Final</li>
      </motion.ul>
    </>
  );
}
