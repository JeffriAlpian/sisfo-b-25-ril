import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeSection from "./sections/HomeSection";
import StrukturSection from "./sections/StrukturSection";
import JadwalSection from "./sections/JadwalSection";
import MemberSection from "./sections/MemberSection";
// import GallerySection from "./sections/GallerySection";
import { FolderOpen, Home, Clock } from "lucide-react";
import TargetCursor from "./components/TargetCursor";
import TaskExplorer from "./pages/TaskExplorer";
import TimeLineMK from "./components/blocks/TimeLineMK";
import { Analytics } from "@vercel/analytics/next";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing System...");
  const [currentTime, setCurrentTime] = useState("");

  // STATE BARU UNTUK PINDAH HALAMAN
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    // Mengecek parameter di URL saat aplikasi (App.jsx) pertama kali dimuat
    const params = new URLSearchParams(window.location.search);

    // Jika terdapat parameter 'folder' di URL (hasil salinan tautan)
    if (params.get("folder")) {
      // Pindahkan tab aktif langsung ke 'tugas' secara otomatis
      setActivePage("tugas");
    }

    // Preloader Logic
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProg = prev + Math.random() * 15;
        if (newProg > 30 && newProg < 60)
          setLoadingText("ESTABLISHING CONNECTION...");
        if (newProg > 60 && newProg < 90)
          setLoadingText("DECRYPTING DATABASE...");

        if (newProg >= 100) {
          setLoadingText("ACCESS GRANTED.");
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 800);
          return 100;
        }
        return newProg;
      });
    }, 100);

    // Clock Logic
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    // Scroll logic
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
      setIsScrolled(winScroll > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Custom Cursor logic
    const handleMouseMove = (e) => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
        cursorOutlineRef.current.animate(
          {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
          },
          { duration: 200, fill: "forwards" },
        );
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Setup AOS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
    script.onload = () =>
      window.AOS.init({ duration: 800, once: true, offset: 50 });
    document.body.appendChild(script);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const renderPageContent = () => {
    switch (activePage) {
      case "home":
        return (
          <>
            <HomeSection />
            <StrukturSection />
            <JadwalSection />
            <MemberSection />
            {/* <GallerySection /> */}
          </>
        );

      case "timeline": // Tambahkan state baru untuk halaman timeline
        return (
          // Tambahkan padding agar tidak tertutup navbar dan diberi ruang (margin)
          <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
            <TimeLineMK />
          </div>
        );

      case "tasks":
      default:
        return (
          <div className="pt-16">
            <TaskExplorer />
          </div>
        );
    }
  };

  return (
    <div
      className="bg-[#020617] text-slate-200 min-h-screen font-sans selection:bg-sky-500 selection:text-white pb-20 md:pb-0 relative"
      style={{ cursor: "none" }}
    >
      {/* Analitiys Vercel */}
      <Analytics />

      {/* Custom Cursor */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />

      {/* Background Effects */}
      <div className="bg-grid"></div>
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-sky-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {isLoading && (
        <div
          className={`fixed inset-0 bg-[#020617] z-100000 flex flex-col justify-center items-center text-sky-400 font-mono transition-opacity duration-500`}
        >
          <img src="vite.svg" className="animate-spin w-44" />
          <div
            className={`text-xl tracking-widest uppercase ${loadingProgress >= 100 ? "text-green-400" : "text-sky-400"}`}
          >
            {loadingText}
          </div>
          <div className="w-64 h-1 bg-slate-800 mt-4 rounded overflow-hidden relative shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <div
              className={`h-full transition-all duration-100 ${loadingProgress >= 100 ? "bg-green-400 shadow-[0_0_10px_#4ade80]" : "bg-sky-400 shadow-[0_0_10px_#0ea5e9]"}`}
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Kirim state ke Navbar, opsional jika Anda ingin pasang tombol di Navbar nanti */}
      <Navbar
        isScrolled={isScrolled}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* RENDER HALAMAN SECARA KONDISIONAL */}
      <main key={activePage} className="animate-[fadeIn_0.5s_ease-out]">
        {renderPageContent()}
      </main>

      {/* TOMBOL NAVIGASI FLOATING (Sistem Pindah Halaman) */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-sky-500/30 shadow-[0_0_30px_rgba(14,165,233,0.2)]">
        <button
          onClick={() => {
            setActivePage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
            activePage === "home"
              ? "bg-sky-600/80 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]"
              : "text-slate-400 hover:text-sky-300 hover:bg-slate-800"
          }`}
        >
          <Home size={14} /> BERANDA
        </button>
        <button
          onClick={() => {
            setActivePage("timeline");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
            activePage === "timeline"
              ? "bg-sky-600/80 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]"
              : "text-slate-400 hover:text-sky-300 hover:bg-slate-800"
          }`}
        >
          <Clock size={14} /> TIMELINE
        </button>
        <button
          onClick={() => {
            setActivePage("tugas");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
            activePage === "tugas"
              ? "bg-sky-600/80 text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]"
              : "text-slate-400 hover:text-sky-300 hover:bg-slate-800"
          }`}
        >
          <FolderOpen size={14} /> TUGAS KELAS
        </button>
      </div>

      <Footer />
    </div>
  );
}
