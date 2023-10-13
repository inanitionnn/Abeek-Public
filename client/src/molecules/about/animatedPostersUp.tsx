import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimatedPostersUp() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });
  const smoothVelocity = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });
  const y = useTransform(
    smoothVelocity,
    [0, 0.2, 0.5, 1],
    [-130, -270, -150, 0]
  );
  const z = useTransform(
    smoothVelocity,
    [0, 0.25, 0.26, 1],
    ["0", "0", "20", "20"]
  );
  const rotate1 = useTransform(
    smoothVelocity,
    [0, 0.2, 0.4, 1],
    [0, -25, -30, -30]
  );
  const rotate2 = useTransform(
    smoothVelocity,
    [0, 0.2, 0.4, 1],
    [0, 20, 25, 30]
  );
  const y2 = useTransform(smoothVelocity, [0, 0.2, 0.5, 1], [0, 25, 75, 90]);
  return (
    <div className="w-[200px] mb-[100px] mt-[150px]  mx-[100px] h-[200px] relative ">
      <img
        src="poster2.webp"
        alt="poster"
        className="absolute bottom-[70px] right-[90px] sm:right-[85px] rotate-[-15deg] z-0 w-40 h-60 rounded-lg shadow"
      />
      <img
        src="poster6.webp"
        alt="poster"
        className="absolute bottom-[60px] right-[-30px] sm:right-[-40px] rotate-[20deg] z-0 w-40 h-60 rounded-lg shadow"
      />
      <motion.img
        ref={ref}
        style={{ y, zIndex: z }}
        src="poster1.webp"
        alt="poster"
        className="absolute bottom-[-85px] left-[15px] sm:left-[0px] w-40 h-60 rounded-lg shadow"
      />

      <motion.img
        style={{ rotate: rotate1 }}
        src="poster4.webp"
        alt="poster"
        className="absolute bottom-[-50px] right-[95px] sm:right-[160px] rotate-[-20deg] z-10 w-40 h-60 rounded-lg shadow"
      />
      <motion.img
        style={{ rotate: rotate2 }}
        src="poster3.webp"
        alt="poster"
        className="absolute bottom-[-25px] left-[80px] sm:left-[130px] rotate-[20deg] z-10 w-40 h-60 rounded-lg shadow"
      />
      <motion.img
        style={{ y: y2, rotate: 10 }}
        src="poster5.webp"
        alt="poster"
        className="absolute bottom-[-70px] left-[20px] sm:left-[0px] rotate-[10deg] z-10 w-40 h-60 rounded-lg shadow"
      />
    </div>
  );
}
