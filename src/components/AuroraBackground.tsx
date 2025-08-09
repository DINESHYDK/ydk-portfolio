import { motion } from "framer-motion";
import { useMemo } from "react";

interface AuroraBackgroundProps {
  party?: boolean;
}

export const AuroraBackground = ({ party = false }: AuroraBackgroundProps) => {
  const className = useMemo(
    () => `aurora ${party ? "aurora--party" : ""}`,
    [party]
  );

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div
        className={className}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: party ? 1 : 0.85 }}
        transition={{ duration: 1.2 }}
      />
    </div>
  );
};

export default AuroraBackground;
