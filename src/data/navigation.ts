/**
 * Navigation Data
 * Sample navigation structure for the command palette
 */

import {
  Home,
  User,
  Briefcase,
  Mail,
  FileText,
  Github,
  Linkedin,
  Settings,
  Palette,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { NavigationItem } from "@/types/command-palette";

export const navigationItems: NavigationItem[] = [
  // Suggestions category
  {
    id: "home",
    label: "Home",
    icon: Home,
    category: "suggestions",
    route: "home",
    shortcut: "cmd+h",
    description: "Go to homepage",
  },
  {
    id: "about",
    label: "About",
    icon: User,
    category: "suggestions",
    route: "about",
    shortcut: "cmd+a",
    description: "Learn more about me",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Briefcase,
    category: "suggestions",
    route: "projects",
    shortcut: "cmd+p",
    description: "View my work and projects",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Settings,
    category: "suggestions",
    route: "skills",
    shortcut: "cmd+s",
    description: "Explore my technical skills",
  },
  {
    id: "coding-stats",
    label: "Coding Stats",
    icon: Monitor,
    category: "suggestions",
    route: "coding-stats",
    shortcut: "cmd+t",
    description: "View my coding activity and statistics",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    category: "suggestions",
    route: "contact",
    shortcut: "cmd+c",
    description: "Get in touch with me",
  },
  {
    id: "resume",
    label: "Resume",
    icon: FileText,
    category: "suggestions",
    route: "resume",
    shortcut: "cmd+r",
    description: "Download or view my resume",
  },
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    category: "suggestions",
    action: () => window.open("https://github.com/dineshydk", "_blank"),
    shortcut: "cmd+g",
    description: "Visit my GitHub profile",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    category: "suggestions",
    action: () =>
      window.open("https://www.linkedin.com/in/dineshydk/", "_blank"),
    shortcut: "cmd+l",
    description: "Connect with me on LinkedIn",
  },

  // Settings category
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    category: "settings",
    route: "/settings",
    shortcut: "cmd+,",
    description: "Customize your experience",
  },
  {
    id: "theme-toggle",
    label: "Toggle Theme",
    icon: Palette,
    category: "settings",
    action: () => {
      // This would toggle the theme
      console.log("Toggle theme");
    },
    shortcut: "cmd+t",
    description: "Switch between light and dark mode",
  },
  {
    id: "display-settings",
    label: "Display",
    icon: Monitor,
    category: "settings",
    route: "/settings/display",
    description: "Adjust display preferences",
  },
];

// Helper function to get suggestions by category
export const getSuggestionsByCategory = (
  category: "suggestions" | "settings"
) => {
  return navigationItems.filter((item) => item.category === category);
};

// Helper function to convert NavigationItem to SuggestionItem format
export const convertToSuggestionItems = (
  items: NavigationItem[],
  onNavigate: (route: string) => void
) => {
  return items.map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon as React.ComponentType<{ className?: string }>,
    category: item.category,
    shortcut: item.shortcut,
    action: () => {
      if (item.action) {
        item.action();
      } else if (item.route) {
        onNavigate(item.route);
      }
    },
  }));
};
