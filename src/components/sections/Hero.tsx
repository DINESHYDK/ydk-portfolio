import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

import ProfileCard from "@/components/ui/ProfileCard";
import GradientText from "@/components/ui/GradientText";
import TextTypeOptimized from "@/components/ui/TextTypeOptimized";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SplitText from "../../../react_bits/SplitText/SplitText";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const introTexts = ["AI Engineer", "Coding Enthusiast", "Web Developer"];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[92vh] flex items-center bg-background"
    >
      {/* Background gradients removed for a clean dark hero */}

      <div className="container w-full pt-6 pr-4 md:pt-4 md:pr-0 lg:pt-8">
        <div className="grid items-center gap-6 md:gap-8 lg:gap-12 md:grid-cols-12">
          {/* Left: Tilt Card (approx 40%) */}
          <div className="md:col-span-5 flex justify-center items-center mb-8 md:mb-0 -ml-4 md:ml-0">
            <ProfileCard
              avatarUrl="/DineshProfile.png"
              miniAvatarUrl="/DineshProfile.png"
              name="Y. Dinesh Krishna"
              title="AI & Software Development"
              handle="ydk"
              status="Available for work"
              contactText="Wanna Talk?"
              enableTilt={true}
              enableMobileTilt={false}
              showUserInfo={true}
              onContactClick={() => {
                // Scroll to contact section
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full max-w-xs sm:max-w-sm mx-auto"
            />
          </div>

          {/* Right: Name and intro */}
          <div className="md:col-span-7 text-center md:text-left space-y-4 md:space-y-5">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <SplitText
                text="Y. Dinesh Krishna"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary whitespace-nowrap leading-[1.1] font-['Poppins',_system-ui,_sans-serif]"
                splitType="chars"
                delay={80}
                duration={1.2}
                from={{ opacity: 0, y: 100, rotationX: -90, scale: 0.5 }}
                to={{ opacity: 1, y: 0, rotationX: 0, scale: 1 }}
                ease="back.out(1.7)"
              />
            </motion.div>

            <motion.div
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl md:max-w-none mx-auto md:mx-0 font-medium"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <TextTypeOptimized
                text={introTexts}
                typingSpeed={55}
                pauseDuration={2200}
                showCursor={true}
                cursorCharacter="|"
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium font-sans"
                loop={true}
                startDelay={800}
              />
            </motion.div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <motion.a
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full hover:bg-muted/60 transition-all duration-300 hover:shadow-lg"
                href="https://github.com/yourhandle"
                aria-label="GitHub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <GitHubLogoIcon className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full hover:bg-muted/60 transition-all duration-300 hover:shadow-lg"
                href="https://www.linkedin.com/in/yourhandle/"
                aria-label="LinkedIn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <LinkedInLogoIcon className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full hover:bg-muted/60 transition-all duration-300 hover:shadow-lg"
                href="#contact"
                aria-label="Email"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <EnvelopeClosedIcon className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Buttons row beneath both columns */}
        <motion.div
          className="mt-6 md:mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <InteractiveHoverButton
            className="w-auto px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg"
            onClick={() => {
              // Navigate to resume or open resume
              window.open("/resume", "_blank");
            }}
          >
            View Resume
          </InteractiveHoverButton>

          <InteractiveHoverButton
            className="w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-lg shadow-lg"
            onClick={() => {
              // Scroll to contact section
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Contact Me
          </InteractiveHoverButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
