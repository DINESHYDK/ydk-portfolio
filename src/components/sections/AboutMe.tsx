export const AboutMe = () => {
  return (
    <section id="about" className="py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">
          About Me
        </h2>
        <div className="space-y-6 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {/* Intro */}
          <p>
            <strong>Hi, I’m Y. Dinesh Krishna</strong> — a first‑year Computer
            Science Engineering student at IIT (ISM) Dhanbad (Class of 2028).
            I’m driven by curiosity, discipline, and the satisfaction of turning
            ideas into simple, reliable software.
          </p>

          {/* Focus */}
          <div className="space-y-2">
            <h3 className="text-foreground font-semibold">
              What I’m focused on
            </h3>
            <p>
              I’m strengthening fundamentals while exploring the broader
              software stack. My learning path blends
              <strong> Competitive Programming</strong>,
              <strong> Web Development</strong>, and
              <strong> Data Structures & Algorithms</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Languages: <strong>C</strong>, <strong>C++</strong>, and
                <strong> JavaScript</strong>
              </li>
              <li>
                Web: <strong>HTML</strong>, <strong>CSS</strong>, vanilla JS →
                steadily exploring <strong>React</strong>
              </li>
              <li>
                Practice & publishing: <strong>CodeChef</strong> +
                <strong> GitHub</strong>
              </li>
            </ul>
          </div>

          {/* How I learn */}
          <div className="space-y-2">
            <h3 className="text-foreground font-semibold">How I learn</h3>
            <p>
              I learn best by doing. I build small, purposeful mini‑projects to
              turn concepts into intuition and refine style.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Systems thinking for consistency — <strong>Notion</strong> and
                light automation to streamline notes, tasks and project
                pipelines
              </li>
              <li>
                Habit tracking — daily typing practice and focused study blocks
              </li>
              <li>
                Philosophy of <em>“small actions → big changes”</em> — long
                streaks and over <strong>1000 problems on CodeChef</strong>
              </li>
            </ul>
          </div>

          {/* Beyond code */}
          <div className="space-y-2">
            <h3 className="text-foreground font-semibold">Beyond code</h3>
            <p>
              I follow AI and product trends, and I care about UI/UX — quick
              Figma prototypes help me think beyond functionality and design for
              people. What excites me most is the creative loop:
              <em> learn → build → refine → share → repeat</em>.
            </p>
          </div>

          {/* Looking ahead */}
          <div className="space-y-2">
            <h3 className="text-foreground font-semibold">Looking ahead</h3>
            <p>
              I’m open to beginner‑to‑intermediate collaborations across web
              apps, algorithmic challenges and UI/UX prototypes — anything that
              helps me grow while delivering real value. If you need a
              dependable learner who ships, iterates quickly and communicates
              clearly, let’s connect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
