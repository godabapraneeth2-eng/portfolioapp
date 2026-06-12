import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface ContactInfo {
  icon: LucideIcon | IconType;
  label: string;
  value: string;
  href?: string;
}

const contactInfoItems: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "praneethsai@example.com",
    href: "mailto:praneethsai@example.com",
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    value: "Godaba Sai Praneeth",
    href: "#",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/saipraneeth",
    href: "#",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Andhra Pradesh, India",
  },
];

function FloatingInput({
  id,
  label,
  type = "text",
  required = false,
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  const baseClasses =
    "w-full bg-dark-800 border border-glass-border rounded-lg px-4 pt-5 pb-2 text-white placeholder-transparent outline-none transition-all duration-300 focus:border-cyber-blue focus:shadow-[0_0_15px_rgba(0,212,255,0.15)]";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          required={required}
          className={`${baseClasses} resize-none`}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          className={baseClasses}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
        />
      )}
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? "top-1 text-xs text-cyber-blue"
            : "top-3.5 text-sm text-slate-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8">
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
          Get In Touch
        </h2>
        <p className="text-slate-400 text-lg">
          Let&apos;s Build Something Amazing Together
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* LEFT – Contact info (2/5) */}
        <motion.div
          className="lg:col-span-2 flex flex-col gap-4"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {contactInfoItems.map((item) => {
            const Icon = item.icon;
            const Wrapper = item.href ? "a" : "div";
            return (
              <motion.div
                key={item.label}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Wrapper
                  {...(item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-4 p-4 rounded-xl border border-glass-border bg-glass/5 backdrop-blur-md transition-all duration-300 hover:border-cyber-blue/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] cursor-pointer no-underline"
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)" }}
                  >
                    <Icon className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}

          <p className="text-slate-500 text-sm mt-4 leading-relaxed">
            Let&apos;s connect and create something extraordinary. I&apos;m
            always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* RIGHT – Contact form (3/5) */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="p-6 md:p-8 rounded-2xl border border-glass-border bg-glass/5 backdrop-blur-md"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput id="name" label="Name" required />
                <FloatingInput id="email" label="Email" type="email" required />
              </div>
              <FloatingInput id="subject" label="Subject" required />
              <FloatingInput id="message" label="Message" textarea required />

              {/* Submit */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-lg bg-neon-green/20 text-neon-green font-semibold"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Message Sent Successfully!
                  </motion.div>
                ) : (
                  <motion.button
                    key="button"
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-cyber-blue text-dark-900 font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {sending ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-dark-900/30 border-t-dark-900 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
