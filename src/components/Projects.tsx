import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import React, { useState, useRef } from "react";
import { FolderGit2, Smartphone, ShieldCheck, Bot, ArrowUpRight, Cpu, Network, Database, ChevronRight, Activity } from "lucide-react";

export const Projects = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const projects = [
    {
      id: "PRJ-001",
      title: "UTBK-SNBT Quiz App",
      category: "Mobile Architecture",
      desc: "Android quiz application engineered for university entrance exam preparation. Combines robust relational mapping with a highly responsive Kotlin-based UI layer.",
      tech: ["Kotlin", "Jetpack Compose", "Firebase Firestore", "Android SDK"],
      stats: { "Env": "Android", "Database": "NoSQL", "Status": "Stable" },
      icon: <Smartphone className="w-8 h-8 md:w-12 md:h-12 text-[#555] group-hover:text-[var(--color-accent)] transition-colors duration-500" />,
      link: "#"
    },
    {
      id: "PRJ-002",
      title: "BioGate Sentinel",
      category: "Computer Vision / Security",
      desc: "Dual-factor biometric security gateway utilizing deep learning for face recognition and voice verification, ensuring high-fidelity identity authentication.",
      tech: ["React 19", "TypeScript", "Laravel", "Python CV"],
      stats: { "Accuracy": "99.2%", "Latency": "<100ms", "Model": "CNN" },
      icon: <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-[#555] group-hover:text-[var(--color-accent)] transition-colors duration-500" />,
      link: "#"
    },
    {
      id: "PRJ-003",
      title: "Bookworm Automaton",
      category: "Automation Systems",
      desc: "Autonomous Python agent designed to solve word puzzle mechanics using multi-method OCR voting structures to guarantee high-speed accuracy.",
      tech: ["Python", "EasyOCR", "OpenCV", "PyAutoGUI"],
      stats: { "WPM": "300+", "Voting": "Tri-method", "Win_Rate": "100%" },
      icon: <Bot className="w-8 h-8 md:w-12 md:h-12 text-[#555] group-hover:text-[var(--color-accent)] transition-colors duration-500" />,
      link: "#"
    }
  ];

  const activeProject = projects[activeIndex];

  return (
    <section ref={containerRef} className="bg-[#030303] w-full px-4 md:px-12 lg:px-20 py-32 relative text-white border-y border-[rgba(255,255,255,0.05)] z-10 overflow-hidden font-sans min-h-[100vh]">
      
      {/* Background Decor */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute top-[20%] left-[-10%] select-none pointer-events-none opacity-[0.02] -rotate-90 origin-center"
      >
         <div className="font-display font-black text-[20vw] leading-none uppercase tracking-tighter text-white whitespace-nowrap">
           ARCHIVES
         </div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 md:mb-24 gap-8 border-b border-[rgba(255,255,255,0.05)] pb-12">
          <div className="w-full md:w-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-[var(--color-accent)] mb-6 uppercase tracking-[0.3em] flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4"
            >
              <FolderGit2 className="w-4 h-4" />
              05 &mdash; Deployed Systems
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-black text-[50px] sm:text-[70px] md:text-[90px] text-white leading-[0.85] tracking-tighter uppercase relative"
            >
              SELECTED
              <br />
              <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>WORKS.</span>
            </motion.h2>
          </div>

          <div className="hidden lg:flex gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#555]">
             <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                 System Index [ {projects.length} ]
             </div>
          </div>
        </div>

        {/* Master Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Navigation / Master List (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {projects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group flex items-center justify-between p-6 text-left border transition-all duration-500 overflow-hidden relative cursor-crosshair
                    ${isActive 
                      ? 'border-[var(--color-accent)] bg-[rgba(204,0,0,0.05)]' 
                      : 'border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.03)]'
                    }
                  `}
                >
                  {/* Hover Slide Bg */}
                  <div className={`absolute top-0 left-0 h-full w-[2px] bg-[var(--color-accent)] transition-transform duration-500 origin-top
                    ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}
                  `}></div>

                  <div className="flex flex-col z-10 relative">
                     <span className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-2 transition-colors duration-300
                       ${isActive ? 'text-[var(--color-accent)]' : 'text-[#666] group-hover:text-[#aaa]'}
                     `}>
                       {proj.id} // {proj.category}
                     </span>
                     <span className={`font-display font-bold text-[20px] md:text-[24px] leading-tight uppercase transition-colors duration-300
                       ${isActive ? 'text-white' : 'text-[#888] group-hover:text-white'}
                     `}>
                       {proj.title}
                     </span>
                  </div>

                  <div className="z-10 relative shrink-0 ml-4 hidden sm:block">
                     {proj.icon}
                  </div>
                </button>
              );
            })}
            
            <div className="mt-8 border border-[rgba(255,255,255,0.05)] p-6 bg-[rgba(0,0,0,0.3)] hidden lg:block">
               <div className="font-mono text-[10px] text-[#555] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                 <Cpu className="w-3 h-3" /> System Status
               </div>
               <div className="w-full bg-[#111] h-1 mb-2 overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-1/2 h-full bg-[var(--color-accent)]"
                  />
               </div>
               <p className="font-mono text-[9px] text-[#444] uppercase tracking-[0.1em]">All systems operational.</p>
            </div>
          </div>

          {/* Details / Screen Panel (Col 5-12) */}
          <div className="lg:col-span-8 w-full border border-[rgba(255,255,255,0.1)] bg-[#050505] p-1 md:p-2 relative min-h-[500px]">
             
             {/* Tech Brackets & Corners */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white opacity-20 pointer-events-none"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white opacity-20 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white opacity-20 pointer-events-none"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white opacity-20 pointer-events-none"></div>

             {/* Inner Screen Container */}
             <div className="w-full h-full border border-[rgba(255,255,255,0.05)] bg-[#020202] relative overflow-hidden flex flex-col">
               
               {/* Terminal Top Bar */}
               <div className="h-10 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] flex items-center justify-between px-4 shrink-0">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#333]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#333]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#333]"></span>
                  </div>
                  <div className="font-mono text-[9px] text-[#666] tracking-[0.2em] uppercase">Payload.Executor_</div>
               </div>

               {/* AnimatePresence for content switching */}
               <div className="flex-grow p-6 md:p-10 lg:p-12 relative flex flex-col">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={activeProject.id}
                     initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                     animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                     exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                     transition={{ duration: 0.4, ease: "easeInOut" }}
                     className="flex flex-col h-full"
                   >
                     
                     <div className="flex items-center gap-3 mb-6 opacity-80">
                       <Activity className="w-5 h-5 text-[var(--color-accent)]" />
                       <span className="font-mono text-[11px] text-[var(--color-accent)] tracking-[0.2em] uppercase">Target Entity Locked</span>
                     </div>
                     
                     <h3 className="font-display font-bold text-[36px] sm:text-[48px] lg:text-[60px] text-white leading-[0.9] uppercase tracking-tighter mb-8">
                       {activeProject.title}
                     </h3>

                     {/* Stats Bar */}
                     <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 pb-8 border-b border-[rgba(255,255,255,0.05)]">
                       {Object.entries(activeProject.stats).map(([key, val]) => (
                         <div key={key} className="flex flex-col">
                            <span className="font-mono text-[9px] text-[#666] uppercase tracking-[0.2em] mb-1">{key}</span>
                            <span className="font-mono text-[14px] text-white tracking-[0.1em] uppercase">{val}</span>
                         </div>
                       ))}
                     </div>

                     <p className="font-sans text-[15px] sm:text-[16px] text-[#A0A0A0] leading-[1.8] mb-10 max-w-[80%]">
                       {activeProject.desc}
                     </p>

                     {/* Stack */}
                     <div className="mt-auto pt-6">
                       <div className="font-mono text-[9px] text-[#666] uppercase tracking-[0.2em] mb-4">Architecture Stack</div>
                       <div className="flex flex-wrap gap-2">
                         {activeProject.tech.map((tag, i) => (
                           <motion.span 
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 0.2 + (i * 0.05) }}
                             key={tag} 
                             className="inline-block bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] hover:border-[var(--color-accent)] text-[#888] hover:text-white font-mono text-[10px] tracking-[0.1em] px-4 py-2 uppercase transition-all cursor-default"
                           >
                             {tag}
                           </motion.span>
                         ))}
                       </div>
                     </div>

                     <div className="mt-12">
                       <a 
                         href={activeProject.link}
                         className="group inline-flex items-center gap-3 font-mono text-[12px] font-bold text-white uppercase tracking-[0.1em] bg-[var(--color-accent)] px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
                       >
                         Execute / Source
                         <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                       </a>
                     </div>

                   </motion.div>
                 </AnimatePresence>

                 {/* Grid Overlay on screen */}
                 <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

