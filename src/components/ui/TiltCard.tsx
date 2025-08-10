import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ className, children, intensity = 12 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={cn("group relative", className)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="rounded-xl border bg-card/60 backdrop-blur-md shadow-lg"
      >
        {/* Shine layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background:
              "radial-gradient(300px 120px at 50% -20%, hsl(var(--primary)/.25), transparent)",
            transform: "translateZ(20px)",
          }}
        />

        {/* Content */}
        <div className="p-6 md:p-8" style={{ transform: "translateZ(40px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
