import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref as any, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section id="home" ref={ref as any} className="relative min-h-[92vh] flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        {/* Gradient beams with parallax */}
        <motion.div style={{ y: y1 }} className="absolute -top-20 left-1/3 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <motion.div style={{ y: y2 }} className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container text-center space-y-6">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold gradient-text-animated"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Name
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Building delightful, performant web experiences with a focus on design systems, motion, and DX.
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <motion.div whileHover={{ y: -2, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Button asChild>
              <a href="#projects">View Projects</a>
            </Button>
          </motion.div>
          <div className="flex items-center gap-2">
            <motion.a whileHover={{ scale: 1.15, rotate: 3 }} className="p-2 rounded-full hover:bg-muted/60 transition-colors" href="https://github.com/yourhandle" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.15, rotate: -3 }} className="p-2 rounded-full hover:bg-muted/60 transition-colors" href="https://www.linkedin.com/in/yourhandle/" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.15 }} className="p-2 rounded-full hover:bg-muted/60 transition-colors" href="#contact" aria-label="Email">
              <Mail className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
