import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, children, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-md bg-neutral-950 px-6 py-2 text-neutral-200",
        className
      )}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      <span className="relative z-10 block font-semibold transition-colors duration-500 group-hover:text-neutral-100">
        {children || text}
      </span>
      <motion.div
        className="absolute inset-0 z-0 h-full w-full rounded-md"
        initial={{ scale: 0, opacity: 0 }}
        variants={{
          hover: {
            scale: 1,
            opacity: 1,
            background: [
              "radial-gradient(circle at 20% 80%, #120a8f 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #120a8f 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, #120a8f 0%, transparent 50%)",
            ],
          },
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          background: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />
      <motion.div
        className="absolute inset-0 z-0 h-full w-full rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0"
        variants={{
          hover: { opacity: 0.8 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
