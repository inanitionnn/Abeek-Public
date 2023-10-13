import { motion } from "framer-motion";
import loadable from "@loadable/component";
import { useAppSelector } from "../../hooks/redux";
import MyContainer from "../../atom/myContainer";

const AsyncTemplate = loadable(
  (props: { template: string }) =>
    import(`../../templates/add/${props.template}.tsx`),
  {
    cacheKey: (props) => props.template,
  }
);
export default function Text() {
  const { stage } = useAppSelector((state) => state.add);

  return (
    <>
      <motion.main
        animate="visible"
        initial="hidden"
        className="md:ml-[70px] lg:ml-[190px] relative"
      >
        <img
          src="/posters4.webp"
          alt="poster"
          className="w-full h-full fixed object-cover -z-50"
        />
        <div className="bg-base-100 bg-opacity-95">
          <MyContainer vwide={"lg"}>
            {stage === "start" && <AsyncTemplate template="textStage" />}
            {stage === "parse" && <AsyncTemplate template="fieldsStage" />}
            {stage === "images" && <AsyncTemplate template="imagesStage" />}
            {stage === "final" && <AsyncTemplate template="finalStage" />}
          </MyContainer>
        </div>
      </motion.main>
    </>
  );
}
