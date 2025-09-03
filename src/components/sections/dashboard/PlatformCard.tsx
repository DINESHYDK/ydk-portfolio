import React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface PlatformCardProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  href?: string; // Add href prop
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  title,
  icon,
  children,
  className,
  href,
}) => {
  const content = (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-[hsl(0,0%,10%)]/80 backdrop-blur-sm",
        "p-5 md:p-6 h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50", // Add hover effects
        className
      )}
    >
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent card click from triggering link twice
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary" />
          </a>
        )}
      </header>
      <div>{children}</div>
    </section>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default PlatformCard;
