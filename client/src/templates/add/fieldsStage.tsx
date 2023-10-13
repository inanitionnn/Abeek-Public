import { motion } from "framer-motion";
import { slideAnimation } from "../../constants";
import loadable from "@loadable/component";
import { useAppSelector } from "../../hooks/redux";
import { MediaEnum } from "../../graphql/__generated__/graphql";
import { useLocation } from "react-router-dom";

const AsyncModule = loadable(
  (props: { module: string }) =>
    import(`../../organisms/add/${props.module}.tsx`),
  {
    cacheKey: (props) => props.module,
  }
);

export default function FieldsStage() {
  const location = useLocation();

  const isText = location.pathname === "/add/create/text";

  const { mediaType } = useAppSelector((state) => state.types);
  return (
    <>
      <motion.div variants={slideAnimation} custom={0} className="space-y-2">
        <h1 className="text-center font-head font-bold text-xl tracking-tight">
          Creating {mediaType} by yourself
        </h1>
      </motion.div>
      <motion.div variants={slideAnimation} custom={1} className="w-full">
        <AsyncModule module="inputFields" />
      </motion.div>

      <motion.ul variants={slideAnimation} custom={3} className="steps">
        <li className="step step-primary">Start</li>
        {isText && <li className="step step-primary">Validation</li>}
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
