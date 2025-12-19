export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpStagger = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};
