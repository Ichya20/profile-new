export const Footer = () => {
  return (
    <footer className="h-16 w-full bg-[var(--color-primary-bg)] border-t border-[rgba(255,255,255,0.05)] px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="font-sans text-[13px] text-[#444444]">
        Built by Ichya Ulumiddiin &copy; 2026
      </div>
      
      <div className="flex space-x-6">
        <a 
          href="https://github.com/Ichya20" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-[#444444] transition-colors duration-250 hover:text-[var(--color-accent)]"
        >
          GitHub
        </a>
        <a 
          href="mailto:ichyaulumiddin22@gmail.com" 
          className="font-mono text-[11px] text-[#444444] transition-colors duration-250 hover:text-[var(--color-accent)]"
        >
          Email
        </a>
      </div>
    </footer>
  );
};
