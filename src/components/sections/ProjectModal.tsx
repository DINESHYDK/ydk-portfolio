import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project-showcase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { hapticButtonPress } from "@/lib/haptic";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

// Technology icon mapping (same as ProjectCard)
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

  return iconMap[techName] || "devicon-javascript-plain";
};

export const ProjectModal = ({
  project,
  isOpen,
  onClose,
  onNavigate,
  canNavigatePrev,
  canNavigateNext,
}: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [hasShownHint, setHasShownHint] = useState(false);

  // Swipe handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  // Reset image error when project changes
  useEffect(() => {
    setImageError(false);
  }, [project?.id]);

  // Handle browser back button to close modal
  useEffect(() => {
    if (isOpen) {
      const handlePopState = () => {
        onClose();
      };

      // Add a history entry when modal opens
      window.history.pushState({ modalOpen: true }, "");
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [isOpen, onClose]);

  // Show swipe hint on first modal open
  // Check if device is mobile
  const isMobile = () => {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768
    );
  };

  // Show swipe hint on first modal open (mobile only)
  useEffect(() => {
    if (
      isOpen &&
      !hasShownHint &&
      (canNavigatePrev || canNavigateNext) &&
      isMobile()
    ) {
      const timer = setTimeout(() => {
        setShowSwipeHint(true);
        setHasShownHint(true);

        // Hide hint after 2 seconds
        setTimeout(() => {
          setShowSwipeHint(false);
        }, 2000);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isOpen, hasShownHint, canNavigatePrev, canNavigateNext]);

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canNavigateNext) {
      hapticButtonPress();
      onNavigate("next");
    }
    if (isRightSwipe && canNavigatePrev) {
      hapticButtonPress();
      onNavigate("prev");
    }

    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener("keydown", handleTabKey);
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-2xl shadow-2xl border overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
                <h2 className="text-2xl font-bold">{project.title}</h2>
                {project.featured && (
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary flex items-center gap-1"
                  >
                    <Star className="w-3 h-3" />
                    Featured
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  hapticButtonPress();
                  onClose();
                }}
                className="w-8 h-8 p-0 hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-120px)] overflow-hidden">
              {/* Left Side - Image and Actions */}
              <div className="lg:w-1/2 p-6">
                <motion.div
                  className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {!imageError ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-6xl mb-4">📱</div>
                        <p className="text-lg text-muted-foreground font-medium">
                          {project.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Image coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    onClick={() => {
                      hapticButtonPress();
                      window.open(project.githubUrl, "_blank");
                    }}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code on GitHub
                  </Button>

                  {project.demoUrl ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        hapticButtonPress();
                        window.open(project.demoUrl, "_blank");
                      }}
                      className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      disabled
                      className="w-full opacity-50 cursor-not-allowed"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Demo Coming Soon
                    </Button>
                  )}
                </motion.div>
              </div>

              {/* Right Side - Details */}
              <div className="lg:w-1/2 p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => {
                        const iconClass = getTechnologyIcon(tech.name);
                        return (
                          <motion.div
                            key={tech.name}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge
                              variant="outline"
                              className="flex items-center gap-2 px-3 py-2"
                              style={{
                                borderColor: tech.color,
                                color: tech.color,
                              }}
                            >
                              <i className={`${iconClass} text-lg`}></i>
                              {tech.name}
                            </Badge>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2 text-muted-foreground"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Swipe Hint Overlay - Mobile Only */}
            <AnimatePresence>
              {showSwipeHint && (
                <motion.div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth scroll feel
                  }}
                >
                  <motion.div
                    className="relative bg-white dark:bg-gray-900 rounded-2xl px-8 py-6 mx-4 text-center border shadow-2xl overflow-hidden"
                    initial={{
                      scale: 0.8,
                      y: 40,
                      rotateX: -15,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      y: 0,
                      rotateX: 0,
                      opacity: 1,
                    }}
                    exit={{
                      scale: 0.8,
                      y: 40,
                      rotateX: -15,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
                      animate={{
                        x: [-100, 100, -100],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Main content */}
                    <div className="relative space-y-4">
                      {/* Animated swipe gesture with smooth scroll physics */}
                      <div className="flex items-center justify-center gap-6">
                        <motion.div
                          animate={{
                            x: [-25, 25, -25],
                            scale: [1, 1.15, 1],
                            rotate: [-3, 3, -3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: [0.25, 0.46, 0.45, 0.94], // Smooth scroll easing
                            times: [0, 0.5, 1], // Control timing points
                          }}
                          className="text-3xl filter drop-shadow-lg"
                        >
                          👈
                        </motion.div>

                        <motion.div
                          className="text-4xl"
                          animate={{
                            scale: [1, 1.08, 1],
                            rotate: [0, 2, -2, 0],
                            y: [0, -2, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            times: [0, 0.33, 0.66, 1],
                          }}
                        >
                          📱
                        </motion.div>

                        <motion.div
                          animate={{
                            x: [25, -25, 25],
                            scale: [1, 1.15, 1],
                            rotate: [3, -3, 3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            times: [0, 0.5, 1],
                          }}
                          className="text-3xl filter drop-shadow-lg"
                        >
                          👉
                        </motion.div>
                      </div>

                      {/* Text with staggered smooth entrance */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.2,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="space-y-2"
                      >
                        <motion.h3
                          className="text-lg font-semibold text-gray-900 dark:text-white"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.3,
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          Swipe to Explore
                        </motion.h3>
                        <motion.p
                          className="text-sm text-gray-600 dark:text-gray-300"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.4,
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          Navigate between projects with touch gestures
                        </motion.p>
                      </motion.div>

                      {/* Smooth flowing dots */}
                      <div className="flex justify-center gap-2 pt-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.4, 1, 0.4],
                              y: [0, -2, 0],
                            }}
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                          />
                        ))}
                      </div>

                      {/* Subtle scroll indicator */}
                      <motion.div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"
                        animate={{
                          scaleX: [0.5, 1, 0.5],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {/* Navigation Arrows - Desktop Only */}
          {(canNavigatePrev || canNavigateNext) && !isMobile() && (
            <div className="pointer-events-none absolute inset-0">
              {canNavigatePrev && (
                <motion.button
                  className="pointer-events-auto fixed left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border rounded-full flex items-center justify-center shadow-lg hover:bg-background/90 transition-colors"
                  onClick={() => {
                    hapticButtonPress();
                    onNavigate("prev");
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              )}

              {canNavigateNext && (
                <motion.button
                  className="pointer-events-auto fixed right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border rounded-full flex items-center justify-center shadow-lg hover:bg-background/90 transition-colors"
                  onClick={() => {
                    hapticButtonPress();
                    onNavigate("next");
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
