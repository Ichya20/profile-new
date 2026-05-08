import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Blog", href: "/blog" }, // Link Blog ditambahkan di sini
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll spy logic only runs on the home page
      if (location.pathname !== "/") return;

      const sections = navLinks
        .filter((l) => l.href.startsWith("/#"))
        .map((link) => link.href.substring(2));
      
      let currentSection = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 h-16 flex items-center justify-between px-6 md:px-20 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Logo */}
      <a
        href="/#home"
        className="font-display font-bold text-[18px] tracking-tight text-white hover:text-[var(--color-accent)] transition-colors duration-250"
      >
        IU<span className="text-[var(--color-accent)]">.</span>
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-10">
        {navLinks.map((link) => {
          const isBlog = link.href === "/blog";
          // Cek aktif: nyala saat di home sesuai scroll, atau nyala saat buka /blog
          const isActive = isBlog 
            ? location.pathname === "/blog" 
            : link.href.substring(2) === activeSection && location.pathname === "/";

          const linkClasses = `relative font-mono text-[11px] font-normal uppercase tracking-[0.15em] transition-colors duration-250 group ${
            isActive ? "text-white" : "text-[#808080] hover:text-white"
          }`;

          const spanClasses = `absolute -bottom-1 left-0 w-full h-[1px] bg-white transition-transform duration-250 ease-out origin-center ${
            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`;

          if (isBlog) {
            return (
              <Link key={link.name} to={link.href} className={linkClasses}>
                {link.name}
                <span className={spanClasses}></span>
              </Link>
            );
          }

          return (
            <a
              key={link.name}
              href={link.href}
              className={linkClasses}
            >
              {link.name}
              <span className={spanClasses}></span>
            </a>
          );
        })}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white bg-transparent border-none p-2 focus:outline-none"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-5 right-6 text-white bg-transparent border-none p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link, i) => {
                const isBlog = link.href === "/blog";

                if (isBlog) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-display font-bold text-3xl text-white hover:text-[var(--color-accent)] transition-colors block"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                    className="font-display font-bold text-3xl text-white hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
