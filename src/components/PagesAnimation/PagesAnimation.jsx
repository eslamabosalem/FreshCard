import { AnimatePresence, motion } from "framer-motion";

const opacityAni = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function PagesAnimation({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={location.pathname}
        className="w-full "
        transition={{
          ease: "easeInOut",
          duration: 0.4,
        }}
        variants={opacityAni}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
