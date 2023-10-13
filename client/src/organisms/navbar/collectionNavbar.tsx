import { motion } from "framer-motion";
import { slideAnimation } from "../../constants/animation";
import { CollectionSize } from "../../molecules/navbar/collectionSize";
import { CollectionSort } from "../../molecules/navbar/collectionSort";
import { CollectionBooks } from "../../molecules/navbar/collectionBooks";
import CollectionWatch from "../../molecules/navbar/collectionWatch";
import { CollectionComics } from "../../molecules/navbar/collectionComics";
import { CollectionSeries } from "../../molecules/navbar/collectionSeries";
import { CollectionFilms } from "../../molecules/navbar/collectionFilms";
import { memo } from "react";

const CollectionNavBar = memo(() => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideAnimation}
        custom={1}
        className="ml-[70px] fixed h-full top-0 left-0 border-base-200 z-40
       border-r-[1px] w-[190px] py-4 px-4 font-normal bg-base-100"
      >
        <CollectionFilms />
        <div className="w-full h-[1px] bg-base-200"></div>
        <CollectionSeries />
        <div className="w-full h-[1px] bg-base-200"></div>
        <CollectionComics />
        <div className="w-full h-[1px] bg-base-200"></div>
        <CollectionBooks />
        <div className="w-full h-[1px] bg-base-200"></div>

        <div className="h-1/5 flex py-2 flex-col justify-center gap-2">
          <CollectionWatch />
          <CollectionSort />
          <CollectionSize />
        </div>
      </motion.div>
    </>
  );
});

export default CollectionNavBar;
