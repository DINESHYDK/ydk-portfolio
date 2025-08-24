import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, ProjectFilter } from "@/types/project-showcase";
import { SAMPLE_PROJECTS, getProjectCounts } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { FilterButton } from "./FilterButton";
import SplitText from "../../../react_bits/SplitText/SplitText";

export const ProjectShowcase = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(SAMPLE_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const projectCounts = getProjectCounts();

  // Handle filter changes
  const handleFilterChange = (filter: ProjectFilter) => {
    setActiveFilter(filter);

    if (filter === "All") {
      setFilteredProjects(SAMPLE_PROJECTS);
    } else if (filter === "Web Apps") {
      setFilteredProjects(SAMPLE_PROJECTS.filter((p) => p.category === "web"));
    } else if (filter === "AI Projects") {
      setFilteredProjects(SAMPLE_PROJECTS.filter((p) => p.category === "ai"));
    }
  };

  // Handle project selection
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Handle navigation between projects in modal
  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedProject) return;

      const currentIndex = filteredProjects.findIndex(
        (p) => p.id === selectedProject.id
      );
      let newIndex: number;

      if (direction === "prev") {
        newIndex =
          currentIndex > 0 ? currentIndex - 1 : filteredProjects.length - 1;
      } else {
        newIndex =
          currentIndex < filteredProjects.length - 1 ? currentIndex + 1 : 0;
      }

      setSelectedProject(filteredProjects[newIndex]);
    },
    [selectedProject, filteredProjects]
  );

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") {
        handleModalClose();
      } else if (e.key === "ArrowLeft") {
        handleNavigate("prev");
      } else if (e.key === "ArrowRight") {
        handleNavigate("next");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleNavigate, isModalOpen, selectedProject]);

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <header className="mb-10 text-center">
          <SplitText
            text="Projects"
            className="text-3xl md:text-4xl font-bold text-primary mb-3"
            splitType="chars"
            delay={60}
            duration={0.8}
            from={{
              opacity: 0,
              y: 50,
              rotationX: -90,
            }}
            to={{
              opacity: 1,
              y: 0,
              rotationX: 0,
            }}
          />
          <motion.p
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Selected work and experiments
          </motion.p>
        </header>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterButton
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            projectCounts={projectCounts}
          />
        </motion.div>

        {/* Project Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          layout
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                className="hover-scale"
              >
                <ProjectCard
                  project={project}
                  onImageClick={handleProjectSelect}
                  onCodeClick={(project) =>
                    window.open(project.githubUrl, "_blank")
                  }
                  onDemoClick={(project) =>
                    project.demoUrl
                      ? window.open(project.demoUrl, "_blank")
                      : null
                  }
                  isMobile={isMobile}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onNavigate={handleNavigate}
        hasNext={filteredProjects.length > 1}
        hasPrev={filteredProjects.length > 1}
      />
    </section>
  );
};

export default ProjectShowcase;
