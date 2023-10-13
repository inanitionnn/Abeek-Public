import LoginForm from "../templates/login/loginForm";
import MyBgImage from "../atom/myBgImage";
import MyBgColor from "../atom/myBgColor";
import MMyContainer from "../atom/myContainer";
import MyBlock from "../atom/myBlock";

export default function Login() {
  return (
    <>
      <main className="md:ml-[70px] lg:ml-[190px] relative">
        <img
          src="/posters10.webp"
          alt="poster"
          className="absolute w-full h-screen object-cover -z-50"
        />
        <MyBgImage className="bg-[url('posters10.webp')]">
          <MyBgColor vopacity={"medium"}>
            <MMyContainer initial="hidden" animate="visible">
              <MyBlock className="bg-base-100 w-auto sm:px-32 sm:py-16">
                <LoginForm />
              </MyBlock>
            </MMyContainer>
          </MyBgColor>
        </MyBgImage>
      </main>
    </>
  );
}
