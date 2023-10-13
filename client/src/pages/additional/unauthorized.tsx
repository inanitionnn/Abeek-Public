import { Link } from "react-router-dom";
import { MyHeader } from "../../atom/myHeader";
import { MyButton } from "../../atom/myButton";
import { MyBlock } from "../../atom/myBlock";
import { MyContainer } from "../../atom/myContainer";
export default function Unauthorized() {
  return (
    <>
      <main className="md:ml-[70px] lg:ml-[190px] relative">
        <img
          src="/posters10.webp"
          alt="poster"
          className="absolute w-full h-screen object-cover -z-50"
        />
        <div className="bg-base-100 bg-opacity-[0.70] flex justify-center h-screen">
          <MyContainer>
            <MyBlock className="sm:p-16 border-2 sm:border-4 border-error border-dashed">
              <MyHeader vsize={"xl"}>You need to authorized!</MyHeader>
              <Link to={"/login"}>
                <MyButton vvariatns={"primary"} vsize={"lg"}>
                  Login
                </MyButton>
              </Link>
            </MyBlock>
          </MyContainer>
        </div>
      </main>
    </>
  );
}
