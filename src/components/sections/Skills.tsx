import { skillsData, type Skill } from "@/lib/data/skillsData";
import SplitText from "../../../react_bits/SplitText/SplitText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import BrandIcon from "@/components/ui/BrandIcon";

export const Skills = () => {
  const renderIcon = (skill: Skill) => {
    const { iconClass, color } = skill;

    if (iconClass.startsWith("devicon")) {
      // For devicons, apply custom color if specified, otherwise use colored class
      return (
        <i
          className={`${iconClass} skill-icon`}
          style={color ? { color } : {}}
        />
      );
    } else if (iconClass.startsWith("custom-")) {
      // Extract the first class token (e.g., "custom-supabase" from "custom-supabase text-2xl")
      const baseClass = iconClass.split(/\s+/)[0];
      const name = baseClass.replace("custom-", "") as any;
      const colorValue = color;
      return (
        <BrandIcon
          name={name}
          className="w-6 h-6 skill-icon"
          color={colorValue}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
        />
      );
    }

    // Fallback icon
    return (
      <i className="devicon-javascript-plain colored text-2xl skill-icon" />
    );
  };

  return (
    <section id="skills" className="py-20 skills-section">
      <div className="container">
        <SectionHeading
          text="Skills"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {skillsData.map((category) => (
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
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 group hover:shadow-md"
                  >
                    <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      {renderIcon(skill)}
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
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
