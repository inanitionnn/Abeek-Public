import { motion } from "framer-motion";
import MMyHeader, { MyHeader } from "../../atom/myHeader";
import { slideAnimation } from "../../constants";
import MMyBlock from "../../atom/myBlock";
import MyParagraph from "../../atom/myParagraph";
import { memo } from "react";

const CollectionSection = memo(() => {
  return (
    <div className="py-28 px-8 sm:px-16 flex flex-col gap-16 items-center ">
      <MMyHeader
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "all" }}
        variants={slideAnimation}
        custom={0}
        vsize={"xl"}
      >
        Personalize Your Media Experience
      </MMyHeader>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="grid gap-4 lg:grid-cols-3"
      >
        <MMyBlock
          variants={slideAnimation}
          custom={0}
          className="p-8 w-auto justify-start bg-base-200"
        >
          <div className="flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 bg-primary stroke-primary-content rounded-full p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>

            <MyHeader vsize={"lg"}>Keep</MyHeader>
          </div>

          <MyParagraph>
            Create a personalized library of your favorite media
          </MyParagraph>
        </MMyBlock>
        <MMyBlock
          variants={slideAnimation}
          custom={1}
          className="p-8 w-auto justify-start bg-base-200"
        >
          <div className="flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 bg-primary stroke-primary-content rounded-full p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <MyHeader vsize={"lg"}>Track</MyHeader>
          </div>

          <MyParagraph>
            Mark the stage of your viewing experience <br /> whether it's in
            progress, finished, abandoned, etc.
          </MyParagraph>
        </MMyBlock>
        <MMyBlock
          variants={slideAnimation}
          custom={2}
          className="p-8 w-auto justify-start bg-base-200"
        >
          <div className="flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 bg-primary stroke-primary-content rounded-full p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>

            <MyHeader vsize={"lg"}>Evaluate</MyHeader>
          </div>

          <MyParagraph>
            Rate and review the media you've experienced
          </MyParagraph>
        </MMyBlock>
      </motion.div>
    </div>
  );
});

export default CollectionSection;
