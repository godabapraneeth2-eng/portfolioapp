// @ts-nocheck
import { motion } from "framer-motion";
import {
  Brain,
  Layers,
  Globe,
  Monitor,
  Server,
  Database,
  Cpu,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "AI Solutions",
    icon: Brain,
    description:
      "Custom AI models, intelligent chatbots, and smart automation systems",
  },
  {
    title: "Full Stack Development",
    icon: Layers,
    description:
      "End-to-end web applications with modern tech stacks",
  },
  {
    title: "Web Application Development",
    icon: Globe,
    description:
      "Responsive, performant web apps with stunning UIs",
  },
  {
    title: "Frontend Development",
    icon: Monitor,
    description:
      "Beautiful, interactive interfaces with React and modern CSS",
  },
  {
    title: "Backend Development",
    icon: Server,
    description:
      "Robust APIs and server-side architecture with Spring Boot",
  },
  {
    title: "Database Design",
    icon: Database,
    description:
      "Efficient database schemas and query optimization",
  },
  {
    title: "AI Integration",
    icon: Cpu,
    description:
      "Integrating AI capabilities into existing applications",
  },
  {
    title: "Automation Solutions",
    icon: Zap,
    description:
      "Streamlining workflows with intelligent automation",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group relative p-6 rounded-xl border border-glass-border bg-glass/5 backdrop-blur-md transition-all duration-500 cursor-pointer hover:border-cyber-blue/30 hover:shadow-[0_0_30px_rgba(0,212,255,0.15),0_0_60px_rgba(0,212,255,0.05)]"
    >
      {/* Icon container */}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "var(--service-icon-gradient)",
        }}
      >
        <Icon
          className="w-7 h-7 text-cyber-blue transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
        />
      </div>

      {/* Text */}
      <h3 className="text-white font-semibold text-lg mb-2">
        {service.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Hover corner glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at top right, rgba(0,212,255,0.08), transparent 60%)",
        }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-4 md:px-8">
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
        >
          Services
        </h2>
        <p className="text-slate-400 text-lg">What I Can Build For You</p>
      </motion.div>

      {/* Services grid */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </motion.div>
    </section>
  );
}
