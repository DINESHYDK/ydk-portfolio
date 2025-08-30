import React from "react";
import SplitText from "../../../react_bits/SplitText/SplitText";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

interface SectionHeadingProps {
  text: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  text,
  subtitle,
  className = "",
}) => {
  const { isVisible, elementRef } = useScrollTrigger({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    triggerOnce: true,
  });

  return (
    <header ref={elementRef} className={`mb-12 text-center ${className}`}>
      <div style={{ opacity: isVisible ? 1 : 0 }}>
        {isVisible && (
          <SplitText
            text={text}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            splitType="chars"
            delay={60}
            duration={0.8}
            from={{
              opacity: 0,
              y: 50,
              rotationX: -90,
            }}
            to={{
              opacity: 1,
              y: 0,
              rotationX: 0,
            }}
          />
        )}
      </div>
      {subtitle && (
        <p className="text-muted-foreground text-lg mt-2">{subtitle}</p>
      )}
    </header>
  );
};

export default SectionHeading;
