import { memo } from "react";
import MMyBlock from "../../atom/myBlock";
import MMyHeader from "../../atom/myHeader";
import MyParagraph from "../../atom/myParagraph";
import { slideAnimation } from "../../constants";
import AnimatedPostersUp from "../../molecules/about/animatedPostersUp";

const SearchSection = memo(() => {
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
        Discover Media
      </MMyHeader>
      <div className="flex justify-center items-center flex-wrap-reverse gap-20">
        <AnimatedPostersUp />

        <MMyBlock
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          variants={slideAnimation}
          custom={0}
          className="max-w-[400px] bg-base-200"
        >
          <MyParagraph>
            Unleash the power of our smart{" "}
            <span className="font-bold">Search</span> feature and find your
            perfect entertainment match. Enter any criteria you desire – whether
            it's a specific movie, director, genre, or even a unique description
            – and let us uncover the perfect media fit for you. Your
            personalized journey starts here.
          </MyParagraph>
        </MMyBlock>
      </div>
    </div>
  );
});

export default SearchSection;
