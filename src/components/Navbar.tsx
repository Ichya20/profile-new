import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { Braces, Command, Menu, Radio, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const ease = [0.16, 1, 0.3, 1] as const;

const menuItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease },
  },
};

const navLinks = [
  { name: "Home", href: "/#home", code: "00" },
  { name: "About", href: "/#about", code: "01" },
  { name: "Skills", href: "/#skills", code: "02" },
  { name: "Experience", href: "/#experience", code: "03" },
  { name: "Projects", href: "/#projects", code: "04" },
  { name: "Contact", href: "/#contact", code: "05" },
  { name: "Blog", href: "/blog", code: "06" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (location.pathname !== "/") return;

      const sections = navLinks
        .filter((link) => link.href.startsWith("/#"))
        .map((link) => link.href.substring(2));

      let currentSection = "home";

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/blog") return location.pathname === "/blog";
    return location.pathname === "/" && href.substring(2) === activeSection;
  };

  const renderLink = (link: (typeof navLinks)[number], index: number) => {
    const isBlog = link.href === "/blog";
    const isActive = isActiveLink(link.href);

    const className = `group relative inline-flex h-10 items-center gap-2 rounded-full px-4 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
      isActive
        ? "text-white"
        : "text-[#7a7a7a] hover:text-white"
    }`;

    const content = (
      <>
        <span className={`text-[8px] transition-colors duration-300 ${isActive ? "text-[var(--color-accent)]" : "text-[#4d4d4d] group-hover:text-[var(--color-accent)]"}`}>
          {link.code}
        </span>
        <span className="relative z-10">{link.name}</span>
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            transition={{ duration: 0.35, ease }}
          />
        )}
        <span className="absolute bottom-1.5 left-1/2 h-px w-5 -translate-x-1/2 scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100" />
      </>
    );

    if (isBlog) {
      return (
        <Link key={link.name} to={link.href} className={className}>
          {content}
        </Link>
      );
    }

    return (
      <a key={link.name} href={link.href} className={className}>
        {content}
      </a>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8"
      >
        <div
          className={`mx-auto flex h-16 max-w-[1500px] items-center justify-between rounded-[1.6rem] border px-4 transition-all duration-500 md:px-5 ${
            isScrolled
              ? "border-white/10 bg-black/72 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              : "border-white/[0.06] bg-black/24 backdrop-blur-md"
          }`}
        >
          <a href="/#home" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition-colors duration-300 group-hover:border-[var(--color-accent)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,0,0,0.22),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Braces className="relative z-10 h-4 w-4 text-[var(--color-accent)]" />
            </div>

            <div className="hidden leading-none sm:block">
              <div className="font-display text-[15px] font-bold tracking-tight text-white">
                Ichya<span className="text-[var(--color-accent)]">.</span>
              </div>
              <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.24em] text-[#666]">
                Portfolio
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-black/30 p-1 backdrop-blur-xl lg:flex">
            {navLinks.map(renderLink)}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#777]">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              </span>
              Online
            </div>

            <a
              href="/#contact"
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_35px_rgba(204,0,0,0.24)] transition-colors duration-300 hover:bg-white hover:text-black"
            >
              Contact
              <Radio className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-white transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.32, ease }}
            className="fixed inset-0 z-[60] overflow-hidden bg-black/94 px-4 py-4 text-white backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.08]" />
            <div className="absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(204,0,0,0.25),transparent_64%)] blur-3xl" />

            <div className="relative z-10 mx-auto flex h-full max-w-[900px] flex-col">
              <div className="flex h-16 items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.025] px-4 backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10">
                    <Command className="h-4 w-4 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <div className="font-display text-[15px] font-bold text-white">Navigation</div>
                    <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.24em] text-[#666]">Command Menu</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-white transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <motion.div
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
                }}
                initial="hidden"
                animate="visible"
                className="grid flex-1 content-center gap-3 py-8"
              >
                {navLinks.map((link) => {
                  const isBlog = link.href === "/blog";
                  const isActive = isActiveLink(link.href);

                  const className = `group relative overflow-hidden rounded-[1.7rem] border p-5 text-left transition-colors duration-300 ${
                    isActive
                      ? "border-[var(--color-accent)] bg-[rgba(204,0,0,0.1)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/25"
                  }`;

                  const inner = (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(204,0,0,0.16),transparent_44%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative z-10 flex items-center justify-between gap-4">
                        <div>
                          <p className={`font-mono text-[9px] uppercase tracking-[0.24em] ${isActive ? "text-[var(--color-accent)]" : "text-[#666]"}`}>
                            {link.code}
                          </p>
                          <p className="mt-2 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] text-white">
                            {link.name}
                          </p>
                        </div>
                        <span className={`h-2.5 w-2.5 rounded-full ${isActive ? "bg-[var(--color-accent)]" : "bg-white/15 group-hover:bg-[var(--color-accent)]"}`} />
                      </div>
                    </>
                  );

                  if (isBlog) {
                    return (
                      <motion.div key={link.name} variants={menuItem}>
                        <Link to={link.href} onClick={() => setMobileMenuOpen(false)} className={className}>
                          {inner}
                        </Link>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={link.name} variants={menuItem}>
                      <a href={link.href} onClick={() => setMobileMenuOpen(false)} className={className}>
                        {inner}
                      </a>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[#666]">
                <div className="flex items-center justify-between gap-4">
                  <span>Portfolio Navigation</span>
                  <span className="text-[var(--color-accent)]">Online</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
