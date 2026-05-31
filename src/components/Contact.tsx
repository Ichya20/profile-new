import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import React, { ReactNode, useRef, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Command,
  Copy,
  Github,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

type FormState = "idle" | "typing" | "sending" | "sent";

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease },
  },
};

const contactChannels = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "ichyaulumiddin22@gmail.com",
    href: "mailto:ichyaulumiddin22@gmail.com",
    meta: "Primary channel",
  },
  {
    icon: <Github className="h-5 w-5" />,
    label: "GitHub",
    value: "github.com/Ichya20",
    href: "https://github.com/Ichya20",
    meta: "Code archive",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+62 831-1314-0251",
    href: "tel:+6283113140251",
    meta: "Direct contact",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    value: "Brebes, IDN",
    href: null,
    meta: "Local node",
  },
];

const availability = [
  { label: "Status", value: "Open", icon: Wifi },
  { label: "Mode", value: "Collab", icon: Sparkles },
  { label: "Reply", value: "Manual", icon: ShieldCheck },
];

const MagneticCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 140, damping: 20, mass: 0.14 });
  const springY = useSpring(y, { stiffness: 140, damping: 20, mass: 0.14 });

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

const InputShell = ({
  label,
  active,
  children,
}: {
  label: string;
  active: boolean;
  children: ReactNode;
}) => (
  <div
    className={`relative overflow-hidden rounded-3xl border bg-white/[0.025] p-5 transition-all duration-300 ${
      active ? "border-[var(--color-accent)] shadow-[0_0_40px_rgba(204,0,0,0.12)]" : "border-white/10"
    }`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.12),transparent_42%)] opacity-0 transition-opacity duration-500 group-focus-within:opacity-100" />
    <label
      className={`mb-3 block font-mono text-[9px] uppercase tracking-[0.22em] transition-colors duration-300 ${
        active ? "text-[var(--color-accent)]" : "text-[#666]"
      }`}
    >
      {label}
    </label>
    {children}
  </div>
);

export const Contact: React.FC = () => {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "14%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const lineScale = useSpring(useTransform(scrollYProgress, [0.18, 0.72], [0, 1]), {
    stiffness: 70,
    damping: 24,
  });

  const startTyping = (field: string) => {
    setFocusedField(field);
    setFormState("typing");
  };

  const stopTyping = () => {
    setFocusedField(null);
    setFormState("idle");
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ichyaulumiddin22@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormState("sending");

    setTimeout(() => {
      setFormState("sent");
      setTimeout(() => setFormState("idle"), 5000);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden border-t border-white/[0.06] bg-[#010101] px-4 py-28 text-white sm:px-6 md:px-12 lg:px-20 lg:py-36"
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:58px_58px] [mask-image:radial-gradient(circle_at_center,black,transparent_74%)]" />
      </motion.div>

      <div className="pointer-events-none absolute -right-48 top-1/4 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.2),transparent_64%)] blur-3xl" />
      <div className="pointer-events-none absolute left-[-5%] top-12 font-display text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.022]">
        Relay
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <motion.div
          variants={fadeItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mb-16 grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end"
        >
          <div>
            <div className="mb-7 flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
              <Command className="h-4 w-4 animate-[spin_5s_linear_infinite]" />
              07 — Contact Relay
            </div>
            <motion.h2
              style={{ y: titleY }}
              className="font-display text-[clamp(3.3rem,8.8vw,8.5rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]"
            >
              Let&apos;s
              <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.75)]">
                Connect
              </span>
              <span className="text-[var(--color-accent)]">.</span>
            </motion.h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Availability Capsule
                </p>
                <p className="mt-2 font-display text-2xl font-bold">Ready to Build</p>
              </div>
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/10">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
                <span className="h-3 w-3 rounded-full bg-[var(--color-accent)]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {availability.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                  <Icon className="mb-3 h-4 w-4 text-[var(--color-accent)]" />
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#777]">{label}</p>
                  <p className="mt-1 font-display text-base font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr]">
          <div className="space-y-6">
            <MagneticCard className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#050505]/90 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.58)] backdrop-blur-2xl md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.18),transparent_46%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.08]" />

              <div className="relative z-10">
                <div className="mb-8 flex items-start justify-between gap-5">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                      Direct Channel
                    </p>
                    <h3 className="mt-3 font-display text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-white md:text-5xl">
                      Send me<br />a signal
                    </h3>
                  </div>
                  <MessageSquareText className="h-10 w-10 text-[var(--color-accent)]" strokeWidth={1.4} />
                </div>

                <p className="border-l border-white/10 pl-5 text-[15px] leading-[1.8] text-[#a7a7a7]">
                  Open for collaboration, portfolio feedback, project discussion, internships, and experimental AI/web builds.
                </p>

                <div className="mt-8 rounded-3xl border border-white/10 bg-black/35 p-4">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#777]">Primary Email</p>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-[#999] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-white"
                    >
                      <Copy className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <a
                    href="mailto:ichyaulumiddin22@gmail.com"
                    className="block truncate font-mono text-[13px] font-bold text-white transition-colors duration-300 hover:text-[var(--color-accent)]"
                  >
                    ichyaulumiddin22@gmail.com
                  </a>
                </div>
              </div>
            </MagneticCard>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactChannels.map((channel, index) => (
                <motion.div
                  key={channel.label}
                  initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: index * 0.06, ease }}
                  className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-5 backdrop-blur-2xl transition-colors duration-500 hover:border-[var(--color-accent)]/80"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.16),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/35 text-[#777] transition-colors duration-500 group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                        {channel.icon}
                      </div>
                      {channel.href && (
                        <ArrowUpRight className="h-4 w-4 text-[#555] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]" />
                      )}
                    </div>

                    <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#777]">{channel.meta}</p>
                    <h4 className="mt-2 font-display text-xl font-bold text-white">{channel.label}</h4>

                    {channel.href ? (
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 block truncate font-mono text-[11px] text-[#a7a7a7] transition-colors duration-300 hover:text-[var(--color-accent)]"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="mt-3 font-mono text-[11px] text-[#a7a7a7]">{channel.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <MagneticCard>
            <div className="relative min-h-[720px] overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#050505]/90 shadow-[0_34px_100px_rgba(0,0,0,0.72)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,0,0,0.2),transparent_45%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.08]" />

              <div className="relative z-10 flex min-h-[720px] flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#777]">message-dock.ui</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#777]">
                    <Terminal className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    {formState === "idle" ? "Idle" : formState}
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col p-6 md:p-9 lg:p-11">
                  <AnimatePresence mode="wait">
                    {formState === "sent" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.45, ease }}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-[2.6rem] bg-black/85 p-8 text-center backdrop-blur-xl"
                      >
                        <CheckCircle2 className="mb-6 h-16 w-16 text-[var(--color-accent)]" />
                        <h3 className="font-display text-4xl font-black uppercase tracking-tight text-white">Message Ready</h3>
                        <p className="mt-4 max-w-md font-mono text-[11px] uppercase leading-[1.8] tracking-[0.16em] text-[#a7a7a7]">
                          Form simulation complete. Send through email/GitHub for real delivery.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mb-9 flex items-start justify-between gap-5">
                    <div>
                      <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        <Zap className="h-4 w-4" />
                        Compose Panel
                      </div>
                      <h3 className="font-display text-[clamp(2rem,4.4vw,4.35rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-white">
                        Build a<br />message
                      </h3>
                    </div>

                    <div className="hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:block">
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#777]">Relay Path</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                        <motion.div
                          style={{ scaleX: lineScale, transformOrigin: "left" }}
                          className="h-px w-20 bg-[var(--color-accent)]"
                        />
                        <span className="h-2 w-2 rounded-full bg-white/25" />
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="relative z-10 flex flex-1 flex-col gap-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <InputShell label="Sender_ID" active={focusedField === "name"}>
                        <input
                          type="text"
                          onFocus={() => startTyping("name")}
                          onBlur={stopTyping}
                          className="w-full bg-transparent font-mono text-[13px] text-white outline-none placeholder:text-white/10"
                          placeholder="your name"
                          required
                        />
                      </InputShell>

                      <InputShell label="Return_Addr" active={focusedField === "email"}>
                        <input
                          type="email"
                          onFocus={() => startTyping("email")}
                          onBlur={stopTyping}
                          className="w-full bg-transparent font-mono text-[13px] text-white outline-none placeholder:text-white/10"
                          placeholder="your@email.com"
                          required
                        />
                      </InputShell>
                    </div>

                    <InputShell label="Subject_Node" active={focusedField === "subject"}>
                      <input
                        type="text"
                        onFocus={() => startTyping("subject")}
                        onBlur={stopTyping}
                        className="w-full bg-transparent font-mono text-[13px] text-white outline-none placeholder:text-white/10"
                        placeholder="collaboration / project / question"
                        required
                      />
                    </InputShell>

                    <div className={`relative flex flex-1 flex-col overflow-hidden rounded-[2rem] border bg-white/[0.025] p-5 transition-colors duration-300 ${
                      focusedField === "message" ? "border-[var(--color-accent)]" : "border-white/10"
                    }`}>
                      <label className={`mb-3 block font-mono text-[9px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                        focusedField === "message" ? "text-[var(--color-accent)]" : "text-[#666]"
                      }`}>
                        Data_Payload
                      </label>
                      <textarea
                        onFocus={() => startTyping("message")}
                        onBlur={stopTyping}
                        className="min-h-[220px] flex-1 resize-none bg-transparent font-mono text-[13px] leading-[1.8] text-[#d0d0d0] outline-none placeholder:text-white/10"
                        placeholder="Write your message here..."
                        required
                      />
                    </div>

                    <div className="flex flex-col items-stretch justify-between gap-5 sm:flex-row sm:items-center">
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#666]">
                        {formState === "typing" ? (
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[var(--color-accent)]" />
                            Input stream active
                          </span>
                        ) : formState === "sending" ? (
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500" />
                            Preparing payload
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#555]" />
                            Waiting for input
                          </span>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={formState === "sending"}
                        className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[var(--color-accent)] px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_50px_rgba(204,0,0,0.24)] transition-colors duration-300 hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-70"
                      >
                        {formState === "sending" ? "Preparing" : "Prepare Message"}
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </MagneticCard>
        </div>
      </div>
    </section>
  );
};
