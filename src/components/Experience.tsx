import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import React, { ReactNode, useRef } from "react";
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Clock,
  Code2,
  DatabaseZap,
  GitBranch,
  Layers3,
  LineChart,
  ScanLine,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const cardEase = [0.16, 1, 0.3, 1] as const;

const headerItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: cardEase },
  },
};

type ExperienceItem = {
  date: string;
  role: string;
  company: string;
  status: string;
  icon: ReactNode;
  accent: string;
  bullets: string[];
  tags: string[];
};

const experiences: ExperienceItem[] = [
  {
    date: "2026",
    role: "Website Developer Intern",
    company: "PT Aliqa Muslim Indonesia · Hybrid",
    status: "Project Internship",
    icon: <Terminal className="h-5 w-5" />,
    accent: "EXP_001",
    bullets: [
      "Built and developed company website flow across front-end and back-end areas.",
      "Handled testing, debugging, and interface iteration to improve usability.",
      "Worked in a project-based internship focused on rapid web application delivery.",
    ],
    tags: ["Frontend", "Backend", "Testing"],
  },
  {
    date: "2024",
    role: "Freelance Web Developer",
    company: "Remote · Global",
    status: "Client Work",
    icon: <Code2 className="h-5 w-5" />,
    accent: "EXP_002",
    bullets: [
      "Built responsive websites using modern, scalable web development stacks.",
      "Performed maintenance, debugging, and performance-focused improvements.",
      "Translated client requirements into polished and functional interface features.",
    ],
    tags: ["React", "Responsive", "UI"],
  },
  {
    date: "2024",
    role: "Data Research Specialist",
    company: "Remote · Contract",
    status: "Data Ops",
    icon: <DatabaseZap className="h-5 w-5" />,
    accent: "EXP_003",
    bullets: [
      "Collected and validated datasets from multiple credible sources.",
      "Analyzed raw data and converted findings into spreadsheet-based reports.",
      "Prepared data-driven insights to support strategic decision-making.",
    ],
    tags: ["Research", "Spreadsheet", "Analysis"],
  },
  {
    date: "02-Prs",
    role: "Staff Team Reviewer",
    company: "Satria Muda · Telkom Purwokerto",
    status: "Organization",
    icon: <ShieldCheck className="h-5 w-5" />,
    accent: "EXP_004",
    bullets: [
      "Reviewed performance metrics and content quality with a structured evaluation flow.",
      "Helped maintain organizational standards across collaborative team activities.",
    ],
    tags: ["Review", "Quality", "Team"],
  },
];

const FloatingPanel = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}>
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.18),transparent_42%)]" />
    <div className="relative z-10">{children}</div>
  </div>
);

const ExperienceCard = ({ exp, index }: { exp: ExperienceItem; index: number }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-120px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 60, filter: "blur(12px)" }}
      transition={{ duration: 0.78, delay: index * 0.08, ease: cardEase }}
      className={`relative grid gap-5 lg:grid-cols-2 ${index !== experiences.length - 1 ? "mb-10 lg:mb-16" : ""}`}
    >
      <div className={`hidden lg:flex ${isEven ? "justify-end pr-14 text-right" : "order-2 justify-start pl-14 text-left"}`}>
        <div className="relative pt-8">
          <p className="font-display text-[88px] font-black leading-none tracking-[-0.08em] text-transparent opacity-70 [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]">
            {exp.date}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-[var(--color-accent)]">{exp.status}</p>
        </div>
      </div>

      <div className={`relative ${isEven ? "lg:pl-14" : "lg:order-1 lg:pr-14"}`}>
        <div className="absolute left-[-2.15rem] top-8 z-30 hidden h-5 w-5 rotate-45 border border-[var(--color-accent)] bg-[#050505] shadow-[0_0_28px_rgba(204,0,0,0.65)] lg:block" />
        <div className={`absolute top-10 hidden h-px w-12 bg-gradient-to-r from-[var(--color-accent)] to-transparent lg:block ${isEven ? "left-0" : "right-0 rotate-180"}`} />

        <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505]/80 p-6 backdrop-blur-2xl transition-all duration-500 hover:border-[var(--color-accent)]/80 hover:shadow-[0_26px_80px_rgba(204,0,0,0.14)] md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:18px_18px] opacity-0 transition-opacity duration-700 group-hover:opacity-[0.12]" />
          <motion.div
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <div className="relative z-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[var(--color-accent)] transition-colors duration-300 group-hover:border-[var(--color-accent)]">
                  {exp.icon}
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">{exp.accent}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-white md:text-3xl">{exp.role}</h3>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#9b9b9b] lg:hidden">
                <CalendarDays className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                {exp.date}
              </div>
            </div>

            <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a]">
              <Clock className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              {exp.company}
            </div>

            <ul className="space-y-4">
              {exp.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-[14px] leading-[1.7] text-[#a7a7a7] transition-colors duration-300 group-hover:text-[#d0d0d0] md:text-[15px]">
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#bdbdbd]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const fillHeight = useSpring(useTransform(scrollYProgress, [0.18, 0.82], ["0%", "100%"]), {
    stiffness: 70,
    damping: 24,
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "12%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 240]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-[#020202] px-4 py-28 text-white sm:px-6 md:px-12 lg:px-20 lg:py-36"
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      </motion.div>

      <div className="pointer-events-none absolute -right-40 top-20 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.17),transparent_64%)] blur-3xl" />
      <div className="pointer-events-none absolute left-[-5%] top-24 font-display text-[22vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.025]">
        Runtime
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <motion.div
          variants={headerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mb-20 grid items-end gap-8 lg:grid-cols-[1fr_360px]"
        >
          <div>
            <div className="mb-7 flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_20px_rgba(204,0,0,0.9)]" />
              03 — Experience Timeline
            </div>
            <h2 className="font-display text-[clamp(3.4rem,8.5vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]">
              Experience<span className="text-[var(--color-accent)]">.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-[15px] leading-[1.8] text-[#9b9b9b] md:text-[17px]">
              A runtime log of internships, freelance projects, data work, and organization experience, redesigned as a modern interactive timeline.
            </p>
          </div>

          <FloatingPanel className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Career Signal</p>
                <p className="mt-2 font-display text-2xl font-bold">4 Active Logs</p>
              </div>
              <motion.div style={{ rotate }} className="relative flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-white/15">
                <ScanLine className="h-9 w-9 text-[var(--color-accent)]" strokeWidth={1.2} />
                <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              </motion.div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { label: "Web", icon: Layers3 },
                { label: "Data", icon: LineChart },
                { label: "Team", icon: GitBranch },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-center">
                  <Icon className="mx-auto mb-2 h-4 w-4 text-[var(--color-accent)]" />
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#aaa]">{label}</p>
                </div>
              ))}
            </div>
          </FloatingPanel>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-white/10 lg:left-1/2 lg:block" />
          <motion.div
            style={{ height: fillHeight }}
            className="absolute left-4 top-0 hidden w-[3px] origin-top bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)] to-transparent shadow-[0_0_22px_rgba(204,0,0,0.8)] lg:left-1/2 lg:block lg:-ml-px"
          />

          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.accent} exp={exp} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.25em] text-[#666]">
          <Activity className="h-4 w-4 text-[var(--color-accent)]" />
          Timeline Sync Complete
        </div>
      </div>
    </section>
  );
};
