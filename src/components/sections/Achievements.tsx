import { motion } from "framer-motion";
import { Building2, Trophy, GraduationCap, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Achievement {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
}

const achievements: Achievement[] = [
  {
    icon: Building2,
    title: "Infosys Springboard Internship",
    description:
      "Completed industry-level training in software development and emerging technologies",
    badge: "Completed",
  },
  {
    icon: Trophy,
    title: "Top 10 Hackathon Finalist",
    description:
      "Recognized among top innovators in competitive hackathon events",
    badge: "Top 10",
  },
  {
    icon: GraduationCap,
    title: "9.04 CGPA",
    description:
      "Maintaining exceptional academic excellence in Computer Science Engineering",
    badge: "Academic",
  },
  {
    icon: Code2,
    title: "Active DSA Learner",
    description:
      "Consistently practicing Data Structures & Algorithms for competitive programming",
    badge: "Ongoing",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-dark-900"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[160px]"
        style={{
          background: "var(--achievements-radial-glow)",
        }}
      />

      {/* header */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 gradient-text"
        >
          Achievements
        </h2>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "#94A3B8" }}>
          Milestones & Recognition
        </p>
      </motion.div>

      {/* cards grid */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {achievements.map((ach) => {
          const Icon = ach.icon;
          return (
            <motion.div
              key={ach.title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative rounded-2xl p-[1px] cursor-pointer"
            >
              {/* animated conic gradient border */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "var(--card-border-conic)",
                  animation: "spinBorder 4s linear infinite",
                }}
              />

              {/* card body */}
              <div
                className="relative rounded-2xl p-7 h-full bg-glass/4 border border-glass-border backdrop-blur-[20px] transition-all duration-300"
              >
                {/* badge chip */}
                <span
                  className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-glass border border-glass-border text-slate-400"
                >
                  {ach.badge}
                </span>

                {/* icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-cyber-blue/10 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(0,212,255,0.5)]"
                  whileHover={{ scale: 1.15 }}
                >
                  <Icon size={28} color="#00D4FF" />
                </motion.div>

                {/* title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {ach.title}
                </h3>

                {/* description */}
                <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                  {ach.description}
                </p>

                {/* shimmer line on hover */}
                <div
                  className="mt-5 h-[1px] w-full overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,#00D4FF,#7B61FF,transparent)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s linear infinite",
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* keyframes */}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spinBorder {
          to { --angle: 360deg; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0;  }
        }
      `}</style>
    </section>
  );
}
