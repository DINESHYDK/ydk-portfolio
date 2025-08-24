import React from "react";
import { cn } from "@/lib/utils";

interface PlatformCardProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  title,
  icon,
  children,
  className,
}) => {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-[hsl(0,0%,10%)]/80 backdrop-blur-sm",
        "p-5 md:p-6 h-full",
        className
      )}
    >
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      </header>
      <div>{children}</div>
    </section>
  );
};

export default PlatformCard;
