import { useState } from "react";
import loadable from "@loadable/component";
import MMyContainer from "../atom/myContainer";
import MyBgColor from "../atom/myBgColor";
import SearchBlock from "../templates/search/searchBlock";
import FooterBlock from "../templates/footer";

const AsyncAddModal = loadable(() => import("../organisms/add/addModal"));

export default function SearchPage() {
  const [isModal, setIsModal] = useState(false);
  const [mediaId, setMediaId] = useState("");

  return (
    <main className="md:ml-[60px] lg:ml-[190px]  relative">
      <AsyncAddModal
        mediaId={mediaId}
        isModal={isModal}
        setIsModal={setIsModal}
      />
      <img
        src="/posters2.webp"
        alt="poster"
        className="w-full h-full fixed object-cover -z-50"
      />

      <MyBgColor>
        <MMyContainer
          initial="hidden"
          animate="visible"
          vwide={"md"}
          className="justify-start"
        >
          <SearchBlock setIsModal={setIsModal} setMediaId={setMediaId} />
        </MMyContainer>
        <FooterBlock />
      </MyBgColor>
    </main>
  );
}
