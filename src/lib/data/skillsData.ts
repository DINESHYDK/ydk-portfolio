// No imports needed for string-based icon classes

export type Skill = {
  name: string;
  iconClass: string;
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
        iconClass: "devicon-c-plain text-2xl",
      },
      {
        name: "C++",
        iconClass: "devicon-cplusplus-plain text-2xl",
      },
      {
        name: "JavaScript",
        iconClass: "devicon-javascript-plain text-2xl",
      },
      {
        name: "TypeScript",
        iconClass: "devicon-typescript-plain text-2xl",
      },
    ],
  },
  {
    categoryName: "Web Development",
    skills: [
      {
        name: "React",
        iconClass: "devicon-react-original text-2xl",
      },
      {
        name: "Next.js",
        iconClass: "lucide-file-code w-6 h-6",
      },
      {
        name: "Express.js",
        iconClass: "devicon-nodejs-plain text-2xl",
      },
      {
        name: "HTML5",
        iconClass: "devicon-html5-plain text-2xl",
      },
      {
        name: "CSS3",
        iconClass: "devicon-css3-plain text-2xl",
      },
      {
        name: "Bootstrap",
        iconClass: "devicon-bootstrap-plain text-2xl",
      },
      {
        name: "Tailwind CSS",
        iconClass: "devicon-tailwindcss-plain text-2xl",
      },
    ],
  },
  {
    categoryName: "Automation & APIs",
    skills: [
      {
        name: "n8n",
        iconClass: "lucide-zap w-6 h-6",
      },
      {
        name: "Zapier",
        iconClass: "lucide-zap w-6 h-6",
      },
      {
        name: "APIs",
        iconClass: "lucide-api w-6 h-6",
      },
    ],
  },
  {
    categoryName: "Tools & Platforms",
    skills: [
      {
        name: "Git & GitHub",
        iconClass: "devicon-github-original text-2xl",
      },
      {
        name: "Figma",
        iconClass: "devicon-figma-plain text-2xl",
      },
      {
        name: "Canva",
        iconClass: "lucide-palette w-6 h-6",
      },
      {
        name: "Firebase",
        iconClass: "devicon-firebase-plain text-2xl",
      },
      {
        name: "Notion",
        iconClass: "lucide-file-code w-6 h-6",
      },
    ],
  },
];
