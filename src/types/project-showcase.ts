/**
 * TypeScript interfaces and types for the Interactive Project Showcase
 */

export interface Technology {
  name: string;
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: "web" | "ai";
  technologies: Technology[];
  features: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
}

export type ProjectFilter = "All" | "Web Apps" | "AI Projects";

export interface AnimationStates {
  cardHover: {
    imageOpacity: number;
    buttonsTranslateY: number;
    cardScale: number;
  };
  modalTransition: {
    scale: number;
    opacity: number;
    backdropOpacity: number;
  };
  filterTransition: {
    gridItemOpacity: number;
    gridItemScale: number;
  };
}

export interface ProjectCardProps {
  project: Project;
  onImageClick: (project: Project) => void;
  onCodeClick: (project: Project) => void;
  onDemoClick: (project: Project) => void;
  isMobile: boolean;
  isHovered?: boolean;
  showMobileActions?: boolean;
}

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

export interface FilterButtonProps {
  activeFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  projectCounts: Record<ProjectFilter, number>;
}