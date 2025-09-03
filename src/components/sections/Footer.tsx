import { useState } from "react";
import { motion } from "framer-motion";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { Code } from "lucide-react";
import { hapticNavigation } from "@/lib/haptic";
import StarfieldBackground from "@/components/ui/StarfieldBackground";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const socialLinks = [
    {
      icon: EnvelopeClosedIcon,
      href: "mailto:dineshkrishnayeturi@gmail.com",
      label: "Email",
    },
    {
      icon: GitHubLogoIcon,
      href: "https://github.com/dineshydk",
      label: "GitHub",
    },
    {
      icon: LinkedInLogoIcon,
      href: "https://www.linkedin.com/in/dineshydk/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className="relative overflow-hidden min-h-[400px] md:min-h-[400px] h-[95vh] md:h-auto"
      style={{
        background:
          "linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 50%, #000000 100%)",
      }}
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 z-0">
        <StarfieldBackground starCount={600} starColor="white" speed={0.01} />
      </div>

      {/* Dramatic spotlight effects */}
      <div className="absolute inset-0 z-10">
        {/* Left spotlight */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Right spotlight */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* Horizontal light spill */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-10"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* Atmospheric particles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-1/3 w-0.5 h-0.5 bg-white rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-white rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <motion.div
        className="container relative z-20 py-12 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Simple Thanksgiving-style Thank You Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{
              fontFamily: "'Dancing_Script', 'Pacifico', 'Lobster', cursive",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Thanks for visiting
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed opacity-90">
            I appreciate you taking the time to explore my work and learn about
            my journey.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-xl md:text-2xl font-semibold mb-4 text-blue-400 opacity-90">
            Looking forward to hearing from you
          </p>
          <p className="text-gray-300 opacity-80">
            Let's connect and discuss how we can work together!
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="group relative p-4 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => hapticNavigation()}
                aria-label={link.label}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <link.icon
                  className="h-7 w-7 transition-all duration-300 group-hover:drop-shadow-lg"
                  style={{
                    color: "#c0c0c0",
                    filter: "drop-shadow(0 0 8px rgba(192,192,192,0.3))",
                  }}
                />
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {link.label}
                </span>

                {/* Metallic shine effect on hover */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
                  }}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-32 h-px mx-auto mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Copyright */}
        <motion.div variants={itemVariants} className="space-y-3">
          <p className="text-gray-300 flex items-center justify-center gap-2 text-sm opacity-80">
            Made with Passion by{" "}
            <motion.span
              animate={{
                scale: isHovered ? 1.2 : 1,
                color: isHovered ? "#02d6ff" : "#ffff",
              }}
              transition={{ duration: 0.3 }}
            >
              Dinesh
            </motion.span>
            <motion.div
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Code className="w-4 h-4 text-primary" />
            </motion.div>
          </p>
          <p className="text-gray-400 text-xs opacity-60">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
