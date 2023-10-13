import RandomBlock from "../templates/random/randomBlock";
import MyBgColor from "../atom/myBgColor";
import FooterBlock from "../templates/footer";

export default function Random() {
  return (
    <>
      <main className="md:ml-[60px] lg:ml-[190px] relative">
        <img
          src="/posters6.webp"
          alt="poster"
          className="w-full h-full object-cover fixed -z-50"
        />

        <MyBgColor>
          <RandomBlock />
          <FooterBlock />
        </MyBgColor>
      </main>
    </>
  );
}
