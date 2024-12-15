"use client";

import { useZeroGravityGifts } from "@/hooks/useZeroGravityGifts";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export const ZeroGravityGifts = () => {
  const { gifts } = useZeroGravityGifts();

  return (
    <div className="fixed inset-0 pointer-events-none">
      {gifts.map((gift) => (
        <motion.div
          key={gift.id}
          initial={{ x: gift.x, y: gift.y, rotate: gift.rotation }}
          animate={{
            y: -100,
            x: gift.x + Math.random() * 200 - 100,
            rotate: gift.rotation + Math.random() * 360 - 180,
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute"
        >
          <Gift className="w-8 h-8 text-primary" />
        </motion.div>
      ))}
    </div>
  );
};
