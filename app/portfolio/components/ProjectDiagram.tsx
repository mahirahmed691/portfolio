import type { Project } from "../types";

// Kubernetes cluster diagram
function KubernetesDiagram() {
  const pods = [
    { x: 60, y: 55, label: "api" },
    { x: 160, y: 55, label: "auth" },
    { x: 260, y: 55, label: "data" },
    { x: 60, y: 135, label: "cache" },
    { x: 160, y: 135, label: "queue" },
    { x: 260, y: 135, label: "logs" },
  ];
  const connections = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5],
  ];

  return (
    <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Node border */}
      <rect x="8" y="8" width="324" height="184" rx="12" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 3" />
      <text x="20" y="24" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="monospace" letterSpacing="0.1em">GKE CLUSTER · PRODUCTION</text>

      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <line
          key={i}
          x1={pods[a].x} y1={pods[a].y}
          x2={pods[b].x} y2={pods[b].y}
          stroke="rgba(99,179,237,0.3)" strokeWidth="1"
        />
      ))}

      {/* Pods */}
      {pods.map((pod) => (
        <g key={pod.label}>
          <rect x={pod.x - 28} y={pod.y - 18} width="56" height="36" rx="8"
            fill="rgba(99,179,237,0.12)" stroke="rgba(99,179,237,0.4)" strokeWidth="1" />
          {/* K8s wheel icon simplified */}
          <circle cx={pod.x} cy={pod.y - 4} r="5" fill="none" stroke="rgba(99,179,237,0.7)" strokeWidth="1" />
          <circle cx={pod.x} cy={pod.y - 4} r="1.5" fill="rgba(99,179,237,0.7)" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line key={angle}
                x1={pod.x + Math.cos(rad) * 1.5} y1={pod.y - 4 + Math.sin(rad) * 1.5}
                x2={pod.x + Math.cos(rad) * 4.5} y2={pod.y - 4 + Math.sin(rad) * 4.5}
                stroke="rgba(99,179,237,0.7)" strokeWidth="0.8"
              />
            );
          })}
          <text x={pod.x} y={pod.y + 13} textAnchor="middle" fontSize="7"
            fill="rgba(255,255,255,0.6)" fontFamily="monospace">{pod.label}</text>
        </g>
      ))}

      {/* Status bar */}
      <rect x="8" y="170" width="324" height="22" rx="0" fill="rgba(0,0,0,0.2)" />
      <rect x="8" y="170" width="324" height="22" rx="0" fill="none" />
      <circle cx="24" cy="181" r="4" fill="#4ade80" />
      <text x="34" y="185" fontSize="7" fill="rgba(255,255,255,0.45)" fontFamily="monospace">6 pods running · 0 restarts · healthy</text>
    </svg>
  );
}

// Real-time pipeline flow diagram
function PipelineDiagram() {
  const stages = [
    { x: 30, label: "Source", sub: "Events" },
    { x: 108, label: "Pub/Sub", sub: "Queue" },
    { x: 186, label: "Dataflow", sub: "Process" },
    { x: 264, label: "Cloud SQL", sub: "Store" },
  ];

  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      {/* Background grid */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {[64, 128, 192, 256].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      <text x="12" y="20" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="monospace" letterSpacing="0.1em">REAL-TIME PIPELINE · GCP</text>

      {/* Animated throughput bars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={12 + i * 12} y={155 - (i % 3) * 12} width="8" height={20 + (i % 3) * 12}
          rx="2" fill="rgba(167,139,250,0.3)" />
      ))}
      <text x="12" y="190" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="monospace">throughput</text>

      {/* Stage boxes */}
      {stages.map((stage, i) => (
        <g key={stage.label}>
          {/* Arrow */}
          {i < stages.length - 1 && (
            <g>
              <line x1={stage.x + 32} y1={95} x2={stages[i + 1].x - 2} y2={95}
                stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" />
              <polygon points={`${stages[i + 1].x - 2},91 ${stages[i + 1].x + 4},95 ${stages[i + 1].x - 2},99`}
                fill="rgba(167,139,250,0.5)" />
            </g>
          )}
          <rect x={stage.x - 2} y={72} width="64" height="46" rx="8"
            fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.35)" strokeWidth="1" />
          <text x={stage.x + 30} y={91} textAnchor="middle" fontSize="8"
            fill="rgba(255,255,255,0.8)" fontFamily="monospace" fontWeight="600">{stage.label}</text>
          <text x={stage.x + 30} y={105} textAnchor="middle" fontSize="7"
            fill="rgba(255,255,255,0.35)" fontFamily="monospace">{stage.sub}</text>

          {/* Activity dot */}
          <circle cx={stage.x + 50} cy={76} r="3" fill="#4ade80" opacity="0.8" />
        </g>
      ))}

      {/* Metrics */}
      <text x="200" y="190" fontSize="7" fill="rgba(255,255,255,0.3)" fontFamily="monospace">~2.4M msgs/hr</text>
    </svg>
  );
}

// Terraform IaC diagram
function TerraformDiagram() {
  const resources = [
    { x: 20, y: 45, label: "VPC", provider: "gcp", color: "#4285F4" },
    { x: 100, y: 45, label: "GKE", provider: "gcp", color: "#4285F4" },
    { x: 180, y: 45, label: "Cloud SQL", provider: "gcp", color: "#4285F4" },
    { x: 260, y: 45, label: "Pub/Sub", provider: "gcp", color: "#4285F4" },
    { x: 20, y: 120, label: "VPC", provider: "aws", color: "#FF9900" },
    { x: 100, y: 120, label: "EKS", provider: "aws", color: "#FF9900" },
    { x: 180, y: 120, label: "RDS", provider: "aws", color: "#FF9900" },
    { x: 260, y: 120, label: "SQS", provider: "aws", color: "#FF9900" },
  ];

  return (
    <svg viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <text x="12" y="20" fontSize="8" fill="rgba(255,255,255,0.35)" fontFamily="monospace" letterSpacing="0.1em">TERRAFORM · MULTI-CLOUD IaC</text>

      {/* Provider labels */}
      <rect x="8" y="30" width="316" height="60" rx="8" fill="rgba(66,133,244,0.06)" stroke="rgba(66,133,244,0.2)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="296" y="44" fontSize="7" fill="rgba(66,133,244,0.7)" fontFamily="monospace" textAnchor="end">GCP</text>

      <rect x="8" y="105" width="316" height="60" rx="8" fill="rgba(255,153,0,0.06)" stroke="rgba(255,153,0,0.2)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="296" y="119" fontSize="7" fill="rgba(255,153,0,0.7)" fontFamily="monospace" textAnchor="end">AWS</text>

      {/* Resources */}
      {resources.map((res) => (
        <g key={`${res.provider}-${res.label}`}>
          <rect x={res.x} y={res.y} width="68" height="36" rx="6"
            fill={`${res.color}18`} stroke={`${res.color}55`} strokeWidth="1" />
          {/* Terraform diamond */}
          <polygon points={`${res.x + 10},${res.y + 8} ${res.x + 14},${res.y + 12} ${res.x + 10},${res.y + 16} ${res.x + 6},${res.y + 12}`}
            fill={res.color} opacity="0.7" />
          <text x={res.x + 34} y={res.y + 14} textAnchor="middle" fontSize="7"
            fill="rgba(255,255,255,0.7)" fontFamily="monospace">{res.label}</text>
          <text x={res.x + 34} y={res.y + 26} textAnchor="middle" fontSize="6"
            fill="rgba(255,255,255,0.3)" fontFamily="monospace">managed</text>
        </g>
      ))}

      {/* Status */}
      <rect x="8" y="175" width="316" height="18" rx="4" fill="rgba(0,0,0,0.2)" />
      <text x="16" y="187" fontSize="7" fill="rgba(74,222,128,0.8)" fontFamily="monospace">✓ 8 resources · Plan: 0 to add, 0 to change, 0 to destroy</text>
    </svg>
  );
}

export function ProjectDiagram({ diagram, accent }: { diagram: Project["diagram"]; accent: string }) {
  return (
    <div className={`rounded-[1.4rem] bg-gradient-to-br ${accent} p-px`}>
      <div className="h-full rounded-[1.35rem] bg-[#070d1a]/90 p-4">
        {diagram === "kubernetes" && <KubernetesDiagram />}
        {diagram === "pipeline" && <PipelineDiagram />}
        {diagram === "terraform" && <TerraformDiagram />}
      </div>
    </div>
  );
}
