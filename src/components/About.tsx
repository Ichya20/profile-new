import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import React, { ReactNode, useRef } from "react";
import {
  BrainCircuit,
  Code2,
  Crosshair,
  Database,
  Eye,
  Fingerprint,
  Layers3,
  Radar,
  Server,
  Sparkles,
} from "lucide-react";

const cardEase = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: cardEase },
  },
};

const interests = [
  {
    title: "AI Engineering",
    desc: "Building AI-powered systems that can be used directly in real-world applications.",
    icon: BrainCircuit,
  },
  {
    title: "Machine Learning",
    desc: "Learning models, datasets, training workflows, evaluation methods, and practical machine learning implementation.",
    icon: Sparkles,
  },
  {
    title: "Computer Vision",
    desc: "Interested in image processing, face recognition, object detection, and OCR.",
    icon: Eye,
  },
  {
    title: "Data & Automation",
    desc: "Processing data, creating automated workflows, and building efficient tools.",
    icon: Database,
  },
  {
    title: "Full-Stack AI App",
    desc: "Combining frontend, backend, databases, and AI into complete applications.",
    icon: Layers3,
  },
  {
    title: "Backend System",
    desc: "Building clean server structures, APIs, and secure data integrations.",
    icon: Server,
  },
];

const stack = ["React", "TypeScript", "Python", "Firebase", "Machine Learning", "Computer Vision", "OCR", "AI Engineering"];

const BentoCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.12 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.045);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.045);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={item}
      transition={{ delay }}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors duration-500 hover:border-[var(--color-accent)]/70 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.18),transparent_42%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px] opacity-0 transition-opacity duration-700 group-hover:opacity-[0.13]" />
      <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-[var(--color-accent)]/0 transition-colors duration-500 group-hover:border-[var(--color-accent)]" />
      <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-[var(--color-accent)]/0 transition-colors duration-500 group-hover:border-[var(--color-accent)]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["-8%", "10%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const rotateRadar = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const lineScale = useSpring(useTransform(scrollYProgress, [0.12, 0.72], [0, 1]), {
    stiffness: 70,
    damping: 24,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-[#020202] px-4 py-28 text-white sm:px-6 md:px-12 lg:px-20 lg:py-36"
    >
      <motion.div
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      </motion.div>

      <div className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.18),transparent_64%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--color-accent)]/30 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="relative">
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: cardEase }}
              className="mb-7 flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-70" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              01 — About Me
            </motion.div>

            <motion.h2
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: cardEase }}
              className="font-display text-[clamp(3.5rem,9vw,8.5rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]"
            >
              <span className="block">About</span>
              <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.72)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.72)]">
                Me
              </span>
              <span className="text-[var(--color-accent)]">.</span>
            </motion.h2>

            <div className="mt-10 flex items-center gap-6">
              <motion.div
                style={{ rotate: rotateRadar }}
                className="relative h-24 w-24 rounded-full border border-dashed border-white/15"
              >
                <Radar className="absolute inset-0 m-auto h-16 w-16 text-[var(--color-accent)]/70" strokeWidth={1} />
                <Crosshair className="absolute inset-0 m-auto h-full w-full text-white/10" strokeWidth={0.8} />
                <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_24px_rgba(204,0,0,0.9)]" />
              </motion.div>

              <div className="max-w-[280px] font-mono text-[10px] uppercase tracking-[0.22em] text-[#777]">
                Focused on AI engineering, machine learning, computer vision, and application development.
              </div>
            </div>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          className="grid gap-5 md:grid-cols-2"
        >
          <BentoCard className="p-7 md:col-span-2 md:p-9">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <Fingerprint className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)]">Profile</p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">Ichya Ulumiddiin</h3>
                </div>
              </div>
              <Code2 className="hidden h-10 w-10 text-white/10 md:block" />
            </div>

            <p className="max-w-3xl text-[15px] leading-[1.8] text-[#a7a7a7] md:text-[17px]">
              An Informatics student at Telkom University Purwokerto with a strong interest in AI Engineering, Machine Learning, Computer Vision, and full-stack application development. I enjoy building systems that connect web interfaces, backend services, databases, and AI models into practical real-world applications.
            </p>

            <div className="mt-8 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                style={{ scaleX: lineScale, transformOrigin: "left" }}
                className="h-full w-full bg-gradient-to-r from-[var(--color-accent)] to-transparent"
              />
            </div>
          </BentoCard>

          <BentoCard className="p-7 md:col-span-2 md:p-9">
            <div className="mb-7 flex items-center gap-3">
              <BrainCircuit className="h-5 w-5 text-[var(--color-accent)]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8a8a]">Interest</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {interests.map(({ title, desc, icon: Icon }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-black/30 p-5 transition-colors duration-300 hover:border-[var(--color-accent)]/60">
                  <Icon className="mb-4 h-5 w-5 text-[var(--color-accent)]" />
                  <h4 className="font-display text-lg font-bold text-white">{title}</h4>
                  <p className="mt-3 text-[14px] leading-[1.7] text-[#bdbdbd]">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#c7c7c7]"
                >
                  {item}
                </span>
              ))}
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
};
