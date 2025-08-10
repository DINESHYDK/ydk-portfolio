import { Home, FolderGit2, Wrench, BarChart3, MessageCircle } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: MessageCircle },
];

export function MobileNavbar({ activeId }: { activeId: string; onParty: () => void }) {
  return (
    <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%]">
      <div className="glass-dark rounded-full px-3 py-2 border shadow-lg">
        <ul className="flex items-center justify-between">
          {LINKS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors hover:bg-muted/50 ${
                  activeId === id ? "bg-muted text-primary font-medium" : ""
                }`}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default MobileNavbar;
