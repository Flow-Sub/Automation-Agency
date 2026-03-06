import { Sparkles, ArrowUpRight, Bot, Zap, Mic, Cpu } from "lucide-react";
import ChatDemo from "./ai/ChatDemo";
import WorkflowDemo from "./ai/WorkflowDemo";
import VoiceDemo from "./ai/VoiceDemo";

const demos = [
  {
    id: "01",
    title: "Intelligent Chatbot Support",
    subtitle: "Customer Experience Engine",
    description:
      "A powerful AI-driven chatbot system engineered to provide seamless customer support, handle thousands of daily inquiries, and deliver highly accurate responses in real-time.",
    component: <ChatDemo />,
    icon: <Bot className="w-7 h-7" />,
    color: "primary",
    glow: "glow-primary",
    image: "https://plus.unsplash.com/premium_photo-1677094310919-d0361465d3be?w=600&auto=format&fit=crop&q=60",
    caseStudyUrl: "https://drive.google.com/drive/folders/1PEsop9NCqMft_LX4rdEaDVdHEU8_I3ja?usp=drive_link",
  },
  {
    id: "02",
    title: "Autonomous Workflow Agent",
    subtitle: "Operations Orchestrator",
    description:
      "A sophisticated AI-powered workflow agent designed to autonomously manage and optimize business tasks. It intelligently coordinates processes and automates repetitive operations.",
    component: <WorkflowDemo />,
    icon: <Zap className="w-7 h-7" />,
    color: "accent",
    glow: "glow-accent",
    image: "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?q=80&w=1032&auto=format&fit=crop",
    caseStudyUrl: "https://drive.google.com/drive/folders/1MaQnMl5XZj_KYdgeUWXKmOC-OZfNp1aJ?usp=drive_link",
  },
  {
    id: "03",
    title: "Voice-Activated Assistant",
    subtitle: "Hands-Free Interaction",
    description:
      "An advanced AI voice assistant that responds to spoken commands, providing real-time feedback and seamless hands-free interactions powered by natural language processing.",
    component: <VoiceDemo />,
    icon: <Mic className="w-7 h-7" />,
    color: "purple-500",
    glow: "shadow-[0_0_40px_10px_rgba(168,85,247,0.3)]", // Custom purple glow
    image:
      "https://media.istockphoto.com/id/2219678630/photo/ai-content-creation-tools-man-uses-laptop-with-ai-assistant-for-graphic-design-translation.webp?a=1&b=1&s=612x612&w=0&k=20&c=3TSTlUgTPqBZSpOqsKuLKuUQxcCay2s99KVNZUsrUVg=",
    caseStudyUrl:
      "https://drive.google.com/drive/folders/1MaQnMl5XZj_KYdgeUWXKmOC-OZfNp1aJ?usp=drive_link",
  },
];

const AgenticAISection = () => {
  return (
    <section id="ai" className="py-32 relative bg-black overflow-hidden text-white selection:bg-primary/30">
      {/* Immersive Background FX */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-32 slide-up">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 pulse-glow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:animate-[slide_2s_infinite]" />
            <Cpu size={16} className="text-primary" />
            <span className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase">
              Next-Gen Autonomy
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
            Intelligent AI <br className="hidden md:block" />
            That Works <span className="text-gradient underline-offset">For You</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg md:text-xl font-medium fade-in delay-200">
            Deploy hyper-advanced AI agents to automate workflows, resolve customer queries, and revolutionize how your business operates.
          </p>
        </div>

        {/* AI Modules (Cards) */}
        <div className="space-y-32">
          {demos.map((demo, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={demo.id}
                className="group relative w-full slide-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                {/* 
                  The Parallax Card Container 
                  On hover: The card pushes BACK slightly (scale-95), while inner elements pop OUT.
                */}
                <div className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-0 bg-[#080808] border border-white/5 rounded-[2.5rem] p-8 lg:p-0 transition-all duration-700 ease-out hover:border-white/20 hover:scale-[0.98] hover:shadow-2xl hover:bg-[#0a0a0a] overflow-hidden`}>

                  {/* Background Image Reveal */}
                  <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                    <div className="absolute inset-0 bg-black/80 group-hover:bg-black/40 transition-colors duration-1000 z-10" />
                    <img
                      src={demo.image}
                      alt=""
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-30 mix-blend-luminosity scale-125 group-hover:scale-100 transition-all duration-1000 ease-out"
                    />
                  </div>

                  {/* Giant Watermark Number */}
                  <div className={`absolute -bottom-10 ${isEven ? '-right-10' : '-left-10'} text-[16rem] font-black text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700 select-none z-0 tracking-tighter pointer-events-none`}>
                    {demo.id}
                  </div>

                  {/* Hover Scanning Laser Line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-[pulseGlow_2s_infinite]" />
                  </div>

                  {/* Text Content Area */}
                  <div className="w-full lg:w-1/2 lg:p-16 relative z-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white group-hover:text-primary group-hover:${demo.glow} transition-all duration-500`}>
                        {demo.icon}
                      </div>
                      <div>
                        <span className="text-primary font-mono text-sm tracking-widest uppercase block mb-1">
                          Module // {demo.id}
                        </span>
                        <span className="text-gray-400 text-sm font-medium">
                          {demo.subtitle}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1] transition-transform duration-700 group-hover:translate-x-2">
                      {demo.title}
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg transition-transform duration-700 group-hover:translate-x-2 delay-75">
                      {demo.description}
                    </p>

                    <div className="flex transition-transform duration-700 group-hover:translate-x-2 delay-150">
                      <a
                        href={demo.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-primary transition-colors duration-300 group/btn"
                      >
                        Explore Case Study
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/10 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform">
                          <ArrowUpRight className="w-5 h-5" />
                        </span>
                      </a>
                    </div>
                  </div>

                  {/* Demo Component Area (3D Pop-out effect) */}
                  <div className="w-full lg:w-1/2 relative z-20 flex justify-center items-center lg:py-16 perspective-1000">
                    <div className={`w-full max-w-md transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-4 ${demo.glow} rounded-2xl`}>
                      <div className="glass animated-border p-2 rounded-2xl bg-black/40 backdrop-blur-2xl">
                        {/* Fake Browser/App UI Header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                          <div className="ml-auto text-[10px] font-mono text-gray-500 uppercase">Live Preview</div>
                        </div>
                        {/* Actual Demo */}
                        {demo.component}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgenticAISection;