import { Link } from "react-router-dom";
import MMyButton from "../../atom/myButton";
import MMyHeader from "../../atom/myHeader";
import MMyParagraph from "../../atom/myParagraph";
import { slideAnimation } from "../../constants";
import { useAppSelector } from "../../hooks/redux";
import { MyBlock } from "../../atom/myBlock";
import { memo } from "react";

const AboutStart = memo(() => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return (
    <div className="min-h-screen max-w-[860px] flex items-center mx-auto sm:px-[40px] ">
      <MyBlock className="py-24 px-16 gap-12 bg-base-200 bg-opacity-90 ">
        <MMyHeader custom={1} variants={slideAnimation} vsize={"xl"}>
          Embrace Your Inner Geek!!!
        </MMyHeader>

        <MMyParagraph
          custom={2}
          variants={slideAnimation}
          className="max-w-[500px]"
        >
          Dive into a world where your passions take center stage – movies,
          books, comics, anime and more!
        </MMyParagraph>
        {isLoggedIn ? (
          <Link to={`/collection`}>
            <MMyButton
              custom={3}
              variants={slideAnimation}
              vvariatns={"primary"}
              vwide={"wide"}
            >
              My collection
            </MMyButton>
          </Link>
        ) : (
          <Link to={`/login`}>
            <MMyButton
              custom={3}
              variants={slideAnimation}
              vvariatns={"primary"}
              vwide={"wide"}
            >
              Login
            </MMyButton>
          </Link>
        )}
      </MyBlock>
    </div>
  );
});

export default AboutStart;
