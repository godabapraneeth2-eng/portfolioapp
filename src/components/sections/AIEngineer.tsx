import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  MessageSquare,
  Zap,
  Database,
  Bot,
  Rocket,
} from "lucide-react";

/* ─── brain‑node positions (roughly form a brain silhouette) ─── */
const nodes = [
  // left hemisphere
  { x: 120, y: 100, r: 5 },
  { x: 90, y: 150, r: 4 },
  { x: 110, y: 190, r: 5 },
  { x: 140, y: 230, r: 4 },
  { x: 100, y: 260, r: 5 },
  { x: 130, y: 140, r: 4 },
  { x: 150, y: 170, r: 5 },
  // right hemisphere
  { x: 280, y: 100, r: 5 },
  { x: 310, y: 150, r: 4 },
  { x: 290, y: 190, r: 5 },
  { x: 260, y: 230, r: 4 },
  { x: 300, y: 260, r: 5 },
  { x: 270, y: 140, r: 4 },
  { x: 250, y: 170, r: 5 },
  // top
  { x: 170, y: 80, r: 4 },
  { x: 230, y: 80, r: 4 },
  { x: 200, y: 60, r: 5 },
  // stem
  { x: 200, y: 290, r: 4 },
  { x: 185, y: 310, r: 4 },
  { x: 215, y: 310, r: 4 },
  // center (hero node)
  { x: 200, y: 180, r: 10 },
];

/* build connections between nearby nodes */
const connections: [number, number][] = [];
nodes.forEach((a, i) => {
  nodes.forEach((b, j) => {
    if (j <= i) return;
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    if (dist < 110) connections.push([i, j]);
  });
});

const capabilities = [
  {
    icon: Brain,
    title: "Machine Learning",
    desc: "Building intelligent models that learn and adapt",
  },
  {
    icon: Sparkles,
    title: "AI Applications",
    desc: "Creating real-world AI-powered solutions",
  },
  {
    icon: MessageSquare,
    title: "Prompt Engineering",
    desc: "Crafting precise prompts for optimal AI outputs",
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    desc: "Automating complex workflows with AI",
  },
  {
    icon: Database,
    title: "Data Processing",
    desc: "Processing and analyzing large datasets",
  },
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Developing autonomous AI agent systems",
  },
  {
    icon: Rocket,
    title: "Future AI Products",
    desc: "Envisioning next-generation AI products",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AIEngineer() {
  return (
    <section
      id="ai"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-dark-900"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-[160px]"
        style={{ background: "var(--ai-glow-gradient)" }}
      />

      {/* ── header ── */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
          AI Engineer
        </h2>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "#94A3B8" }}>
          Building the Future with Artificial Intelligence
        </p>
      </motion.div>

      {/* ── brain SVG ── */}
      <motion.div
        className="flex justify-center mb-20 relative z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <svg
          viewBox="0 0 400 380"
          className="w-[320px] sm:w-[400px] h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* connections */}
          {connections.map(([i, j], idx) => {
            const a = nodes[i];
            const b = nodes[j];
            const isGreen = idx % 5 === 0;
            const color = isGreen ? "#00FF88" : idx % 3 === 0 ? "#7B61FF" : "#00D4FF";
            return (
              <motion.line
                key={`c-${idx}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={color}
                strokeWidth={1}
                strokeOpacity={0.35}
                strokeDasharray="6 4"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{
                  duration: 2 + (idx % 3),
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}

          {/* outer glow ring for center */}
          <circle cx={200} cy={180} r={30} fill="url(#centerGlow)" />

          {/* nodes */}
          {nodes.map((n, i) => {
            const isCenter = i === nodes.length - 1;
            return (
              <motion.circle
                key={`n-${i}`}
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={isCenter ? "#00D4FF" : i % 2 === 0 ? "#00D4FF" : "#7B61FF"}
                filter="url(#glow)"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{
                  scale: [1, isCenter ? 1.3 : 1.15, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* floating data particles along a sample path */}
          {[0, 1, 2].map((p) => (
            <motion.circle
              key={`p-${p}`}
              r={3}
              fill="#00FF88"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{
                cx: [90, 150, 200, 270, 310],
                cy: [150, 140, 180, 190, 150],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: p * 1.3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* ── capability cards ── */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <motion.div
              key={cap.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative rounded-2xl p-[1px] cursor-pointer"
            >
              {/* animated gradient border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "var(--card-border-conic)",
                  backgroundSize: "300% 300%",
                  animation: "gradientShift 4s linear infinite",
                }}
              />

              {/* card inner */}
              <div
                className="relative rounded-2xl p-6 h-full bg-glass/4 border border-glass-border backdrop-blur-[16px] transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                  style={{ background: "rgba(0,212,255,0.1)" }}
                >
                  <Icon size={24} color="#00D4FF" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm" style={{ color: "#94A3B8" }}>
                  {cap.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* keyframe for gradient border rotation */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
