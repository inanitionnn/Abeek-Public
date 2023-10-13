import MyBlock from "../../atom/myBlock";
import { MyContainer } from "../../atom/myContainer";
import { MyHeader } from "../../atom/myHeader";
import { MyParagraph } from "../../atom/myParagraph";

export default function notFound() {
  return (
    <div className="md:ml-[70px] lg:ml-[190px] relative">
      <img
        src="/posters10.webp"
        alt="poster"
        className="absolute w-full h-screen object-cover -z-50"
      />
      <MyContainer>
        <MyBlock>
          <MyHeader vsize={"xl"}>Oopps</MyHeader>
          <MyParagraph vsize={"lg"}>Not Found</MyParagraph>
        </MyBlock>
      </MyContainer>
    </div>
  );
}
