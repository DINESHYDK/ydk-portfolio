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
  HTML: {
    name: "HTML5",
    icon: "devicon-html5-plain",
    color: "#E34F26",
  },
  CSS: {
    name: "CSS3",
    icon: "devicon-css3-plain",
    color: "#1572B6",
  },
  JAVASCRIPT: {
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    color: "#F7DF1E",
  },
  TANSTACK_QUERY: {
    name: "TanStack Query",
    icon: "devicon-react-original",
    color: "#FF4154",
  },
  FIGMA: {
    name: "Figma",
    icon: "devicon-figma-plain",
    color: "#F24E1E",
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
    githubUrl: "https://github.com/dineshydk/ai-chat-assistant",
    demoUrl: "https://ai-chat-assistant.ydk.dev",
    featured: true,
    order: 1,
  },
  {
    id: "task-management-app",
    title: "Quiz Master",
    description:
      "Modern Interactive Quiz app with custom instructions and team collaboration",
    longDescription:
      "A comprehensive task management application featuring real-time collaboration, project organization, and advanced filtering. Built with modern React patterns and includes drag-and-drop functionality, deadline tracking, and team member assignment capabilities.",
    image: "/images/projects/QuizMaster-1.png",
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
    githubUrl: "https://github.com/dineshydk/task-management-pro",
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
    githubUrl: "https://github.com/dineshydk/ml-image-classifier",
    demoUrl: "https://ml-classifier.ydk.dev",
    featured: false,
    order: 3,
  },
  {
    id: "ever-frame",
    title: "Ever Frame",
    description: "Very first Website made by me using HTML, CSS, Js",
    longDescription:
      "Ever Frame is a dynamic web application showcasing modern web development using pure HTML, CSS, and JavaScript. The project demonstrates clean code architecture, responsive design principles, and interactive user experiences without relying on frameworks.",
    image: "/images/projects/ever-frame.png",
    category: "web",
    technologies: [
      TECHNOLOGIES.HTML,
      TECHNOLOGIES.CSS,
      TECHNOLOGIES.JAVASCRIPT,
    ],
    features: [
      "Responsive design",
      "Interactive animations",
      "Clean code architecture",
      "Cross-browser compatibility",
      "Performance optimized",
      "Modern ES6+ features",
    ],
    githubUrl: "https://github.com/dineshydk/Phozo-Webpage",
    demoUrl: "https://ever-frame.ydk.dev",
    featured: false,
    order: 4,
  },
  {
    id: "ydk-portfolio",
    title: "YDK Portfolio",
    description:
      "Modern interactive portfolio with advanced animations and AI chatbot",
    longDescription:
      "This very portfolio website you're viewing! A cutting-edge personal portfolio built with React, TypeScript, and modern web technologies. Features smooth animations, interactive project showcase, AI-powered contact chatbot, haptic feedback, and a sophisticated design system with dark/light mode support.",
    image: "/images/projects/Portfolio.png",
    category: "web",
    technologies: [
      TECHNOLOGIES.FIGMA,
      TECHNOLOGIES.REACT,
      TECHNOLOGIES.TYPESCRIPT,
      TECHNOLOGIES.TAILWIND,
      TECHNOLOGIES.FRAMER_MOTION,
      TECHNOLOGIES.SHADCN,
      TECHNOLOGIES.TANSTACK_QUERY,
    ],
    features: [
      "Interactive project showcase",
      "AI-powered contact chatbot",
      "Smooth scroll animations",
      "Haptic feedback system",
      "Dark/light theme toggle",
      "Responsive design system",
    ],
    githubUrl: "https://github.com/dineshydk/ydk-portfolio",
    demoUrl: "https://portfolio-ydk.netlify.app",
    featured: true,
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
    githubUrl: "https://github.com/dineshydk/ai-code-reviewer",
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
