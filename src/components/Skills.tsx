import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "motion/react";
import React, { useRef } from "react";
import { BrainCircuit, Code2, Database, Layout, Wrench, Binary, Focus } from "lucide-react";

const MarqueeRow = ({ items, speed, direction = "left", isStroke = false }: { items: string[], speed: number, direction?: "left" | "right", isStroke?: boolean }) => {
  const content = [...items, " \u2022 ", ...items, " \u2022 ", ...items, " \u2022 "].join(' ');
  
  return (
    <div className="flex whitespace-nowrap overflow-hidden py-2 opacity-[0.15] pointer-events-none select-none my-2">
      <motion.div
        className="flex whitespace-nowrap gap-12 items-center"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        <span className={`text-[40px] md:text-[60px] font-display font-black leading-none tracking-tight ${isStroke ? 'text-transparent' : 'text-white'}`} style={isStroke ? { WebkitTextStroke: '1px white' } : {}}>
          {content}
        </span>
        <span className={`text-[40px] md:text-[60px] font-display font-black leading-none tracking-tight ${isStroke ? 'text-transparent' : 'text-white'}`} style={isStroke ? { WebkitTextStroke: '1px white' } : {}}>
          {content}
        </span>
      </motion.div>
    </div>
  );
};

const SkillChip: React.FC<{ text: string, delay: number, type: string }> = ({ text, delay, type }) => {
  const isPrimary = type === "primary";
  
  return (
    <motion.div
      animate={{ 
        y: [0, -6, 0],
      }}
      transition={{ 
        duration: 3 + Math.random() * 3, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: delay
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`relative group px-5 py-3 border backdrop-blur-sm cursor-crosshair
        ${isPrimary 
          ? 'border-[rgba(204,0,0,0.3)] bg-[rgba(204,0,0,0.05)] hover:border-[var(--color-accent)] hover:bg-[rgba(204,0,0,0.1)]' 
          : 'border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)]'
        }
        transition-colors duration-500
      `}
    >
      {/* Corner crosshairs */}
      <div className="absolute top-0 left-0 w-1 h-1 bg-white opacity-20 pointer-events-none group-hover:bg-[var(--color-accent)] group-hover:opacity-100 transition-colors"></div>
      <div className="absolute top-0 right-0 w-1 h-1 bg-white opacity-20 pointer-events-none group-hover:bg-[var(--color-accent)] group-hover:opacity-100 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-white opacity-20 pointer-events-none group-hover:bg-[var(--color-accent)] group-hover:opacity-100 transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-1 h-1 bg-white opacity-20 pointer-events-none group-hover:bg-[var(--color-accent)] group-hover:opacity-100 transition-colors"></div>
      
      {/* Glitch sub-layer */}
      <div className="absolute inset-0 bg-transparent mix-blend-overlay opacity-0 group-hover:opacity-10 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)] transition-opacity"></div>

      <span className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] relative z-10
        ${isPrimary ? 'text-[var(--color-accent)] group-hover:text-white' : 'text-[#888] group-hover:text-white'}
        transition-colors duration-300 whitespace-nowrap
      `}>
        {text}
      </span>
    </motion.div>
  );
};

const SkillGroup: React.FC<{ group: any, index: number }> = ({ group, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`flex flex-col border border-[rgba(255,255,255,0.05)] p-6 md:p-8 relative overflow-hidden bg-[rgba(5,5,5,0.4)]
        ${group.colSpan ? `lg:col-span-${group.colSpan}` : ''}
      `}
    >
        {/* Subtle background icon */}
        <div className="absolute -top-4 -right-4 p-4 opacity-5 pointer-events-none transform scale-150">
           {React.cloneElement(group.icon, { className: 'w-32 h-32' })}
        </div>
        
        <div className="flex items-center gap-3 mb-8 border-b border-[rgba(255,255,255,0.05)] pb-4 relative z-10">
           {React.cloneElement(group.icon, { className: 'w-5 h-5 text-[var(--color-accent)]' })}
           <h3 className="font-mono text-[13px] md:text-[15px] uppercase tracking-[0.2em] text-white">
             {group.title}
           </h3>
        </div>

        <div className="flex flex-wrap gap-3 lg:gap-4 mt-auto relative z-10">
           {group.skills.map((skill: string, i: number) => (
             <SkillChip key={skill} text={skill} delay={i * 0.15 + index * 0.1} type={group.type} />
           ))}
        </div>
    </motion.div>
  );
};

export const Skills = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const spinRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const skillGroups = [
    {
      title: "Machine Learning & CV",
      icon: <BrainCircuit className="w-5 h-5" />,
      skills: ["Deep Learning", "Computer Vision", "CNN Architecture", "Scikit", "Data Analytics"],
      type: "primary",
      colSpan: 2
    },
    {
      title: "Core Languages",
      icon: <Code2 className="w-5 h-5" />,
      skills: ["Python", "JavaScript", "TypeScript", "Kotlin", "PHP", "C++"],
      type: "secondary",
      colSpan: 1
    },
    {
      title: "Backend & Data",
      icon: <Database className="w-5 h-5" />,
      skills: ["Node.js", "Laravel", "MySQL", "Firebase", "REST APIs", "Cloud Architecture"],
      type: "secondary",
      colSpan: 1
    },
    {
       title: "Frontend Matrix",
       icon: <Layout className="w-5 h-5" />,
       skills: ["React 19", "Vite", "Tailwind CSS", "Framer Motion", "Jetpack Compose"],
       type: "secondary",
       colSpan: 1
    },
    {
       title: "DevOps & Tools",
       icon: <Wrench className="w-5 h-5" />,
       skills: ["Git Operations", "GitHub", "Figma", "VS Code", "Packet Tracer"],
       type: "secondary",
       colSpan: 1
    }
  ];

  return (
    <section ref={containerRef} className="bg-[#020202] w-full px-4 md:px-12 lg:px-20 py-32 relative text-white border-y border-[rgba(255,255,255,0.05)] z-10 overflow-hidden font-sans min-h-[100vh]">
      
      {/* Background Decor */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute top-[20%] left-[-10%] w-[120%] select-none pointer-events-none transform -rotate-2 z-0 mix-blend-screen"
      >
        <MarqueeRow 
          items={["PYTHON", "JAVASCRIPT", "PHP", "KOTLIN", "REACT", "LARAVEL", "VITE"]} 
          speed={40} 
          isStroke={true}
        />
        <MarqueeRow 
          items={["DEEP LEARNING", "COMPUTER VISION", "CNNs", "DATA ANALYTICS", "MYSQL", "FIREBASE"]} 
          speed={50} 
          direction="right"
        />
        <MarqueeRow 
          items={["GIT", "FIGMA", "AWS", "VSCODE", "PACKET TRACER", "PROBLEM SOLVING"]} 
          speed={35} 
          isStroke={true}
        />
      </motion.div>
      
      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        
        {/* Header Area */}
        <motion.div style={{ y: headerY }} className="flex flex-col md:flex-row items-center md:items-end justify-between mb-20 md:mb-32 gap-8 border-b border-[rgba(255,255,255,0.05)] pb-12">
          <div className="w-full md:w-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-[var(--color-accent)] mb-6 uppercase tracking-[0.3em] flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4"
            >
              <Focus className="w-4 h-4 animate-pulse" />
              02 &mdash; Cognitive Modules
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-black text-[50px] sm:text-[70px] md:text-[90px] text-white leading-[0.85] tracking-tighter uppercase relative select-none"
            >
              TECHNICAL
              <br />
              <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>RESOURCES.</span>
            </motion.h2>
          </div>
          
          <motion.div 
             style={{ rotate: spinRotation }}
             className="hidden md:flex w-24 h-24 border border-[rgba(255,255,255,0.1)] rounded-full items-center justify-center relative shrink-0"
          >
             <div className="absolute inset-0 border border-dashed border-[rgba(255,255,255,0.2)] rounded-full animate-[spin_10s_linear_infinite]"></div>
             <Binary className="w-6 h-6 text-[#555]" />
          </motion.div>
        </motion.div>

        {/* Matrix Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" style={{ perspective: "1000px" }}>
           {skillGroups.map((group, idx) => (
             <SkillGroup key={group.title} group={group} index={idx} />
           ))}
        </div>

      </div>
    </section>
  );
};
