import MMyContainer from "../atom/myContainer";
import MyBgColor from "../atom/myBgColor";
import MainFollowsBlock from "../templates/follows/mainFollowsBlock";
import FooterBlock from "../templates/footer";

export default function follows() {
  return (
    <main className="md:ml-[60px] lg:ml-[190px] relative">
      <img
        src="/posters4.webp"
        alt="poster"
        className="w-full h-full object-cover fixed -z-50"
      />
      <MyBgColor>
        <MMyContainer
          initial="hidden"
          animate="visible"
          vwide={"lg"}
          className="gap-8 justify-start"
        >
          <MainFollowsBlock />
        </MMyContainer>
        <FooterBlock />
      </MyBgColor>
    </main>
  );
}
