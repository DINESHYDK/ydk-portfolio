import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-muted/20 animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black border border-slate-600 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          background: isDark
            ? "linear-gradient(135deg, #0a0a0a, #1a1a1f)"
            : "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative z-10 flex items-center justify-center w-full h-full"
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-cyan-400" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>

      {/* Cyber glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        whileHover={{ opacity: 1 }}
        animate={{
          background: isDark
            ? "radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Neon border glow */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        whileHover={{ opacity: 1 }}
        animate={{
          background: isDark
            ? "linear-gradient(45deg, #00d4ff, #8b5cf6, #00d4ff)"
            : "linear-gradient(45deg, #f59e0b, #ef4444, #f59e0b)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          filter: "blur(1px)",
          zIndex: -1,
        }}
      />
    </motion.button>
  );
}
