import { useState, useEffect, useCallback } from "react";

interface Gift {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

export const useZeroGravityGifts = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);

  const createGift = useCallback(() => {
    const newGift: Gift = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight,
      rotation: Math.random() * 360,
    };
    setGifts((prevGifts) => [...prevGifts, newGift]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        createGift();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [createGift]);

  return { gifts };
};
