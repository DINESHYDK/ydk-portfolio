import { useCallback, useEffect, useMemo, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import SplitText from "../../../react_bits/SplitText/SplitText";
import { Project } from "@/types/project-showcase";
import { SAMPLE_PROJECTS } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { hapticButtonPress } from "@/lib/haptic";
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
          hapticButtonPress();
          onOpen(project);
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-4xl mb-2">🧩</div>
            <p className="text-sm text-muted-foreground">Preview</p>
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
            <Github className="w-4 h-4" /> Code
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-secondary hover:underline"
              onClick={() => hapticButtonPress()}
            >
              <ExternalLink className="w-4 h-4" /> Demo
            </a>
          )}
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
