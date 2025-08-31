import { useCallback, useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Project } from "@/types/project-showcase";
import { SAMPLE_PROJECTS } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { hapticButtonPress, hapticNavigation } from "@/lib/haptic";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Filter = "All" | "Web Apps" | "AI Projects";

const FILTERS: Filter[] = ["All", "Web Apps", "AI Projects"];

function filterProjects(projects: Project[], filter: Filter): Project[] {
  if (filter === "All") return projects;
  if (filter === "Web Apps")
    return projects.filter((p) => p.category === "web");
  return projects.filter((p) => p.category === "ai");
}

const TechPill = ({ name, color }: { name: string; color: string }) => (
  <span
    className="px-2 py-1 text-[10px] md:text-xs rounded-full bg-muted/50 border"
    style={{ borderColor: color, color }}
  >
    {name}
  </span>
);

const ProjectTile = ({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) => {
  return (
    <article
      className={[
        "group border border-white/10 bg-[hsl(0,0%,10%)]/80 backdrop-blur-sm overflow-hidden flex flex-col h-full card-base",
      ].join(" ")}
    >
      <button
        className="relative aspect-[16/9] w-full overflow-hidden"
        onClick={() => {
          hapticNavigation();
          onOpen(project);
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🧩</div>
              <p className="text-sm text-muted-foreground">Preview</p>
            </div>
          </div>
        </div>
      </button>

      <div className="p-5 flex flex-col gap-4 grow">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <TechPill key={t.name} name={t.name} color={t.color} />
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            onClick={() => hapticButtonPress()}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>{" "}
            Code
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            onClick={() => hapticButtonPress()}
          >
            <ExternalLink className="w-4 h-4" /> Demo
          </a>
        </div>
      </div>
    </article>
  );
};

export const ProjectsRedesign = () => {
  const [filter, setFilter] = useState<Filter>(() => {
    const fromHash = decodeURIComponent(
      window.location.hash.replace("#filter=", "")
    ) as Filter;
    const saved = (localStorage.getItem("projectFilter") as Filter) || "All";
    return FILTERS.includes(fromHash) ? fromHash : saved;
  });
  const [selected, setSelected] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const projects = useMemo(
    () =>
      filterProjects(
        [...SAMPLE_PROJECTS].sort((a, b) => a.order - b.order),
        filter
      ),
    [filter]
  );

  const openModal = (p: Project) => {
    setSelected(p);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  const navigate = useCallback(
    (dir: "prev" | "next") => {
      if (!selected) return;
      const idx = projects.findIndex((p) => p.id === selected.id);
      const nextIdx =
        dir === "next"
          ? (idx + 1) % projects.length
          : (idx - 1 + projects.length) % projects.length;
      setSelected(projects[nextIdx]);
    },
    [projects, selected]
  );

  // Close modal if filter changes so index math stays correct
  useEffect(() => {
    setIsOpen(false);
    setSelected(null);
  }, [filter]);

  // Keyboard navigation when modal is open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate("next");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate("prev");
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, selected, projects, navigate]);

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <SectionHeading
          text="Projects"
          subtitle="Selected work and experiments"
        />

        {/* Filters */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => {
                hapticButtonPress();
                setFilter(f);
                localStorage.setItem("projectFilter", f);
                window.location.hash = `#filter=${encodeURIComponent(f)}`;
              }}
              className={[
                "px-4 py-2 rounded-full border text-sm transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground border-white/15 hover:bg-white/5",
              ].join(" ")}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              className={p.featured ? "lg:col-span-2" : undefined}
            >
              <ProjectTile project={p} onOpen={openModal} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selected}
        isOpen={isOpen}
        onClose={closeModal}
        onNavigate={navigate}
        canNavigatePrev={projects.length > 1}
        canNavigateNext={projects.length > 1}
      />
    </section>
  );
};

export default ProjectsRedesign;
