"use client";

import React, { useState, useEffect, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const GLYPHS = "01!<>-_\\/[]{}—=+*^?#ABCDEF";

export function ScrambleText({
  text,
  className = "",
  delay = 200,
  duration = 1500,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScrambling = useRef(false);

  useEffect(() => {
    let frameId: number;
    let startTime: number;

    const timer = setTimeout(() => {
      isScrambling.current = true;
      startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const resolvedLength = Math.floor(progress * text.length);

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < resolvedLength) return text[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setDisplayText(scrambled);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          isScrambling.current = false;
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [text, delay, duration]);

  return <span className={className}>{displayText}</span>;
}
