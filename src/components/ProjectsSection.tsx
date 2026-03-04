import { useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import webimg1 from "../Assets/elitefunders.png";
import webimg2 from "../Assets/ACooler.png";
import webimg3 from "../Assets/gamebol.png";


const categories = ["All", "AI Projects", "Web Development", "Software Solutions"];

const projects = [
  {
    id: 1,
    title: "TikTok-Automation-on-Cloud-Android-Devices",
    description: "Cloud-based Android automation system designed to manage and scale TikTok accounts with automated posting, engagement, and workflow control.",
    category: "AI Projects",
    tags: ["OpenAI", "LangChain", "React"],
    gradient: "from-primary/20 to-accent/20",
    image: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/image_3eb8e0e41d.png",
    liveDemoUrl: "https://drive.google.com/file/d/1gAEbDUCUwDn-RWmik5dOu2yqbEw_DgQk/view?usp=sharing",
    sourceUrl: "https://github.com/your-repo"
  },
  {
    id: 2,
    title: "Elite Funders - Business Funding Website",
    description: "A professional business funding platform connecting entrepreneurs with tailored financial solutions through a modern, high-performance web experience.",
    category: "Web Development",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
    gradient: "from-accent/20 to-purple-500/20",
    image: webimg1,
    liveDemoUrl: "https://elitefunders.com/",
    sourceUrl: "https://github.com/your-repo"
  },
  {
    id: 3,
    title: "Automating Content Repurposing with AI",
    description: "AI-powered system that transforms long-form content into multiple platform-ready formats, streamlining content creation and distribution workflows.",
    category: "AI Projects",
    tags: ["Whisper", "ElevenLabs", "Node.js"],
    gradient: "from-purple-500/20 to-pink-500/20",
    image: "https://n8niostorageaccount.blob.core.windows.net/n8nio-strapi-blobs-prod/assets/workflow_8d6d08e4d1.png",
    liveDemoUrl: "https://drive.google.com/file/d/1I0-CNpjKaWCorEpza8rE5rZCSJh3LV4S/view?usp=sharing",
    sourceUrl: "https://github.com/your-repo"
  },
  {
    id: 4,
    title: "A Cooler Service Company",
    description: "Service-based company website designed to showcase cooling solutions, enable online service bookings, and improve customer engagement.",
    category: "Software Solutions",
    tags: ["GPT-4", "OCR", "FastAPI"],
    gradient: "from-yellow-500/20 to-primary/20",
    image: webimg2,
    liveDemoUrl: "http://142.93.25.65/",
    sourceUrl: "https://github.com/your-repo"
  },
  {
    id: 5,
    title: "AI-Driven-Health-and-Wellness-Platform",
    description: "Smart health and wellness platform leveraging AI to deliver personalized insights, tracking tools, and data-driven recommendations for users.",
    category: "Software Solutions",
    tags: ["Python", "Celery", "Redis"],
    gradient: "from-pink-500/20 to-orange-500/20",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
    liveDemoUrl: "https://drive.google.com/file/d/12ZBTrCYpoyQ3piHeLyxo8x82XWdUjAqT/view?usp=sharing",
    sourceUrl: "https://github.com/your-repo"
  },
  {
    id: 6,
    title: "Next-Level Game Development Website",
    description: "Modern and interactive gaming website built to showcase games, engage users, and deliver a high-performance digital experience.",
    category: "Web Development",
    tags: ["React", "D3.js", "TensorFlow"],
    gradient: "from-orange-500/20 to-yellow-500/20",
    image: webimg3,
    liveDemoUrl: "https://www.gamebole.com/",
    sourceUrl: "https://www.gamebole.com/"
  },
];


const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent`} />
        
        {/* Category Badge - overlaid on image */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs text-muted-foreground">
            {project.category}
          </span>
        </div>
        
        {/* Hover Arrow */}
        <div
          className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <ArrowUpRight size={16} className="text-primary-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5 flex flex-col">
        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <a
  href={project.liveDemoUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
>
  <ExternalLink size={14} />
  Live Demo
</a>

          {/* <a
  href={project.sourceUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
>
  <Github size={14} />
  Source
</a> */}

        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects
  .filter((p) => activeCategory === "All" || p.category === activeCategory)
  .sort((a, b) => {

    const order = ["Web Development", "Software Solutions"];
    const aIndex = order.indexOf(a.category);
    const bIndex = order.indexOf(b.category);

    if (aIndex === -1 && bIndex === -1) return 0; 
    if (aIndex === -1) return 1; 
    if (bIndex === -1) return -1; 
    return aIndex - bIndex;
  });


  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of AI-powered solutions and software development projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All CTA */}
<div className="text-center mt-12">
  <a
    href="https://drive.google.com/drive/folders/1MaQnMl5XZj_KYdgeUWXKmOC-OZfNp1aJ"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-6 py-3 glass glass-hover rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
  >
    View All Projects
    <ArrowUpRight size={16} />
  </a>
</div>

      </div>
    </section>
  );
};

export default ProjectsSection;
