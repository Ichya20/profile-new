import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import { ArrowDownRight, Bot, Code2, Database, Github, Radio, Sparkles, Terminal, Zap } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const techStack = ["React", "TypeScript", "Firebase", "AI", "Kotlin", "Python"];
const orbitItems = [
  { label: "UI", icon: Sparkles, className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" },
  { label: "AI", icon: Bot, className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2" },
  { label: "DB", icon: Database, className: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2" },
  { label: "DEV", icon: Code2, className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" },
];

export const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 45, stiffness: 260, mass: 0.7 });
  const smoothMouseY = useSpring(mouseY, { damping: 45, stiffness: 260, mass: 0.7 });

  const cardRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const cardRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const auraX = useTransform(smoothMouseX, [-0.5, 0.5], [45, -45]);
  const auraY = useTransform(smoothMouseY, [-0.5, 0.5], [45, -45]);
  const gridX = useTransform(smoothMouseX, [-0.5, 0.5], [-24, 24]);
  const gridY = useTransform(smoothMouseY, [-0.5, 0.5], [-18, 18]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden px-4 pt-24 pb-12 text-white sm:px-6 md:px-12 lg:px-20">
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_center,black,transparent_68%)]" />
      </motion.div>

      <motion.div
        style={{ x: auraX, y: auraY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.24),transparent_62%)] blur-3xl"
      />

      <div className="pointer-events-none absolute left-0 top-28 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute bottom-12 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/25 to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-9rem)] w-full max-w-[1600px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="order-2 flex flex-col justify-center lg:order-1"
        >
          <motion.div
            variants={item}
            className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#bdbdbd]">
              Portfolio OS / Online
            </span>
          </motion.div>

          <motion.div variants={item} className="mb-6 overflow-hidden">
            <h1 className="max-w-[980px] font-display text-[clamp(3.6rem,10vw,9.5rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]">
              <span className="block text-white">Ichya</span>
              <span className="relative block w-fit text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.7)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.75)]">
                Ulumiddiin
                <span className="absolute -right-5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_30px_rgba(204,0,0,0.9)] sm:-right-8 sm:h-4 sm:w-4" />
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-[650px] border-l border-white/10 pl-5 font-sans text-[15px] leading-[1.8] text-[#a7a7a7] md:text-[17px]"
          >
            Building immersive web interfaces, AI-powered systems, and clean digital products with a sharp futuristic visual identity.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="/#projects"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-[var(--color-accent)] px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_16px_50px_rgba(204,0,0,0.28)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explore Projects
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
              <span className="absolute inset-0 z-0 mix-blend-difference" />
            </a>

            <a
              href="/#contact"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#bdbdbd] backdrop-blur-xl transition-colors duration-300 hover:text-white"
            >
              Start Contact
              <Zap className="h-4 w-4 text-[var(--color-accent)] transition-transform duration-300 group-hover:rotate-12" />
            </a>

            <Link
              to="/blog"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a8a8a] transition-colors duration-300 hover:text-white"
            >
              Lab Notes
              <Terminal className="h-4 w-4 text-[var(--color-accent)]" />
            </Link>
          </motion.div>

          <motion.div variants={item} className="mt-10 max-w-[720px]">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(204,0,0,0.16),transparent_45%)]" />
              <div className="relative z-10 flex flex-wrap items-center gap-3">
                {["AI Engineering", "Machine Learning", "Computer Vision", "Full-Stack Development"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#cfcfcf]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="order-1 flex items-center justify-center lg:order-2" style={{ perspective: "1600px" }}>
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.86, rotateX: 12 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.05, delay: 0.18, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: "preserve-3d" }}
            className="group relative h-[430px] w-[320px] sm:h-[520px] sm:w-[390px] xl:h-[590px] xl:w-[440px]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-[42px] border border-dashed border-white/15"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            >
              {orbitItems.map(({ label, icon: Icon, className }) => (
                <div
                  key={label}
                  className={`absolute ${className} flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/80 text-white shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl`}
                >
                  <Icon className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
              ))}
            </motion.div>

            <div className="absolute -inset-5 rounded-[48px] bg-[conic-gradient(from_140deg,transparent,rgba(204,0,0,0.45),transparent,rgba(255,255,255,0.12),transparent)] opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative h-full w-full overflow-hidden rounded-[36px] border border-white/10 bg-[#050505]/90 shadow-[0_30px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_24%,transparent_72%,rgba(204,0,0,0.22))]" />
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-black/45 px-5 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                  <Radio className="h-3.5 w-3.5 text-[var(--color-accent)]" /> Live Build
                </div>
              </div>

              <motion.div
                animate={{ y: ["-120%", "120%"] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/3 bg-gradient-to-b from-transparent via-[var(--color-accent)]/20 to-transparent mix-blend-screen"
              />

              <img
                src="/profile.jpeg"
                alt="Ichya Ulumiddiin Profile"
                className="h-full w-full object-cover object-center opacity-75 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent,rgba(0,0,0,0.55)_62%,rgba(0,0,0,0.9))]" />

              <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
                <div className="rounded-3xl border border-white/10 bg-black/55 p-5 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">Identity Card</p>
                      <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white">Full-Stack Learner</h2>
                    </div>
                    <a
                      href="https://github.com/Ichya20"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#cfcfcf]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.8 }}
        className="pointer-events-none absolute bottom-5 left-4 right-4 z-10 flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.24em] text-[#5d5d5d] sm:left-6 sm:right-6 md:left-12 md:right-12"
      >
        <span>ReactBits x MagicUI inspired</span>
        <span className="hidden sm:inline">shadcn-style glass system</span>
        <span className="hidden md:inline">21st.dev motion language</span>
      </motion.div>
    </section>
  );
};
