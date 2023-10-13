import { useLocation } from "react-router-dom";
import loadable from "@loadable/component";
import { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import BlurBackgraund from "../molecules/navbar/blurBackgraund";
import NavbarButton from "../atom/navbarButton";

const AsyncBigNavbar = loadable(() => import("../organisms/navbar/mainNavbar"));
const AsyncCollectionNavBar = loadable(
  () => import("../organisms/navbar/collectionNavbar")
);

const Navbar = () => {
  const location = useLocation();
  const isCollection = location.pathname.includes("/collection");
  const navbarRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useClickOutside(navbarRef, () => setVisible(false));

  return (
    <>
      <AnimatePresence>{visible && <BlurBackgraund />}</AnimatePresence>

      <div ref={navbarRef}>
        <div className="fixed top-8 right-8 z-20 md:hidden">
          <NavbarButton setVisible={setVisible} visible={visible} />
        </div>
        <AnimatePresence>
          {visible && (
            <nav>
              <AsyncBigNavbar />

              {isCollection && <AsyncCollectionNavBar />}
            </nav>
          )}
        </AnimatePresence>
        {!visible && (
          <motion.nav className={"hidden md:block"}>
            <AsyncBigNavbar />

            {isCollection && <AsyncCollectionNavBar />}
          </motion.nav>
        )}
      </div>
    </>
  );
};

export default Navbar;
