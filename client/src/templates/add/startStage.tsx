import loadable from "@loadable/component";
import { useAppSelector } from "../../hooks/redux";
import { motion } from "framer-motion";
import { slideAnimation } from "../../constants";
import { MediaEnum } from "../../graphql/__generated__/graphql";
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

export default function StartStage() {
  const location = useLocation();
  const isWiki = location.pathname === "/add/create/wiki";
  const isText = location.pathname === "/add/create/text";
  const { mediaType } = useAppSelector((state) => state.types);

  return (
    <>
      <motion.div variants={slideAnimation} custom={0} className="space-y-2">
        <MyHeader vsize={"xl"}>Creating {mediaType} by Wiki</MyHeader>
        <MyParagraph>
          Here you can specify a more accurate name for the future parsing
        </MyParagraph>
      </motion.div>

      <motion.div variants={slideAnimation} custom={1} className="w-full">
        <AsyncModule module="rememberBlock" />
      </motion.div>

      <motion.div variants={slideAnimation} custom={2} className="w-full">
        <AsyncModule module="parseInput" />
      </motion.div>

      <motion.ul variants={slideAnimation} custom={3} className="steps">
        <li className="step step-primary">Start</li>
        {isWiki && <li className="step">Parse Wiki</li>}
        {isText && <li className="step">Validation</li>}
        <li className="step">
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
