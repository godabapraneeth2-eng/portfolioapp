import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Brain SVG — a network of nodes and connections that pulse
const BrainSVG: React.FC = () => {
  // Node positions for a brain-like neural network shape
  const nodes = [
    // Left hemisphere
    { cx: 120, cy: 80, r: 3, delay: 0 },
    { cx: 95, cy: 110, r: 3.5, delay: 0.1 },
    { cx: 130, cy: 120, r: 2.5, delay: 0.15 },
    { cx: 80, cy: 145, r: 3, delay: 0.2 },
    { cx: 115, cy: 150, r: 4, delay: 0.25 },
    { cx: 90, cy: 180, r: 3, delay: 0.3 },
    { cx: 125, cy: 185, r: 3.5, delay: 0.35 },
    { cx: 100, cy: 210, r: 2.5, delay: 0.4 },

    // Center / brain stem
    { cx: 150, cy: 60, r: 3.5, delay: 0.05 },
    { cx: 150, cy: 100, r: 4.5, delay: 0.12 },
    { cx: 150, cy: 150, r: 5, delay: 0.22 },
    { cx: 150, cy: 200, r: 3.5, delay: 0.32 },
    { cx: 150, cy: 230, r: 3, delay: 0.42 },

    // Right hemisphere
    { cx: 180, cy: 80, r: 3, delay: 0.08 },
    { cx: 205, cy: 110, r: 3.5, delay: 0.18 },
    { cx: 170, cy: 120, r: 2.5, delay: 0.23 },
    { cx: 220, cy: 145, r: 3, delay: 0.28 },
    { cx: 185, cy: 150, r: 4, delay: 0.33 },
    { cx: 210, cy: 180, r: 3, delay: 0.38 },
    { cx: 175, cy: 185, r: 3.5, delay: 0.43 },
    { cx: 200, cy: 210, r: 2.5, delay: 0.48 },
  ];

  // Connections between nodes (indices)
  const connections = [
    [0, 1], [0, 2], [0, 8], [1, 3], [1, 4], [2, 4], [2, 9],
    [3, 5], [3, 6], [4, 6], [4, 10], [5, 7], [6, 7], [6, 11],
    [7, 12], [8, 9], [8, 13], [9, 10], [9, 15], [10, 11],
    [10, 17], [11, 12], [13, 14], [13, 15], [14, 16], [14, 17],
    [15, 17], [16, 18], [16, 19], [17, 19], [18, 20], [19, 20],
    [0, 13], [4, 17], [5, 18], [7, 20],
    [1, 9], [14, 9], [3, 10], [16, 10],
  ];

  return (
    <svg
      viewBox="0 0 300 280"
      className="w-40 h-40 sm:w-48 sm:h-48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connections */}
      {connections.map(([from, to], i) => {
        const a = nodes[from];
        const b = nodes[to];
        if (!a || !b) return null;
        return (
          <motion.line
            key={`line-${i}`}
            x1={a.cx}
            y1={a.cy}
            x2={b.cx}
            y2={b.cy}
            stroke="#00D4FF"
            strokeWidth={1}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: [0.15, 0.5, 0.15],
              pathLength: 1,
            }}
            transition={{
              opacity: {
                duration: 2,
                repeat: Infinity,
                delay: (a.delay + b.delay) / 2,
              },
              pathLength: {
                duration: 1.5,
                delay: (a.delay + b.delay) / 2,
                ease: 'easeOut',
              },
            }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill="#00D4FF"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: node.delay,
            ease: 'easeInOut',
          }}
          style={{
            filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.8))',
          }}
        />
      ))}

      {/* Central glow */}
      <motion.circle
        cx={150}
        cy={150}
        r={30}
        fill="none"
        stroke="#00D4FF"
        strokeWidth={0.5}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={150}
        cy={150}
        r={50}
        fill="none"
        stroke="#7B61FF"
        strokeWidth={0.3}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </svg>
  );
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  // Progress bar filling over ~2.5 seconds
  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const step = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += step + Math.random() * step * 0.5;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(handleComplete, 300);
      }
      setProgress(current);
    }, interval);

    return () => clearInterval(timer);
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark-900"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          {/* Ambient background glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(0,212,255,0.15), transparent 60%)',
            }}
          />

          {/* Brain SVG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <BrainSVG />
          </motion.div>

          {/* Loading text with typing effect */}
          <motion.div
            className="mt-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="text-lg sm:text-xl font-mono text-cyber-blue tracking-wider">
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-cyber-blue animate-blink">
                Initializing AI Portfolio...
              </span>
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="mt-8 w-64 sm:w-80 h-1 rounded-full overflow-hidden bg-dark-700"
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #00D4FF, #7B61FF, #00FF88)',
                boxShadow: '0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.2)',
                transition: 'width 0.1s ease-out',
              }}
            />
          </motion.div>

          {/* Percentage */}
          <motion.p
            className="mt-3 text-xs font-mono text-slate-500 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
