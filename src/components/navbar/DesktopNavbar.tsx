import { useState } from "react";
import {
  Home,
  User,
  FolderGit2,
  Wrench,
  BarChart3,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const LINKS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: MessageCircle },
];

export function DesktopNavbar({
  activeId,
  onParty,
}: {
  activeId: string;
  onParty: () => void;
}) {
  const [clicks, setClicks] = useState(0);

  const handleEaster = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next === 7) {
      toast.success("Aurora party mode unlocked ✨");
      onParty();
      setClicks(0);
    }
  };

  return (
    <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[70%] max-w-4xl">
      <div className="navbar-glass rounded-full px-6 py-3 shadow-lg border animate-fade-in w-full">
        <ul className="flex items-center justify-between">
          <li>
            <motion.button
              aria-label="YDK Logo"
              onClick={handleEaster}
              className="relative px-4 py-2 rounded-full hover:bg-muted/50 transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                whileHover={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                YDK
              </motion.span>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 opacity-0"
                whileHover={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </li>
          <li className="flex items-center gap-1">
            {LINKS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-muted/50 ${
                  activeId === id ? "bg-muted text-primary font-medium" : ""
                }`}
              >
                <Icon className="h-4 w-4" /> <span>{label}</span>
              </a>
            ))}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default DesktopNavbar;
