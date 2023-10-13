import { motion } from "framer-motion";
import { useAppSelector } from "../../hooks/redux";
import { slideAnimation } from "../../constants";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import loadable from "@loadable/component";
import MyHeader from "../../atom/myHeader";

const AsyncModule = loadable(
  (props: { module: string }) =>
    import(`../../organisms/add/${props.module}.tsx`),
  {
    cacheKey: (props) => props.module,
  }
);

export default function TextStage() {
  const { mediaType } = useAppSelector((state) => state.types);
  return (
    <>
      <motion.div variants={slideAnimation} custom={0} className="space-y-2">
        <MyHeader vsize={"xl"}>Creating {mediaType} by Text</MyHeader>
      </motion.div>

      <motion.div
        variants={slideAnimation}
        custom={1}
        className="flex items-center gap-8 w-full"
      >
        <AsyncModule module="textParse" />
      </motion.div>

      <motion.ul variants={slideAnimation} custom={3} className="steps">
        <li className="step step-primary">Text parse</li>
        <li className="step">Validation</li>
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
