import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import React, { useRef, ReactNode } from "react";
import { Terminal, Briefcase, Activity, Clock } from "lucide-react";

const ExperienceCard: React.FC<{ exp: any, index: number }> = ({ exp, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(10px)" }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col md:flex-row group w-full mb-12 sm:mb-20 xl:mb-32"
    >
      {/* Interactive Timeline Node */}
      <div className="absolute top-0 md:top-1/2 left-[28px] md:left-1/2 w-4 h-4 -ml-[7px] md:-ml-2 md:-mt-2 rounded-none md:-rotate-45 border border-[var(--color-accent)] bg-[#050505] z-20 group-hover:scale-125 group-hover:bg-[rgba(204,0,0,0.2)] transition-all duration-500 hidden sm:block">
        <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-[var(--color-accent)] animate-pulse"></div>
      </div>

      {/* Date - Desktop: absolute left/right based on even/odd. Mobile: standard flow */}
      <div className={`
        relative md:absolute top-0 md:top-1/2 md:-translate-y-1/2 z-10 
        w-full md:w-[calc(50%-40px)] 
        ${isEven ? 'md:left-0 md:text-right' : 'md:right-0 md:text-left'}
        pl-[60px] md:pl-0 mb-4 md:mb-0 flex flex-col md:block ${isEven ? 'md:items-end' : 'md:items-start'}
      `}>
        <motion.div 
          className="font-display font-black text-[56px] md:text-[80px] lg:text-[100px] text-transparent leading-[0.8] tracking-tighter opacity-30 group-hover:opacity-100 transition-all duration-700 pointer-events-none inline-block relative"
          style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}
        >
          <span className="text-[var(--color-accent)] text-[30px] md:text-[40px] absolute -top-4 -left-6 md:-left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">[</span>
          {exp.date}
          <span className="text-[var(--color-accent)] text-[30px] md:text-[40px] absolute -bottom-4 -right-6 md:-right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">]</span>
        </motion.div>
        
        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[1px] bg-[rgba(255,255,255,0.1)] overflow-hidden
          ${isEven ? 'right-[-40px]' : 'left-[-40px]'}
        `}>
           <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-accent)] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className={`
        w-full md:w-[calc(50%-40px)] ml-auto
        ${isEven ? 'md:ml-auto md:pr-[60px]' : 'md:mr-auto md:pl-[60px]'}
      `}>
        <div className="border border-[rgba(255,255,255,0.05)] bg-[rgba(5,5,5,0.8)] backdrop-blur-md p-6 md:p-8 lg:p-10 hover:border-[var(--color-accent)] transition-all duration-500 relative overflow-hidden group/card ml-[40px] md:ml-0">
          
          {/* Card Hover Tech Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/card:opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px] transition-opacity duration-700"></div>
          
          {/* Tech Corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-transparent group-hover/card:border-[var(--color-accent)] transition-colors duration-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-transparent group-hover/card:border-[var(--color-accent)] transition-colors duration-500"></div>

          {/* Top Tech Bar */}
          <div className="flex justify-between items-center mb-6 border-b border-[rgba(255,255,255,0.05)] pb-3">
             <span className="font-mono text-[9px] text-[#555] group-hover/card:text-[var(--color-accent)] uppercase tracking-[0.2em] transition-colors duration-500">
               LOG_ID: EXP_{String(index+1).padStart(3, '0')}
             </span>
             <div className="flex gap-[2px]">
                <span className="w-1 h-2 bg-[#333] group-hover/card:bg-[var(--color-accent)] transition-colors duration-300 delay-75"></span>
                <span className="w-1 h-2 bg-[#333] group-hover/card:bg-[var(--color-accent)] transition-colors duration-300 delay-150"></span>
                <span className="w-1 h-2 bg-[#333] group-hover/card:bg-[var(--color-accent)] transition-colors duration-300 delay-200"></span>
             </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
             <div className="p-2 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] group-hover/card:border-[var(--color-accent)] group-hover/card:bg-[rgba(204,0,0,0.05)] transition-colors duration-500">
               {index === 0 ? <Terminal className="w-5 h-5 text-[#888] group-hover/card:text-[var(--color-accent)] transition-colors" /> : 
                index === 1 ? <Briefcase className="w-5 h-5 text-[#888] group-hover/card:text-[var(--color-accent)] transition-colors" /> : 
                <Activity className="w-5 h-5 text-[#888] group-hover/card:text-[var(--color-accent)] transition-colors" />}
             </div>
             <div>
               <h3 className="font-display font-bold text-[22px] sm:text-[26px] text-white leading-[1.1] mb-1">
                 {exp.role}
               </h3>
               <div className="font-mono text-[10px] text-[#A0A0A0] uppercase tracking-[0.2em] flex items-center gap-2">
                 <Clock className="w-3 h-3 text-[var(--color-accent)]" /> {exp.company}
               </div>
             </div>
          </div>

          <ul className="list-none space-y-4">
            {exp.bullets.map((bullet: string, i: number) => (
              <li key={i} className="font-sans text-[14px] md:text-[15px] text-[#808080] leading-[1.6] flex items-start group-hover/card:text-[#A0A0A0] transition-colors duration-300">
                <span className="text-[var(--color-accent)] mr-3 mt-1 text-[10px]">&diams;</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </motion.div>
  );
};

export const Experience = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]), { stiffness: 50, damping: 20 });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rotateLabel = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const experiences = [
    {
      date: "2026",
      role: "Website Developer Intern",
      company: "PT Aliqa Muslim Indonesia \u00B7 Hybrid",
      bullets: [
        "Built and developed company website (front-end & back-end).",
        "Conducted testing, debugging, and iteration cycles.",
        "Project-based internship focused on progressive web application design and rapid prototyping."
      ]
    },
    {
      date: "2024",
      role: "Freelance Web Developer",
      company: "Remote \u00B7 Global",
      bullets: [
        "Built responsive, functional websites using scalable modern web stacks.",
        "Performed maintenance, debugging, and performance optimization.",
        "Translated complex client requirements into effective, polished interactive features."
      ]
    },
    {
      date: "2024",
      role: "Data Research Specialist",
      company: "Remote \u00B7 Contract",
      bullets: [
        "Collected and validated complex datasets from multiple credible sources.",
        "Analyzed raw datasets, presenting insights through rich visual spreadsheet reports.",
        "Provided data-driven recommendations that guided strategic client decisions."
      ]
    },
    {
      date: "02-Prs",
      role: "Staff Team Reviewer",
      company: "Satria Muda \u00B7 Telkom Prwt",
      bullets: [
        "Systematically reviewed and evaluated performance metrics and content quality.",
        "Established and ensured cross-functional organizational standards were consistently met."
      ]
    }
  ];

  return (
    <section ref={containerRef} className="w-full px-4 md:px-12 lg:px-20 py-32 relative border-t border-[rgba(255,255,255,0.05)] bg-[#030303] overflow-hidden">
      
      {/* Background Decor */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute top-0 right-[-10%] select-none pointer-events-none opacity-[0.02]"
      >
         <div className="font-display font-black text-[30vw] leading-none uppercase tracking-tighter text-white whitespace-nowrap">
           RUNTIME
         </div>
      </motion.div>

      {/* Header Area */}
      <div className="relative z-20 max-w-[1600px] mx-auto flex flex-col md:flex-row items-center md:items-end justify-between mb-24 md:mb-40 gap-8">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] text-[var(--color-accent)] mb-6 uppercase tracking-[0.3em] flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4"
          >
            <span className="w-2 h-2 bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)] animate-pulse"></span>
            03 &mdash; Career Timeline
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-[56px] sm:text-[72px] lg:text-[100px] text-white leading-[0.8] tracking-tighter uppercase relative"
          >
            EXPERIENCE<span className="text-[var(--color-accent)]">.</span>
            <span className="absolute -bottom-6 left-0 w-32 h-[4px] bg-[var(--color-accent)]"></span>
          </motion.h2>
        </div>
        
        <motion.div 
          style={{ rotate: rotateLabel }}
           className="w-16 h-16 md:w-24 md:h-24 border border-[rgba(255,255,255,0.1)] rounded-full flex items-center justify-center border-dashed relative shrink-0"
        >
          <div className="absolute inset-0 m-auto w-1 h-1 bg-[var(--color-accent)] rounded-full"></div>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full">
        
        {/* Main Central Vertical Line */}
        <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[1px] bg-[rgba(255,255,255,0.05)] ml-[3px] md:-ml-[0.5px]"></div>
        
        {/* Animated fill line */}
        <motion.div 
          style={{ height: lineHeight }} 
          className="absolute top-0 left-[28px] md:left-1/2 w-[3px] bg-gradient-to-b from-[var(--color-accent)] to-transparent ml-[2px] md:-ml-[1.5px] shadow-[0_0_15px_var(--color-accent)] z-20 origin-top"
        ></motion.div>

        <div className="relative z-30 pt-10">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} index={idx} />
          ))}
        </div>
        
      </div>
    </section>
  );
};
