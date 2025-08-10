import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
  loop?: boolean;
  startDelay?: number;
}

const TextTypeOptimized: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
  loop = true,
  startDelay = 0,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [currentText, setCurrentText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!textRef.current || text.length === 0) return;

    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      repeat: loop ? -1 : 0,
      delay: startDelay / 1000,
      onComplete: () => setIsComplete(true),
    });

    text.forEach((textItem, index) => {
      const isLastItem = index === text.length - 1;

      // Typing animation
      tl.to(
        {},
        {
          duration: (textItem.length * typingSpeed) / 1000,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress();
            const currentLength = Math.ceil(progress * textItem.length);
            setCurrentText(textItem.substring(0, currentLength));
          },
          onStart: () => setIsComplete(false),
        }
      )
        // Pause after typing
        .to({}, { duration: pauseDuration / 1000 });

      // Delete animation (skip for last item if not looping)
      if (!isLastItem || loop) {
        tl.to(
          {},
          {
            duration: (textItem.length * 50) / 1000,
            ease: "power2.in",
            onUpdate: function () {
              const progress = this.progress();
              const currentLength = Math.ceil((1 - progress) * textItem.length);
              setCurrentText(textItem.substring(0, currentLength));
            },
            onComplete: () => setCurrentText(""),
          }
        )
          // Brief pause before next text
          .to({}, { duration: 0.5 });
      }
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [text, typingSpeed, pauseDuration, loop, startDelay]);

  // Cursor animation
  useEffect(() => {
    if (!cursorRef.current || !showCursor) return;

    const cursorTl = gsap.timeline({ repeat: -1 });

    cursorTl
      .to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .to(cursorRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });

    return () => {
      cursorTl.kill();
    };
  }, [showCursor]);

  return (
    <span className={`${className} relative inline-block`}>
      <span
        ref={textRef}
        className="inline-block min-h-[1em]"
        style={{ minWidth: "1ch" }}
      >
        {currentText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className="inline-block ml-1 text-current font-bold select-none"
          style={{
            opacity: 1,
            fontSize: "1em",
            fontWeight: "600",
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextTypeOptimized;
