import React, { useState } from "react";
import { UserRound, Shield, PenLine, Landmark } from "lucide-react";

export default function StrukturSection() {
  return (
    <section id="struktur" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-slate-900/40 -z-10 backdrop-blur-sm"></div>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-sm font-mono text-sky-500 tracking-widest mb-2">
            // ORGANIZATION
          </h2>
          <h3
            className="text-4xl font-bold text-white uppercase tracking-wider"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Class{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-600">
              Structure
            </span>
          </h3>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="flex flex-col md:flex-row gap-8 mb-12 relative"
            data-aos="fade-down"
          >
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-0.5 bg-linear-to-r from-transparent via-sky-500/50 to-transparent -z-10"></div>

            {[
              {
                title: "Ketua Kelas",
                name: "M Jeffri Alpian",
                icon: <UserRound size={32} />,
              },
              {
                title: "Wakil Ketua",
                name: "Ahmad Khoirul Zidane",
                icon: <Shield size={32} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="cyber-border glass-panel p-6 rounded-lg w-64 text-center group hover:-translate-y-2 transition duration-300 cursor-hover"
              >
                <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-sky-500/50 group-hover:shadow-[0_0_15px_#0ea5e9] transition text-sky-400">
                  {item.icon}
                </div>
                <p className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-1">
                  {item.title}
                </p>
                <p className="font-bold text-lg text-white font-sans">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          <div className="w-px h-16 bg-linear-to-b from-sky-500/50 to-transparent mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              {
                title: "Sekretaris 1",
                name: "Citra Irfa Diani",
                icon: <PenLine size={24} />,
                color: "sky",
              },
              {
                title: "Sekretaris 2",
                name: "Fara Amelia Azzahra Marco",
                icon: <PenLine size={24} />,
                color: "sky",
              },
              {
                title: "Bendahara 1",
                name: "Alya Sheva Nadira Agung",
                icon: <Landmark size={24} />,
                color: "rose",
              },
              {
                title: "Bendahara 2",
                name: "Umi Zakia Auryn",
                icon: <Landmark size={24} />,
                color: "rose",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`cursor-target glass-panel p-5 rounded-lg border-t-2 ${item.color === "sky" ? "border-sky-400/50" : "border-rose-400/50"} hover:bg-slate-800/50 transition cursor-hover`}
                data-aos="fade-up"
                data-aos-delay={(i + 1) * 100}
              >
                <div
                  className={`mb-3 ${item.color === "sky" ? "text-sky-500" : "text-rose-500"}`}
                >
                  {item.icon}
                </div>
                <p
                  className={`text-[11px] font-mono uppercase mb-1 ${item.color === "sky" ? "text-sky-300" : "text-rose-300"}`}
                >
                  {item.title}
                </p>
                <p className="text-base font-semibold text-white font-sans">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
