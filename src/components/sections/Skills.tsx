import { Progress } from "@/components/ui/progress";

// Skill icon mapping
const getSkillIcon = (skillName: string) => {
  const iconMap: Record<string, string> = {
    // Frontend
    'React': 'devicon-react-original',
    'TypeScript': 'devicon-typescript-plain',
    'Tailwind': 'devicon-tailwindcss-plain',
    'JavaScript': 'devicon-javascript-plain',
    'HTML': 'devicon-html5-plain',
    'CSS': 'devicon-css3-plain',
    'Vue.js': 'devicon-vuejs-plain',
    'Angular': 'devicon-angularjs-plain',
    
    // Backend
    'Node.js': 'devicon-nodejs-plain',
    'Python': 'devicon-python-plain',
    'Java': 'devicon-java-plain',
    'C++': 'devicon-cplusplus-plain',
    'C#': 'devicon-csharp-plain',
    'PHP': 'devicon-php-plain',
    'Ruby': 'devicon-ruby-plain',
    'Go': 'devicon-go-plain',
    
    // Databases
    'MongoDB': 'devicon-mongodb-plain',
    'PostgreSQL': 'devicon-postgresql-plain',
    'MySQL': 'devicon-mysql-plain',
    'Redis': 'devicon-redis-plain',
    'SQLite': 'devicon-sqlite-plain',
    
    // Cloud & Services
    'AWS': 'devicon-amazonwebservices-original',
    'Azure': 'devicon-azure-plain',
    'Google Cloud': 'devicon-googlecloud-plain',
    'Docker': 'devicon-docker-plain',
    'Kubernetes': 'devicon-kubernetes-plain',
    'Firebase': 'devicon-firebase-plain',
    'Supabase': 'devicon-postgresql-plain', // Using PostgreSQL icon as fallback
    
    // Tools & Others
    'Git': 'devicon-git-plain',
    'GitHub': 'devicon-github-original',
    'Figma': 'devicon-figma-plain',
    'VSCode': 'devicon-vscode-plain',
    'Vim': 'devicon-vim-plain',
    'Linux': 'devicon-linux-plain',
    'Windows': 'devicon-windows8-original',
    'MacOS': 'devicon-apple-original',
  };
  
  return iconMap[skillName] || 'devicon-javascript-plain'; // Default fallback
};

const skills = [
  { 
    group: "Frontend", 
    items: [
      { name: "React", value: 90 },
      { name: "TypeScript", value: 85 },
      { name: "Tailwind", value: 90 },
      { name: "JavaScript", value: 95 },
      { name: "HTML", value: 90 },
      { name: "CSS", value: 85 },
    ]
  },
  { 
    group: "Backend", 
    items: [
      { name: "Node.js", value: 75 },
      { name: "Python", value: 70 },
      { name: "Java", value: 65 },
      { name: "C++", value: 60 },
    ]
  },
  { 
    group: "Tools & Others", 
    items: [
      { name: "Git", value: 85 },
      { name: "Docker", value: 70 },
      { name: "AWS", value: 65 },
      { name: "Linux", value: 75 },
    ]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 skills-section">
      <div className="container">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Skills</h2>
          <p className="text-muted-foreground mt-2">Areas of focus and capability</p>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => (
            <div key={s.group} className="glass rounded-xl p-6 border">
              <h3 className="font-semibold mb-4">{s.group}</h3>
              <div className="space-y-4">
                {s.items.map((it) => {
                  const iconClass = getSkillIcon(it.name);
                  console.log(`Skill: ${it.name}, Icon: ${iconClass}`); // Debug log
                  return (
                    <div key={it.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center gap-2">
                          <i className={`${iconClass} text-lg`}></i>
                          <span>{it.name}</span>
                        </div>
                        <span className="text-muted-foreground">{it.value}%</span>
                      </div>
                      <Progress value={it.value} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
