/**
 * Sample project data for the Interactive Project Showcase
 */

import { Project, Technology } from "@/types/project-showcase";

// Common technologies with consistent styling
export const TECHNOLOGIES: Record<string, Technology> = {
  REACT: {
    name: "React",
    icon: "devicon-react-original",
    color: "#61DAFB",
  },
  TYPESCRIPT: {
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    color: "#3178C6",
  },
  NEXTJS: {
    name: "Next.js",
    icon: "devicon-nextjs-original",
    color: "#000000",
  },
  TAILWIND: {
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
    color: "#06B6D4",
  },
  NODEJS: {
    name: "Node.js",
    icon: "devicon-nodejs-plain",
    color: "#339933",
  },
  PYTHON: {
    name: "Python",
    icon: "devicon-python-plain",
    color: "#3776AB",
  },
  OPENAI: {
    name: "OpenAI API",
    icon: "devicon-openai-original",
    color: "#412991",
  },
  MONGODB: {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    color: "#47A248",
  },
  FIREBASE: {
    name: "Firebase",
    icon: "devicon-firebase-plain",
    color: "#FFCA28",
  },
  VITE: {
    name: "Vite",
    icon: "devicon-vitejs-plain",
    color: "#646CFF",
  },
  FRAMER_MOTION: {
    name: "Framer Motion",
    icon: "devicon-framer-plain",
    color: "#0055FF",
  },
  SHADCN: {
    name: "shadcn/ui",
    icon: "devicon-react-original",
    color: "#000000",
  },
};

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "ai-chat-assistant",
    title: "AI Chat Assistant",
    description: "Intelligent conversational AI with context awareness",
    longDescription:
      "A sophisticated AI chat assistant built with OpenAI's GPT-4 API, featuring context-aware conversations, memory persistence, and customizable personality settings. The application includes real-time streaming responses, conversation history, and advanced prompt engineering for optimal user experience.",
    image: "/images/projects/ai-chat-assistant.jpg",
    category: "ai",
    technologies: [
      TECHNOLOGIES.REACT,
      TECHNOLOGIES.TYPESCRIPT,
      TECHNOLOGIES.OPENAI,
      TECHNOLOGIES.NODEJS,
      TECHNOLOGIES.TAILWIND,
    ],
    features: [
      "Real-time streaming responses",
      "Conversation memory and context",
      "Customizable AI personality",
      "Export chat history",
      "Dark/light theme support",
      "Responsive mobile design",
    ],
    githubUrl: "https://github.com/ydk/ai-chat-assistant",
    demoUrl: "https://ai-chat-assistant.ydk.dev",
    featured: true,
    order: 1,
  },
  {
    id: "task-management-app",
    title: "Task Management Pro",
    description: "Modern task management with team collaboration",
    longDescription:
      "A comprehensive task management application featuring real-time collaboration, project organization, and advanced filtering. Built with modern React patterns and includes drag-and-drop functionality, deadline tracking, and team member assignment capabilities.",
    image: "/images/projects/task-management.jpg",
    category: "web",
    technologies: [
      TECHNOLOGIES.REACT,
      TECHNOLOGIES.TYPESCRIPT,
      TECHNOLOGIES.NEXTJS,
      TECHNOLOGIES.TAILWIND,
      TECHNOLOGIES.MONGODB,
    ],
    features: [
      "Drag-and-drop task organization",
      "Real-time team collaboration",
      "Project and category management",
      "Deadline tracking and notifications",
      "Advanced filtering and search",
      "Team member assignment",
    ],
    githubUrl: "https://github.com/ydk/task-management-pro",
    demoUrl: "https://tasks.ydk.dev",
    featured: true,
    order: 2,
  },
  {
    id: "ml-image-classifier",
    title: "ML Image Classifier",
    description: "Deep learning image classification with custom models",
    longDescription:
      "An advanced machine learning application for image classification using custom-trained models. Features include real-time image processing, batch classification, model comparison, and detailed confidence scoring with visualization of prediction results.",
    image: "/images/projects/ml-classifier.jpg",
    category: "ai",
    technologies: [
      TECHNOLOGIES.PYTHON,
      TECHNOLOGIES.REACT,
      TECHNOLOGIES.TYPESCRIPT,
      TECHNOLOGIES.NODEJS,
      TECHNOLOGIES.TAILWIND,
    ],
    features: [
      "Custom model training interface",
      "Real-time image classification",
      "Batch processing capabilities",
      "Confidence score visualization",
      "Model performance comparison",
      "Export classification results",
    ],
    githubUrl: "https://github.com/ydk/ml-image-classifier",
    demoUrl: "https://ml-classifier.ydk.dev",
    featured: false,
    order: 3,
  },
  {
    id: "portfolio-website",
    title: "Interactive Portfolio",
    description: "Modern portfolio with advanced animations and interactions",
    longDescription:
      "This very portfolio website you're viewing! Built with cutting-edge web technologies, featuring smooth animations, interactive components, and a modern design system. Includes dark mode, responsive design, and optimized performance.",
    image: "/images/projects/portfolio.jpg",
    category: "web",
    technologies: [
      TECHNOLOGIES.REACT,
      TECHNOLOGIES.TYPESCRIPT,
      TECHNOLOGIES.VITE,
      TECHNOLOGIES.TAILWIND,
      TECHNOLOGIES.FRAMER_MOTION,
      TECHNOLOGIES.SHADCN,
    ],
    features: [
      "Smooth scroll animations",
      "Interactive project showcase",
      "Dark/light theme toggle",
      "Responsive design system",
      "Performance optimized",
      "Modern component architecture",
    ],
    githubUrl: "https://github.com/ydk/portfolio-website",
    featured: false,
    order: 4,
  },
  {
    id: "data-visualization-dashboard",
    title: "Data Visualization Dashboard",
    description: "Interactive charts and analytics platform",
    longDescription:
      "A comprehensive data visualization platform with interactive charts, real-time data updates, and customizable dashboards. Features multiple chart types, data filtering, export capabilities, and responsive design for all devices.",
    image: "/images/projects/data-dashboard.jpg",
    category: "web",
    technologies: [
      TECHNOLOGIES.REACT,
      TECHNOLOGIES.TYPESCRIPT,
      TECHNOLOGIES.NEXTJS,
      TECHNOLOGIES.TAILWIND,
      TECHNOLOGIES.MONGODB,
    ],
    features: [
      "Interactive chart library",
      "Real-time data updates",
      "Customizable dashboards",
      "Data export functionality",
      "Advanced filtering options",
      "Mobile-responsive design",
    ],
    githubUrl: "https://github.com/ydk/data-visualization",
    demoUrl: "https://dataviz.ydk.dev",
    featured: false,
    order: 5,
  },
  {
    id: "ai-code-reviewer",
    title: "AI Code Reviewer",
    description: "Automated code review with AI-powered suggestions",
    longDescription:
      "An intelligent code review tool that uses AI to analyze code quality, suggest improvements, and identify potential bugs. Features include support for multiple programming languages, integration with popular version control systems, and detailed reporting.",
    image: "/images/projects/ai-code-reviewer.jpg",
    category: "ai",
    technologies: [
      TECHNOLOGIES.PYTHON,
      TECHNOLOGIES.REACT,
      TECHNOLOGIES.TYPESCRIPT,
      TECHNOLOGIES.OPENAI,
      TECHNOLOGIES.NODEJS,
    ],
    features: [
      "Multi-language code analysis",
      "AI-powered suggestions",
      "Bug detection and prevention",
      "Integration with Git workflows",
      "Detailed reporting dashboard",
      "Team collaboration features",
    ],
    githubUrl: "https://github.com/ydk/ai-code-reviewer",
    featured: false,
    order: 6,
  },
];

// Utility functions for working with project data
export const getProjectsByCategory = (
  category: "web" | "ai" | "all"
): Project[] => {
  if (category === "all") return SAMPLE_PROJECTS;
  return SAMPLE_PROJECTS.filter((project) => project.category === category);
};

export const getFeaturedProjects = (): Project[] => {
  return SAMPLE_PROJECTS.filter((project) => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return SAMPLE_PROJECTS.find((project) => project.id === id);
};

export const getProjectCounts = () => {
  const webCount = SAMPLE_PROJECTS.filter((p) => p.category === "web").length;
  const aiCount = SAMPLE_PROJECTS.filter((p) => p.category === "ai").length;

  return {
    All: SAMPLE_PROJECTS.length,
    "Web Apps": webCount,
    "AI Projects": aiCount,
  };
};
