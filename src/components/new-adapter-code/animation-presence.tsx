import { AnimatePresence, motion } from "framer-motion";
import { useEffect, ReactNode } from "react";

interface AnimationPresenceProps {
  children: ReactNode;
  date?: Date;
}

const AnimationPresence = ({ children, date }: AnimationPresenceProps) => {
  useEffect(() => {
    console.log('Nova instância criada!');
  }, []);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={date ? date.getTime().toString() : ""}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimationPresence;
