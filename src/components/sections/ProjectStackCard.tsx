import { Project } from "@/types/project-showcase";
import { motion } from "framer-motion";

interface ProjectStackCardProps {
  project: Project;
  onClick: (project: Project) => void;
  gradientIndex: number;
}

export const ProjectStackCard = ({
  project,
  onClick,
  gradientIndex,
}: ProjectStackCardProps) => {
  // Alternating subtle blue-to-violet gradients between cards
  const gradientClass =
    gradientIndex % 2 === 0
      ? "project-card-gradient-blue project-card-hover-blue"
      : "project-card-gradient-violet project-card-hover-violet";

  return (
    <motion.div
      className={`w-full h-full p-4 sm:p-6 rounded-3xl border cursor-pointer transition-all duration-300 ${gradientClass} backdrop-blur-md hover:border-opacity-80 bg-black/40`}
      onClick={() => onClick(project)}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      style={{ height: "320px" }} // Ensure consistent height for ScrollStack
    >
      <div className="flex flex-col sm:flex-row h-full gap-4 sm:gap-8 relative">
        {/* Left Half - Project Info */}
        <div className="flex-1 flex flex-col justify-between relative z-10 min-h-0">
          {/* Project Title */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {project.title}
            </h3>

            {/* Project Description */}
            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 max-w-full">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-1 text-[10px] sm:text-xs font-medium text-white border border-white/30 rounded-full backdrop-blur-sm hover:border-white/50 transition-colors flex-shrink-0"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-[10px] sm:text-xs font-medium text-white/70 border border-white/20 rounded-full flex-shrink-0">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Right Half - Project Preview */}
        <div className="flex-1 flex items-center justify-center relative z-10 min-h-0">
          <div className="w-full h-32 sm:h-48 rounded-2xl overflow-hidden border border-white/40 bg-black/50 backdrop-blur-md">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                // Fallback for missing images
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/400x300/1f2937/ffffff?text=${encodeURIComponent(project.title)}`;
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
