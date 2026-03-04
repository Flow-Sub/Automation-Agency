import { Sparkles } from "lucide-react";
import ChatDemo from "./ai/ChatDemo";
import WorkflowDemo from "./ai/WorkflowDemo";
import VoiceDemo from "./ai/VoiceDemo";

const demos = [
  {
    title: "Intelligent AI Chatbot System for Customer Support",
    description:
      "A powerful AI-driven chatbot system engineered to provide seamless customer support, handle thousands of daily inquiries, and deliver highly accurate responses. Ideal for businesses looking to improve customer satisfaction.",
    component: <ChatDemo />,
    gradient: "from-primary/20 to-accent/20",
    image: "https://plus.unsplash.com/premium_photo-1677094310919-d0361465d3be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D",
    caseStudyUrl:
      "https://drive.google.com/drive/folders/1PEsop9NCqMft_LX4rdEaDVdHEU8_I3ja?usp=drive_link",
  },
  {
    title: "Autonomous AI Workflow Management Agent",
    description:
      "A sophisticated AI-powered workflow agent designed to autonomously manage and optimize business tasks. It intelligently coordinates processes, automates repetitive operations, and ensures tasks are completed efficiently.",
    component: <WorkflowDemo />,
    gradient: "from-purple-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1666597107756-ef489e9f1f09?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caseStudyUrl:
      "https://drive.google.com/drive/folders/1MaQnMl5XZj_KYdgeUWXKmOC-OZfNp1aJ?usp=drive_link",
  },
  {
    title: "Intelligent Voice-Activated AI Assistant",
    description:
      "An advanced AI voice assistant that responds to spoken commands, providing real-time feedback and seamless hands-free interactions.",
    component: <VoiceDemo />,
    gradient: "from-yellow-500/20 to-orange-500/20",
    image: "https://media.istockphoto.com/id/2219678630/photo/ai-content-creation-tools-man-uses-laptop-with-ai-assistant-for-graphic-design-translation.webp?a=1&b=1&s=612x612&w=0&k=20&c=3TSTlUgTPqBZSpOqsKuLKuUQxcCay2s99KVNZUsrUVg=",
    caseStudyUrl:
      "https://drive.google.com/drive/folders/1MaQnMl5XZj_KYdgeUWXKmOC-OZfNp1aJ?usp=drive_link",
  },
];


const AgenticAISection = () => {
  return (
    <section id="ai" className="py-24 bg-black relative overflow-hidden text-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 bg-gray-800/40">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm text-gray-300">Agentic AI Solutions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Intelligent AI That Works <span className="text-gradient">For You</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Harness the power of advanced AI agents to automate tasks, enhance customer experiences, and drive innovation across your business.
          </p>
        </div>

        {/* AI Demos Row */}
        <div className="space-y-12">
          {demos.map((demo, index) => (
            <div
              key={index}
              className="group relative flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-card overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Hover Image Background */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-30 transition-all duration-700 scale-110 group-hover:scale-100 pointer-events-none rounded-2xl">
                <img src={demo.image} alt="" className="w-full h-full object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-black/40 rounded-2xl" />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none rounded-2xl`}
              />

              {/* Left Side */}
              <div className="md:w-[70%] space-y-4 relative z-10">
                <h3 className="text-2xl font-semibold text-white group-hover:text-primary transition-colors">
                  {demo.title}
                </h3>
                <p className="text-gray-300 w-[70%]">{demo.description}</p>

                <div className="flex gap-3 mt-2 flex-wrap">
                  <a
                    href={demo.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-6 py-2 rounded-full bg-primary text-black font-semibold text-sm hover:bg-primary/90 transition-all duration-300"
                  >
                    View Case Studies
                  </a>
                </div>
              </div>

              {/* Right Side */}
              <div className="md:w-[30%] relative z-10">{demo.component}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgenticAISection;
