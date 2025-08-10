import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
  loop?: boolean;
  startDelay?: number;
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 50,
  pauseDuration = 2000,
  deletingSpeed = 30,
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
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const createTypewriterAnimation = useCallback(() => {
    if (!textRef.current || text.length === 0) return;

    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      repeat: loop ? -1 : 0,
      delay: startDelay / 1000,
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
          onStart: () => {
            setIsTyping(true);
            setCurrentIndex(index);
          },
          onComplete: () => {
            setIsTyping(false);
          },
        }
      )
        // Pause after typing
        .to(
          {},
          {
            duration: pauseDuration / 1000,
            onStart: () => setIsTyping(false),
          }
        );

      // Delete animation (skip for last item if not looping)
      if (!isLastItem || loop) {
        tl.to(
          {},
          {
            duration: (textItem.length * deletingSpeed) / 1000,
            ease: "power2.in",
            onUpdate: function () {
              const progress = this.progress();
              const currentLength = Math.ceil((1 - progress) * textItem.length);
              setCurrentText(textItem.substring(0, currentLength));
            },
            onStart: () => setIsTyping(true),
            onComplete: () => {
              setCurrentText("");
              setIsTyping(false);
            },
          }
        )
          // Brief pause before next text
          .to({}, { duration: 0.3 });
      }
    });

    timelineRef.current = tl;
  }, [text, typingSpeed, pauseDuration, deletingSpeed, loop, startDelay]);

  // Enhanced cursor animation
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

    // Faster blinking when typing
    const updateCursorSpeed = () => {
      if (isTyping) {
        cursorTl.timeScale(2); // Faster blink when typing
      } else {
        cursorTl.timeScale(1); // Normal blink when paused
      }
    };

    updateCursorSpeed();

    return () => {
      cursorTl.kill();
    };
  }, [showCursor, isTyping]);

  // Initialize typewriter animation
  useEffect(() => {
    createTypewriterAnimation();

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [createTypewriterAnimation]);

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
          className="inline-block ml-1 text-primary font-bold select-none"
          style={{
            opacity: 1,
            transform: "translateY(-1px)",
            fontSize: "1.1em",
            fontWeight: "600",
          }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;
