import { Database } from "lucide-react";

const technologies = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", logo: "https://cdn.freebiesupply.com/logos/large/2x/nodejs-1-logo-png-transparent.png" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "n8n", logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/n8n-color.png" },
  { name: "Zapier", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zapier_logo.svg/1280px-Zapier_logo.svg.png" },
  { name: "ChatGPT", logo: "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png" },
  { name: "airtable", logo: "https://cdn.iconscout.com/icon/free/png-256/free-airtable-logo-icon-svg-download-png-1254387.png" },
  { name: "make", logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/make-color.png" },
];

export const TechMarquee = () => (
  <div>
    <div className="flex items-center justify-center gap-2 mb-8">
      <Database size={16} className="text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Our Technology Stack</span>
    </div>
    <div className="relative overflow-hidden h-40 md:h-52">
      <div className="flex animate-marquee whitespace-nowrap items-center h-full">
        {[...technologies, ...technologies].map((tech, index) => (
          <div key={`${tech.name}-${index}`} className="mx-8 flex items-center justify-center group">
            <img
              src={tech.logo}
              alt={tech.name}
              className="h-[50px] md:h-[60px] w-auto max-w-none opacity-70 group-hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
