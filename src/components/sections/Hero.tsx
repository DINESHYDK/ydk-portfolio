import { motion } from "framer-motion";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import ProfileCard from "@/components/ui/ProfileCard";
import TextTypeOptimized from "@/components/ui/TextTypeOptimized";
import SplitText from "../../../react_bits/SplitText/SplitText";
import { hapticButtonPress } from "@/lib/haptic";

export const Hero = () => {
  const navigate = useNavigate();

  const introTexts = ["AI Engineer", "Coding Enthusiast", "Web Developer"];

  return (
    <section
      id="home"
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
                onClick={() => hapticButtonPress()}
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
                onClick={() => hapticButtonPress()}
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
                onClick={() => hapticButtonPress()}
              >
                <EnvelopeClosedIcon className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Glassmorphism CTA Buttons */}
        <motion.div
          className="mt-6 md:mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <motion.button
            className="group relative px-4 py-2 sm:px-6 sm:py-3 bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/20 text-sm sm:text-base"
            onClick={() => {
              hapticButtonPress();
              // Navigate to resume page
              navigate("/resume");
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Resume</span>
          </motion.button>

          <motion.button
            className="group relative px-4 py-2 sm:px-6 sm:py-3 bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-lg hover:shadow-primary/20 text-sm sm:text-base"
            onClick={() => {
              hapticButtonPress();
              // Scroll to contact section
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Contact Me</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
