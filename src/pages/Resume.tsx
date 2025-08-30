import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Mail } from "lucide-react";
import { hapticButtonPress } from "@/lib/haptic";

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

  return (
    <div className="container py-20">
      {/* Back Navigation */}
      <div className="mb-8">
        <Button asChild variant="ghost" className="group">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => hapticButtonPress()}
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
            className="hover:text-primary"
            onClick={() => hapticButtonPress()}
          >
            dineshkrishnayeturi@gmail.com
          </a>{" "}
          •{" "}
          <a
            href="https://github.com/dineshydk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            onClick={() => hapticButtonPress()}
          >
            GitHub
          </a>{" "}
          •{" "}
          <a
            href="https://www.linkedin.com/in/dineshydk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
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
            <div className="p-4 bg-secondary/20 rounded-lg border border-muted/20">
              <h3 className="font-bold text-lg">
                Introduction to Programming with C
              </h3>
              <p className="text-sm text-muted-foreground">
                NPTEL • IIT Kanpur
              </p>
              <p className="text-sm mt-2">Score: 85% • Elite Certificate</p>
              <p className="text-xs text-muted-foreground mt-1">
                Completed: December 2023
              </p>
            </div>

            <div className="p-4 bg-secondary/20 rounded-lg border border-muted/20">
              <h3 className="font-bold text-lg">
                Data Structures and Algorithms
              </h3>
              <p className="text-sm text-muted-foreground">
                Coursera • University of California San Diego
              </p>
              <p className="text-sm mt-2">Specialization Certificate</p>
              <p className="text-xs text-muted-foreground mt-1">
                Completed: January 2024
              </p>
            </div>

            <div className="p-4 bg-secondary/20 rounded-lg border border-muted/20">
              <h3 className="font-bold text-lg">
                Web Development Fundamentals
              </h3>
              <p className="text-sm text-muted-foreground">freeCodeCamp</p>
              <p className="text-sm mt-2">Responsive Web Design Certificate</p>
              <p className="text-xs text-muted-foreground mt-1">
                Completed: March 2024
              </p>
            </div>

            <div className="p-4 bg-secondary/20 rounded-lg border border-muted/20">
              <h3 className="font-bold text-lg">Git and GitHub Essentials</h3>
              <p className="text-sm text-muted-foreground">
                GitHub Learning Lab
              </p>
              <p className="text-sm mt-2">Version Control Mastery</p>
              <p className="text-xs text-muted-foreground mt-1">
                Completed: February 2024
              </p>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="glass-dark rounded-xl p-6 border">
          <h2
            ref={(el) => (headingRefs.current[4] = el)}
            className="resume-heading text-2xl font-semibold mb-4 relative block sm:inline-block"
          >
            <span className="relative inline-block">
              Coding Badges
              <span className="animated-underline absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-1000 ease-out"></span>
            </span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* LeetCode Badges */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFA116">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0z" />
                </svg>
                LeetCode
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">50</span>
                  </div>
                  <div>
                    <p className="font-medium text-green-400">50 Days Badge</p>
                    <p className="text-xs text-muted-foreground">
                      Solved problems for 50 consecutive days
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">100</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-400">
                      100 Problems Solved
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Completed 100+ coding challenges
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">★</span>
                  </div>
                  <div>
                    <p className="font-medium text-purple-400">
                      Contest Participant
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Participated in weekly contests
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CodeChef Badges */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5B4638">
                  <path d="M11.219 3.375v17.25c0 .621.504 1.125 1.125 1.125s1.125-.504 1.125-1.125V3.375c0-.621-.504-1.125-1.125-1.125s-1.125.504-1.125 1.125z" />
                </svg>
                CodeChef
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">1K</span>
                  </div>
                  <div>
                    <p className="font-medium text-orange-400">
                      1000+ Problems
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Solved over 1000 coding problems
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium text-yellow-400">3-Star Rating</p>
                    <p className="text-xs text-muted-foreground">
                      Achieved 3-star rating on CodeChef
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
