import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ui/ProfileCard";
import GradientText from "@/components/ui/GradientText";
import TextTypeOptimized from "@/components/ui/TextTypeOptimized";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const introTexts = ["AI Engineer", "Coding Enthusiast", "Web Developer"];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[92vh] flex items-center"
    >
      <div className="absolute inset-0 -z-10">
        {/* Gradient beams with parallax */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-20 left-1/3 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
      </div>

      <div className="container w-full">
        <div className="grid items-center gap-8 md:grid-cols-12">
          {/* Left: Tilt Card (approx 40%) */}
          <div className="md:col-span-5 flex justify-center items-center mb-8 md:mb-0">
            <ProfileCard
              avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              name="Y. Dinesh Krishna"
              title="AI & Software Development"
              handle="ydk"
              status="Available for work"
              contactText="Wanna Talk?"
              enableTilt={true}
              enableMobileTilt={true}
              showUserInfo={true}
              onContactClick={() => {
                // Scroll to contact section
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full max-w-sm mx-auto"
            />
          </div>

          {/* Right: Name and intro */}
          <div className="md:col-span-7 text-center md:text-left space-y-5">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GradientText
                colors={["#64ffda", "#4079ff", "#64ffda", "#40a9ff", "#64ffda"]}
                animationSpeed={4}
                showBorder={true}
                className="text-5xl md:text-7xl font-extrabold"
              >
                Y. Dinesh Krishna
              </GradientText>
            </motion.h1>

            <motion.div
              className="text-lg md:text-xl text-muted-foreground max-w-2xl md:max-w-none mx-auto md:mx-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TextTypeOptimized
                text={introTexts}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-lg md:text-xl text-muted-foreground"
                loop={true}
                startDelay={800}
              />
            </motion.div>

            <div className="flex items-center justify-center md:justify-start gap-2">
              <motion.a
                whileHover={{ scale: 1.15, rotate: 3 }}
                className="p-2 rounded-full hover:bg-muted/60 transition-colors"
                href="https://github.com/yourhandle"
                aria-label="GitHub"
              >
                <GitHubLogoIcon className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: -3 }}
                className="p-2 rounded-full hover:bg-muted/60 transition-colors"
                href="https://www.linkedin.com/in/yourhandle/"
                aria-label="LinkedIn"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15 }}
                className="p-2 rounded-full hover:bg-muted/60 transition-colors"
                href="#contact"
                aria-label="Email"
              >
                <EnvelopeClosedIcon className="h-5 w-5" />
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
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Button asChild>
              <Link to="/resume">View Resume</Link>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
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
