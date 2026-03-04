import { useState } from "react";

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

interface TechCircleProps {
  title: string;
  subtitle: string;
  items: TechItem[];
  accentColor?: string;
}

const TechCircle = ({ title, subtitle, items, accentColor = "primary" }: TechCircleProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const radius = 100;
  const centerX = 140;
  const centerY = 140;

  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-border opacity-30" />
      <div className="absolute inset-4 rounded-full border border-border opacity-20" />
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <div className={`text-2xl font-bold text-${accentColor} glow-text`}>{title}</div>
          <div className="text-xs text-muted-foreground mt-1 max-w-[100px]">{subtitle}</div>
        </div>
      </div>
      
      {/* Orbiting items */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 280">
        {/* Orbit path */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="4,4"
          opacity="0.3"
        />
        
        {items.map((item, index) => {
          const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const isHovered = hoveredIndex === index;
          
          return (
            <g key={item.name}>
              {/* Connection line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke={isHovered ? `hsl(var(--${accentColor}))` : "hsl(var(--border))"}
                strokeWidth={isHovered ? 2 : 1}
                opacity={isHovered ? 0.5 : 0.2}
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </svg>
      
      {/* Tech icons */}
      {items.map((item, index) => {
        const angle = (index / items.length) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const isHovered = hoveredIndex === index;
        
        return (
          <div
            key={item.name}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ${
              isHovered ? "scale-125 z-20" : "scale-100 z-10"
            }`}
            style={{
              left: `${(x / 280) * 100}%`,
              top: `${(y / 280) * 100}%`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={`w-12 h-12 rounded-xl glass flex items-center justify-center transition-all duration-300 ${
                isHovered ? "shadow-lg border-primary/50" : ""
              }`}
              style={{
                boxShadow: isHovered ? `0 0 20px ${item.color}40` : undefined,
              }}
            >
              <span className="text-2xl">{item.icon}</span>
            </div>
            {isHovered && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-foreground whitespace-nowrap fade-in">
                {item.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TechCircle;
