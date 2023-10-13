import MyBgColor from "../atom/myBgColor";
import MyBlock from "../atom/myBlock";
import RegistrationForm from "../templates/registration/registrationForm";
import MMyContainer from "../atom/myContainer";

export default function Registration() {
  return (
    <>
      <main className="md:ml-[60px] lg:ml-[190px] relative">
        <img
          src="/posters10.webp"
          alt="poster"
          className="absolute w-full h-screen object-cover -z-50"
        />
        <MyBgColor vopacity={"medium"}>
          <MMyContainer initial="hidden" animate="visible">
            <MyBlock className="bg-base-100 w-auto sm:px-32 sm:py-16">
              <RegistrationForm />
            </MyBlock>
          </MMyContainer>
        </MyBgColor>
      </main>
    </>
  );
}
