export type Skill = {
  name: string;
  iconClass: string;
  color?: string; // Optional custom color for non-devicon icons
};

export type SkillCategory = {
  categoryName: string;
  skills: Skill[];
};

export const skillsData: SkillCategory[] = [
  {
    categoryName: "Programming Languages",
    skills: [
      {
        name: "C",
        iconClass: "custom-c text-2xl",
      },
      {
        name: "C++",
        iconClass: "devicon-cplusplus-plain colored text-2xl",
      },
      {
        name: "JavaScript",
        iconClass: "devicon-javascript-plain colored text-2xl",
      },
      {
        name: "TypeScript",
        iconClass: "devicon-typescript-plain colored text-2xl",
      },
      {
        name: "Python",
        iconClass: "custom-python text-2xl",
      },
    ],
  },
  {
    categoryName: "Web Development",
    skills: [
      {
        name: "React",
        iconClass: "devicon-react-original colored text-2xl",
      },
      {
        name: "Next.js",
        iconClass: "custom-nextjs text-2xl",
        color: "#000000",
      },
      {
        name: "Node.js",
        iconClass: "devicon-nodejs-plain colored text-2xl",
      },
      {
        name: "Express.js",
        iconClass: "devicon-express-original text-2xl",
        color: "#ffffff",
      },
      {
        name: "HTML5",
        iconClass: "devicon-html5-plain colored text-2xl",
      },
      {
        name: "CSS3",
        iconClass: "devicon-css3-plain colored text-2xl",
      },

      {
        name: "Bootstrap",
        iconClass: "devicon-bootstrap-plain colored text-2xl",
      },
      {
        name: "Tailwind CSS",
        iconClass: "devicon-tailwindcss-plain colored text-2xl",
      },
    ],
  },
  {
    categoryName: "Databases & Backend",
    skills: [
      {
        name: "MongoDB",
        iconClass: "devicon-mongodb-plain colored text-2xl",
      },
      {
        name: "MySQL",
        iconClass: "devicon-mysql-plain colored text-2xl",
      },
      {
        name: "PostgreSQL",
        iconClass: "devicon-postgresql-plain colored text-2xl",
      },
      {
        name: "Firebase",
        iconClass: "devicon-firebase-plain colored text-2xl",
      },
      {
        name: "Supabase",
        iconClass: "custom-supabase text-2xl",
        color: "#3ECF8E",
      },
    ],
  },
  {
    categoryName: "Tools & Platforms",
    skills: [
      {
        name: "Git",
        iconClass: "devicon-git-plain colored text-2xl",
      },
      {
        name: "GitHub",
        iconClass: "devicon-github-original text-2xl",
        color: "#ffffff",
      },
      {
        name: "VS Code",
        iconClass: "devicon-vscode-plain colored text-2xl",
      },
      {
        name: "Figma",
        iconClass: "custom-figma text-2xl",
      },
      {
        name: "Docker",
        iconClass: "devicon-docker-plain colored text-2xl",
      },
      {
        name: "AWS",
        iconClass: "devicon-amazonwebservices-plain-wordmark colored text-2xl",
      },
      {
        name: "Notion",
        iconClass: "custom-notion text-2xl",
        color: "#ffffff",
      },
      {
        name: "OpenRouter",
        iconClass: "custom-openrouter text-2xl",
        color: "#8B5CF6",
      },
    ],
  },
  {
    categoryName: "AI Automations",
    skills: [
      {
        name: "n8n",
        iconClass: "custom-n8n text-2xl",
        color: "#EA4B71",
      },
      {
        name: "Zapier",
        iconClass: "custom-zapier text-2xl",
        color: "#FF4A00",
      },
      {
        name: "Make.com",
        iconClass: "custom-make text-2xl",
        color: "#6366F1",
      },
    ],
  },
];
