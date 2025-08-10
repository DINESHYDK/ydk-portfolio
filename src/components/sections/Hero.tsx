import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TiltCard from "@/components/ui/TiltCard";

export const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref as any, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const name = "Dinesh Krishna";

  return (
    <section id="home" ref={ref as any} className="relative min-h-[92vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        {/* Gradient beams with parallax */}
        <motion.div style={{ y: y1 }} className="absolute -top-20 left-1/3 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <motion.div style={{ y: y2 }} className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container w-full">
        <div className="grid items-center gap-8 md:grid-cols-12">
          {/* Left: Tilt Card (approx 40%) */}
          <div className="md:col-span-5">
            <TiltCard className="h-72 md:h-[26rem]">
              <div className="h-full w-full rounded-xl grid place-items-center">
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">Featured</p>
                  <h3 className="mt-2 text-2xl font-semibold">Crafting delightful UI</h3>
                  <p className="mt-1 text-muted-foreground max-w-xs mx-auto">
                    Design systems, motion, and performance — all in harmony.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right: Name and intro */}
          <div className="md:col-span-7 text-center md:text-left space-y-5">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold gradient-text-animated"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
            >
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4 }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl md:max-w-none mx-auto md:mx-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Building delightful, performant web experiences with a focus on design systems, motion, and DX.
            </motion.p>

            <div className="flex items-center justify-center md:justify-start gap-2">
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
          </div>
        </div>

        {/* Buttons row beneath both columns */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <motion.div whileHover={{ y: -2, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Button asChild>
              <Link to="/resume">View Resume</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ y: -2, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Button asChild variant="outline">
              <Link to="/contact">Contact me</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
