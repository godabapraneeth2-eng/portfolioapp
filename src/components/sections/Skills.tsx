// @ts-nocheck
import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaJava,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiSpringboot,
  SiMysql,
  SiPostman,
  SiIntellijidea,
} from 'react-icons/si';
import { Code2 } from 'lucide-react';
import type { IconType } from 'react-icons';

// ── Types ──────────────────────────────────────────────────────────────────
type Category = 'Frontend' | 'Backend' | 'Database' | 'Programming' | 'Tools';

interface Skill {
  name: string;
  percentage: number;
  icon: IconType | React.ElementType;
  color: string;
}

interface RadarAxis {
  label: string;
  value: number; // 0–100
}

// ── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = ['Frontend', 'Backend', 'Database', 'Programming', 'Tools'];

const SKILLS_DATA: Record<Category, Skill[]> = {
  Frontend: [
    { name: 'HTML5', percentage: 95, icon: FaHtml5, color: '#E34F26' },
    { name: 'CSS3', percentage: 90, icon: FaCss3Alt, color: '#1572B6' },
    { name: 'JavaScript', percentage: 85, icon: FaJs, color: '#F7DF1E' },
    { name: 'React', percentage: 80, icon: FaReact, color: '#61DAFB' },
    { name: 'Bootstrap', percentage: 85, icon: FaBootstrap, color: '#7952B3' },
  ],
  Backend: [
    { name: 'Java', percentage: 90, icon: FaJava, color: '#ED8B00' },
    { name: 'Spring Boot', percentage: 75, icon: SiSpringboot, color: '#6DB33F' },
  ],
  Database: [
    { name: 'MySQL', percentage: 80, icon: SiMysql, color: '#4479A1' },
  ],
  Programming: [
    { name: 'Java', percentage: 90, icon: FaJava, color: '#ED8B00' },
    { name: 'Python', percentage: 75, icon: FaPython, color: '#3776AB' },
  ],
  Tools: [
    { name: 'Git', percentage: 85, icon: FaGitAlt, color: '#F05032' },
    { name: 'GitHub', percentage: 90, icon: FaGithub, color: '#FFFFFF' },
    { name: 'VS Code', percentage: 95, icon: Code2, color: '#007ACC' },
    { name: 'Postman', percentage: 80, icon: SiPostman, color: '#FF6C37' },
    { name: 'IntelliJ IDEA', percentage: 85, icon: SiIntellijidea, color: '#FE315D' },
  ],
};

const RADAR_AXES: RadarAxis[] = [
  { label: 'Frontend', value: 87 },
  { label: 'Backend', value: 82 },
  { label: 'AI/ML', value: 75 },
  { label: 'Problem Solving', value: 90 },
  { label: 'Tools', value: 87 },
];

// ── Animation Variants ────────────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardEnterVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  exit: { opacity: 0, y: -15, scale: 0.95, transition: { duration: 0.25 } },
};

// ── Skill Card Component ──────────────────────────────────────────────────
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  const IconComp = skill.icon;

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardEnterVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group relative rounded-2xl p-[1px] overflow-hidden"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-500"
        style={{
          background: `conic-gradient(from 0deg, ${skill.color}88, #7B61FF88, ${skill.color}88)`,
        }}
      />

      <div className="relative rounded-2xl bg-dark-800/80 backdrop-blur-md p-5 h-full z-10">
        {/* Icon & Name Row */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${skill.color}15` }}
          >
            <IconComp size={20} style={{ color: skill.color }} />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-white truncate">{skill.name}</h4>
          </div>
          <span className="text-sm font-mono font-bold text-white/80">
            {skill.percentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
              boxShadow: `0 0 12px ${skill.color}40`,
            }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ── Radar Chart Component ─────────────────────────────────────────────────
function RadarChart({ axes }: { axes: RadarAxis[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const n = axes.length;
  const cx = 150;
  const cy = 150;
  const maxR = 110;
  const levels = 4;

  // Calculate vertex positions for given radius
  const getPoints = (radius: number) =>
    axes.map((_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });

  // Data polygon points
  const dataPoints = useMemo(
    () =>
      axes.map((axis, i) => {
        const r = (axis.value / 100) * maxR;
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
      }),
    [axes, n]
  );

  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const zeroPolygon = axes
    .map(() => `${cx},${cy}`)
    .join(' ');

  // Label positions (slightly outside)
  const labelPoints = getPoints(maxR + 22);

  return (
    <svg
      ref={ref}
      viewBox="0 0 300 300"
      className="w-full max-w-[320px] mx-auto"
    >
      {/* Grid levels */}
      {Array.from({ length: levels }, (_, i) => {
        const r = ((i + 1) / levels) * maxR;
        const pts = getPoints(r);
        return (
          <polygon
            key={i}
            points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="rgba(var(--glass-border), 0.1)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {getPoints(maxR).map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="rgba(var(--glass-border), 0.1)"
          strokeWidth="1"
        />
      ))}

      {/* Data polygon */}
      <motion.polygon
        points={isInView ? dataPolygon : zeroPolygon}
        fill="rgba(0,212,255,0.12)"
        stroke="#00D4FF"
        strokeWidth="2"
        initial={false}
        animate={{ points: isInView ? dataPolygon : zeroPolygon }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          r="4"
          fill="#00D4FF"
          stroke="rgb(var(--bg-primary))"
          strokeWidth="2"
          initial={{ cx, cy }}
          animate={isInView ? { cx: p.x, cy: p.y } : { cx, cy }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}

      {/* Labels */}
      {labelPoints.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#94A3B8"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          {axes[i].label}
        </text>
      ))}
    </svg>
  );
}

// ── Floating Orbit Nodes ──────────────────────────────────────────────────
function FloatingNodes() {
  const nodes = [
    { label: '⚛️', delay: 0, duration: 12, radius: 90 },
    { label: '🐍', delay: 2, duration: 15, radius: 110 },
    { label: '☕', delay: 4, duration: 18, radius: 80 },
    { label: '🧠', delay: 6, duration: 14, radius: 100 },
    { label: '🗄️', delay: 1, duration: 16, radius: 95 },
  ];

  return (
    <div className="relative w-[240px] h-[240px] mx-auto">
      {/* Center node */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12
                   rounded-full flex items-center justify-center z-10"
        style={{
          background: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
          boxShadow: '0 0 30px rgba(0,212,255,0.3)',
        }}
      >
        <FaDatabase size={18} className="text-white" />
      </div>

      {/* Orbiting nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-0 h-0"
          style={{
            animation: `orbit ${node.duration}s linear infinite`,
            animationDelay: `${node.delay}s`,
          }}
        >
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full
                       bg-white/5 backdrop-blur-sm border border-white/10
                       flex items-center justify-center text-sm"
            style={{ left: `${node.radius}px` }}
          >
            {node.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Skills Component ─────────────────────────────────────────────────
function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('Frontend');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const activeSkills = SKILLS_DATA[activeCategory];

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        ref={sectionRef}
        className="max-w-7xl mx-auto"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* ── Section Header ───────────────────────────────────────── */}
        <motion.div variants={fadeUpVariants} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyber-blue" />
            <span className="text-sm text-cyber-blue font-mono tracking-widest uppercase">
              What I work with
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyber-blue" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
              }}
            >
              Tech Arsenal
            </span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* ── Category Tabs ────────────────────────────────────────── */}
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white/70'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-cyber-blue/20 border border-cyber-blue/30"
                    style={{
                      boxShadow: '0 0 20px rgba(0,212,255,0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Skills Grid ──────────────────────────────────────────── */}
        <div className="mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Radar & Orbits ──────────────────────────────────────── */}
        <motion.div variants={fadeUpVariants}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">Skill Overview</h3>
            <p className="text-sm text-slate-500">A bird's-eye view of my core competencies</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
            {/* Radar Chart */}
            <div className="rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/5 p-6">
              <RadarChart axes={RADAR_AXES} />
            </div>

            {/* Floating Nodes */}
            <div className="rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/5 p-6 flex items-center justify-center min-h-[300px]">
              <FloatingNodes />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Inline Keyframes ──────────────────────────────────────── */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

export default Skills;
