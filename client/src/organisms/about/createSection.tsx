import MMyHeader, { MyHeader } from "../../atom/myHeader";
import MMyBlock from "../../atom/myBlock";
import { motion } from "framer-motion";
import MyParagraph from "../../atom/myParagraph";
import { slideAnimation } from "../../constants";
import { memo } from "react";

const CreateSection = memo(() => {
  return (
    <div className="py-28 px-8 sm:px-16 flex flex-col gap-16 items-center">
      <MMyHeader
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "all" }}
        variants={slideAnimation}
        custom={0}
        vsize={"xl"}
      >
        Expand Our Collection
      </MMyHeader>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="grid gap-4 xl:grid-cols-3 text-primary-content"
      >
        <MMyBlock
          variants={slideAnimation}
          custom={1}
          className="p-8 w-auto justify-start bg-primary"
        >
          <div className="flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 bg-base-200 stroke-base-content rounded-full p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>

            <MyHeader vsize={"lg"}>Wikipedia Parsing</MyHeader>
          </div>

          <MyParagraph>
            Our smart parsing system extracts accurate details from Wikipedia,
            making it quick and easy to add media to our collection.
          </MyParagraph>
        </MMyBlock>
        <MMyBlock
          variants={slideAnimation}
          custom={2}
          className="p-8 w-auto justify-start bg-primary"
        >
          <div className="flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 bg-base-200 stroke-base-content  rounded-full p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>

            <MyHeader vsize={"lg"}>GPT validation</MyHeader>
          </div>

          <MyParagraph>
            Experience the power of our GPT feature. Automatically fill in
            missing fields and create concise, spoiler-free plot summaries or
            descriptions.
          </MyParagraph>
        </MMyBlock>
        <MMyBlock
          variants={slideAnimation}
          custom={3}
          className="p-8 w-auto justify-start bg-primary"
        >
          <div className="flex gap-4 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 bg-base-200 stroke-base-content rounded-full p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <MyHeader vsize={"lg"}>Manual Entry</MyHeader>
          </div>

          <MyParagraph>
            For movies not covered by Wikipedia, you can manually add them by
            filling in the required details. Help expand our database with your
            contributions.
          </MyParagraph>
        </MMyBlock>
      </motion.div>
    </div>
  );
});

export default CreateSection;
