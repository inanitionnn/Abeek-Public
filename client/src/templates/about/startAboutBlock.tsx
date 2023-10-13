import MyBgColor from "../../atom/myBgColor";
import AboutStart from "../../organisms/about/aboutStart";
import { memo } from "react";

const StartAboutBlock = memo(() => {
  return (
    <div className="relative">
      <img
        src="/posters10.webp"
        alt="poster"
        className="absolute w-full h-screen object-cover -z-50"
      />
      <div className="absolute right-0 left-0 -bottom-[90px] h-[160px] bg-base-100 blur-md bg-opacity-90" />
      <MyBgColor vopacity={"medium"}>
        <AboutStart />
      </MyBgColor>
    </div>
  );
});

export default StartAboutBlock;
