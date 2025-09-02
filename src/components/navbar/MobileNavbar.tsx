import {
  Home,
  User,
  FolderGit2,
  Wrench,
  BarChart3,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hapticNavigation } from "@/lib/haptic";
import { useState, useEffect, useRef } from "react";

const LINKS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: MessageCircle },
];

export function MobileNavbar({
  activeId,
}: {
  activeId: string;
  onParty: () => void;
}) {
  const [displayActiveId, setDisplayActiveId] = useState(activeId);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle click navigation
  const handleNavClick = (targetId: string) => {
    hapticNavigation();

    // Set navigating state to prevent intermediate animations
    setIsNavigating(true);

    // Immediately update display to target section
    setDisplayActiveId(targetId);

    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    // Reset navigation state after scroll completes
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, 1000); // Adjust based on your scroll duration
  };

  // Update display when not navigating
  useEffect(() => {
    if (!isNavigating) {
      setDisplayActiveId(activeId);
    }
  }, [activeId, isNavigating]);
  return (
    <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[85%] max-w-sm">
      <div className="navbar-glass rounded-full px-2 py-2 border shadow-lg">
        <ul className="flex items-center justify-between">
          {LINKS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 ease-in-out hover:bg-muted/50 hover:scale-110 ${
                  displayActiveId === id
                    ? "bg-muted text-primary font-medium scale-105"
                    : ""
                }`}
                aria-label={label}
                onClick={() => handleNavClick(id)}
              >
                <Icon className="h-[0.85rem] w-[0.85rem]" />
                <AnimatePresence mode="wait">
                  {displayActiveId === id && (
                    <motion.div
                      key={`indicator-${id}`}
                      className="absolute inset-0 bg-primary/20 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 450,
                          damping: 28,
                          duration: 0.38,
                        },
                      }}
                      exit={{
                        scale: 0,
                        opacity: 0,
                        transition: {
                          type: "spring",
                          stiffness: 550,
                          damping: 32,
                          duration: 0.32,
                        },
                      }}
                    />
                  )}
                </AnimatePresence>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default MobileNavbar;
