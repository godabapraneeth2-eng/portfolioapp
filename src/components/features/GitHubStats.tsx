import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Star, Users, Activity } from "lucide-react";

// Generate deterministic-ish mock data
function generateHeatmapData(): number[][] {
  const grid: number[][] = [];
  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 16807 + 7) % 2147483647;
    return (seed & 0x7fffffff) / 2147483647;
  };
  for (let col = 0; col < 52; col++) {
    const week: number[] = [];
    for (let row = 0; row < 7; row++) {
      const r = pseudoRandom();
      if (r < 0.3) week.push(0);
      else if (r < 0.55) week.push(1);
      else if (r < 0.78) week.push(2);
      else if (r < 0.92) week.push(3);
      else week.push(4);
    }
    grid.push(week);
  }
  return grid;
}

const COLORS = ["transparent", "#0e4429", "#006d32", "#26a641", "#39d353"];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAYS = ["Mon", "", "Wed", "", "Fri", "", ""];

interface StatCardProps {
  icon: typeof GitBranch;
  label: string;
  value: number;
  suffix: string;
  inView: boolean;
}

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count}</span>;
}

function StatCard({ icon: Icon, label, value, suffix, inView }: StatCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-glass-border bg-glass/5 backdrop-blur-md"
      whileHover={{ y: -4 }}
    >
      <Icon className="w-5 h-5 text-cyber-blue" />
      <div className="text-2xl font-bold text-white">
        <AnimatedCounter target={value} inView={inView} />
        <span className="text-cyber-blue">{suffix}</span>
      </div>
      <span className="text-xs text-slate-500 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

export default function GitHubStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const heatmap = useMemo(() => generateHeatmapData(), []);

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <h3
        className="text-2xl md:text-3xl font-bold text-center mb-8"
        style={{
          background: "linear-gradient(135deg, #00D4FF, #7B61FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Coding Activity
      </h3>

      {/* Heatmap card */}
      <div
        className="p-5 md:p-6 rounded-2xl border border-glass-border bg-glass/5 backdrop-blur-md overflow-x-auto"
      >
        {/* Month labels */}
        <div className="flex mb-1 ml-10">
          {MONTHS.map((m) => (
            <span
              key={m}
              className="text-[10px] text-slate-500"
              style={{ width: `${(100 / 12)}%`, minWidth: 28 }}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex gap-0">
          {/* Day labels */}
          <div className="flex flex-col gap-[2px] mr-2 shrink-0">
            {DAYS.map((d, i) => (
              <span
                key={i}
                className="text-[10px] text-slate-500 h-3 leading-3 flex items-center"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[2px]">
            {heatmap.map((week, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[2px]">
                {week.map((level, rowIdx) => (
                  <motion.div
                    key={`${colIdx}-${rowIdx}`}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      background: COLORS[level],
                      border:
                        level === 0
                          ? "1px solid rgba(var(--glass-border), 0.1)"
                          : "none",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{
                      duration: 0.2,
                      delay: (colIdx * 7 + rowIdx) * 0.002,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-slate-500">
          Less
          {COLORS.map((c, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{
                background: c,
                border: i === 0 ? "1px solid rgba(var(--glass-border), 0.1)" : "none",
              }}
            />
          ))}
          More
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatCard
          icon={GitBranch}
          label="Repositories"
          value={15}
          suffix="+"
          inView={isInView}
        />
        <StatCard
          icon={Activity}
          label="Contributions"
          value={500}
          suffix="+"
          inView={isInView}
        />
        <StatCard
          icon={Star}
          label="Stars"
          value={50}
          suffix="+"
          inView={isInView}
        />
        <StatCard
          icon={Users}
          label="Followers"
          value={100}
          suffix="+"
          inView={isInView}
        />
      </div>
    </motion.div>
  );
}
