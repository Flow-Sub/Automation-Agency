import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface DevServiceCardProps {
  service: {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    tech: string[];
    tag: string;
    color: string;
    image: string;
  };
  index: number;
  isActive: boolean;
  onActivate: () => void;
}

export const DevServiceCard = ({ service, index, isActive, onActivate }: DevServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={onActivate}
      onClick={onActivate}
      className={`group relative glass-panel rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive
          ? "ring-1 ring-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb,99,102,241),0.15)]"
          : "hover:ring-1 hover:ring-border"
      }`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-700 scale-110 group-hover:scale-100">
        <img src={service.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 ${isActive ? "opacity-10" : "group-hover:opacity-10"} transition-opacity duration-300`} />

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} p-[1px] mb-4`}>
          <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
            <service.icon className="text-white" size={22} />
          </div>
        </div>

        <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 rounded-full mb-3">
          {service.tag}
        </span>

        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-sm text-zinc-400 mb-4">{service.description}</p>

        <div className="flex flex-wrap gap-1">
          {service.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
