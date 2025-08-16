import { motion } from "framer-motion";
import { Clock, Dumbbell, Code, Brain, Zap, Target } from "lucide-react";
import SplitText from "../../../react_bits/SplitText/SplitText";

export const AboutMe = () => {
  const sections = [
    {
      icon: Clock,
      title: "The Journey Begins at 2 AM...",
      content:
        "While most people are fast asleep, you'll often find me coding away at 2 AM, fueled by curiosity and the thrill of solving complex problems. I'm a Computer Science Engineering student at IIT (ISM) Dhanbad, and yes, I'm one of those people who genuinely gets excited about algorithms!",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Dumbbell,
      title: "From Iron to Code",
      content:
        "My day usually starts at the gym - because a strong body fuels a sharp mind. There's something oddly similar between lifting weights and tackling competitive programming challenges - both require persistence, proper form, and the willingness to push through when things get tough.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Brain,
      title: "Always Learning, Always Growing",
      content:
        "I'm currently immersed in three worlds: Competitive Programming (where I battle algorithms), Web Development (bringing ideas to life on the screen), and Data Structures & Algorithms (the backbone of everything cool in tech).",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      title: "What drives me?",
      content:
        "Simple - I love learning new things. Whether it's mastering JavaScript through hands-on projects, understanding complex logic circuits, or discovering the latest tech trends, I'm always hungry for knowledge.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "The Plot Twist",
      content:
        "Here's what makes me different: I don't just code in isolation. I believe in learning with AI tools, collaborating with technology, and turning late-night coding sessions into breakthrough moments.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "What's Next?",
      content:
        "Building something amazing, one line of code at a time. My goal? To become a full-stack developer who doesn't just write code, but crafts solutions that make a difference.",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.header
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <SplitText
            text="About Me"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4"
            splitType="chars"
            delay={70}
            duration={1.0}
            from={{ opacity: 0, y: 80, rotationX: -90, scale: 0.3 }}
            to={{ opacity: 1, y: 0, rotationX: 0, scale: 1 }}
            ease="back.out(1.7)"
          />
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.header>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="glass-dark rounded-2xl p-6 h-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group-hover:-translate-y-1">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} p-3 mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <section.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {section.title}
                </h3>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Ready to build something amazing together?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
            <Zap className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
