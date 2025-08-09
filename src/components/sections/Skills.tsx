import { Progress } from "@/components/ui/progress";

const skills = [
  { group: "Frontend", items: [
    { name: "React", value: 90 },
    { name: "TypeScript", value: 85 },
    { name: "Tailwind", value: 90 },
  ]},
  { group: "Backend", items: [
    { name: "Node.js", value: 75 },
    { name: "Supabase", value: 70 },
  ]},
  { group: "Tools", items: [
    { name: "Git", value: 85 },
    { name: "Figma", value: 80 },
  ]}
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20">
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
                {s.items.map((it) => (
                  <div key={it.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{it.name}</span>
                      <span className="text-muted-foreground">{it.value}%</span>
                    </div>
                    <Progress value={it.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
