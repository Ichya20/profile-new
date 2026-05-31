import { useEffect, useMemo, useState } from "react";

type WelcomeScreenProps = {
  onFinish: () => void;
};

export default function WelcomeScreen({ onFinish }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 2.5 + Math.random() * 4,
        size: 2 + Math.random() * 4,
      })),
    []
  );

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);

          setTimeout(() => {
            setLeaving(true);

            setTimeout(() => {
              onFinish();
            }, 850);
          }, 650);

          return 100;
        }

        return Math.min(prev + Math.floor(Math.random() * 8 + 3), 100);
      });
    }, 90);

    return () => clearInterval(progressTimer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#030303] text-white transition-all duration-700 ${
        leaving ? "scale-110 opacity-0 blur-sm" : "scale-100 opacity-100 blur-0"
      }`}
    >
      <style>{`
        @keyframes glitchShift {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(3px, -2px); }
          60% { transform: translate(-2px, -1px); }
          80% { transform: translate(2px, 1px); }
        }

        @keyframes scanMove {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes floatParticle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-140px) scale(0.2); opacity: 0; }
        }

        @keyframes pulseRed {
          0%, 100% { opacity: .25; transform: scale(1); }
          50% { opacity: .75; transform: scale(1.08); }
        }

        @keyframes rotateTarget {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          8% { opacity: .35; }
          10% { opacity: 1; }
          44% { opacity: .65; }
          46% { opacity: 1; }
          70% { opacity: .45; }
          72% { opacity: 1; }
        }
      `}</style>

      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,0,0,0.24),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,0,0,0.08),transparent)] animate-pulse" />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-red-950/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-red-950/25 to-transparent" />

      <div
        className="absolute left-0 top-0 h-24 w-full bg-red-700/10 blur-sm"
        style={{ animation: "scanMove 2.2s linear infinite" }}
      />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-red-600 shadow-[0_0_18px_rgba(220,0,0,.9)]"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}

      <div className="absolute left-8 top-8 h-28 w-28 border-l border-t border-red-700" />
      <div className="absolute right-8 top-8 h-28 w-28 border-r border-t border-red-700" />
      <div className="absolute bottom-8 left-8 h-28 w-28 border-b border-l border-red-700" />
      <div className="absolute bottom-8 right-8 h-28 w-28 border-b border-r border-red-700" />

      <div className="absolute right-[10%] top-[18%] h-40 w-40 opacity-40">
        <div
          className="absolute inset-0 rounded-full border border-red-700/70"
          style={{ animation: "rotateTarget 8s linear infinite" }}
        />
        <div
          className="absolute inset-6 rounded-full border border-white/15"
          style={{ animation: "rotateTarget 5s linear infinite reverse" }}
        />
        <div className="absolute left-1/2 top-0 h-full w-px bg-red-800/50" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-red-800/50" />
      </div>

      <div className="absolute left-[8%] bottom-[18%] hidden text-[10px] uppercase tracking-[0.3em] text-white/25 md:block">
        <p>BOOT_LOG_001: IDENTITY FOUND</p>
        <p>BOOT_LOG_002: PORTFOLIO READY</p>
        <p>BOOT_LOG_003: SYSTEM ONLINE</p>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-8">
        <div className="mb-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.45em] text-white/40">
          <span>
            <span className="text-red-600">●</span> System Identity Active
          </span>
          <span>IU_INTERFACE_V2</span>
        </div>

        <div className="relative border border-white/10 bg-white/[0.035] p-8 shadow-[0_0_80px_rgba(140,0,0,.22)] backdrop-blur-md md:p-12">
          <div className="absolute -left-px -top-px h-12 w-12 border-l-2 border-t-2 border-red-700" />
          <div className="absolute -right-px -top-px h-12 w-12 border-r-2 border-t-2 border-red-700" />
          <div className="absolute -bottom-px -left-px h-12 w-12 border-b-2 border-l-2 border-red-700" />
          <div className="absolute -bottom-px -right-px h-12 w-12 border-b-2 border-r-2 border-red-700" />

          <p
            className="mb-5 text-xs font-black uppercase tracking-[0.55em] text-red-600"
            style={{ animation: "flicker 2s linear infinite" }}
          >
            Initializing Experience
          </p>

          <div className="relative">
            <h1 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.08em] text-white md:text-8xl lg:text-[9rem]">
              Welcome
            </h1>

            <h1
              className="pointer-events-none absolute left-1 top-0 text-6xl font-black uppercase leading-[0.82] tracking-[-0.08em] text-red-700/70 md:text-8xl lg:text-[9rem]"
              style={{ animation: "glitchShift .55s infinite" }}
            >
              Welcome
            </h1>
          </div>

          <div className="relative mt-2">
            <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.08em] text-red-700 md:text-8xl lg:text-[8rem]">
              Ichya.
            </h2>

            <h2
              className="pointer-events-none absolute left-[-4px] top-0 text-5xl font-black uppercase leading-[0.85] tracking-[-0.08em] text-white/15 md:text-8xl lg:text-[8rem]"
              style={{ animation: "glitchShift .7s infinite reverse" }}
            >
              Ichya.
            </h2>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
            Loading brutalist portfolio interface, intelligent system modules,
            project archives, and personal identity layer.
          </p>

          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
              <span>Loading_Interface</span>
              <span className="text-red-600">{progress}%</span>
            </div>

            <div className="relative h-3 w-full overflow-hidden bg-white/10">
              <div
                className="h-full bg-red-700 transition-all duration-150"
                style={{
                  width: `${progress}%`,
                  boxShadow: "0 0 24px rgba(220,0,0,.9)",
                }}
              />

              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] animate-pulse" />
            </div>
          </div>

          <div className="mt-8 grid gap-3 text-[10px] uppercase tracking-[0.3em] text-white/35 md:grid-cols-4">
            <div>
              <span className="text-red-600">●</span> Active_Sector_01
            </div>
            <div>React System</div>
            <div>AI Interface</div>
            <div>Indonesia Node</div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, white 4px)",
        }}
      />
    </div>
  );
}
