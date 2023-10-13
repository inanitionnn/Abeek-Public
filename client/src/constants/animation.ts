import { Variants } from "framer-motion";

export const slideAnimation = {
  hidden: {
    x: -20,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
  end: { x: 20, opacity: 0, transition: { delay: 0, duration: 0.4 } },
};

export const slideUpAnimation = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.2 },
  }),
  end: { y: -20, opacity: 0, transition: { delay: 0, duration: 0.2 } },
};

export const clockAnimation: Variants = {
  hidden: {
    x: 0,
    y: -40,
    opacity: 0,
  },
  visible: {
    y: 0,
    x: 0,
    opacity: [0, 1, 1],
    transition: { duration: 0.8, ease: "easeOut" },
  },
  end: {
    x: 0,
    y: 40,
    opacity: [1, 0, 0],
    position: "absolute",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const opacityAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: number) => ({
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.4 },
  }),
  end: { opacity: 0, transition: { delay: 0, duration: 0.2 } },
};
