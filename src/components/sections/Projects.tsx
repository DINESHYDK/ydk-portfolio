import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Design System Kit",
    description: "A fully token-driven UI kit with theming, variants, and docs.",
    tags: ["React", "Tailwind", "Shadcn"],
  },
  {
    title: "Realtime Dashboard",
    description: "Streaming analytics with delightful motion and empty states.",
    tags: ["React", "Recharts", "Framer Motion"],
  },
  {
    title: "Portfolio Engine",
    description: "Config-driven portfolio sections with MDX content.",
    tags: ["Vite", "MDX", "Zod"],
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container">
        <header className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          <p className="text-muted-foreground mt-2">Selected work and experiments</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="hover-scale"
            >
              <Card className="glass h-full">
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs rounded-full bg-muted/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
