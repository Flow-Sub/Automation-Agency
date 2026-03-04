import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Cpu, Plane, CheckCircle, Database, Search, Zap, Activity } from 'lucide-react';

// --- Types & Config ---
const NODE_WIDTH = 240;
const NODE_HEIGHT = 80;

// Coordinates for our "Canvas"
const POSITIONS = {
  trigger: { x: 50, y: 250 },
  processor: { x: 350, y: 100 },
  search: { x: 350, y: 400 },
  database: { x: 650, y: 250 },
  action: { x: 950, y: 250 },
};

// --- Component: The Animated Connection Line ---
const FlowLine = ({ start, end, isActive }: { start: {x:number, y:number}, end: {x:number, y:number}, isActive: boolean }) => {
  // Calculate a smooth Bezier curve
  const pathData = `M ${start.x} ${start.y} C ${(start.x + end.x) / 2} ${start.y}, ${(start.x + end.x) / 2} ${end.y}, ${end.x} ${end.y}`;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {/* Background Static Line */}
      <path
        d={pathData}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="2"
      />
      
      {/* Active "Running Light" Path */}
      {isActive && (
        <>
          <motion.path
            d={pathData}
            fill="none"
           stroke="hsla(var(--primary), 0.45)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Traveling Data Packet */}
          <motion.circle r="3" fill="#22c55e">
            <animateMotion
              dur="1.5s"
              repeatCount="indefinite"
              path={pathData}
            />
          </motion.circle>
          {/* Glow for the packet */}
          <motion.circle r="6" fill="#22c55e" opacity="0.3">
            <animateMotion
              dur="1.5s"
              repeatCount="indefinite"
              path={pathData}
            />
          </motion.circle>
        </>
      )}
    </svg>
  );
};

// --- Component: Canvas Node ---
const AgentNode = ({ icon: Icon, label, status, subtext, active, x, y }: any) => (
  <motion.div 
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ 
    opacity: 1, 
    scale: 1,
    borderColor: active
      ? 'rgba(34,197,94,0.8)' // green-500
      : 'rgba(34,197,94,0.3)',

    backgroundColor: active
      ? 'rgba(34,197,94,0.12)'
      : 'rgba(9,9,11,0.85)',

    boxShadow: active
      ? '0 0 25px rgba(34,197,94,0.45)'
      : '0 0 12px rgba(34,197,94,0.2)',
  }}
  transition={{ duration: 0.5 }}
  className="absolute z-10 p-4 rounded-xl border backdrop-blur-md shadow-2xl"
  style={{ left: x, top: y, width: NODE_WIDTH }}
>


    {/* Connection Ports */}
    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary border border-white/20 rounded-full" />
    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary border border-white/20 rounded-full" />

    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${active ? 'bg-primary text-white' : 'bg-primary text-zinc-500'}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
        <p className="text-sm font-bold text-white truncate">{status}</p>
      </div>
    </div>
    
    <div className="mt-3 flex items-center justify-between">
       <p className="text-[10px] text-zinc-600 font-mono italic">{subtext}</p>
       {active && (
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
         >
            <Activity size={12} className="text-primary" />
         </motion.div>
       )}
    </div>
  </motion.div>
);

export const NetworkStats: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white p-10 overflow-hidden font-sans">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:40px_40px] -z-10" />

      {/* Heading & Description */}
<div className="relative z-10 max-w-4xl mx-auto text-center mt-16">
  <motion.h1
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl md:text-5xl font-extrabold tracking-tight "
  >
    Autonomous <span className='text-primary'>AI Agent Workflow</span> 
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.15, duration: 0.6 }}
    className="mt-4 text-sm md:text-base text-zinc-400 leading-relaxed"
  >
    A real-time visualization of how autonomous AI agents collaborate — from voice input
    and intent understanding to data retrieval, system validation, and final execution.
    Each node represents an intelligent agent working seamlessly in a connected workflow.
  </motion.p>
</div>


      

      <div className="relative h-[600px] w-full max-w-7xl mx-auto">
        
        {/* Connection Lines with Running Lights */}
        {/* Trigger to Processor */}
        <FlowLine 
            start={{ x: POSITIONS.trigger.x + 240, y: POSITIONS.trigger.y + 40 }} 
            end={{ x: POSITIONS.processor.x, y: POSITIONS.processor.y + 40 }} 
            isActive={step === 1} 
        />
        {/* Processor to Search */}
        <FlowLine 
            start={{ x: POSITIONS.processor.x + 240, y: POSITIONS.processor.y + 40 }} 
            end={{ x: POSITIONS.search.x, y: POSITIONS.search.y + 40 }} 
            isActive={step === 2} 
        />
        {/* Search to Database */}
        <FlowLine 
            start={{ x: POSITIONS.search.x + 240, y: POSITIONS.search.y + 40 }} 
            end={{ x: POSITIONS.database.x, y: POSITIONS.database.y + 40 }} 
            isActive={step === 3} 
        />
        {/* Database to Action */}
        <FlowLine 
            start={{ x: POSITIONS.database.x + 240, y: POSITIONS.database.y + 40 }} 
            end={{ x: POSITIONS.action.x, y: POSITIONS.action.y + 40 }} 
            isActive={step === 4} 
        />

        {/* 1. The Phone Trigger */}
        <motion.div 
            style={{ left: POSITIONS.trigger.x, top: POSITIONS.trigger.y - 100 }}
            className="absolute z-20"
        >
            <div className="w-[200px] h-[350px] bg-zinc-950 rounded-[2rem] border-[4px] border-zinc-900 shadow-2xl relative p-4 overflow-hidden">
                <div className="w-12 h-4 bg-zinc-900 mx-auto rounded-b-xl mb-6" />
                <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone size={20} className="text-primary" />
                    </div>
                    <p className="text-[10px] text-zinc-500 font-mono mb-4">VOICE_INPUT</p>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 p-3 rounded-xl border border-white/10 text-left"
                        >
                            <p className="text-[10px] italic text-zinc-400">
                                {step === 0 && "Say something..."}
                                {step >= 1 && "Book the cheapest flight to London for tonight."}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="mt-4 text-center">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Workflow Trigger</span>
            </div>
        </motion.div>

        {/* 2. Middle Agents */}
        <AgentNode 
            icon={Cpu} 
            label="Agent: Neural" 
            status="Intent Extraction" 
            subtext="Model: GPT-4o" 
            x={POSITIONS.processor.x} 
            y={POSITIONS.processor.y} 
            active={step === 1}
        />

        <AgentNode 
            icon={Search} 
            label="Agent: Browser" 
            status="Scanning Providers" 
            subtext="Checking 12 Sources" 
            x={POSITIONS.search.x} 
            y={POSITIONS.search.y} 
            active={step === 2}
        />

        <AgentNode 
            icon={Database} 
            label="Agent: System" 
            status="Securing Booking" 
            subtext="Auth: Validated" 
            x={POSITIONS.database.x} 
            y={POSITIONS.database.y} 
            active={step === 3}
        />

        {/* 3. Final Result */}
        <motion.div 
            style={{ left: POSITIONS.action.x, top: POSITIONS.action.y - 20 }}
            className={`absolute z-20 p-8 rounded-[2.5rem] w-[260px] text-center border-2 transition-all duration-500
                ${step === 4 ? 'bg-primary/10 border-primary shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'bg-zinc-950 border-white/5'}`}
        >
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 
                ${step === 4 ? 'bg-primary text-white shadow-lg' : 'bg-zinc-900 text-zinc-700'}`}>
                <Plane size={28} />
            </div>
            <h4 className="font-bold text-white uppercase tracking-tighter">Success</h4>
            <p className="text-[11px] text-zinc-500 mt-2">Ticket LHR-992 secured. Transaction finalized.</p>
            <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                    <span>EXECUTION</span>
                    <span className="text-green-500">1.2s</span>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
};