import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project-showcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play, Star } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onImageClick: (project: Project) => void;
  onCodeClick: (project: Project) => void;
  onDemoClick: (project: Project) => void;
  isMobile: boolean;
}

// Technology icon mapping
const getTechnologyIcon = (techName: string) => {
  const iconMap: Record<string, string> = {
    // Exact matches from project data
    React: "devicon-react-original",
    TypeScript: "devicon-typescript-plain",
    "Next.js": "devicon-nextjs-original",
    "Tailwind CSS": "devicon-tailwindcss-plain",
    "Node.js": "devicon-nodejs-plain",
    Python: "devicon-python-plain",
    "OpenAI API": "devicon-openai-original",
    MongoDB: "devicon-mongodb-plain",
    Firebase: "devicon-firebase-plain",
    Vite: "devicon-vitejs-plain",
    "Framer Motion": "devicon-framer-plain",
    "shadcn/ui": "devicon-react-original",

    // Additional common technologies
    JavaScript: "devicon-javascript-plain",
    HTML: "devicon-html5-plain",
    CSS: "devicon-css3-plain",
    "Vue.js": "devicon-vuejs-plain",
    Angular: "devicon-angularjs-plain",
    Java: "devicon-java-plain",
    "C++": "devicon-cplusplus-plain",
    "C#": "devicon-csharp-plain",
    PHP: "devicon-php-plain",
    Ruby: "devicon-ruby-plain",
    Go: "devicon-go-plain",
    PostgreSQL: "devicon-postgresql-plain",
    MySQL: "devicon-mysql-plain",
    Redis: "devicon-redis-plain",
    SQLite: "devicon-sqlite-plain",
    AWS: "devicon-amazonwebservices-original",
    Azure: "devicon-azure-plain",
    "Google Cloud": "devicon-googlecloud-plain",
    Docker: "devicon-docker-plain",
    Kubernetes: "devicon-kubernetes-plain",
    Git: "devicon-git-plain",
    GitHub: "devicon-github-original",
    Figma: "devicon-figma-plain",
    VSCode: "devicon-vscode-plain",
    Vim: "devicon-vim-plain",
    Linux: "devicon-linux-plain",
    Windows: "devicon-windows8-original",
    MacOS: "devicon-apple-original",
  };

  return iconMap[techName] || "devicon-javascript-plain"; // Default fallback
};

export const ProjectCard = ({
  project,
  onImageClick,
  onCodeClick,
  onDemoClick,
  isMobile,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle hover with delay for desktop
  const handleMouseEnter = () => {
    if (isMobile) return;

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(false);
  };

  // Handle mobile tap on image
  const handleImageTap = () => {
    if (isMobile) {
      onImageClick(project);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <motion.div
        className={`project-card ${project.featured ? "project-card--featured" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="glass h-full overflow-hidden relative group">
          {/* Project Image */}
          <div
            className="relative aspect-video overflow-hidden cursor-pointer"
            onClick={handleImageTap}
          >
            <motion.div
              className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
              initial={false}
              animate={{
                scale: isHovered ? 1.05 : 1,
                opacity: isHovered ? 0.8 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Placeholder for project image */}
              <div className="text-center p-4">
                <div className="text-4xl mb-2">📱</div>
                <p className="text-sm text-muted-foreground font-medium">
                  {project.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Image coming soon
                </p>
              </div>
            </motion.div>

            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Star className="w-3 h-3" />
                Featured
              </motion.div>
            )}

            {/* Category Badge */}
            <motion.div
              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {project.category === "ai" ? (
                <>
                  <i className="devicon-tensorflow-original text-sm"></i>
                  AI
                </>
              ) : (
                <>
                  <i className="devicon-html5-plain text-sm"></i>
                  Web
                </>
              )}
            </motion.div>

            {/* Hover Overlay for Desktop */}
            {!isMobile && (
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Button
                      size="sm"
                      onClick={() => onImageClick(project)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onCodeClick(project)}
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDemoClick(project)}
                        className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Project Content */}
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {project.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>

            {/* Technologies - Show all with Devicon icons */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => {
                const iconClass = getTechnologyIcon(tech.name);
                console.log(`Tech: ${tech.name}, Icon: ${iconClass}`); // Debug log
                return (
                  <motion.span
                    key={tech.name}
                    className="px-2 py-1 text-xs rounded-full bg-muted/60 flex items-center gap-2"
                    style={{ borderLeft: `3px solid ${tech.color}` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <i className={`${iconClass} text-sm`}></i>
                    {tech.name}
                  </motion.span>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
