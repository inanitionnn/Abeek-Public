import { memo } from "react";
import MyBlock from "../../atom/myBlock";
import MyHeader from "../../atom/myHeader";
import ParallaxText from "../../molecules/about/parallaxText";
import CollectionSection from "../../organisms/about/collectionSection";
import CreateSection from "../../organisms/about/createSection";
import RandomSection from "../../organisms/about/randomSection";
import SearchSection from "../../organisms/about/searchSection";

const MainAboutBlock = memo(() => {
  return (
    <>
      <ParallaxText baseVelocity={-5}>
        collection page collection page
      </ParallaxText>
      <div className="space-y-20 mb-12">
        <CollectionSection />

        <ParallaxText baseVelocity={3}>search page search page</ParallaxText>
        <SearchSection />

        <ParallaxText baseVelocity={-5}>
          add page add page add page
        </ParallaxText>
        <CreateSection />

        <ParallaxText baseVelocity={3}>random page random page</ParallaxText>
        <RandomSection />

        <ParallaxText baseVelocity={-5}>Films Series Comics Books</ParallaxText>
        <MyBlock className="bg-base-200 text-base-content mx-12 w-auto">
          <MyHeader>
            If you have any complaints or suggestions, please use the contact
            information below.
          </MyHeader>
        </MyBlock>
      </div>
    </>
  );
});

export default MainAboutBlock;
