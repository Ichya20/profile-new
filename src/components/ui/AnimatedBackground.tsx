import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

export const AnimatedBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -300]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 200, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const orb1MouseX = useTransform(smoothMouseX, [-100, 100], [-40, 40]);
  const orb1MouseY = useTransform(smoothMouseY, [-100, 100], [-40, 40]);
  
  const orb2MouseX = useTransform(smoothMouseX, [-100, 100], [60, -60]);
  const orb2MouseY = useTransform(smoothMouseY, [-100, 100], [60, -60]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(((e.clientX - centerX) / centerX) * 100);
      mouseY.set(((e.clientY - centerY) / centerY) * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[var(--color-primary-bg)] pointer-events-none">
      {/* Slow moving accent orb */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <motion.div style={{ x: orb1MouseX, y: orb1MouseY }} className="absolute inset-0">
          <motion.div
            animate={{
              x: ["0vw", "30vw", "-10vw", "0vw"],
              y: ["0vh", "-20vh", "20vh", "0vh"],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[30%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] bg-[var(--color-accent)] opacity-[0.04] md:opacity-[0.03] rounded-full blur-[100px] md:blur-[140px]"
          />
        </motion.div>
      </motion.div>
      
      {/* Slow moving secondary orb */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <motion.div style={{ x: orb2MouseX, y: orb2MouseY }} className="absolute inset-0">
          <motion.div
            animate={{
              x: ["0vw", "-20vw", "10vw", "0vw"],
              y: ["0vh", "30vh", "-10vh", "0vh"],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[20%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-white opacity-[0.02] rounded-full blur-[100px] md:blur-[120px]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
