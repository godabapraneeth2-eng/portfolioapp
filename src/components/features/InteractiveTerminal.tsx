import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface TerminalLine {
  command: string;
  response: string;
}

const lines: TerminalLine[] = [
  { command: "whoami", response: "Godaba Sai Praneeth" },
  { command: "cat role.txt", response: "AI Engineer & Full Stack Developer" },
  {
    command: "ls skills/",
    response: "React  Java  Python  Spring-Boot  MySQL  TensorFlow",
  },
  { command: "wc -l projects/", response: "2 major projects built and deployed" },
  { command: 'echo $STATUS', response: "Ready to build the future 🚀" },
];

const CHAR_DELAY = 40;
const LINE_PAUSE = 400;

export default function InteractiveTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayedLines, setDisplayedLines] = useState<
    { prompt: string; response: string; typing: boolean }[]
  >([]);
  const [started, setStarted] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [displayedLines]);

  const typeSequence = useCallback(async () => {
    for (let i = 0; i < lines.length; i++) {
      const { command, response } = lines[i];

      // Type command character by character
      for (let c = 0; c <= command.length; c++) {
        const partial = command.slice(0, c);
        setDisplayedLines((prev) => {
          const next = [...prev];
          if (next.length <= i) {
            next.push({ prompt: partial, response: "", typing: true });
          } else {
            next[i] = { ...next[i], prompt: partial, typing: true };
          }
          return next;
        });
        await new Promise((r) => setTimeout(r, CHAR_DELAY));
      }

      // Show response
      await new Promise((r) => setTimeout(r, LINE_PAUSE / 2));
      setDisplayedLines((prev) => {
        const next = [...prev];
        next[i] = { prompt: command, response, typing: false };
        return next;
      });
      await new Promise((r) => setTimeout(r, LINE_PAUSE));
    }
  }, []);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      typeSequence();
    }
  }, [isInView, started, typeSequence]);

  const isTyping =
    displayedLines.length > 0 &&
    displayedLines[displayedLines.length - 1].typing;
  const allDone = displayedLines.length === lines.length && !isTyping;

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-glass-border bg-glass/5 backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-glass-border bg-glass/20"
      >
        <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
        <span className="w-3 h-3 rounded-full" style={{ background: "#27C93F" }} />
        <span className="ml-3 text-xs text-slate-500 font-mono">
          terminal — portfolio
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={bodyRef}
        className="p-4 md:p-5 font-mono text-sm leading-relaxed overflow-y-auto"
        style={{
          background: "#0A0A0A",
          fontFamily: "'JetBrains Mono', ui-monospace, Consolas, monospace",
          maxHeight: 320,
          minHeight: 200,
        }}
      >
        {displayedLines.map((line, idx) => (
          <div key={idx} className="mb-2">
            {/* Command line */}
            <div className="flex items-start gap-0">
              <span style={{ color: "#00D4FF" }}>$&nbsp;</span>
              <span style={{ color: "#00FF88" }}>
                {line.prompt}
                {line.typing && (
                  <motion.span
                    className="inline-block w-2 h-4 ml-0.5 align-middle"
                    style={{ background: "#00FF88" }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                )}
              </span>
            </div>
            {/* Response */}
            {line.response && (
              <div className="text-white/90 ml-4 mt-0.5">{line.response}</div>
            )}
          </div>
        ))}

        {/* Blinking cursor after everything */}
        {allDone && (
          <div className="flex items-center gap-0 mt-1">
            <span style={{ color: "#00D4FF" }}>$&nbsp;</span>
            <motion.span
              className="inline-block w-2 h-4"
              style={{ background: "#00FF88" }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
