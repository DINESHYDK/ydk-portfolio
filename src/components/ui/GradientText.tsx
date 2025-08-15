import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = ["#00d4ff", "#8b5cf6", "#00d4ff", "#8b5cf6", "#00d4ff"],
  animationSpeed = 3,
  showBorder = false,
  className = "",
}) => {
  const gradientStyle = {
    background: `linear-gradient(45deg, ${colors.join(", ")})`,
    backgroundSize: "400% 400%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    animationDuration: `${animationSpeed}s`,
    ...(showBorder && {
      WebkitTextStroke: "1px rgba(0, 212, 255, 0.3)",
    }),
  };

  return (
    <span
      className={`inline-block gradient-text-animated ${className}`}
      style={gradientStyle}
    >
      {children}
    </span>
  );
};

export default GradientText;
