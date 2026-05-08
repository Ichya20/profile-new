import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { ArrowDownRight, SquareAsterisk } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Hero = () => {
    // Mouse tracking for parallax and 3D effects
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
    const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);

    const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
    const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth) - 0.5);
            mouseY.set((e.clientY / window.innerHeight) - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const textItem = {
        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="relative min-h-[100svh] w-full flex items-center pt-24 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden text-white">
            
            {/* Parallax Background Text */}
            <motion.div 
                style={{ x: bgX, y: bgY }}
                className="absolute top-[18%] left-[-5%] z-0 pointer-events-none opacity-[0.03] flex flex-col gap-4 font-display font-bold uppercase select-none"
            >
                <div className="text-[18vw] leading-[0.75] whitespace-nowrap text-transparent" style={{ WebkitTextStroke: '2px white' }}>FULL-STACK // DEVELOPER</div>
                <div className="text-[18vw] leading-[0.75] whitespace-nowrap ml-[10vw]">AI ENGINEER</div>
            </motion.div>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-16 lg:gap-8 mt-4 lg:mt-0">
                
                {/* LEFT: Typography & Actions */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 flex flex-col justify-center order-2 lg:order-1 relative z-20 w-full"
                >
                    <motion.div variants={textItem} className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-[1px] bg-[var(--color-accent)]"></div>
                        <span className="font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-[0.3em]">System Identity Active</span>
                    </motion.div>

                    <motion.h1 variants={textItem} className="font-display font-bold uppercase text-[54px] sm:text-[76px] md:text-[90px] xl:text-[110px] leading-[0.85] tracking-tighter mix-blend-difference mb-8">
                        <div className="overflow-hidden pb-1"><span className="block text-white filter drop-shadow-lg">ICHYA</span></div>
                        <div className="overflow-hidden flex items-end gap-x-2 sm:gap-x-4">
                            <span className="block text-[var(--color-accent)] filter drop-shadow-lg">ULUMIDDIIN.</span>
                            <SquareAsterisk className="w-10 h-10 xl:w-16 xl:h-16 text-[var(--color-accent)] mb-1 sm:mb-2 hidden sm:block animate-pulse opacity-80" strokeWidth={1} />
                        </div>
                    </motion.h1>

                    <motion.p variants={textItem} className="font-sans text-[15px] md:text-[17px] text-[#A0A0A0] leading-[1.65] max-w-[500px] mb-12 border-l border-[rgba(255,255,255,0.1)] pl-5 mix-blend-screen">
                        Crafting scalable web experiences and intelligent AI systems. Specializing in modern React ecosystems, brutalist aesthetics, and robust backend infrastructure.
                    </motion.p>

                    <motion.div variants={textItem} className="flex flex-col sm:flex-row gap-5">
                        <a
                            href="/#projects"
                            className="group relative inline-flex items-center justify-center bg-[var(--color-accent)] text-white font-mono text-[12px] font-bold tracking-[0.1em] px-8 py-5 uppercase overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Initialize Projects
                                <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                            </span>
                            <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-x-100 mix-blend-difference"></div>
                        </a>
                        
                        <a
                            href="/#contact"
                            className="group relative inline-flex items-center justify-center bg-transparent border border-[rgba(255,255,255,0.2)] text-[#808080] hover:text-white font-mono text-[12px] font-bold tracking-[0.1em] px-8 py-5 uppercase transition-colors overflow-hidden"
                        >
                            <span className="relative z-10">Establish Contact</span>
                            <div className="absolute inset-0 bg-[rgba(255,255,255,0.05)] translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0"></div>
                        </a>
                        
                        <Link
                            to="/blog"
                            className="group relative inline-flex items-center justify-center bg-transparent border border-[rgba(255,255,255,0.2)] text-[#808080] hover:text-white font-mono text-[12px] font-bold tracking-[0.1em] px-8 py-5 uppercase transition-colors overflow-hidden"
                        >
                            <span className="relative z-10">Blog</span>
                            <div className="absolute inset-0 bg-[rgba(255,255,255,0.05)] translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0"></div>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* RIGHT: 3D Photo Frame */}
                <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end order-1 lg:order-2" style={{ perspective: "1500px" }}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotateX: 10, y: 50 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative w-[280px] h-[360px] sm:w-[360px] sm:h-[460px] xl:w-[420px] xl:h-[540px] group cursor-crosshair"
                    >
                        {/* Brackets (Floating Effect using translateZ) */}
                        <div style={{ transform: "translateZ(50px)" }} className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-[var(--color-accent)] opacity-60 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:-top-6 group-hover:-left-6"></div>
                        <div style={{ transform: "translateZ(50px)" }} className="absolute -top-4 -right-4 w-10 h-10 border-t-2 border-r-2 border-[var(--color-accent)] opacity-60 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:-top-6 group-hover:-right-6"></div>
                        <div style={{ transform: "translateZ(50px)" }} className="absolute -bottom-4 -left-4 w-10 h-10 border-b-2 border-l-2 border-[var(--color-accent)] opacity-60 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:-bottom-6 group-hover:-left-6"></div>
                        <div style={{ transform: "translateZ(50px)" }} className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-[var(--color-accent)] opacity-60 overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:-bottom-6 group-hover:-right-6"></div>

                        {/* Main Frame Content */}
                        <div className="w-full h-full border border-[rgba(255,255,255,0.1)] bg-[#050505] relative overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:border-[var(--color-accent)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_30px_60px_rgba(204,0,0,0.2)]">
                            
                            {/* Inner glitch/loading bar overlay */}
                            <motion.div 
                                animate={{ y: ['-100%', '100%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent opacity-20 mix-blend-overlay z-20 pointer-events-none"
                            />

                            {/* USER PHOTO */}
                            <img 
                                src="/profile.jpeg" 
                                alt="Ichya Ulumiddiin Profile"
                                className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 transition-opacity duration-700 filter grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105"
                            />
                            
                            {/* Dark/red tint overlay reacting to hover */}
                            <div className="absolute inset-0 bg-black/40 mix-blend-multiply group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>

                            {/* Floating Coordinate Text */}
                            <div style={{ transform: "translateZ(30px)" }} className="absolute bottom-5 left-5 z-20 font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">
                                LOC. -6.9147, 107.6098<br/>
                                <span className="text-[var(--color-accent)]">STATUS: ONLINE</span>
                            </div>
                        </div>

                        {/* Side Vertical text */}
                        <div style={{ transform: "translateZ(60px) rotate(-90deg)", transformOrigin: "bottom left" }} className="absolute bottom-10 -left-6 z-30 font-mono text-[10px] tracking-[0.2em] uppercase text-[#666] hidden sm:block">
                            <span className="group-hover:text-[var(--color-accent)] transition-colors duration-300">USER_ID: 103112400076</span>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* Bottom Tech Details Bar */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 left-6 md:left-12 flex items-center gap-8 text-[9px] font-mono uppercase tracking-[0.2em] text-[#555] pointer-events-none"
            >
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                    ACTIVE.SECTOR_01
                </div>
                <div className="hidden sm:block">TELKOM UNIVERSITY</div>
                <div className="hidden md:block">BASED IN INDONESIA</div>
            </motion.div>

        </div>
    );
};
