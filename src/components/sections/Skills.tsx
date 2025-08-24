import { skillsData } from "@/lib/data/skillsData";
import { FileCode, Zap, Palette } from "lucide-react";
import SplitText from "../../../react_bits/SplitText/SplitText";

// Icon mapping for Lucide icons with enhanced colors
const lucideIconMap: Record<string, JSX.Element> = {
  "lucide-file-code": <FileCode className="w-6 h-6 text-blue-400" />,
  "lucide-zap": <Zap className="w-6 h-6 text-yellow-400" />,
  "lucide-palette": <Palette className="w-6 h-6 text-pink-400" />,
  "lucide-api": <FileCode className="w-6 h-6 text-green-400" />,
};

export const Skills = () => {
  const renderIcon = (iconClass: string) => {
    if (iconClass.startsWith("devicon")) {
      // Ensure Devicons show in their original colors by removing any text color overrides
      return (
        <i
          className={`${iconClass} !text-inherit`}
          style={{ color: "inherit" }}
        />
      );
    } else if (lucideIconMap[iconClass]) {
      return lucideIconMap[iconClass];
    }
    return <i className="devicon-javascript-plain text-2xl" />; // fallback
  };

  return (
    <section id="skills" className="py-20 skills-section">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <SplitText
            text="Skills"
            className="text-3xl md:text-4xl font-bold text-primary mb-3"
            splitType="chars"
            delay={50}
            duration={0.8}
            from={{
              opacity: 0,
              y: 50,
              rotationX: -90,
            }}
            to={{
              opacity: 1,
              y: 0,
              rotationX: 0,
            }}
          />
          <p className="text-muted-foreground text-lg">
            Technologies and tools I work with
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {skillsData.map((category, index) => (
            <div
              key={category.categoryName}
              className="rounded-xl p-6 border border-white/10 bg-[hsl(0,0%,10%)]/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <SplitText
                text={category.categoryName}
                className="font-semibold text-xl mb-4 text-primary border-b border-primary/30 pb-2"
                splitType="chars"
                delay={30}
                duration={0.6}
                from={{ opacity: 0, x: -30 }}
                to={{ opacity: 1, x: 0 }}
              />
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200 group"
                  >
                    <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {renderIcon(skill.iconClass)}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
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
