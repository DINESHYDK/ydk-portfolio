import React from "react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  className,
}) => {
  return (
    <div
      className={[
        "rounded-xl border border-white/10 bg-[hsl(0,0%,10%)]/80 backdrop-blur-sm",
        "p-4 md:p-5",
        className || "",
      ].join(" ")}
    >
      <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl md:text-3xl font-bold text-white">
        {value}
      </div>
    </div>
  );
};

export default StatCard;
