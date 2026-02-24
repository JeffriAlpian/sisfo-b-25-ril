import React, { useState, useEffect } from "react";
import { Cpu, Clock, Menu, X } from "lucide-react";

export default function Navbar({ isScrolled, activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Fungsi untuk menangani klik navigasi section
  const handleNavClick = (e, section) => {
    e.preventDefault(); 
    
    // 1. Selalu pastikan halaman aktif adalah 'home'
    setActivePage("home");
    
    // 2. Tutup menu mobile jika terbuka
    setMobileMenuOpen(false); 

    // 3. Beri sedikit jeda agar DOM React selesai me-render halaman 'home' 
    //    (jika sebelumnya user sedang membuka halaman lain seperti 'tugas')
    setTimeout(() => {
      const elementId = section.toLowerCase();
      const targetElement = document.getElementById(elementId);
      
      if (targetElement) {
        // Scroll mulus ke section yang dituju
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (elementId === "home") {
        // Fallback jika id="home" tidak ada, scroll ke paling atas
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const navItems = ["HOME", "STRUKTUR", "JADWAL", "GALERI"];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b border-sky-500/20 ${
        isScrolled ? "py-2 glass-panel" : "py-4 glass-panel bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-1 group cursor-hover cursor-target"
        >
          <img src="vite.svg" className="group-hover:animate-pulse w-9" />
          <div
            className="text-2xl font-bold tracking-tighter"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            SISFO<span className="text-sky-400"> B'25</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-mono tracking-widest">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item)}
              className="hover:text-sky-400 text-slate-200 transition relative group cursor-hover cursor-target"
            >
              <span>// {item}</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></div>
            </a>
          ))}
          
          <div className="cursor-target ml-4 px-3 py-1 bg-slate-900 border border-sky-500/30 rounded text-sky-400 flex items-center gap-2">
            <Clock className="text-sky-500 animate-pulse" size={14} />
            <span>{currentTime || "00:00:00"}</span>
          </div>
        </div>

        {/* Mobile Menu Btn */}
        <button
          className="md:hidden text-sky-400 hover:text-white transition cursor-hover"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-panel bg-slate-900/95 backdrop-blur-md border-b border-sky-500/20 flex flex-col py-4 px-6 space-y-4 font-mono text-center md:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, item)}
              className="block transition py-2 text-slate-200 hover:text-sky-400"
            >
              // {item}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-700/50 text-sky-400 text-sm flex justify-center items-center gap-2">
            <Clock size={14} /> {currentTime} SYS.TIME
          </div>
        </div>
      )}
    </nav>
  );
}