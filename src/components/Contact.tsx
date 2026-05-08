import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";
import { Terminal, Send, Mail, MapPin, Github, Phone, Command, CheckCircle2 } from "lucide-react";

export const Contact: React.FC = () => {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState<'idle' | 'typing' | 'sending' | 'sent'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const contactInfo = [
    { icon: <Mail className="w-5 h-5"/>, label: "COMM_LINK.EMAIL", value: "ichyaulumiddin22@gmail.com", href: "mailto:ichyaulumiddin22@gmail.com" },
    { icon: <Phone className="w-5 h-5"/>, label: "COMM_LINK.PHONE", value: "+62 831-1314-0251", href: "tel:+6283113140251" },
    { icon: <Github className="w-5 h-5"/>, label: "COMM_LINK.GITHUB", value: "github.com/Ichya20", href: "https://github.com/Ichya20" },
    { icon: <MapPin className="w-5 h-5"/>, label: "SYS_LOCATION", value: "Brebes, IDN", href: null },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => setFormState('idle'), 5000);
    }, 2000);
  };

  return (
    <section ref={containerRef} className="bg-[#010101] w-full px-4 md:px-12 lg:px-20 py-32 relative text-white border-t border-[rgba(255,255,255,0.05)] z-10 overflow-hidden font-sans min-h-screen flex items-center">
      
      {/* Background Decor */}
      <motion.div 
        style={{ y: yBg }} 
        className="absolute top-[20%] left-[-5%] select-none pointer-events-none opacity-[0.02]"
      >
         <div className="font-display font-black text-[25vw] leading-none uppercase tracking-tighter text-white whitespace-nowrap">
           CONNECT
         </div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        
        {/* Header Area */}
        <motion.div style={{ y: headerY }} className="mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] text-[var(--color-accent)] mb-6 uppercase tracking-[0.3em] flex items-center gap-3 border-l-2 border-[var(--color-accent)] pl-4"
          >
            <Command className="w-4 h-4 animate-[spin_4s_linear_infinite]" />
            07 &mdash; Communication Interface
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-black text-[56px] sm:text-[80px] lg:text-[120px] text-white leading-[0.8] tracking-tighter uppercase relative select-none"
          >
            INITIATE
            <br />
            <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}>CONTACT.</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* LEFT COLUMN: Data Nodes */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-mono text-[13px] text-[#A0A0A0] mb-12 max-w-[400px] leading-relaxed uppercase tracking-[0.1em] border-l border-[rgba(255,255,255,0.1)] pl-6"
              >
                System is primed for external transmissions. Awaiting remote connection requests for collaborative operations.
              </motion.p>
              
              <div className="flex flex-col gap-4">
                {contactInfo.map((info, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] hover:border-[var(--color-accent)] hover:bg-[rgba(204,0,0,0.02)] transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Scanline hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-[0.05] -translate-y-full group-hover:translate-y-full transition-all duration-1000 ease-linear"></div>

                    <div className="flex-shrink-0 w-10 h-10 border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#555] group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-500 bg-[#000]">
                      {info.icon}
                    </div>
                    
                    <div className="flex flex-col relative z-10">
                      <span className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] mb-1 group-hover:text-[#888] transition-colors">
                        {info.label}
                      </span>
                      {info.href ? (
                        <a href={info.href} className="font-mono text-[13px] font-bold text-white transition-colors duration-300 hover:text-[var(--color-accent)]" target="_blank" rel="noopener noreferrer">
                          {info.value}
                        </a>
                      ) : (
                        <span className="font-mono text-[13px] font-bold text-white cursor-default">
                          {info.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-12 lg:mt-0 font-mono text-[10px] text-[#444] uppercase tracking-[0.2em] flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
               Local Node: Online
            </div>
          </div>

          {/* RIGHT COLUMN: Terminal Form */}
          <div className="lg:col-span-7">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="h-full border border-[rgba(255,255,255,0.1)] bg-[#030303] flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
               {/* Terminal Bar */}
               <div className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)] h-12 flex items-center justify-between px-6 shrink-0">
                  <div className="flex items-center gap-4">
                     <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                       <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                       <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                     </div>
                     <span className="font-mono text-[10px] text-[#666] uppercase tracking-[0.2em]">~/msg_relay.sh</span>
                  </div>
                  <div className="font-mono text-[10px] text-[#444] uppercase flex items-center gap-2">
                     <Terminal className="w-3 h-3" />
                     {formState !== 'idle' ? 'ACTIVE' : 'IDLE'}
                  </div>
               </div>

               <div className="p-6 md:p-10 flex-grow relative overflow-hidden flex flex-col">
                 
                 {/* Grid Overlay */}
                 <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                 
                 <AnimatePresence mode="wait">
                   {formState === 'sent' ? (
                     <motion.div 
                       key="success"
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0 }}
                       className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[rgba(3,3,3,0.9)] backdrop-blur-sm"
                     >
                        <CheckCircle2 className="w-16 h-16 text-[var(--color-accent)] mb-6" />
                        <h3 className="font-display font-black text-3xl uppercase tracking-widest text-white mb-2">Payload Delivered</h3>
                        <p className="font-mono text-[12px] text-[#A0A0A0] uppercase tracking-[0.1em]">Awaiting manual response...</p>
                     </motion.div>
                   ) : (
                     <motion.form 
                       key="form"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="flex flex-col gap-8 h-full z-10 relative" 
                       onSubmit={handleSubmit}
                     >
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="relative group mt-4 md:mt-0">
                           <label className={`absolute -top-6 left-0 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${focusedField === 'name' ? 'text-[var(--color-accent)]' : 'text-[#555]'}`}>
                             Sender_ID [Name]
                           </label>
                           <input 
                             type="text" 
                             onFocus={() => { setFocusedField('name'); setFormState('typing'); }}
                             onBlur={() => { setFocusedField(null); setFormState('idle'); }}
                             className="w-full bg-transparent border-b border-[rgba(255,255,255,0.1)] px-0 py-2 font-mono text-[13px] text-white outline-none transition-all duration-300 focus:border-[var(--color-accent)] placeholder-[rgba(255,255,255,0.1)] focus:bg-[rgba(255,255,255,0.02)]"
                             required
                           />
                         </div>
                         <div className="relative group mt-4 md:mt-0">
                           <label className={`absolute -top-6 left-0 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${focusedField === 'email' ? 'text-[var(--color-accent)]' : 'text-[#555]'}`}>
                             Return_Addr [Email]
                           </label>
                           <input 
                             type="email" 
                             onFocus={() => { setFocusedField('email'); setFormState('typing'); }}
                             onBlur={() => { setFocusedField(null); setFormState('idle'); }}
                             className="w-full bg-transparent border-b border-[rgba(255,255,255,0.1)] px-0 py-2 font-mono text-[13px] text-white outline-none transition-all duration-300 focus:border-[var(--color-accent)] placeholder-[rgba(255,255,255,0.1)] focus:bg-[rgba(255,255,255,0.02)]"
                             required
                           />
                         </div>
                       </div>
                       
                       <div className="relative group flex-grow flex flex-col mt-6">
                         <label className={`absolute -top-6 left-0 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors duration-300 ${focusedField === 'msg' ? 'text-[var(--color-accent)]' : 'text-[#555]'}`}>
                           Data_Payload [Message]
                         </label>
                         <textarea 
                           onFocus={() => { setFocusedField('msg'); setFormState('typing'); }}
                           onBlur={() => { setFocusedField(null); setFormState('idle'); }}
                           className="w-full h-[150px] md:h-full bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.1)] p-4 font-mono text-[13px] text-[#A0A0A0] outline-none transition-all duration-300 focus:border-[var(--color-accent)] resize-none focus:text-white focus:bg-[rgba(255,255,255,0.03)]"
                           required
                         ></textarea>
                       </div>

                       <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                         <div className="hidden md:flex font-mono text-[10px] text-[#555] uppercase tracking-[0.1em] items-center gap-2">
                           {formState === 'typing' ? (
                             <><span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-ping"></span> Keystrokes detected...</>
                           ) : formState === 'sending' ? (
                             <><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span> Processing payload...</>
                           ) : (
                             <span className="opacity-50">Awaiting input...</span>
                           )}
                         </div>

                         <button 
                           type="submit"
                           disabled={formState === 'sending'}
                           className="group relative border border-[var(--color-accent)] bg-transparent text-white font-mono font-bold text-[11px] tracking-[0.2em] uppercase px-12 py-4 transition-all duration-300 hover:bg-[var(--color-accent)] overflow-hidden w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                           {/* Button Hover effect */}
                           <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full z-0"></div>
                           
                           <span className="relative z-10 flex items-center justify-center gap-3 transition-colors duration-300 group-hover:text-black">
                             {formState === 'sending' ? 'TRANSMITTING...' : 'EXECUTE.SEND()'}
                             <Send className={`w-4 h-4 ${formState === 'sending' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                           </span>
                         </button>
                       </div>
                     </motion.form>
                   )}
                 </AnimatePresence>

               </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
