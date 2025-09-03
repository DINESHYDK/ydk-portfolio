import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, ExternalLink } from "lucide-react";
import { hapticButtonPress } from "@/lib/haptic";

interface Certificate {
  title: string;
  issuer: string;
  date: string; // YYYY-MM-DD format for easy sorting
  description: string;
  link: string;
  pinned: boolean;
}

const certificateData: Certificate[] = [
  {
    title: "Practice Arrays",
    issuer: "Codechef",
    date: "2025-08-21",
    description:
      "Certificate for completing all the practice problems of Practice Arrays",
    link: "#",
    pinned: false,
  },
  {
    title: "C++ Problem Solving",
    issuer: "Codechef",
    date: "2025-08-05",
    description:
      "Certificate for completing all the lessons and practice projects in C++ Problem Solving",
    link: "#",
    pinned: false,
  },
  {
    title: "Time complexity",
    issuer: "Codechef",
    date: "2025-08-02",
    description:
      "Certificate for completing all the lessons and practice projects in Time complexity",
    link: "#",
    pinned: false,
  },
  {
    title: "Practice C++",
    issuer: "Codechef",
    date: "2025-07-27",
    description:
      "Certificate for completing all the practice problems of Practice C++",
    link: "#",
    pinned: false,
  },
  {
    title: "Linked Lists",
    issuer: "Codechef",
    date: "2025-06-08",
    description:
      "Certificate for completing all the practice problems of Linked Lists",
    link: "#",
    pinned: false,
  },
  {
    title: "Problem solving in C",
    issuer: "Codechef",
    date: "2025-05-24",
    description:
      "Certificate for completing all the lessons and practice projects in Problem solving in C",
    link: "#",
    pinned: false,
  },
  {
    title: "Practice C",
    issuer: "Codechef",
    date: "2025-05-08",
    description:
      "Certificate for completing all the practice problems of Practice C",
    link: "#",
    pinned: false,
  },
  {
    title: "Learn C Programming",
    issuer: "Codechef",
    date: "2025-03-22",
    description:
      "Certificate for completing all the lessons and practice projects in Learn C Programming",
    link: "#",
    pinned: false,
  },
  {
    title: "Student Upskilling Launchpad",
    issuer: "Google",
    date: "2025-07-31",
    description:
      "Awarded for your dedicated participation and successful attendance of all sessions in the program",
    link: "#",
    pinned: false,
  },
];

interface Achievement {
  title: string;
  institutionPlatform: string;
  date: string; // YYYY-MM-DD format
  description?: string;
}

const achievementsData: Achievement[] = [
  {
    title: "C++ Online Test and Quiz: 100% Skill Score",
    institutionPlatform: "CodeChef",
    date: "2024-11-20", // Placeholder date
    description:
      "Scored 2900/2900 points, achieving a perfect 100% skill score in the C++ Online Test and Quiz.",
  },
  {
    title: "C Language Online Test: 93% Skill Score",
    institutionPlatform: "CodeChef",
    date: "2024-11-18", // Placeholder date
    description:
      "Scored 2800/3000 points, achieving a 93% skill score in the C Language Online Test.",
  },
];

interface Badge {
  title: string;
  description: string;
  imageUrl: string;
  platform: "CodeChef" | "LeetCode" | "GeeksforGeeks" | "Codeforces";
  link: string;
}

const badgeData: Badge[] = [
  {
    title: "Silver Streak Badge",
    description: "Congratulations! For maintaining 25 Days coding streak",
    imageUrl: "/badges/silver_streak.png", // Placeholder for the actual image path
    platform: "CodeChef",
    link: "#",
  },
  {
    title: "Problem Solver Diamond Badge",
    description: "Congratulations! You solved 1000 Problems on CodeChef",
    imageUrl: "/badges/problem_solver_diamond.png", // Placeholder for the actual image path
    platform: "CodeChef",
    link: "#",
  },
  {
    title: "Bronze Streak Badge",
    description: "Congratulations! For maintaining 5 Days coding streak",
    imageUrl: "/badges/bronze_streak.png", // Placeholder for the actual image path
    platform: "CodeChef",
    link: "#",
  },
  {
    title: "GeeksforGeeks Achiever",
    description: "Achieved a high rank on GeeksforGeeks",
    imageUrl: "/badges/gfg_achiever.png", // Placeholder
    platform: "GeeksforGeeks",
    link: "#",
  },
  {
    title: "Codeforces Expert",
    description: "Attained Expert rating on Codeforces",
    imageUrl: "/badges/codeforces_expert.png", // Placeholder
    platform: "Codeforces",
    link: "#",
  },
];

const Resume = () => {
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    document.title = "Resume — Dinesh Krishna";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Resume of Dinesh Krishna: projects, skills, and education."
      );

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const underline = entry.target.querySelector(".animated-underline");
            if (underline) {
              underline.classList.add("animate-underline");
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    // Capture current ref value to avoid stale closure in cleanup
    const currentHeadings = headingRefs.current;

    // Observe all headings
    currentHeadings.forEach((heading) => {
      if (heading) {
        observer.observe(heading);
      }
    });

    return () => {
      currentHeadings.forEach((heading) => {
        if (heading) {
          observer.unobserve(heading);
        }
      });
    };
  }, []);

  const sortedCertificates = [...certificateData].sort((a, b) => {
    // Pinned certificates come first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    // Then sort by date, newest first
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="container py-20">
      {/* Back Navigation */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="group">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              hapticButtonPress();
              // Scroll to top when navigating back
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex justify-center gap-4">
        <Button asChild className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download="DineshKrishna_Resume.pdf"
            aria-label="Download Resume"
            onClick={() => hapticButtonPress()}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </Button>
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link to="/contact" onClick={() => hapticButtonPress()}>
            <Mail className="w-4 h-4" />
            Hire Me
          </Link>
        </Button>
      </div>

      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">
          Y. Dinesh Krishna
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Aspiring Web Developer | AI Enthusiast | Competitive Programmer
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          <a
            href="mailto:dineshkrishnayeturi@gmail.com"
            className="hover:text-[#4079da]"
            onClick={() => hapticButtonPress()}
          >
            dineshkrishnayeturi@gmail.com
          </a>{" "}
          •{" "}
          <a
            href="https://github.com/dineshydk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4079da]"
            onClick={() => hapticButtonPress()}
          >
            GitHub
          </a>{" "}
          •{" "}
          <a
            href="https://www.linkedin.com/in/dineshydk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4079da]"
            onClick={() => hapticButtonPress()}
          >
            LinkedIn
          </a>
        </p>
      </header>

      <div className="grid gap-8 animate-fade-in">
        {/* Projects Section */}
        <section className="glass-dark rounded-xl p-6 border">
          <h2
            ref={(el) => (headingRefs.current[0] = el)}
            className="resume-heading text-2xl font-semibold mb-4 relative inline-block"
          >
            Projects & Experience
            <span className="animated-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-1000 ease-out"></span>
          </h2>
          <div className="space-y-6">
            {/* Project 1 */}
            <div>
              <h3 className="text-lg font-bold">Type Rivals Project</h3>
              <p className="text-sm text-muted-foreground">
                Participant in Winter of Code 7.0
              </p>
              <p className="mt-2">
                Designed a dynamic typing speed test web application with
                customizable contests and difficulty levels. Integrated Firebase
                for user authentication and data storage, and used the Gemini
                API for generating diverse texts.
              </p>
              <p className="mt-2 text-sm">
                <strong>Technologies:</strong> HTML, CSS, JavaScript, Firebase
              </p>
            </div>

            <div className="border-t border-muted/20"></div>

            {/* Project 2 */}
            <div>
              <h3 className="text-lg font-bold">
                Personal Portfolio (In Progress)
              </h3>
              <p className="mt-2">
                Built a responsive personal portfolio to showcase projects and
                skills, utilizing React.js for dynamic UI components.
                Implemented Supabase for backend services and styled with
                Tailwind CSS for efficiency and responsiveness.
              </p>
              <p className="mt-2 text-sm">
                <strong>Technologies:</strong> React.js, JavaScript, HTML, CSS,
                Supabase, Tailwind CSS
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Skills Section */}
          <section className="glass-dark rounded-xl p-6 border">
            <h2
              ref={(el) => (headingRefs.current[1] = el)}
              className="resume-heading text-2xl font-semibold mb-4 relative inline-block"
            >
              Skills
              <span className="animated-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-1000 ease-out"></span>
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Languages:</strong> C, C++, HTML, CSS, JavaScript, Bash
                Scripting
              </p>
              <p>
                <strong>Tools & Technologies:</strong> Git, GitHub, LaTeX,
                Canva, Figma (basic), Linux Fundamentals
              </p>
              <p>
                <strong>Currently Learning:</strong> Data Structures (C++) and
                the React Library
              </p>
            </div>
          </section>

          {/* Education Section */}
          <section className="glass-dark rounded-xl p-6 border">
            <h2
              ref={(el) => (headingRefs.current[2] = el)}
              className="resume-heading text-2xl font-semibold mb-4 relative inline-block"
            >
              Education
              <span className="animated-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-1000 ease-out"></span>
            </h2>
            <div className="space-y-1">
              <p className="font-bold">
                Bachelor of Technology in Computer Science and Engineering
              </p>
              <p>Indian Institute of Technology (ISM), Dhanbad</p>
              <p className="text-sm text-muted-foreground">
                Completed Courses: C Programming, Data Structures, Linux
                Fundamentals
              </p>
            </div>
          </section>
        </div>

        {/* Certificates Section */}
        <section className="glass-dark rounded-xl p-6 border">
          <h2
            ref={(el) => (headingRefs.current[3] = el)}
            className="resume-heading text-2xl font-semibold mb-4 relative inline-block"
          >
            Certificates
            <span className="animated-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-1000 ease-out"></span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {sortedCertificates.map((cert, index) => (
              <div
                key={index}
                className="p-4 bg-secondary/20 rounded-lg border border-muted/20"
              >
                <h3 className="font-bold text-lg flex items-center justify-between">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#4079da] transition-colors flex items-center gap-2"
                  >
                    {cert.title}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {cert.pinned && (
                    <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                      PINNED
                    </span>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="text-sm mt-2">{cert.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Completed:{" "}
                  {new Date(cert.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Academic & Competitive Highlights Section */}
        <section className="glass-dark rounded-xl p-6 border">
          <h2
            ref={(el) => (headingRefs.current[4] = el)}
            className="resume-heading text-2xl font-semibold mb-4 relative inline-block"
          >
            Academic & Competitive Highlights
            <span className="animated-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-1000 ease-out"></span>
          </h2>
          <div className="space-y-6">
            {achievementsData.map((achievement, index) => {
              const formattedTitle = achievement.title.replace(
                /(\d+% Skill Score)/, // Captures "XX% Skill Score"
                `<span class="text-emerald-400 font-semibold">$1</span>`
              );

              return (
                <div key={index}>
                  <h3
                    className="font-bold text-lg"
                    dangerouslySetInnerHTML={{ __html: formattedTitle }}
                  />
                  <p className="text-sm text-muted-foreground">
                    {achievement.institutionPlatform} •{" "}
                    {new Date(achievement.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                  {achievement.description && (
                    <p className="text-sm mt-2 text-muted-foreground">
                      {achievement.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Badges Section */}
        <section className="glass-dark rounded-xl p-6 border">
          <h2
            ref={(el) => (headingRefs.current[5] = el)}
            className="resume-heading text-xl font-semibold mb-3 flex items-center gap-2 relative inline-block"
          >
            <span className="relative inline-block">
              Coding Badges
              <span className="animated-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-1000 ease-out"></span>
            </span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Group badges by platform */}
            {["LeetCode", "CodeChef", "GeeksforGeeks", "Codeforces"].map(
              (platform, platformIndex) => {
                const platformBadges = badgeData.filter(
                  (badge) => badge.platform === platform
                );
                if (platformBadges.length === 0) return null; // Don't render if no badges for this platform

                const platformHeadingRefIndex = 6 + platformIndex; // Adjusted ref index

                return (
                  <div key={platform} className="space-y-3">
                    <h3
                      ref={(el) =>
                        (headingRefs.current[platformHeadingRefIndex] = el)
                      }
                      className="resume-heading text-xl font-semibold mb-3 flex items-center gap-2 relative inline-block"
                    >
                      <span className="relative inline-block">
                        {platform === "LeetCode" && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="#FFA116"
                          >
                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z" />
                          </svg>
                        )}
                        {platform === "CodeChef" && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="#5B4638"
                          >
                            <path d="M11.219 3.375v17.25c0 .621.504 1.125 1.125 1.125s1.125-.504 1.125-1.125V3.375c0-.621-.504-1.125-1.125-1.125s-1.125.504-1.125 1.125z" />
                          </svg>
                        )}
                        {platform === "GeeksforGeeks" && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="#308D46"
                          >
                            <path d="M12 0L0 6v12l12 6 12-6V6L12 0zm0 2.236L20.45 6 12 9.764 3.55 6 12 2.236zM2 7.668l9 4.143v8.521l-9-4.143V7.668zm20 0l-9 4.143v8.521l9-4.143V7.668z" />
                          </svg>
                        )}
                        {platform === "Codeforces" && (
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="#1F8AC0"
                          >
                            <path d="M18.8 4.4L15.2 0H8.8L5.2 4.4H0v15.2h5.2L8.8 24h6.4l3.6-4.4h5.2V4.4h-5.2zM2 18.8V5.2h4l3.6-4.4h4.8l3.6 4.4h4v13.6h-4l-3.6 4.4h-4.8L6 18.8H2z" />
                          </svg>
                        )}
                        {platform}
                        <span className="animated-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-1000 ease-out"></span>
                      </span>
                    </h3>
                    <div className="space-y-2">
                      {platformBadges.map((badge, badgeIndex) => (
                        <div
                          key={badgeIndex}
                          className="flex items-center gap-3 p-2 bg-secondary/20 rounded-lg border border-muted/20"
                        >
                          <div className="w-10 h-10 flex-shrink-0">
                            <img
                              src={badge.imageUrl}
                              alt={badge.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {badge.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {badge.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
