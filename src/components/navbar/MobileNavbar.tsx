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
  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[85%] max-w-sm">
      <div className="navbar-glass rounded-full px-2 py-2 border shadow-lg">
        <ul className="flex items-center justify-between">
          {LINKS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative flex items-center justify-center p-3 rounded-full transition-all duration-300 ease-in-out hover:bg-muted/50 hover:scale-110 ${
                  activeId === id
                    ? "bg-muted text-primary font-medium scale-105"
                    : ""
                }`}
                aria-label={label}
                onClick={() => hapticNavigation()}
              >
                <Icon className="h-[0.85rem] w-[0.85rem]" />
                {activeId === id && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default MobileNavbar;
