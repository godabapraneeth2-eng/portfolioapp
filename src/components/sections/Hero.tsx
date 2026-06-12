import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Mail, ChevronDown } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

// ── Types ──────────────────────────────────────────────────────────────────
interface FloatingBadge {
  label: string;
  x: string;
  y: string;
  delay: number;
}

// ── Constants ──────────────────────────────────────────────────────────────
const ROLES: string[] = [
  'AI Engineer',
  'Full Stack Developer',
  'ML Innovator',
  'Future Startup Founder',
];

const CODE_LINES: string[] = [
  'const engineer = {',
  '  name: "Sai Praneeth",',
  '  role: "AI Engineer",',
  '  passion: "Innovation"',
  '};',
];

const FLOATING_BADGES: FloatingBadge[] = [
  { label: '⚛️ React', x: '-12%', y: '10%', delay: 0 },
  { label: '🐍 Python', x: '88%', y: '5%', delay: 0.8 },
  { label: '☕ Java', x: '92%', y: '55%', delay: 1.6 },
  { label: '🧠 TensorFlow', x: '-15%', y: '65%', delay: 2.4 },
  { label: '🍃 Spring Boot', x: '85%', y: '90%', delay: 3.2 },
  { label: '🗄️ MySQL', x: '-10%', y: '88%', delay: 4.0 },
];

const SOCIAL_LINKS = [
  { icon: FaGithub, href: 'https://github.com/saipraneeth', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com/in/saipraneeth', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:saipraneeth@email.com', label: 'Email' },
];

// ── Animation Variants ────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, scale: 0.85, x: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 },
  },
};

// ── Typing Hook ────────────────────────────────────────────────────────────
function useTypingEffect(words: string[], typingSpeed = 100, deletingSpeed = 60, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          if (displayText.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

// ── Code Typing Hook ──────────────────────────────────────────────────────
function useCodeTyping(lines: string[], speed = 50, lineDelay = 400) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) {
      // Restart after a pause
      const restartTimeout = setTimeout(() => {
        setVisibleLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 3000);
      return () => clearTimeout(restartTimeout);
    }

    const line = lines[currentLine];

    if (currentChar < line.length) {
      const charTimeout = setTimeout(() => {
        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.slice(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(charTimeout);
    } else {
      const nextLineTimeout = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, lineDelay);
      return () => clearTimeout(nextLineTimeout);
    }
  }, [currentLine, currentChar, lines, speed, lineDelay]);

  return visibleLines;
}

// ── Holographic Card Component ────────────────────────────────────────────
function HolographicCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const codeLines = useCodeTyping(CODE_LINES, 45, 350);

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ perspective: '1000px' }}>
      {/* Floating Badges */}
      {FLOATING_BADGES.map((badge) => (
        <motion.div
          key={badge.label}
          className="absolute z-10 px-3 py-1.5 rounded-full text-xs font-medium
                     bg-white/5 backdrop-blur-md border border-white/10 text-white/80
                     whitespace-nowrap pointer-events-none"
          style={{ left: badge.x, top: badge.y }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: badge.delay,
            ease: 'easeInOut',
          }}
        >
          {badge.label}
        </motion.div>
      ))}

      {/* Card with 3D Tilt */}
      <motion.div
        ref={cardRef}
        className="relative rounded-2xl p-[2px] cursor-pointer"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated rotating gradient border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-70"
          style={{
            background:
              'conic-gradient(from var(--border-angle, 0deg), #00D4FF, #7B61FF, #00FF88, #00D4FF)',
            animation: 'rotateBorder 4s linear infinite',
          }}
        />

        {/* Card inner */}
        <div className="relative rounded-2xl bg-dark-800/90 backdrop-blur-xl p-6 z-10">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-6">
            {/* Avatar with rotating ring */}
            <div className="relative mb-4">
              <div
                className="w-24 h-24 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
                }}
              />
              {/* Rotating dashed ring */}
              <div
                className="absolute inset-[-6px] rounded-full border-2 border-dashed border-cyber-blue/50"
                style={{ animation: 'spin 8s linear infinite' }}
              />
              {/* Outer glow ring */}
              <div
                className="absolute inset-[-12px] rounded-full border border-neon-purple/20"
                style={{ animation: 'spin 12s linear infinite reverse' }}
              />
            </div>

            <h3 className="text-lg font-bold text-white">Sai Praneeth</h3>
            <p className="text-sm text-cyber-blue">AI Engineer & Developer</p>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20 w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs text-neon-green">Available for Work</span>
          </div>

          {/* Live Coding Terminal */}
          <div className="rounded-lg bg-dark-900 border border-white/5 p-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[10px] text-slate-500">~/portfolio.ts</span>
            </div>
            <div className="min-h-[90px]">
              {codeLines.map((line, i) => (
                <div key={i} className="leading-5">
                  <span className="text-slate-600 mr-2 select-none">{i + 1}</span>
                  <span className="text-slate-300">
                    {line.includes('const') && (
                      <>
                        <span className="text-neon-purple">{line.split(' ')[0]}</span>{' '}
                        <span className="text-white">{line.split(' ').slice(1).join(' ')}</span>
                      </>
                    )}
                    {line.includes(':') && !line.includes('const') && !line.includes('}') && (
                      <>
                        <span className="text-cyber-blue">
                          {line.split(':')[0]}
                        </span>
                        <span className="text-white">:</span>
                        <span className="text-neon-green">
                          {line.split(':').slice(1).join(':')}
                        </span>
                      </>
                    )}
                    {(line.includes('};') || (line.includes('}') && !line.includes(':'))) && (
                      <span className="text-white">{line}</span>
                    )}
                  </span>
                </div>
              ))}
              <span
                className="inline-block w-[7px] h-4 bg-cyber-blue/80 ml-1"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Hero Component ───────────────────────────────────────────────────
function Hero() {
  const typedRole = useTypingEffect(ROLES, 100, 60, 2000);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-20">
        {/* ── Left Side ─────────────────────────────────────────────── */}
        <motion.div
          className="flex-1 lg:max-w-[60%] text-center lg:text-left z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                         bg-white/5 backdrop-blur-md border border-white/10 text-white/80"
            >
              <span className="text-base">🚀</span>
              Available for Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
          >
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #FFFFFF 0%, #00D4FF 50%, #FFFFFF 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            >
              Godaba Sai Praneeth
            </span>
          </motion.h1>

          {/* Typing Headline */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #00D4FF, #7B61FF)',
                }}
              >
                {typedRole}
              </span>
              <span
                className="inline-block w-[3px] h-7 sm:h-8 bg-cyber-blue ml-1 align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            </span>
          </motion.div>

          {/* Subheadline */}
          <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-4 max-w-xl mx-auto lg:mx-0">
            Building Intelligent Systems, Modern Web Applications, and Future-Ready Digital
            Experiences.
          </motion.p>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-base text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0">
            Computer Science Engineering Student specializing in AI-driven applications, Full
            Stack Development, and scalable software systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
          >
            {/* View Projects */}
            <motion.a
              href="#projects"
              className="relative px-6 py-3 rounded-full font-medium text-white bg-cyber-blue
                         overflow-hidden transition-all duration-300 text-sm sm:text-base"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0,212,255,0.5)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects
            </motion.a>

            {/* Download Resume */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-medium text-cyber-blue
                         border border-cyber-blue/50 transition-all duration-300
                         hover:bg-cyber-blue/10 text-sm sm:text-base"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(0,212,255,0.3)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
            </motion.a>

            {/* Contact Me */}
            <motion.a
              href="#contact"
              className="px-6 py-3 rounded-full font-medium text-slate-300
                         border border-white/10 transition-all duration-300
                         hover:border-white/30 hover:text-white text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center lg:justify-start"
          >
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10
                           flex items-center justify-center text-slate-400
                           hover:text-cyber-blue hover:border-cyber-blue/50
                           transition-colors duration-300"
                whileHover={{
                  scale: 1.15,
                  boxShadow: '0 0 20px rgba(0,212,255,0.3)',
                }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right Side: Holographic Card ──────────────────────────── */}
        <motion.div
          className="flex-1 lg:max-w-[40%] w-full z-10"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <HolographicCard />
        </motion.div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-cyber-blue/60" />
        </motion.div>
      </motion.div>

      {/* ── Inline Keyframes (injected once) ───────────────────────── */}
      <style>{`
        @keyframes rotateBorder {
          from { --border-angle: 0deg; }
          to { --border-angle: 360deg; }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </section>
  );
}

export default Hero;
