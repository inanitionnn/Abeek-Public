import loadable from "@loadable/component";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import { motion } from "framer-motion";
import { slideAnimation } from "../../constants";
import { useAppSelector } from "../../hooks/redux";
import MMyHeader from "../../atom/myHeader";

const AsyncModule = loadable(
  (props: { module: string }) =>
    import(`../../organisms/add/${props.module}.tsx`),
  {
    cacheKey: (props) => props.module,
  }
);

export default function ParseStage() {
  const { mediaType } = useAppSelector((state) => state.types);

  return (
    <>
      <MMyHeader variants={slideAnimation} custom={0} vsize={"xl"}>
        Parsed {mediaType}
      </MMyHeader>

      <motion.div variants={slideAnimation} custom={1} className="w-full">
        <AsyncModule module="wikiParse" />
      </motion.div>

      <motion.ul variants={slideAnimation} custom={2} className="steps">
        <li className="step step-primary">Start</li>
        <li className="step step-primary">Parse Wiki</li>
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
