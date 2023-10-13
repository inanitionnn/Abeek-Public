import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimatedPostersLeft() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothVelocity = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });
  // const x1 = useTransform(smoothVelocity, [0, 0.2], [-75, 75]);
  // const x2 = useTransform(smoothVelocity, [0.2, 0.4], [-75, 75]);
  // const x3 = useTransform(smoothVelocity, [0.4, 0.6], [-75, 75]);
  // const x4 = useTransform(smoothVelocity, [0.6, 0.8], [-75, 75]);
  // const x5 = useTransform(smoothVelocity, [0.8, 1], [-75, 75]);
  // const opacity1 = useTransform(
  //   smoothVelocity,
  //   [0, 0.05, 0.15, 0.2],
  //   [0, 1, 1, 0]
  // );
  // const opacity2 = useTransform(
  //   smoothVelocity,
  //   [0.2, 0.25, 0.35, 0.4],
  //   [0, 1, 1, 0]
  // );
  // const opacity3 = useTransform(
  //   smoothVelocity,
  //   [0.4, 0.45, 0.55, 0.6],
  //   [0, 1, 1, 0]
  // );
  // const opacity4 = useTransform(
  //   smoothVelocity,
  //   [0.6, 0.65, 0.75, 0.8],
  //   [0, 1, 1, 0]
  // );
  // const opacity5 = useTransform(
  //   smoothVelocity,
  //   [0.8, 0.85, 0.95, 1],
  //   [0, 1, 1, 0]
  // );
  // const scale1 = useTransform(smoothVelocity, [0, 0.1, 0.2], [0.8, 1, 0.8]);
  // const scale2 = useTransform(smoothVelocity, [0.2, 0.3, 0.4], [0.8, 1, 0.8]);
  // const scale3 = useTransform(smoothVelocity, [0.4, 0.5, 0.6], [0.8, 1, 0.8]);
  // const scale4 = useTransform(smoothVelocity, [0.6, 0.7, 0.8], [0.8, 1, 0.8]);
  // const scale5 = useTransform(smoothVelocity, [0.8, 0.9, 1], [0.8, 1, 0.8]);

  const x1 = useTransform(smoothVelocity, [0, 0.3], [-75, 75]);
  const x2 = useTransform(smoothVelocity, [0.3, 0.6], [-75, 75]);
  const x3 = useTransform(smoothVelocity, [0.6, 1], [-75, 75]);

  const opacity1 = useTransform(
    smoothVelocity,
    [0, 0.1, 0.2, 0.3],
    [0, 1, 1, 0]
  );
  const opacity2 = useTransform(
    smoothVelocity,
    [0.3, 0.4, 0.5, 0.6],
    [0, 1, 1, 0]
  );
  const opacity3 = useTransform(
    smoothVelocity,
    [0.6, 0.7, 0.9, 1],
    [0, 1, 1, 0]
  );

  const scale1 = useTransform(smoothVelocity, [0, 0.15, 0.3], [0.8, 1, 0.8]);
  const scale2 = useTransform(smoothVelocity, [0.3, 0.45, 0.6], [0.8, 1, 0.8]);
  const scale3 = useTransform(smoothVelocity, [0.6, 0.8, 1], [0.8, 1, 0.8]);
  return (
    <div ref={ref} className="w-[200px] h-[300px] relative ">
      <motion.img
        style={{ x: x1, scale: scale1, opacity: opacity1 }}
        src="poster9.webp"
        alt="poster"
        className="absolute top-0 w-50 h-75 rounded-lg shadow"
      />

      <motion.img
        style={{ x: x2, scale: scale2, opacity: opacity2 }}
        src="poster8.webp"
        alt="poster"
        className="absolute top-0 w-50 h-75 rounded-lg shadow"
      />
      <motion.img
        style={{ x: x3, scale: scale3, opacity: opacity3 }}
        src="poster7.webp"
        alt="poster"
        className="absolute top-0 w-50 h-75 rounded-lg shadow"
      />
      {/* <motion.img
        style={{ x: x4, scale: scale4, opacity: opacity4 }}
        src="poster10.webp"
        alt="poster"
        className="absolute top-0 w-50 h-75 rounded-lg shadow"
      />
      <motion.img
        style={{ x: x5, scale: scale5, opacity: opacity5 }}
        src="poster11.webp"
        alt="poster"
        className="absolute top-0 w-40 h-60 w-50 h-75 rounded-lg shadow"
      /> */}
    </div>
  );
}
