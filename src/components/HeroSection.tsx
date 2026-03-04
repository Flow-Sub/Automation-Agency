import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  currentOpacity: number;
  life: number;
  maxLife: number;
}

// ── Canvas Particle System ───────────────────────────────────────────────────
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const COUNT = 55;
    const COLOR = "130,187,64";
    const MAX_DIST = 120;

    const createParticle = (initial = false): Particle => ({
      x: Math.random() * W,
      y: initial ? Math.random() * H : H + 10,
      size: Math.random() * 1.5 + 0.3,
      speedY: -(Math.random() * 0.35 + 0.1),
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.65 + 0.2,
      currentOpacity: 0,
      life: 0,
      maxLife: Math.random() * 400 + 200,
    });

    const resetParticle = (p: Particle): Particle => createParticle(false);

    const updateParticle = (p: Particle): Particle => {
      const life = p.life + 1;
      const t = life / p.maxLife;
      const currentOpacity =
        t < 0.1
          ? (t / 0.1) * p.opacity
          : t > 0.8
            ? ((1 - t) / 0.2) * p.opacity
            : p.opacity;

      const updated: Particle = {
        ...p,
        x: p.x + p.speedX,
        y: p.y + p.speedY,
        life,
        currentOpacity,
      };

      if (updated.life >= updated.maxLife || updated.y < -10) {
        return resetParticle(updated);
      }
      return updated;
    };

    const drawParticle = (p: Particle) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR},${p.currentOpacity})`;
      ctx.fill();
    };

    const drawConnections = (particles: Particle[]) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    let particles: Particle[] = Array.from({ length: COUNT }, () =>
      createParticle(true)
    );

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles = particles.map(updateParticle);
      drawConnections(particles);
      particles.forEach(drawParticle);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// ── Main Component ───────────────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1.1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], ["40px", "0px"]);
  const gifOpacity = useTransform(scrollYProgress, [0, 0.1], [0.6, 1]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={containerRef} className="relative">

      {/* ── BACKGROUND CANVAS ── */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* Mesh gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 10% 20%, rgba(130,187,64,0.13) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 90% 10%, rgba(130,187,64,0.08) 0%, transparent 55%),
              radial-gradient(ellipse 70% 50% at 50% 100%, rgba(130,187,64,0.10) 0%, transparent 60%),
              radial-gradient(ellipse 100% 100% at 50% 50%, #080808 0%, #0D0D0D 100%)
            `,
          }}
        />

        {/* Particle system */}
        <ParticleCanvas />

        {/* Soft ambient orb — top left */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            top: "-180px",
            left: "-180px",
            background:
              "radial-gradient(circle, rgba(130,187,64,0.14) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft ambient orb — bottom right */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "500px",
            height: "500px",
            bottom: "-120px",
            right: "-120px",
            background:
              "radial-gradient(circle, rgba(130,187,64,0.10) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ scale: [1, 1.09, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Noise grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* ── HERO TEXT SECTION ── */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-between pt-40 px-6 overflow-hidden">
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="text-center max-w-7xl mx-auto z-10 mt-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.6em] mb-4"
            style={{ color: "#82BB40" }}
          >
            Efficiency • Autonomy • Scale
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[8.5vw] leading-[0.8] font-black tracking-tighter uppercase mb-6"
            style={{ color: "#FFFFFF" }}
          >
            The Future of <br />
            <span style={{ color: "transparent", WebkitTextStroke: "2px #82BB40" }}>
              Workflows
            </span>
          </motion.h1>

          <motion.p
            className="text-sm md:text-lg max-w-xl mx-auto mb-8 font-medium italic"
            style={{ color: "rgba(255,255,255,0.50)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            "Why manage humans when you can deploy intelligence?"
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              className="text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all"
              style={{
                background: "#82BB40",
                boxShadow: "0 8px 32px rgba(130,187,64,0.35)",
              }}
            >
              Start Automating
            </button>
            <button
              className="px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
              style={{
                border: "1.5px solid rgba(130,187,64,0.35)",
                background: "rgba(130,187,64,0.06)",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#82BB40";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(130,187,64,0.06)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              View Use Cases
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── GIF SECTION ── */}
      <section className="relative h-[120vh] -mt-32 z-0">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div
            className="w-[92%] h-[85vh]"
            style={{
              boxShadow:
                "0 50px 100px -20px rgba(130,187,64,0.20), 0 30px 60px -10px rgba(0,0,0,0.5)",
            }}
          >
            <motion.div
              style={{ scale, borderRadius, opacity: gifOpacity }}
              className="w-full h-full relative overflow-hidden"
            >
              <img
                src="https://static.wixstatic.com/media/46e2e0_8555b19a5bc545eba5a0322c00acd640~mv2.gif"
                alt="Automation Visual"
                className="w-full h-full object-cover grayscale-[10%] brightness-[0.9]"
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,20,5,0.90) 0%, rgba(130,187,64,0.04) 40%, rgba(0,0,0,0.12) 100%)",
                }}
              />

              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #82BB40, transparent)",
                  boxShadow: "0 0 40px 8px rgba(130,187,64,0.4)",
                }}
              />

              <div className="absolute bottom-12 left-12 text-white">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2"
                  style={{ color: "#82BB40" }}
                >
                  Core Mission
                </p>
                <h2
                  className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none"
                  style={{ color: "#ffffff" }}
                >
                  Scale without <br /> the headcount.
                </h2>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-[10vh]" />
    </div>
  );
};

export default HeroSection;