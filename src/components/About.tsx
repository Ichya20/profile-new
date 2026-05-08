import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import React, { useRef, ReactNode } from "react";
import { Terminal, Database, BrainCircuit, Code2, Crosshair, Fingerprint } from "lucide-react";

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.015 } },
        hidden: {}
      }}
      className={`relative ${className}`}
    >
      <span className="text-[var(--color-accent)] mr-2 select-none font-bold">&gt;</span>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ease: [0.16, 1, 0.3, 1], duration: 0.6 } }
          }}
        >
          {word}
        </motion.span>
      ))}
      <motion.span 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1 } }
        }}
        className="inline-block w-[6px] h-[1em] bg-[var(--color-accent)] ml-1 align-middle animate-pulse"
      />
    </motion.div>
  );
};

const InteractiveCard: React.FC<{ children: ReactNode, delay?: number, className?: string, title?: string }> = ({ children, delay = 0, className = "", title }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX * 0.1);
    y.set(mouseY * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`group relative overflow-hidden bg-[#050505] border border-[rgba(255,255,255,0.06)] hover:border-[var(--color-accent)] transition-colors duration-500 z-10 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_60%)] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none" />
      
      {/* Tech Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-transparent group-hover:border-[var(--color-accent)] transition-colors duration-500 z-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-transparent group-hover:border-[var(--color-accent)] transition-colors duration-500 z-20 pointer-events-none"></div>

      {title && (
        <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-black font-mono text-[9px] font-bold px-2 py-1 uppercase tracking-widest translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-20 shadow-[-4px_0_10px_rgba(204,0,0,0.2)]">
          {title}
        </div>
      )}

      {/* Ghosting scanline effect on hover */}
      <motion.div
        animate={{ translateY: ['-100%', '300%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.03)] to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yVerticalText = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const rotateWheel = useTransform(scrollYProgress, [0, 1], [0, 270]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const stats = [
    { value: "03+", label: "Years Coding", icon: <Code2 /> },
    { value: "10+", label: "System Projects", icon: <Terminal /> },
    { value: "02", label: "Dev Internships", icon: <Database /> },
    { value: "01", label: "AI Frameworks", icon: <BrainCircuit /> }
  ];

  return (
    <section ref={containerRef} className="bg-[#030303] w-full px-6 md:px-12 lg:px-20 py-32 relative border-t border-[rgba(255,255,255,0.05)] overflow-hidden font-sans">
      
      {/* Raw Background Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.05] max-w-[1600px] mx-auto mix-blend-screen">
        <div className="absolute top-0 right-[15%] w-[1px] h-full bg-[linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        <div className="absolute top-0 left-[15%] w-[1px] h-full bg-white border-l border-dashed opacity-20"></div>
        <div className="absolute top-[20%] left-0 w-[15%] h-[1px] bg-[linear-gradient(to_right,transparent,white,white)]"></div>
        <div className="absolute top-[75%] right-0 w-[15%] h-[1px] bg-[linear-gradient(to_left,transparent,white,white)]"></div>
        <div className="absolute top-[40%] left-[10%] font-mono text-[8px] uppercase text-white tracking-[0.2em] transform -rotate-90">SYS.ON</div>
        <div className="absolute bottom-[20%] right-[10%] font-mono text-[10px] uppercase text-[var(--color-accent)] tracking-[0.2em] animate-pulse">[ AUTH_OK ]</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 relative z-10 max-w-[1600px] mx-auto">
        
        {/* Left Column (Sticky Identity Block) */}
        <div className="lg:w-[40%] flex flex-col relative shrink-0">
          <div className="lg:sticky lg:top-32 lg:pb-32">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] text-[var(--color-accent)] mb-8 uppercase tracking-[0.3em] flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] absolute animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] relative"></span>
              </div>
              01 &mdash; Identification
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-black text-[56px] sm:text-[72px] lg:text-[84px] xl:text-[100px] leading-[0.85] tracking-tighter uppercase mb-6 group cursor-crosshair relative"
            >
              <span className="block text-white transition-transform duration-500 group-hover:translate-x-2">WHO.</span>
              <span className="block text-transparent bg-clip-text text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-transform duration-500 delay-75 group-hover:translate-x-4" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.1)', WebkitTextFillColor: 'transparent' }}>IS</span>
              <span className="block text-white transition-transform duration-500 delay-150 group-hover:translate-x-6 relative">
                 I.U. <span className="text-[var(--color-accent)] animate-pulse">_</span>
              </span>
            </motion.h2>

            {/* Scrolling Tracker Wheel */}
            <motion.div style={{ rotate: rotateWheel }} className="relative w-24 h-24 sm:w-32 sm:h-32 opacity-30 hidden lg:block">
              <Crosshair className="w-full h-full text-[var(--color-accent)] absolute inset-0 mix-blend-screen" strokeWidth={0.5} />
              <div className="absolute inset-0 border border-[var(--color-accent)] rounded-full"></div>
              <div className="absolute inset-2 border border-white border-dashed rounded-full opacity-50"></div>
              <div className="absolute top-1/2 left-1/2 w-[150%] h-[1px] bg-white -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 h-[150%] w-[1px] bg-white -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
              <motion.div style={{ rotate: useTransform(rotateWheel, v => -v * 2) }} className="absolute -inset-4 border border-dotted border-[var(--color-accent)] rounded-full opacity-50"></motion.div>
            </motion.div>

          </div>

          {/* Vertical Scrolling Marquee Text */}
          <motion.div style={{ y: yVerticalText }} className="absolute -left-8 md:-left-20 top-[60%] text-[10px] font-mono tracking-[0.4em] uppercase text-[#333] -rotate-90 origin-top-left whitespace-nowrap hidden sm:block pointer-events-none select-none">
            HUMAN &bull; DEVELOPER &bull; DESIGNER &bull; ENGINEER &bull; SYSTEM_ACTIVE
          </motion.div>
        </div>

        {/* Right Column (Content Grid & Stats) */}
        <div className="lg:w-[60%] flex flex-col gap-6 lg:mt-32">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InteractiveCard delay={0.1} title="SYS_INFO" className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                 <Fingerprint className="w-5 h-5 text-[var(--color-accent)] opacity-80" strokeWidth={1.5} />
                 <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#808080] group-hover:text-[var(--color-accent)] transition-colors">Background Data</h3>
              </div>
              <AnimatedText 
                text="Undergraduate student pursuing a Bachelor's degree in Informatics Engineering at Telkom University Purwokerto. Deeply focused on system architecture and building robust digital solutions that scale."
                className="font-sans text-[15px] sm:text-[16px] text-[#A0A0A0] leading-[1.7] group-hover:text-white transition-colors duration-500" 
              />
            </InteractiveCard>

            <InteractiveCard delay={0.2} title="EXP_AREA" className="p-8 md:p-10 md:translate-y-12">
              <div className="flex items-center gap-3 mb-6">
                 <BrainCircuit className="w-5 h-5 text-[var(--color-accent)] opacity-80" strokeWidth={1.5} />
                 <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#808080] group-hover:text-[var(--color-accent)] transition-colors">Experience Area</h3>
              </div>
              <AnimatedText 
                text="Freelance web development, remote data research, and collaborative internships. Passionate about integrating cutting-edge AI Engineering principles into scalable full-stack applications."
                className="font-sans text-[15px] sm:text-[16px] text-[#A0A0A0] leading-[1.7] group-hover:text-white transition-colors duration-500" 
              />
            </InteractiveCard>
          </div>

          {/* Stats Bento Grid */}
          <motion.div style={{ y: yParallax }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 md:mt-24 pt-8 md:pt-0">
            {stats.map((stat, idx) => (
              <InteractiveCard key={idx} delay={0.3 + (idx * 0.1)} className="p-6 flex flex-col items-center justify-center text-center">
                <div className="mb-4 text-[#444] group-hover:text-[var(--color-accent)] transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-3">
                  {stat.icon}
                </div>
                <span className="font-display font-medium text-[36px] md:text-[44px] text-white leading-none mb-2 tracking-tighter mix-blend-difference">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#666] group-hover:text-[#aaa] transition-colors">
                  {stat.label}
                </span>
              </InteractiveCard>
            ))}
          </motion.div>

          {/* Highlight / Achievement Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="mt-12 md:mt-20 flex flex-col sm:flex-row items-stretch border border-[rgba(255,255,255,0.05)] overflow-hidden group hover:border-[var(--color-accent)] transition-colors relative isolate bg-[rgba(5,5,5,0.6)] backdrop-blur-sm"
          >
            <div className="bg-[rgba(204,0,0,0.1)] text-[var(--color-accent)] border-b sm:border-b-0 sm:border-r border-[rgba(255,255,255,0.05)] font-display font-bold px-8 py-6 flex items-center justify-center text-[32px] overflow-hidden relative group-hover:bg-[var(--color-accent)] group-hover:text-black transition-colors duration-500">
               <motion.span 
                 whileHover={{ rotate: 180, scale: 1.2 }}
                 transition={{ duration: 0.5, type: "spring" }}
                 className="inline-block cursor-crosshair relative z-10"
               >
                 &#9733;
               </motion.span>
               <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:10px_10px] opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex-1 px-6 sm:px-8 py-6 md:py-8 flex flex-col justify-center relative overflow-hidden">
                <motion.div 
                    animate={{ x: ["-100%", "200%"] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-[30%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50"
                />
                <span className="font-mono text-[10px] text-[rgba(255,255,255,0.4)] uppercase tracking-[0.3em] mb-3 block group-hover:text-[rgba(255,255,255,0.6)] transition-colors">
                  Achievement // 2024
                </span>
                <span className="font-mono text-[13px] sm:text-[15px] text-[var(--color-accent)] uppercase tracking-[0.2em] font-bold block mb-1">
                  Lulusan Terbaik MIPA
                </span>
                <span className="font-mono text-[11px] sm:text-[12px] text-white uppercase tracking-[0.1em] opacity-80">
                  SMAN 01 Tanjung
                </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
