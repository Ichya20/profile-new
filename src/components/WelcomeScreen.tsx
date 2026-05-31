import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Braces, Check, Code2, Cpu, Database, Sparkles } from "lucide-react";

type WelcomeScreenProps = {
  onFinish: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.64, ease },
  },
};

const bootItems = [
  { label: "Interface", icon: Code2 },
  { label: "Database", icon: Database },
  { label: "AI Layer", icon: Cpu },
  { label: "Ready", icon: Sparkles },
];

export default function WelcomeScreen({ onFinish }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(progressTimer);

          window.setTimeout(() => {
            setLeaving(true);

            window.setTimeout(() => {
              onFinish();
            }, 650);
          }, 450);

          return 100;
        }

        return Math.min(prev + 5, 100);
      });
    }, 70);

    return () => window.clearInterval(progressTimer);
  }, [onFinish]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020202] px-4 text-white transition-all duration-700 ${
        leaving ? "scale-[1.04] opacity-0 blur-md" : "scale-100 opacity-100 blur-0"
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.07] [mask-image:radial-gradient(circle_at_center,black,transparent_74%)]" />
      <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.22),transparent_64%)] blur-3xl" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/35 to-transparent" />

      <motion.div
        variants={item}
        className="relative z-10 w-full max-w-[780px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.025] p-1 shadow-[0_34px_100px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
      >
        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/[0.06] bg-black/45">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.2),transparent_48%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.08]" />

          <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[#777]">
              <Cpu className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              portfolio.boot
            </div>
          </div>

          <div className="relative z-10 px-6 py-10 text-center sm:px-10 sm:py-12">
            <motion.div
              variants={item}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[1.7rem] border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10 shadow-[0_0_60px_rgba(204,0,0,0.2)]"
            >
              <Braces className="h-8 w-8 text-[var(--color-accent)]" />
            </motion.div>

            <motion.div variants={item}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--color-accent)]">
                Initializing Portfolio
              </p>

              <h1 className="font-display text-[clamp(2.8rem,7vw,5.8rem)] font-black uppercase leading-[0.85] tracking-[-0.08em]">
                Ichya
                <br />
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.75)]">
                  Ulumiddiin
                </span>
                <span className="text-[var(--color-accent)]">.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-[520px] text-[14px] leading-[1.8] text-[#a7a7a7]">
                Preparing interface, project archive, and system modules.
              </p>
            </motion.div>

            <motion.div variants={item} className="mx-auto mt-9 max-w-[560px]">
              <div className="mb-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-[#777]">
                <span>Loading Interface</span>
                <span className="text-[var(--color-accent)]">{progress}%</span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[var(--color-accent)] shadow-[0_0_24px_rgba(204,0,0,0.9)] transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {bootItems.map(({ label, icon: Icon }, index) => {
                  const completed = progress >= (index + 1) * 25;

                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + index * 0.1, duration: 0.45, ease }}
                      className={`rounded-2xl border px-3 py-3 transition-colors duration-300 ${
                        completed
                          ? "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10"
                          : "border-white/10 bg-white/[0.025]"
                      }`}
                    >
                      <div className="mb-2 flex justify-center">
                        {completed ? (
                          <Check className="h-4 w-4 text-[var(--color-accent)]" />
                        ) : (
                          <Icon className="h-4 w-4 text-[#777]" />
                        )}
                      </div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#aaa]">
                        {label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
