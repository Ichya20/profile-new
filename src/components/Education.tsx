import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import React, { useRef, ReactNode } from "react";
import { GraduationCap, Library, Award, FileCode2 } from "lucide-react";

const EduCard: React.FC<{ children: ReactNode, delay?: number, className?: string }> = ({ children, delay = 0, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    x.set(mouseX * 0.05);
    y.set(mouseY * 0.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 40 }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`group relative overflow-hidden bg-[rgba(5,5,5,0.8)] border border-[rgba(255,255,255,0.08)] hover:border-[var(--color-accent)] transition-all duration-700 z-10 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-accent)_0%,transparent_50%)] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.01)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_40px_rgba(204,0,0,0)] group-hover:shadow-[inset_0_0_40px_rgba(204,0,0,0.05)] pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
};

export const Education = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.01, 0.05, 0.01]);

  return (
    <section ref={containerRef} className="bg-[#020202] w-full px-6 md:px-12 lg:px-20 py-32 relative text-white border-y border-[rgba(255,255,255,0.05)] z-10 overflow-hidden font-sans">
      
      {/* Dynamic Background Pattern */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]"
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        <motion.div style={{ y: headerY }} className="flex flex-col items-center justify-center mb-24 md:mb-32 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] text-[var(--color-accent)] mb-6 uppercase tracking-[0.3em] flex items-center gap-3 border border-[rgba(204,0,0,0.3)] bg-[rgba(204,0,0,0.05)] px-4 py-2"
          >
            <GraduationCap className="w-4 h-4" />
            04 &mdash; Education Matrix
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-display font-black text-[50px] sm:text-[70px] md:text-[90px] text-white leading-[0.8] tracking-tighter uppercase relative"
          >
            ACADEMIC <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>PATH</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 relative">
            
          {/* Decorative center line for desktop */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent hidden md:block" />

          {/* Card 1 - University */}
          <div className="md:col-span-6 flex justify-end">
            <EduCard delay={0.2} className="w-full lg:max-w-[560px] p-8 sm:p-10 lg:p-12 md:mt-24">
              <div className="absolute -bottom-10 -right-10 font-display font-black text-[#111] text-[150px] leading-none select-none z-0 pointer-events-none group-hover:text-[rgba(204,0,0,0.03)] transition-colors duration-700">
                24<span className="tracking-tighter">'</span>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <FileCode2 className="w-6 h-6 text-[#555] group-hover:text-[var(--color-accent)] transition-colors duration-500" />
                    <div className="font-mono text-[10px] sm:text-[11px] text-[#A0A0A0] uppercase tracking-[0.2em]">
                        S1 Teknik Informatika <span className="text-[var(--color-accent)] mx-1">&bull;</span> Present
                    </div>
                </div>
                <h3 className="font-display font-black text-[32px] sm:text-[40px] text-white leading-[1.1] mb-6 uppercase tracking-tight">
                  Telkom University<br/>
                  <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px white', WebkitTextFillColor: 'transparent' }}>Purwokerto</span>
                </h3>
                <p className="font-sans text-[15px] sm:text-[16px] text-[#808080] leading-[1.7] group-hover:text-[#A0A0A0] transition-colors duration-500 mb-10">
                  Aktif mempelajari Machine Learning, Pengolahan Data, AI Engineering, dan Algoritma Pemrograman. Focus on bridging the gap between intelligent data models and functional user interfaces.
                </p>
                <div className="mt-auto inline-flex items-center gap-3 font-mono text-[11px] text-[#555555] group-hover:text-white uppercase border border-[rgba(255,255,255,0.1)] group-hover:border-[rgba(255,255,255,0.3)] px-5 py-3 transition-colors duration-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                  NIM/ID: 103112400076
                </div>
              </div>
            </EduCard>
          </div>

          {/* Card 2 - High School */}
          <div className="md:col-span-6 flex justify-start">
            <EduCard delay={0.4} className="w-full lg:max-w-[560px] p-8 sm:p-10 lg:p-12 md:mb-24">
              <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-[rgba(255,255,255,0.1)] flex items-start justify-end p-3 group-hover:border-[var(--color-accent)] transition-colors duration-500 bg-[rgba(255,255,255,0.02)]">
                <span className="font-mono text-[10px] text-[#555] group-hover:text-[var(--color-accent)] uppercase tracking-[0.1em]">Grad</span>
              </div>
              <div className="absolute -bottom-10 -right-10 font-display font-black text-[#111] text-[150px] leading-none select-none z-0 pointer-events-none group-hover:text-[rgba(204,0,0,0.03)] transition-colors duration-700">
                21<span className="tracking-tighter">'</span>
              </div>
              
              <div className="relative z-10 flex-col flex h-full">
                <div className="flex items-center gap-3 mb-6">
                    <Library className="w-6 h-6 text-[#555] group-hover:text-[var(--color-accent)] transition-colors duration-500" />
                    <div className="font-mono text-[10px] sm:text-[11px] text-[#A0A0A0] uppercase tracking-[0.2em]">
                        Jurusan MIPA <span className="text-[#555] mx-1">&bull;</span> Graduated
                    </div>
                </div>
                <h3 className="font-display font-black text-[32px] sm:text-[40px] text-white leading-[1.1] mb-8 uppercase tracking-tight">
                  SMA Negeri 01<br/>
                  <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '1px white', WebkitTextFillColor: 'transparent' }}>Tanjung</span>
                </h3>
                
                <div className="mt-auto bg-[rgba(204,0,0,0.03)] border border-[rgba(204,0,0,0.2)] group-hover:border-[var(--color-accent)] p-5 transition-colors duration-500 relative overflow-hidden">
                    <motion.div 
                        animate={{ x: ["-100%", "200%"] }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50"
                    />
                    <div className="flex items-start gap-4">
                        <Award className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
                        <div>
                            <span className="font-mono text-[12px] sm:text-[13px] text-white uppercase tracking-[0.1em] font-bold block mb-1">
                                Lulusan Terbaik MIPA
                            </span>
                            <span className="font-mono text-[10px] text-[#888] uppercase tracking-[0.15em]">
                                Cohort 2024
                            </span>
                        </div>
                    </div>
                </div>
              </div>
            </EduCard>
          </div>

        </div>
      </div>
    </section>
  );
};

