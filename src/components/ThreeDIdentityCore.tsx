import { useEffect, useMemo, useState } from "react";

export function ThreeDIdentityCore() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState("about");

  const navItems = useMemo(
    () => [
      { label: "About", target: "about", code: "01" },
      { label: "Skills", target: "skills", code: "02" },
      { label: "Experience", target: "experience", code: "03" },
      { label: "Education", target: "education", code: "04" },
      { label: "Projects", target: "projects", code: "05" },
      { label: "Contact", target: "contact", code: "06" },
    ],
    []
  );

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNavigate = (target: string) => {
    setActive(target);

    const section = document.getElementById(target);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative overflow-hidden px-6 py-20">
      <style>{`
        @keyframes rotateRing {
          from { transform: rotateX(68deg) rotateZ(0deg); }
          to { transform: rotateX(68deg) rotateZ(360deg); }
        }

        @keyframes pulseCore {
          0%, 100% { opacity: .35; transform: scale(.92); }
          50% { opacity: .85; transform: scale(1.08); }
        }

        @keyframes floatNav {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(160,0,0,0.16),transparent_50%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.5em] text-red-700">
            Quick Navigation
          </p>

          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-white md:text-6xl">
            Explore
            <span className="block text-red-700">Profile.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55">
            Pilih bagian yang ingin dilihat. Setiap node mengarah langsung ke
            section utama dalam portfolio.
          </p>

          <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">
            {navItems.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleNavigate(item.target)}
                className={`group border p-4 text-left transition-all duration-300 ${
                  active === item.target
                    ? "border-red-700 bg-red-950/30 shadow-[0_0_30px_rgba(160,0,0,.25)]"
                    : "border-white/10 bg-white/[0.03] hover:border-red-900 hover:bg-red-950/20"
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-red-700">
                  {item.code}
                </span>
                <span className="mt-2 block text-sm font-black uppercase tracking-[0.18em] text-white/75 group-hover:text-white">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex h-[420px] w-full max-w-[520px] items-center justify-center">
          <div
            className="relative h-[340px] w-[340px] md:h-[400px] md:w-[400px]"
            style={{
              perspective: "900px",
              transform: `rotateX(${mouse.y * -5}deg) rotateY(${mouse.x * 7}deg)`,
              transition: "transform 180ms ease-out",
            }}
          >
            <div
              className="absolute inset-0 rounded-full border border-red-900/70"
              style={{ animation: "rotateRing 14s linear infinite" }}
            />
            <div
              className="absolute inset-10 rounded-full border border-white/10"
              style={{ animation: "rotateRing 10s linear infinite reverse" }}
            />
            <div
              className="absolute inset-20 rounded-full border border-red-700/40"
              style={{ animation: "rotateRing 7s linear infinite" }}
            />

            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-red-900/40" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-red-900/40" />

            <div
              className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 border border-red-800/80 bg-black/70 shadow-[0_0_70px_rgba(150,0,0,.35)] backdrop-blur-md"
              style={{
                transformStyle: "preserve-3d",
                animation: "floatNav 3s ease-in-out infinite",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-700">
                  Active
                </p>
                <p className="mt-3 text-3xl font-black uppercase tracking-[-0.08em] text-white">
                  {active}
                </p>
              </div>
            </div>

            {navItems.map((item, index) => {
              const angle = (index / navItems.length) * 360;
              const radius = 185;
              const isActive = active === item.target;

              return (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => handleNavigate(item.target)}
                  className={`absolute left-1/2 top-1/2 flex h-14 w-28 items-center justify-center border text-[10px] font-black uppercase tracking-[0.22em] backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? "border-red-600 bg-red-950/70 text-white shadow-[0_0_35px_rgba(220,0,0,.5)]"
                      : "border-white/10 bg-black/70 text-white/45 hover:border-red-700 hover:bg-red-950/50 hover:text-white"
                  }`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg) translate(-50%, -50%)`,
                  }}
                  aria-label={`Go to ${item.label}`}
                >
                  {item.label}
                </button>
              );
            })}

            <div
              className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/20 blur-3xl"
              style={{ animation: "pulseCore 3s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
