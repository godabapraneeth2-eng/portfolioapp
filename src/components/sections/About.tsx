// @ts-nocheck
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Briefcase,
  Award,
  Code2,
  Rocket,
  Heart,
  Zap,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
interface StatCard {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  decimals?: number;
}

interface PersonalDetail {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const STATS: StatCard[] = [
  { value: 9.04, suffix: '', label: 'CGPA', icon: GraduationCap, decimals: 2 },
  { value: 10, suffix: '+', label: 'Technologies', icon: Code2 },
  { value: 2, suffix: '', label: 'Major Projects', icon: Rocket },
  { value: 1, suffix: '', label: 'Internship', icon: Briefcase },
  { value: 100, suffix: '%', label: 'Passion for Innovation', icon: Heart },
];

const PERSONAL_DETAILS: PersonalDetail[] = [
  { icon: GraduationCap, label: 'CGPA', value: '9.04 / 10', color: '#00D4FF' },
  { icon: MapPin, label: 'Location', value: 'Andhra Pradesh, India', color: '#00FF88' },
  { icon: Briefcase, label: 'Role', value: 'AI Engineer & Full Stack Dev', color: '#7B61FF' },
  { icon: Award, label: 'Experience', value: 'Internship Experience', color: '#00D4FF' },
];

const KEYWORDS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Full Stack Development',
  'scalable software',
  'modern web applications',
  'AI-driven solutions',
];

// ── Animation Variants ────────────────────────────────────────────────────
const sectionVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUpVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ── Animated Counter Hook ─────────────────────────────────────────────────
function useAnimatedCounter(
  target: number,
  duration: number,
  shouldAnimate: boolean,
  decimals = 0
): string {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let startTime: number;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, shouldAnimate, decimals]);

  return count.toFixed(decimals);
}

// ── Stat Card Component ───────────────────────────────────────────────────
function AnimatedStatCard({ stat, index }: { stat: StatCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const animatedValue = useAnimatedCounter(
    stat.value,
    2000,
    isInView,
    stat.decimals ?? 0
  );

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'conic-gradient(from 0deg, #00D4FF, #7B61FF, #00FF88, #00D4FF)',
        }}
      />

      <div className="relative rounded-2xl bg-dark-800/80 backdrop-blur-md p-5 h-full z-10">
        {/* Icon */}
        <div className="mb-3 flex items-center justify-center w-10 h-10 rounded-xl bg-cyber-blue/10">
          <stat.icon size={20} className="text-cyber-blue" />
        </div>

        {/* Animated Number */}
        <div className="text-3xl sm:text-4xl font-bold mb-1">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
            }}
          >
            {isInView ? animatedValue : '0'}
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-sm text-slate-400">{stat.label}</p>

        {/* Index indicator */}
        <div className="absolute top-3 right-3 text-xs text-white/10 font-mono">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
}

// ── Highlight Text ────────────────────────────────────────────────────────
function highlightText(text: string, keywords: string[]): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliestIndex = remaining.length;
    let matchedKeyword = '';

    for (const kw of keywords) {
      const idx = remaining.toLowerCase().indexOf(kw.toLowerCase());
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx;
        matchedKeyword = kw;
      }
    }

    if (matchedKeyword && earliestIndex < remaining.length) {
      if (earliestIndex > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, earliestIndex)}</span>);
      }
      parts.push(
        <span key={key++} className="text-cyber-blue font-medium">
          {remaining.slice(earliestIndex, earliestIndex + matchedKeyword.length)}
        </span>
      );
      remaining = remaining.slice(earliestIndex + matchedKeyword.length);
    } else {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
  }

  return <>{parts}</>;
}

// ── Main About Component ──────────────────────────────────────────────────
function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const bioText = `I am a passionate Computer Science Engineering student with a deep fascination for
Artificial Intelligence and Machine Learning. My journey in tech revolves around creating
AI-driven solutions and modern web applications that push boundaries. I specialize in
Full Stack Development, building scalable software systems that combine elegant frontends
with robust backends. With a strong foundation in both theory and practice, I am constantly
exploring new technologies to build the future of intelligent digital experiences.`;

  return (
    <section
      id="about"
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
              Get to know me
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
              About Me
            </span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto">
            A snapshot of who I am, what I do, and what drives me forward.
          </p>
        </motion.div>

        {/* ── Two Column Layout ────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left: Bio Content */}
          <motion.div variants={fadeUpVariants} className="space-y-8">
            {/* Bio paragraph */}
            <div className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/5 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap size={18} className="text-cyber-blue" />
                <h3 className="text-lg font-semibold text-white">Who Am I?</h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                {highlightText(bioText, KEYWORDS)}
              </p>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PERSONAL_DETAILS.map((detail) => (
                <motion.div
                  key={detail.label}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] backdrop-blur-sm
                             border border-white/5 p-4 group hover:border-white/10
                             transition-all duration-300"
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${detail.color}15` }}
                  >
                    <detail.icon size={16} style={{ color: detail.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 mb-0.5">{detail.label}</p>
                    <p className="text-sm text-white font-medium truncate">{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            variants={sectionVariants}
            className="grid grid-cols-2 gap-4 content-start"
          >
            {STATS.map((stat, index) => (
              <AnimatedStatCard key={stat.label} stat={stat} index={index} />
            ))}

            {/* Extra flair: gradient box */}
            <motion.div
              variants={fadeUpVariants}
              className="col-span-2 rounded-2xl p-[1px] overflow-hidden"
            >
              <div
                className="rounded-2xl p-4 flex items-center justify-center gap-3"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(123,97,255,0.08))',
                }}
              >
                <Rocket size={18} className="text-cyber-blue" />
                <span className="text-sm text-slate-300">
                  Always learning, always building, always{' '}
                  <span className="text-cyber-blue font-medium">innovating</span>.
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
