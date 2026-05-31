import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import React, { ReactNode, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  ChevronRight,
  Code2,
  Database,
  Eye,
  FileCode2,
  GraduationCap,
  Library,
  MapPin,
  School,
  Sparkles,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type EducationItem = {
  period: string;
  level: string;
  institution: string;
  location: string;
  status: string;
  description: string;
  highlights: string[];
  icon: ReactNode;
  tags: string[];
  code: string;
};

const educationItems: EducationItem[] = [
  {
    code: "EDU-01",
    period: "2024 — Present",
    level: "Bachelor Degree",
    institution: "Telkom University Purwokerto",
    location: "Purwokerto, Indonesia",
    status: "In Progress",
    description:
      "Currently studying Informatics Engineering with a strong interest in AI Engineering, Machine Learning, Computer Vision, data processing, and full-stack application development.",
    highlights: [
      "Learning software engineering fundamentals and system design.",
      "Building practical projects with web, database, and AI workflows.",
      "Exploring how intelligent models can be integrated into real applications.",
    ],
    icon: <GraduationCap className="h-6 w-6" />,
    tags: ["Informatics", "AI Engineering", "Machine Learning", "Computer Vision"],
  },
  {
    code: "EDU-02",
    period: "2021 — 2024",
    level: "Senior High School",
    institution: "SMA Negeri 01 Tanjung",
    location: "Tanjung, Indonesia",
    status: "Graduated",
    description:
      "Completed the science track with a strong foundation in logical thinking, mathematics, and structured problem solving.",
    highlights: [
      "Graduated from the science major.",
      "Developed early interest in technology and programming.",
      "Built academic discipline before continuing into Informatics Engineering.",
    ],
    icon: <School className="h-6 w-6" />,
    tags: ["Science", "Mathematics", "Problem Solving", "Foundation"],
  },
];

const learningTracks = [
  { label: "AI Engineering", icon: BrainCircuit },
  { label: "Machine Learning", icon: Sparkles },
  { label: "Computer Vision", icon: Eye },
  { label: "Data Processing", icon: Database },
  { label: "Web Development", icon: Code2 },
  { label: "Programming Logic", icon: FileCode2 },
];

const headerVariant: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease },
  },
};

const MagneticPanel = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 130, damping: 20, mass: 0.14 });
  const springY = useSpring(y, { stiffness: 130, damping: 20, mass: 0.14 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.024);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.024);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Education = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "12%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const progressScale = useSpring(useTransform(scrollYProgress, [0.18, 0.72], [0, 1]), {
    stiffness: 70,
    damping: 24,
  });

  const activeEducation = educationItems[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#020202] px-4 py-28 text-white sm:px-6 md:px-12 lg:px-20 lg:py-36"
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:58px_58px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      </motion.div>

      <div className="pointer-events-none absolute -left-44 top-1/4 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.18),transparent_64%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-8%] top-20 font-display text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025]">
        Study
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
              <GraduationCap className="h-4 w-4" />
              04 — Education
            </div>

            <motion.h2
              style={{ y: titleY }}
              className="font-display text-[clamp(3.4rem,8.5vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]"
            >
              Academic
              <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.75)]">
                Deck
              </span>
              <span className="text-[var(--color-accent)]">.</span>
            </motion.h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Academic Stack
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-white">Education Records</p>
              </div>
              <Library className="h-9 w-9 text-[var(--color-accent)]" strokeWidth={1.2} />
            </div>
            <p className="border-l border-white/10 pl-5 text-[14px] leading-[1.75] text-[#a7a7a7]">
              A compact academic dossier that shows formal education, learning direction, and technical focus areas.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[720px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#050505]/85 p-6 backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(204,0,0,0.18),transparent_46%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.08]" />

            <div className="relative z-10 flex min-h-[660px] flex-col justify-between">
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                      Record Deck
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-black uppercase tracking-[-0.05em] text-white">
                      Select Record
                    </h3>
                  </div>
                  <BookOpen className="h-8 w-8 text-[var(--color-accent)]" />
                </div>

                <div className="relative h-[390px] sm:h-[430px]">
                  {educationItems.map((item, index) => {
                    const isActive = activeIndex === index;
                    const isTop = index === activeIndex;
                    const offset = index - activeIndex;

                    return (
                      <motion.button
                        key={item.institution}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        animate={{
                          y: isTop ? 0 : 72 + Math.abs(offset) * 18,
                          x: isTop ? 0 : offset > 0 ? 28 : -28,
                          rotate: isTop ? 0 : offset > 0 ? 4 : -4,
                          scale: isTop ? 1 : 0.92,
                          opacity: isTop ? 1 : 0.58,
                          zIndex: isTop ? 20 : 10 - Math.abs(offset),
                        }}
                        transition={{ duration: 0.45, ease }}
                        className={`absolute left-0 top-0 min-h-[320px] w-full overflow-hidden rounded-[2.1rem] border p-6 text-left shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-colors duration-500 ${
                          isActive
                            ? "border-[var(--color-accent)] bg-[rgba(204,0,0,0.08)]"
                            : "border-white/10 bg-black/75 hover:border-white/25"
                        }`}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.18),transparent_45%)]" />
                        <div className="absolute right-6 top-6 font-display text-[96px] font-black leading-none tracking-[-0.08em] text-white/[0.035]">
                          0{index + 1}
                        </div>

                        <div className="relative z-10 flex min-h-[268px] flex-col">
                          <div className="mb-8 flex items-start justify-between gap-5">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                              {item.icon}
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-[#aaa]">
                              {item.status}
                            </div>
                          </div>

                          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            {item.code} / {item.period}
                          </p>

                          <h4 className="mt-4 max-w-[430px] font-display text-[clamp(2rem,4vw,3.7rem)] font-black uppercase leading-[0.9] tracking-[-0.07em] text-white">
                            {item.institution}
                          </h4>

                          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                            <div>
                              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#777]">Level</p>
                              <p className="mt-1 font-display text-lg font-bold text-white">{item.level}</p>
                            </div>
                            <ChevronRight className={`h-5 w-5 transition-colors duration-300 ${isActive ? "text-[var(--color-accent)]" : "text-[#555]"}`} />
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {educationItems.map((item, index) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                      activeIndex === index
                        ? "border-[var(--color-accent)] bg-[rgba(204,0,0,0.1)]"
                        : "border-white/10 bg-white/[0.025] hover:border-white/25"
                    }`}
                  >
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[var(--color-accent)]">{item.code}</p>
                    <p className="mt-1 truncate font-display text-base font-bold text-white">{item.level}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <MagneticPanel>
            <div className="relative min-h-[720px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#050505]/90 shadow-[0_34px_100px_rgba(0,0,0,0.72)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.2),transparent_45%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.08]" />

              <div className="relative z-10 flex min-h-[720px] flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[#777]">
                    <BookOpen className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    Academic.Dossier
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEducation.institution}
                    initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -22, filter: "blur(10px)" }}
                    transition={{ duration: 0.45, ease }}
                    className="flex flex-1 flex-col p-6 md:p-9 lg:p-11"
                  >
                    <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                          {activeEducation.icon}
                        </div>

                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            {activeEducation.level}
                          </p>
                          <p className="mt-1 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#777]">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {activeEducation.period}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#aaa]">
                        {activeEducation.status}
                      </div>
                    </div>

                    <h3 className="max-w-3xl font-display text-[clamp(2.6rem,5vw,5.3rem)] font-black uppercase leading-[0.88] tracking-[-0.08em] text-white">
                      {activeEducation.institution}
                    </h3>

                    <p className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#777]">
                      <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                      {activeEducation.location}
                    </p>

                    <p className="mt-8 max-w-3xl text-[15px] leading-[1.85] text-[#a7a7a7] md:text-[17px]">
                      {activeEducation.description}
                    </p>

                    <div className="mt-10 grid gap-3">
                      {activeEducation.highlights.map((highlight, index) => (
                        <div key={highlight} className="group flex gap-4 rounded-3xl border border-white/10 bg-white/[0.025] p-4 transition-colors duration-300 hover:border-[var(--color-accent)]/60">
                          <span className="font-mono text-[10px] text-[var(--color-accent)]">
                            0{index + 1}
                          </span>
                          <p className="text-[14px] leading-[1.7] text-[#bdbdbd]">{highlight}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10">
                      <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-[#777]">
                        Related Focus
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {learningTracks.map(({ label, icon: Icon }) => (
                          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-3">
                            <Icon className="mb-3 h-4 w-4 text-[var(--color-accent)]" />
                            <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#aaa]">{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-2">
                      {activeEducation.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#cfcfcf]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {activeEducation.status === "Graduated" && (
                      <div className="mt-auto pt-10">
                        <div className="inline-flex items-center gap-3 rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                          <Award className="h-4 w-4 text-[var(--color-accent)]" />
                          Science Major Graduate
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </MagneticPanel>
        </div>
      </div>
    </section>
  );
};
