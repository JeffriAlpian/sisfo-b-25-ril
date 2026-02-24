import React, { useState } from "react";
import Typewriter from "../components/ui/TypeWriter";
import { Calendar, ChevronUp } from "lucide-react";

export default function HomeSection() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative pt-20"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div data-aos="zoom-in" data-aos-duration="1200" className="z-10">
        <div className="inline-flex items-center px-4 py-1 mb-6 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-sm tracking-widest shadow-[0_0_15px_rgba(14,165,233,0.2)]">
          <span className="w-2 h-2 rounded-full bg-sky-400 mr-2 animate-ping"></span>{" "}
          SYSTEM ONLINE
        </div>

        <div className="relative text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
          <h1
            className="glitch text-transparent bg-clip-text bg-linear-to-r from-white via-sky-200 to-sky-500"
            data-text="SYSTEM INFORMATION"
          >
            SYSTEM INFORMATION
          </h1>
        </div>

        <div className="mt-6 h-8">
          {!isLoading && (
            <Typewriter
              textArray={[
                "Class of 2025",
                "Generation Beta",
                "Information Systems",
                "We Build The Future",
              ]}
            />
          )}
        </div>

        <div className="mt-12 flex justify-center gap-6">
          <a
            href="#jadwal"
            className="cursor-target cyber-border glass-panel px-8 py-3 text-sky-400 font-mono hover:bg-sky-500/10 transition tracking-wider text-sm font-bold flex items-center gap-2 cursor-hover"
          >
            <Calendar size={18} /> CEK JADWAL
          </a>
        </div>
      </div>

      <a
        href="#struktur"
        className="absolute bottom-10 animate-bounce text-sky-500/50 hover:text-sky-400 transition cursor-hover flex flex-col items-center"
      >
        <p className="font-mono text-xs uppercase mb-2 tracking-widest text-center">
          Scroll
        </p>
        <ChevronUp size={24} className="rotate-180" />
      </a>
    </section>
  );
}
