import { useState, useEffect } from "react";
import { Bot, User } from "lucide-react";

const conversationFlow = [
  { role: "user" as const, text: "Can you help automate my workflow?", delay: 0 },
  { role: "assistant" as const, text: "Absolutely! I can integrate with your existing systems and automate repetitive tasks.", delay: 1500 },
  { role: "user" as const, text: "What about data analysis?", delay: 3500 },
  { role: "assistant" as const, text: "I can analyze your data in real-time, generate insights, and create automated reports.", delay: 5000 },
  { role: "user" as const, text: "That sounds perfect!", delay: 7000 },
  { role: "assistant" as const, text: "Let's get started! I'll set up the automation pipeline for you.", delay: 8500 },
];

const ChatDemo = () => {
  const [visibleMessages, setVisibleMessages] = useState<typeof conversationFlow>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= conversationFlow.length) {
      // Reset after full conversation
      const resetTimer = setTimeout(() => {
        setVisibleMessages([]);
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const message = conversationFlow[currentIndex];
    
    // Show typing indicator before assistant messages
    if (message.role === "assistant") {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, message]);
        setCurrentIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(typingTimer);
    } else {
      // User messages appear immediately
      const timer = setTimeout(() => {
        setVisibleMessages(prev => [...prev, message]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? 500 : 1500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="glass rounded-2xl p-4 w-full max-w-sm mx-auto h-80 flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Bot size={16} className="text-primary" />
        </div>
        <span className="text-sm font-medium">AI Assistant</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin">
        {visibleMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 fade-in ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === "user" ? "bg-accent/20" : "bg-primary/20"
            }`}>
              {msg.role === "user" ? (
                <User size={12} className="text-accent" />
              ) : (
                <Bot size={12} className="text-primary" />
              )}
            </div>
            <div
              className={`text-xs p-2.5 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-accent/10 text-foreground"
                  : "bg-primary/10 text-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-2 fade-in">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot size={12} className="text-primary" />
            </div>
            <div className="bg-primary/10 p-2.5 rounded-xl">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDemo;
