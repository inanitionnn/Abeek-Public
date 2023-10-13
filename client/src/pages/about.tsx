import { motion } from "framer-motion";
import MainAboutBlock from "../templates/about/mainAboutBlock";
import StartAboutBlock from "../templates/about/startAboutBlock";
import FooterBlock from "../templates/footer";

export default function About() {
  return (
    <>
      <motion.main
        initial="hidden"
        animate="visible"
        className="md:ml-[60px] lg:ml-[190px] relative"
      >
        <StartAboutBlock />
        <MainAboutBlock />
        <FooterBlock />
      </motion.main>
    </>
  );
}
