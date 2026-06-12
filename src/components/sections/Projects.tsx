// @ts-nocheck
import React, { useState, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  FileText,
  MapPin,
  Shield,
  BookOpen,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

/* ─────────────────────── 3-D tilt hook ─────────────────────── */
function useTilt() {
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: ReactMouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ rotateX: -y * 10, rotateY: x * 10 });
  };

  const handleLeave = () => setStyle({ rotateX: 0, rotateY: 0 });

  return { ref, style, handleMove, handleLeave };
}

/* ───────────────────── mini world-map SVG ───────────────────── */
function WorldMapViz() {
  const mapRef = useRef(null);
  const inView = useInView(mapRef, { once: true, amount: 0.3 });

  /* simplified continent outlines */
  const continentPath =
    "M80,90 Q100,70 130,80 L150,75 Q170,65 190,72 L200,78 Q210,70 230,75 L245,80 Q260,85 270,90 L260,100 Q250,115 240,110 L220,105 Q200,100 180,105 L160,110 Q140,108 120,100 Z " +
    "M270,85 Q290,75 320,80 L340,90 Q350,100 345,115 L330,120 Q310,125 295,115 L280,100 Z " +
    "M120,130 Q135,120 155,125 L165,140 Q160,160 145,170 L125,165 Q110,155 115,140 Z " +
    "M280,130 Q300,120 330,125 L345,135 Q355,150 350,170 L335,180 Q310,185 290,175 L275,160 Q270,145 280,130 Z " +
    "M60,140 Q80,130 100,138 L105,150 Q100,165 85,170 L65,165 Q55,155 60,140 Z";

  /* tracking dots */
  const dots = [
    { cx: 120, cy: 95, delay: 0 },
    { cx: 310, cy: 85, delay: 0.5 },
    { cx: 140, cy: 150, delay: 1.0 },
    { cx: 320, cy: 150, delay: 1.5 },
  ];

  const trackingPath = "M120,95 Q200,60 310,85 Q340,120 320,150 Q260,170 140,150";

  return (
    <div ref={mapRef} className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 250" className="w-full h-auto max-h-[300px]">
        {/* continents */}
        <path
          d={continentPath}
          fill="none"
          stroke="#00D4FF"
          strokeWidth={1}
          strokeOpacity={0.25}
        />

        {/* tracking path */}
        <motion.path
          d={trackingPath}
          fill="none"
          stroke="#00D4FF"
          strokeWidth={1.5}
          strokeDasharray="8 4"
          strokeOpacity={0.5}
          initial={{ strokeDashoffset: 200 }}
          animate={inView ? { strokeDashoffset: [200, -200] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* dots */}
        {dots.map((d, i) => (
          <g key={i}>
            {/* pulse ring */}
            <motion.circle
              cx={d.cx}
              cy={d.cy}
              r={6}
              fill="none"
              stroke="#00D4FF"
              strokeWidth={1}
              initial={{ opacity: 0.6, scale: 1 }}
              animate={inView ? { opacity: [0.6, 0], scale: [1, 2.5] } : {}}
              transition={{
                duration: 2,
                delay: d.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            {/* solid dot */}
            <motion.circle
              cx={d.cx}
              cy={d.cy}
              r={4}
              fill="#00D4FF"
              initial={{ scale: 0 }}
              animate={inView ? { scale: [0.8, 1.2, 0.8] } : {}}
              transition={{
                duration: 2,
                delay: d.delay,
                repeat: Infinity,
              }}
            />
          </g>
        ))}

        {/* moving tracker dot along path */}
        <motion.circle
          r={5}
          fill="#00FF88"
          initial={{ opacity: 0 }}
          animate={
            inView
              ? {
                  cx: [120, 200, 310, 340, 320, 260, 140],
                  cy: [95, 65, 85, 120, 150, 165, 150],
                  opacity: [0, 1, 1, 1, 1, 1, 0],
                }
              : {}
          }
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

/* ──────────────── mini analytics dashboard SVG ──────────────── */
function AnalyticsViz() {
  const chartRef = useRef(null);
  const inView = useInView(chartRef, { once: true, amount: 0.3 });

  const bars = [
    { x: 40, h: 80, color: "#00D4FF" },
    { x: 80, h: 110, color: "#7B61FF" },
    { x: 120, h: 65, color: "#00FF88" },
    { x: 160, h: 130, color: "#00D4FF" },
    { x: 200, h: 95, color: "#7B61FF" },
  ];

  const linePoints = "40,200 80,185 120,195 160,170 200,178 240,155 280,160";

  return (
    <div ref={chartRef} className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 320 280" className="w-full h-auto max-h-[300px]">
        {/* bar chart */}
        {bars.map((b, i) => (
          <motion.rect
            key={i}
            x={b.x}
            width={28}
            rx={4}
            fill={b.color}
            fillOpacity={0.7}
            initial={{ y: 160, height: 0 }}
            animate={inView ? { y: 160 - b.h, height: b.h } : {}}
            transition={{ duration: 0.8, delay: 0.15 * i, ease: "easeOut" }}
          />
        ))}

        {/* axis */}
        <line x1={30} y1={160} x2={250} y2={160} stroke="#94A3B8" strokeWidth={0.5} strokeOpacity={0.3} />

        {/* line chart */}
        <motion.polyline
          points={linePoints}
          fill="none"
          stroke="#00FF88"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={400}
          initial={{ strokeDashoffset: 400 }}
          animate={inView ? { strokeDashoffset: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
        />
        {/* line chart dots */}
        {[
          [40, 200],
          [80, 185],
          [120, 195],
          [160, 170],
          [200, 178],
          [240, 155],
          [280, 160],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={3}
            fill="#00FF88"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.8 + i * 0.12 }}
          />
        ))}

        {/* axis for line chart */}
        <line x1={30} y1={210} x2={290} y2={210} stroke="#94A3B8" strokeWidth={0.5} strokeOpacity={0.3} />
      </svg>
    </div>
  );
}

/* ─────────────────── shared sub-components ─────────────────── */
function FeatureTag({ text }: { text: string }) {
  return (
    <span
      className="text-xs px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue"
    >
      {text}
    </span>
  );
}

function TechBadge({ text }: { text: string }) {
  return (
    <span
      className="text-[11px] px-2.5 py-1 rounded-md font-mono bg-glass border border-glass-border text-slate-400"
    >
      {text}
    </span>
  );
}

function ActionButton({
  text,
  variant,
  icon: Icon,
}: {
  text: string;
  variant: "primary" | "outline" | "ghost";
  icon: typeof ExternalLink;
}) {
  const base = "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer no-underline";
  const styles = {
    primary:
      "text-white bg-gradient-to-r from-cyber-blue to-neon-purple shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-[1.02]",
    outline: "text-white border border-glass-border bg-glass hover:bg-white/10 hover:border-cyber-blue/30",
    ghost: "text-slate-400 hover:bg-glass hover:text-white",
  };

  return (
    <a href="#" className={`${base} ${styles[variant]}`}>
      <Icon size={16} />
      {text}
    </a>
  );
}

/* ──────────────────────── project data ──────────────────────── */
interface ProjectData {
  num: string;
  title: string;
  subtitle: string;
  subtitleColor: string;
  description: string;
  features: string[];
  tech: string[];
  icon: typeof MapPin;
  Viz: () => React.ReactNode;
}

const projects: ProjectData[] = [
  {
    num: "01",
    title: "Geo-Shield",
    subtitle: "AI-Powered Hardware Tracking & Security Platform",
    subtitleColor: "#00D4FF",
    description:
      "A comprehensive real-time GPS tracking platform featuring geofencing alerts, secure authentication, and historical route analysis. Built to protect and monitor hardware assets with military-grade precision.",
    features: [
      "Real-time GPS Tracking",
      "Geofencing Alerts",
      "Secure Auth",
      "Route Analysis",
    ],
    tech: ["React", "Spring Boot", "MySQL", "Google Maps API"],
    icon: Shield,
    Viz: WorldMapViz,
  },
  {
    num: "02",
    title: "AI-Powered Adaptive eLearning",
    subtitle: "Personalized Education Using AI",
    subtitleColor: "#7B61FF",
    description:
      "An intelligent education platform that adapts to each student's learning pace. Features smart learning paths, real-time analytics dashboards, and AI-driven content recommendations for teachers and administrators.",
    features: [
      "Smart Learning Paths",
      "Student Analytics",
      "Teacher Dashboard",
      "Admin Panel",
    ],
    tech: ["React", "Python", "TensorFlow", "Spring Boot", "MySQL"],
    icon: BookOpen,
    Viz: AnalyticsViz,
  },
];

/* ──────────────────────── project card ──────────────────────── */
function ProjectCard({
  project,
  reversed,
}: {
  project: ProjectData;
  reversed: boolean;
}) {
  const tilt = useTilt();
  const { Viz } = project;
  const Icon = project.icon;

  const content = (
    <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
      {/* number */}
      <span
        className="text-7xl sm:text-8xl font-black leading-none select-none text-white/[0.04]"
      >
        {project.num}
      </span>

      <div className="flex items-center gap-3">
        <Icon size={22} style={{ color: project.subtitleColor }} />
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          {project.title}
        </h3>
      </div>

      <p className="text-sm font-medium" style={{ color: project.subtitleColor }}>
        {project.subtitle}
      </p>

      <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
        {project.description}
      </p>

      {/* features */}
      <div className="flex flex-wrap gap-2">
        {project.features.map((f) => (
          <FeatureTag key={f} text={f} />
        ))}
      </div>

      {/* tech */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <TechBadge key={t} text={t} />
        ))}
      </div>

      {/* buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <ActionButton text="Live Demo" variant="primary" icon={ExternalLink} />
        <ActionButton text="GitHub" variant="outline" icon={FaGithub} />
        <ActionButton text="Case Study" variant="ghost" icon={FileText} />
      </div>
    </div>
  );

  const viz = (
    <div className="flex items-center justify-center p-6 sm:p-8">
      <Viz />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      className="relative"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.handleMove}
        onMouseLeave={tilt.handleLeave}
        className="rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,212,255,0.12)] bg-glass/3 border border-glass-border backdrop-blur-[20px]"
        style={{
          perspective: "1200px",
          transform: `rotateX(${tilt.style.rotateX}deg) rotateY(${tilt.style.rotateY}deg)`,
          transition: "transform 0.15s ease-out, background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 ${
            reversed ? "lg:[direction:rtl]" : ""
          }`}
        >
          <div className={reversed ? "lg:[direction:ltr]" : ""}>
            {reversed ? viz : content}
          </div>
          <div className={reversed ? "lg:[direction:ltr]" : ""}>
            {reversed ? content : viz}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────── main section component ─────────────────── */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-dark-800"
    >
      {/* ambient */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-15 blur-[140px]"
        style={{ background: "radial-gradient(circle,#7B61FF 0%,#00D4FF 60%,transparent 80%)" }}
      />

      {/* header */}
      <motion.div
        className="text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg,#00D4FF 0%,#7B61FF 50%,#00FF88 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Featured Projects
        </h2>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "#94A3B8" }}>
          Innovative Solutions I've Built
        </p>
      </motion.div>

      {/* project cards */}
      <div className="max-w-6xl mx-auto flex flex-col gap-16 relative z-10">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} reversed={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
}
