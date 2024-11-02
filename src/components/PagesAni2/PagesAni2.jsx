import { AnimatePresence, motion } from "framer-motion";

const rotateY = {
  initial: { rotateY: 90 },
  animate: { rotateY: 0 },
  exit: { rotateY: -90 },
};
export default function PagesAni2({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={location.pathname}
        className="w-full "
        transition={{
          ease: "easeInOut",
          duration: 0.4,
        }}
        variants={rotateY}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
