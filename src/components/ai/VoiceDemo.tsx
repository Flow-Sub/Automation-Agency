import { Mic } from "lucide-react";

const VoiceDemo = () => {
  return (
    <div className="glass rounded-2xl p-6 max-w-xs mx-auto text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center pulse-glow">
        <Mic size={32} className="text-primary-foreground" />
      </div>
      <p className="text-sm text-muted-foreground mb-4">Voice AI Active</p>
      <div className="flex items-end justify-center gap-1 h-12">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 bg-gradient-to-t from-primary to-accent rounded-full waveform-bar"
            style={{
              height: "100%",
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        "Process the quarterly report..."
      </p>
    </div>
  );
};

export default VoiceDemo;
