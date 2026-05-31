import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import React, { ReactNode, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Bot,
  Braces,
  Code2,
  Database,
  FolderGit2,
  Gauge,
  Orbit,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TerminalSquare,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type Project = {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  desc: string;
  tech: string[];
  stats: Record<string, string>;
  icon: ReactNode;
  link: string;
};

const projects: Project[] = [
  {
    id: "PRJ-001",
    title: "UTBK-SNBT Quiz App",
    shortTitle: "Quiz App",
    category: "Mobile Architecture",
    desc: "Android quiz application engineered for university entrance exam preparation. Combines robust relational mapping with a highly responsive Kotlin-based UI layer.",
    tech: ["Kotlin", "Jetpack Compose", "Firebase Firestore", "Android SDK"],
    stats: { Env: "Android", Database: "NoSQL", Status: "Stable" },
    icon: <Smartphone className="h-6 w-6" />,
    link: "#",
  },
  {
    id: "PRJ-002",
    title: "BioGate Sentinel",
    shortTitle: "BioGate",
    category: "Computer Vision / Security",
    desc: "Dual-factor biometric security gateway utilizing deep learning for face recognition and voice verification, ensuring high-fidelity identity authentication.",
    tech: ["React 19", "TypeScript", "Laravel", "Python CV"],
    stats: { Accuracy: "99.2%", Latency: "<100ms", Model: "CNN" },
    icon: <ShieldCheck className="h-6 w-6" />,
    link: "#",
  },
  {
    id: "PRJ-003",
    title: "Bookworm Automaton",
    shortTitle: "Automaton",
    category: "Automation Systems",
    desc: "Autonomous Python agent designed to solve word puzzle mechanics using multi-method OCR voting structures to guarantee high-speed accuracy.",
    tech: ["Python", "EasyOCR", "OpenCV", "PyAutoGUI"],
    stats: { WPM: "300+", Voting: "Tri-method", Win_Rate: "100%" },
    icon: <Bot className="h-6 w-6" />,
    link: "#",
  },
];

const headerVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease },
  },
};

const FloatingShell = ({ children }: { children: ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.14 });
  const springY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.14 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.025);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.025);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </motion.div>
  );
};

export const Projects = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden border-y border-white/[0.06] bg-[#020202] px-4 py-28 text-white sm:px-6 md:px-12 lg:px-20 lg:py-36"
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:62px_62px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      </motion.div>

      <div className="pointer-events-none absolute -left-48 top-1/3 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.2),transparent_65%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] top-12 font-display text-[19vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025]">
        Archive
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <motion.div
          variants={headerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mb-16 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end"
        >
          <div>
            <div className="mb-7 flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              <FolderGit2 className="h-4 w-4" />
              05 — Project Observatory
            </div>
            <h2 className="font-display text-[clamp(3.4rem,8.2vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]">
              Work
              <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.75)]">
                Orbit
              </span>
              <span className="text-[var(--color-accent)]">.</span>
            </h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Selection Engine</p>
                <p className="mt-2 font-display text-2xl font-bold">Interactive Case Files</p>
              </div>
              <motion.div style={{ rotate: ringRotate }} className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/15">
                <Orbit className="h-8 w-8 text-[var(--color-accent)]" strokeWidth={1.2} />
              </motion.div>
            </div>
            <p className="border-l border-white/10 pl-5 text-[14px] leading-[1.75] text-[#9f9f9f]">
              Pick a node from the orbit selector to inspect the project payload, stack, metrics, and execution path.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[620px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#050505]/85 p-5 backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.15),transparent_58%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.08]" />

            <div className="relative z-10 flex min-h-[560px] flex-col items-center justify-center">
              <motion.div style={{ rotate: ringRotate }} className="absolute h-[460px] w-[460px] rounded-full border border-dashed border-white/10 sm:h-[520px] sm:w-[520px]" />
              <motion.div style={{ rotate: useTransform(ringRotate, (value) => -value * 0.7) }} className="absolute h-[330px] w-[330px] rounded-full border border-white/10 sm:h-[380px] sm:w-[380px]" />

              <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-[var(--color-accent)]/25 bg-black/60 shadow-[0_0_70px_rgba(204,0,0,0.18)] backdrop-blur-xl sm:h-64 sm:w-64">
                <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />
                <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.18),transparent_65%)]" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
                    transition={{ duration: 0.38, ease }}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      {activeProject.icon}
                    </div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">{activeProject.id}</p>
                    <p className="mt-2 max-w-[170px] font-display text-xl font-bold uppercase leading-tight">{activeProject.shortTitle}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {projects.map((project, index) => {
                const positions = [
                  "left-1/2 top-6 -translate-x-1/2",
                  "right-4 top-1/2 -translate-y-1/2 sm:right-8",
                  "bottom-6 left-1/2 -translate-x-1/2",
                ];
                const isActive = activeIndex === index;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`absolute ${positions[index]} group z-20 flex w-[180px] items-center gap-3 rounded-3xl border p-3 text-left backdrop-blur-2xl transition-all duration-500 ${
                      isActive
                        ? "border-[var(--color-accent)] bg-[rgba(204,0,0,0.14)] shadow-[0_22px_55px_rgba(204,0,0,0.18)]"
                        : "border-white/10 bg-black/70 hover:border-white/25 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-500 ${
                      isActive ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-white/10 text-[#777] group-hover:text-white"
                    }`}>
                      {project.icon}
                    </span>
                    <span>
                      <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-[#777]">{project.id}</span>
                      <span className={`block font-display text-sm font-bold uppercase leading-tight ${isActive ? "text-white" : "text-[#aaa]"}`}>
                        {project.shortTitle}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <FloatingShell>
            <div className="relative min-h-[620px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#050505]/90 shadow-[0_34px_100px_rgba(0,0,0,0.72)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.18),transparent_46%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.08]" />

              <div className="relative z-10 flex min-h-[620px] flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#777]">
                    <TerminalSquare className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    Case.Payload
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.45, ease }}
                    className="grid flex-1 gap-0 lg:grid-cols-[1fr_220px]"
                  >
                    <div className="flex flex-col p-6 md:p-9 lg:p-11">
                      <div className="mb-8 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                          {activeProject.icon}
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">{activeProject.id}</p>
                          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#777]">{activeProject.category}</p>
                        </div>
                      </div>

                      <h3 className="max-w-3xl font-display text-[clamp(2.8rem,5.5vw,5.8rem)] font-black uppercase leading-[0.86] tracking-[-0.08em] text-white">
                        {activeProject.title}
                      </h3>

                      <p className="mt-8 max-w-3xl text-[15px] leading-[1.85] text-[#a7a7a7] md:text-[17px]">
                        {activeProject.desc}
                      </p>

                      <div className="mt-10 grid gap-3 sm:grid-cols-3">
                        {Object.entries(activeProject.stats).map(([key, value]) => (
                          <div key={key} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
                            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#777]">{key}</p>
                            <p className="mt-2 font-display text-xl font-bold text-white">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10">
                        <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-[#777]">Build Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tech.map((tag, index) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.12 + index * 0.04, ease }}
                              className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#cfcfcf]"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-12">
                        <a
                          href={activeProject.link}
                          className="group inline-flex items-center gap-3 rounded-2xl bg-[var(--color-accent)] px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_50px_rgba(204,0,0,0.24)] transition-colors duration-300 hover:bg-white hover:text-black"
                        >
                          Open Source Node
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>
                      </div>
                    </div>

                    <div className="border-t border-white/10 bg-black/30 p-6 lg:border-l lg:border-t-0">
                      <div className="grid gap-3">
                        {[
                          { label: "Visual", value: "Hologram", icon: Sparkles },
                          { label: "Logic", value: "Structured", icon: Braces },
                          { label: "Signal", value: "Live", icon: Activity },
                          { label: "Metric", value: "Tracked", icon: Gauge },
                        ].map(({ label, value, icon: Icon }) => (
                          <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                            <Icon className="mb-4 h-5 w-5 text-[var(--color-accent)]" />
                            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#777]">{label}</p>
                            <p className="mt-2 font-display text-lg font-bold text-white">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </FloatingShell>
        </div>
      </div>
    </section>
  );
};
