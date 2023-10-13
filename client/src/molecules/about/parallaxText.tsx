import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { memo, useRef } from "react";
import { wrap } from "@motionone/utils";
import MMyHeader from "../../atom/myHeader";
import { slideAnimation } from "../../constants";

interface Props {
  children: string;
  baseVelocity: number;
}

const ParallaxText = memo((props: Props) => {
  const { children, baseVelocity = 100 } = props;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      variants={slideAnimation}
      className="flex flex-nowrap overflow-hidden whitespace-nowrap"
    >
      <MMyHeader
        vsize={"xl"}
        className="flex flex-nowrap whitespace-nowrap gap-4"
        style={{ x }}
      >
        <span> {children}</span>
        <span> {children}</span>
        <span> {children}</span>
        <span> {children}</span>
      </MMyHeader>
    </motion.div>
  );
});

export default ParallaxText;
