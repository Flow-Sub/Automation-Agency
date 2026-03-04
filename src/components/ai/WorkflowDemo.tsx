import { useState, useEffect, useCallback } from "react";
import { Database, Brain, Zap, Mail, FileText, CheckCircle } from "lucide-react";

const nodes = [
  { id: 1, icon: Zap, label: "Workflow Trigger", x: 10, y: 50 },
  { id: 2, icon: Brain, label: "AI Processing", x: 35, y: 20 },
  { id: 3, icon: Database, label: "Data Fetch", x: 35, y: 80 },
  { id: 4, icon: FileText, label: "Generate Report", x: 60, y: 50 },
  { id: 5, icon: Mail, label: "Send Email", x: 85, y: 20 },
  { id: 6, icon: CheckCircle, label: "Complete", x: 85, y: 80 },
];

const connections = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 4, to: 6 },
];

// Define two paths through the workflow
const paths = [
  [1, 2, 4, 5],
  [1, 3, 4, 6],
];

const WorkflowDemo = () => {
  const [currentPath, setCurrentPath] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());

  const activePath = paths[currentPath];
  const activeNodeId = activePath[stepIndex] ?? 0;

  const getActiveConnections = useCallback(() => {
    const activeConns = new Set<number>();
    for (let i = 0; i < stepIndex; i++) {
      const fromId = activePath[i];
      const toId = activePath[i + 1];
      const idx = connections.findIndex(c => c.from === fromId && c.to === toId);
      if (idx !== -1) activeConns.add(idx);
    }
    return activeConns;
  }, [stepIndex, activePath]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(prev => {
        const next = prev + 1;
        if (next >= activePath.length) {
          // Switch path and reset
          setCurrentPath(p => (p + 1) % paths.length);
          setVisitedNodes(new Set());
          return 0;
        }
        setVisitedNodes(v => new Set([...v, activePath[prev]]));
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [activePath]);

  const activeConns = getActiveConnections();

  const getNodePosition = (id: number) => {
    const node = nodes.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="glass rounded-2xl p-6 w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-primary" size={18} />
        <span className="text-sm font-medium">Autonomous Workflow</span>
      </div>

      <div className="relative h-40 w-full">
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
          <defs>
            <filter id="glowLine" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {connections.map((conn, idx) => {
            const from = getNodePosition(conn.from);
            const to = getNodePosition(conn.to);
            const isActive = activeConns.has(idx);
            // Check if this connection is on the current path at all
            const isOnPath = activePath.some((nodeId, i) => {
              const nextNode = activePath[i + 1];
              return conn.from === nodeId && conn.to === nextNode;
            });

            return (
              <line
                key={idx}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={
                  isActive
                    ? "hsl(84, 81%, 44%)"
                    : isOnPath
                    ? "hsla(84, 81%, 44%, 0.2)"
                    : "hsl(var(--muted))"
                }
                strokeWidth={isActive ? 2.5 : 1}
                strokeDasharray={isActive ? "none" : "4,4"}
                filter={isActive ? "url(#glowLine)" : undefined}
                style={{ transition: "all 0.3s ease-in-out" }}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = node.id === activeNodeId;
          const isVisited = visitedNodes.has(node.id);

          return (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transition: "all 0.3s ease-in-out",
                transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  transition: "all 0.3s ease-in-out",
                  background: isActive
                    ? "hsl(84, 81%, 44%)"
                    : isVisited
                    ? "hsla(84, 81%, 44%, 0.25)"
                    : "hsl(var(--muted))",
                  color: isActive
                    ? "hsl(var(--primary-foreground))"
                    : isVisited
                    ? "hsl(84, 81%, 44%)"
                    : "hsl(var(--muted-foreground))",
                  boxShadow: isActive
                    ? "0 0 20px 6px hsla(84, 81%, 44%, 0.5), 0 0 40px 12px hsla(84, 81%, 44%, 0.2)"
                    : isVisited
                    ? "0 0 10px 2px hsla(84, 81%, 44%, 0.15)"
                    : "none",
                  border: isActive
                    ? "1.5px solid hsl(84, 81%, 44%)"
                    : isVisited
                    ? "1.5px solid hsla(84, 81%, 44%, 0.4)"
                    : "1.5px solid transparent",
                }}
              >
                <Icon size={18} />
              </div>
              <span
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap"
                style={{
                  transition: "color 0.3s ease-in-out",
                  color: isActive
                    ? "hsl(84, 81%, 44%)"
                    : isVisited
                    ? "hsla(84, 81%, 60%, 0.7)"
                    : "hsl(var(--muted-foreground))",
                }}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Automated task execution in progress...
        </p>
      </div>
    </div>
  );
};

export default WorkflowDemo;
