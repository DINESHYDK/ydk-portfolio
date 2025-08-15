import { motion } from "framer-motion";
import { ProjectFilter } from "@/types/project-showcase";
import { Button } from "@/components/ui/button";

interface FilterButtonProps {
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  projectCounts: Record<ProjectFilter, number>;
}

export const FilterButton = ({
  activeFilter,
  onFilterChange,
  projectCounts,
}: FilterButtonProps) => {
  const filters: ProjectFilter[] = ["All", "Web Apps", "AI Projects"];

  return (
    <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-lg backdrop-blur-sm">
      {filters.map((filter) => (
        <motion.div
          key={filter}
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25 
          }}
        >
          <Button
            variant={activeFilter === filter ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(filter)}
            className={`relative px-4 py-2 transition-all duration-300 ease-in-out ${
              activeFilter === filter
                ? "bg-primary text-primary-foreground shadow-lg"
                : "hover:bg-muted/50"
            }`}
          >
            <span className="font-medium">{filter}</span>
            <motion.span
              className="ml-2 text-xs opacity-70"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ 
                delay: 0.1, 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              ({projectCounts[filter]})
            </motion.span>
          </Button>

          {/* Active indicator */}
          {activeFilter === filter && (
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-md -z-10"
              layoutId="activeFilter"
              initial={false}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30,
                duration: 0.4
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
