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
  colors = ["#64ffda", "#4079ff", "#64ffda", "#4079ff", "#64ffda"],
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
      WebkitTextStroke: "1px rgba(100, 255, 218, 0.3)",
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
