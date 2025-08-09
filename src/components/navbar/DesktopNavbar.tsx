import { useState } from "react";
import { Sparkles, Home, FolderGit2, Wrench, BarChart3, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const LINKS = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: MessageCircle },
];

export function DesktopNavbar({ activeId, onParty }: { activeId: string; onParty: () => void }) {
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
    <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-40">
      <div className="glass-dark rounded-full px-4 py-2 shadow-lg border animate-fade-in">
        <ul className="flex items-center gap-1">
          <li>
            <button
              aria-label="Activate sparkle"
              onClick={handleEaster}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
            >
              <Sparkles className="h-5 w-5" />
            </button>
          </li>
          {LINKS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors hover:bg-muted/50 ${
                  activeId === id ? "bg-muted text-primary font-medium" : ""
                }`}
              >
                <Icon className="h-4 w-4" /> <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default DesktopNavbar;
