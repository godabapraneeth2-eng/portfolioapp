import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  GraduationCap,
  Code2,
  Layers,
  Building2,
  Brain,
  Rocket,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  dotColor: string;
  glowColor: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2021",
    title: "Started B.Tech CSE",
    description:
      "Began Computer Science Engineering journey with passion for technology",
    icon: GraduationCap,
    color: "text-cyber-blue",
    dotColor: "bg-cyber-blue",
    glowColor: "shadow-[0_0_15px_rgba(0,212,255,0.6)]",
  },
  {
    year: "2022",
    title: "Deep Dive into Programming",
    description:
      "Mastered Java, Python, and Data Structures & Algorithms",
    icon: Code2,
    color: "text-neon-purple",
    dotColor: "bg-neon-purple",
    glowColor: "shadow-[0_0_15px_rgba(123,97,255,0.6)]",
  },
  {
    year: "2023",
    title: "Full Stack Development",
    description:
      "Built full-stack applications with React, Spring Boot, and MySQL",
    icon: Layers,
    color: "text-neon-green",
    dotColor: "bg-neon-green",
    glowColor: "shadow-[0_0_15px_rgba(0,255,136,0.6)]",
  },
  {
    year: "2023",
    title: "Infosys Springboard Internship",
    description:
      "Completed industry training in software development and emerging tech",
    icon: Building2,
    color: "text-cyber-blue",
    dotColor: "bg-cyber-blue",
    glowColor: "shadow-[0_0_15px_rgba(0,212,255,0.6)]",
  },
  {
    year: "2026",
    title: "AI & Machine Learning",
    description:
      "Specialized in AI applications, ML models, and intelligent automation",
    icon: Brain,
    color: "text-neon-purple",
    dotColor: "bg-neon-purple",
    glowColor: "shadow-[0_0_15px_rgba(123,97,255,0.6)]",
  },
  {
    year: "2026",
    title: "Built Geo-Shield & eLearning Platform",
    description:
      "Developed two major projects showcasing AI and full-stack expertise",
    icon: Rocket,
    color: "text-neon-green",
    dotColor: "bg-neon-green",
    glowColor: "shadow-[0_0_15px_rgba(0,255,136,0.6)]",
  },
  {
    year: "2027",
    title: "Future: AI Startup Vision",
    description:
      "Working towards building innovative AI products and solutions",
    icon: Sparkles,
    color: "text-amber-400",
    dotColor: "bg-amber-400",
    glowColor: "shadow-[0_0_15px_rgba(251,191,36,0.6)]",
  },
];

function TimelineCard({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`flex items-center w-full mb-12 md:mb-16 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Card side */}
      <motion.div
        className={`w-full md:w-[calc(50%-2rem)] ${
          isLeft ? "md:pr-0" : "md:pl-0"
        } pl-12 md:pl-0`}
        initial={{
          opacity: 0,
          x: isLeft ? -60 : 60,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: isLeft ? -60 : 60 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="relative p-6 rounded-xl border border-glass-border bg-glass/5 backdrop-blur-md transition-all duration-300 hover:border-cyber-blue/30 hover:shadow-lg group"
        >
          {/* Year badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 ${item.color} bg-glass border border-glass-border`}
          >
            <Icon className="w-3.5 h-3.5" />
            {item.year}
          </div>

          <h3 className="text-white text-lg font-semibold mb-2">
            {item.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Decorative icon */}
          <div
            className={`absolute top-4 right-4 ${item.color} opacity-10 group-hover:opacity-25 transition-opacity`}
          >
            <Icon className="w-10 h-10" />
          </div>
        </div>
      </motion.div>

      {/* Center dot – visible only on md+ */}
      <div className="hidden md:flex items-center justify-center w-16 relative z-10">
        <motion.div
          className={`w-5 h-5 rounded-full ${item.dotColor} ${item.glowColor} border-2 border-dark-900`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Pulse ring */}
          <motion.div
            className={`absolute inset-0 rounded-full ${item.dotColor} opacity-40`}
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Mobile dot */}
      <div className="md:hidden absolute left-0 flex items-center justify-center z-10">
        <motion.div
          className={`w-4 h-4 rounded-full ${item.dotColor} ${item.glowColor} border-2 border-dark-900`}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </div>

      {/* Empty spacer for the other side */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative py-24 px-4 md:px-8">
      {/* Section header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
        >
          Journey
        </h2>
        <p className="text-slate-400 text-lg">My Path in Tech</p>
      </motion.div>

      {/* Timeline container */}
      <div
        ref={containerRef}
        className="relative max-w-5xl mx-auto"
      >
        {/* Center vertical line — desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{ backgroundImage: 'var(--timeline-line-gradient)' }}
          />
          <motion.div
            className="absolute top-0 left-0 right-0 rounded-full"
            style={{ backgroundImage: 'var(--timeline-line-gradient)', height: lineHeight }}
          />
        </div>

        {/* Left line — mobile */}
        <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-0.5">
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{ backgroundImage: 'var(--timeline-line-gradient)' }}
          />
          <motion.div
            className="absolute top-0 left-0 right-0 rounded-full"
            style={{ backgroundImage: 'var(--timeline-line-gradient)', height: lineHeight }}
          />
        </div>

        {/* Timeline items */}
        {timelineData.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
