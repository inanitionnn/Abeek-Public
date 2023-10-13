import { slideAnimation } from "../../constants";
import MMyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import AnimatedPostersLeft from "../../molecules/about/animatedPostersLeft";
import MMyBlock from "../../atom/myBlock";
import { memo } from "react";

const RandomSection = memo(() => {
  return (
    <div className="py-28 px-8 sm:px-16 flex flex-col gap-16 items-center">
      <MMyHeader
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={slideAnimation}
        custom={0}
        vsize={"xl"}
      >
        Leave it to Chance
      </MMyHeader>
      <div className="flex justify-center items-center flex-wrap-reverse gap-24">
        <AnimatedPostersLeft />

        <MMyBlock
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          variants={slideAnimation}
          custom={0}
          className="max-w-[400px] bg-base-200"
        >
          <MyParagraph>
            Can't decide what to watch for the evening? Let us help you out!
            Click our <span className="font-bold">Random</span> feature for a
            selection of movies, series, or other media, perfect for those
            spontaneous entertainment moments.
          </MyParagraph>
        </MMyBlock>
      </div>
    </div>
  );
});

export default RandomSection;
