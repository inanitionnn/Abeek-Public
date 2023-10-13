import { motion } from "framer-motion";
import MyBgColor from "../atom/myBgColor";
import ProfileBlock from "../templates/profile/profileBlock";
import FooterBlock from "../templates/footer";

export default function Profile() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="relative md:ml-[70px] lg:ml-[190px]"
    >
      <img
        src="/posters8.webp"
        alt="poster"
        className="w-full h-full object-cover fixed -z-50"
      />

      <MyBgColor>
        <ProfileBlock />
        <FooterBlock />
      </MyBgColor>
    </motion.main>
  );
}
