import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Mail } from 'lucide-react';

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FaGithub size={20} />,
    href: 'https://github.com/',
    label: 'GitHub',
  },
  {
    icon: <FaLinkedinIn size={20} />,
    href: 'https://linkedin.com/',
    label: 'LinkedIn',
  },
  {
    icon: <Mail size={20} />,
    href: 'mailto:contact@example.com',
    label: 'Email',
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full py-12 px-6">
      {/* Top gradient border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Social Icons */}
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="relative p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/40 transition-all duration-300 group"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              {social.icon}
              {/* Hover glow */}
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyber-blue/5 shadow-[0_0_15px_rgba(0,212,255,0.15)]" />
            </motion.a>
          ))}
        </motion.div>

        {/* Built by */}
        <motion.p
          className="text-sm text-slate-500 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Designed &amp; Built by{' '}
          <span className="text-white font-medium">
            Godaba Sai Praneeth
          </span>
        </motion.p>

        {/* Copyright */}
        <motion.p
          className="text-xs gradient-text font-medium tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          © 2026 All rights reserved
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
