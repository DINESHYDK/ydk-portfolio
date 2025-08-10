import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Resume = () => {
  useEffect(() => {
    document.title = "Resume — Dinesh Krishna";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Resume of Dinesh Krishna: experience, skills, and education.");
  }, []);

  return (
    <div className="container py-20">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">Resume</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">A concise look at my experience, skills, and education.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 animate-fade-in">
        <article className="glass-dark rounded-xl p-6 border">
          <h2 className="text-xl font-semibold">Experience</h2>
          <p className="text-muted-foreground mt-2">Add your roles and highlights here.</p>
        </article>
        <article className="glass-dark rounded-xl p-6 border">
          <h2 className="text-xl font-semibold">Skills</h2>
          <p className="text-muted-foreground mt-2">Key technologies and tools.</p>
        </article>
      </section>

      <div className="mt-8 flex gap-3">
        <Button asChild>
          <a href="/resume.pdf" aria-label="Download Resume">Download PDF</a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contact">Contact me</Link>
        </Button>
      </div>
    </div>
  );
};

export default Resume;
