import { skillsData, type Skill } from "@/lib/data/skillsData";
import SplitText from "../../../react_bits/SplitText/SplitText";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
    } else if (iconClass === "custom-openai") {
      // Custom OpenAI icon using SVG
      return (
        <svg
          className="w-6 h-6 skill-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: color || "#412991" }}
        >
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
        </svg>
      );
    } else if (iconClass === "custom-n8n") {
      // Custom n8n icon
      return (
        <svg
          className="w-6 h-6 skill-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: color || "#EA4B71" }}
        >
          <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM8.485 7.426c-.897 0-1.623.726-1.623 1.623v5.902c0 .897.726 1.623 1.623 1.623h7.03c.897 0 1.623-.726 1.623-1.623V9.049c0-.897-.726-1.623-1.623-1.623H8.485zm6.108 2.164v4.82c0 .299-.242.541-.541.541H9.948c-.299 0-.541-.242-.541-.541V9.59c0-.299.242-.541.541-.541h4.104c.299 0 .541.242.541.541z" />
        </svg>
      );
    } else if (iconClass === "custom-zapier") {
      // Custom Zapier icon
      return (
        <svg
          className="w-6 h-6 skill-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: color || "#FF4A00" }}
        >
          <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-12.5-5.5h5v1.5h-3.5v2h3v1.5h-3v2h3.5V15h-5V6.5zm-6 0h1.5v6.5h3V15h-4.5V6.5z" />
        </svg>
      );
    } else if (iconClass === "custom-make") {
      // Custom Make.com icon
      return (
        <svg
          className="w-6 h-6 skill-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: color || "#6366F1" }}
        >
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.704 1.704-1.704-1.704 1.704-1.704 1.704 1.704zm-3.408 3.408l-1.704 1.704-1.704-1.704 1.704-1.704 1.704 1.704zm-3.408-3.408l-1.704 1.704L7.344 8.16l1.704-1.704 1.704 1.704zm0 6.816l-1.704 1.704L7.344 15.976l1.704-1.704 1.704 1.704zm3.408 0l-1.704 1.704-1.704-1.704 1.704-1.704 1.704 1.704z" />
        </svg>
      );
    } else if (iconClass === "custom-supabase") {
      // Custom Supabase icon
      return (
        <svg
          className="w-6 h-6 skill-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: color || "#3ECF8E" }}
        >
          <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
        </svg>
      );
    } else if (iconClass === "custom-openrouter") {
      // Custom OpenRouter icon
      return (
        <svg
          className="w-6 h-6 skill-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: color || "#8B5CF6" }}
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    } else if (iconClass === "custom-notion") {
      // Custom Notion icon
      return (
        <svg
          className="w-6 h-6 skill-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: color || "#ffffff" }}
        >
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
        </svg>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
