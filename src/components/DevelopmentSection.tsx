import { useState } from "react";
import { Code2, Smartphone, Cog, Layers, Terminal, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CodePreview } from "./dev/CodePreview";
import { DevServiceCard } from "./dev/DevServiceCard";
import { TechMarquee } from "./dev/TechMarquee";

export const devServices = [
  {
    id: "01",
    icon: Code2,
    title: "Web Development",
    description: "Modern, responsive web applications built with cutting-edge frameworks.",
    tech: ["React", "Next.js", "Vue", "TypeScript"],
    tag: "Web",
    color: "from-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f71",
  },
  {
    id: "02",
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    tech: ["React Native", "Flutter", "Swift", "Kotlin"],
    tag: "Mobile",
    color: "from-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
  },
  {
    id: "03",
    icon: Cog,
    title: "Automation",
    description: "Streamline workflows with intelligent automation solutions.",
    tech: ["Python", "Node.js", "Zapier", "n8n"],
    tag: "Automation",
    color: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    id: "04",
    icon: Layers,
    title: "AI Integration",
    description: "Seamlessly integrate AI capabilities into your existing systems.",
    tech: ["OpenAI", "LangChain", "Custom ML"],
    tag: "AI",
    color: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
];

const DevelopmentSection = () => {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="development" className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Terminal size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">Software Development</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Build. Scale. <span className="text-gradient">Innovate.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to deployment, we craft robust software solutions that power modern businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {devServices.map((service, index) => (
              <DevServiceCard
                key={service.id}
                service={service}
                index={index}
                isActive={activeService === index}
                onActivate={() => setActiveService(index)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CodePreview serviceIndex={activeService} />
            </motion.div>
          </AnimatePresence>
        </div>

        <TechMarquee />
      </div>
    </section>
  );
};

export default DevelopmentSection;
