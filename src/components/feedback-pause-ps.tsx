import React from "react";
import {usePresentation} from "@/components/presentation-provider";
import { motion, AnimatePresence } from "framer-motion";

export default function FeedbackPausePS() {
  const {isPlaying} = usePresentation();
  
  return (
    <AnimatePresence>
      {!isPlaying && (
        <motion.div
          key="feedback-pause"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="position-fixed"
          style={{top: "1.5rem", right: "1rem", maxWidth: "275px", zIndex: 1050}}
        >
          <div
            className={"bg-danger-subtle border-danger py-2 px-3 rounded border-1 shadow-sm"}
            style={{border: "1px solid #FF000010"}}
          >
              <span className={"text-danger-emphasis text-small text-balance d-inline-flex lh-base mb-1"}>
                A exibição do wrapped está pausada. Para continuar use os controles.
              </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
