import React from "react";
import {
  CheckCircle2,
  Clock,
  CircleDashed,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { TIMELINE_DATA } from "../../data/MockData";

export default function TimeLineMK() {
  return (
    <div className="w-full relative animate-[fadeIn_0.6s_ease-out]">
      {/* ================= CUSTOM CSS ================= */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.7); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .animate-card {
          animation: fadeSlideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .active-glow {
          animation: pulseGlow 2s infinite;
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        /* ===== GARIS TIMELINE ===== */
        .timeline-line {
          position: absolute;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #1e293b, #334155, #1e293b);
          border-radius: 999px;
          z-index: 0;
        }

        /* Desktop → Tengah */
        @media (min-width: 768px) {
          .timeline-line {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        /* Mobile → Kiri */
        @media (max-width: 767px) {
          .timeline-line {
            left: 20px;
            width: 3px;
            transform: none;
          }
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-sky-900/50 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700"></div>

        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-emerald-400 flex items-center gap-3 mb-2 relative z-10">
          <GraduationCap className="text-sky-500 float-animation" size={32} />
          Peta Kurikulum
        </h2>

        <p className="text-slate-400 text-sm md:text-base max-w-xl relative z-10">
          Pantau perjalanan akademis Anda dari dasar teknologi informasi hingga
          pengembangan sistem yang kompleks.
        </p>
      </div>

      {/* ================= TIMELINE ================= */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        {/* Garis */}
        <div className="timeline-line"></div>

        <div className="relative z-10 flex flex-col space-y-10 md:space-y-12">
          {TIMELINE_DATA.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 0.15}s` }}
                className="relative flex flex-col md:flex-row md:items-center w-full animate-card"
              >
                {/* ===== MOBILE DOT (absolute kiri) ===== */}
                <div className="absolute -left-2.5 top-6 md:hidden">
                  <TimelineDot item={item} small />
                </div>

                {/* ===== DESKTOP KIRI ===== */}
                <div
                  className={`flex-1 md:w-5/12 ${isLeft ? "" : "md:invisible"}`}
                >
                  {isLeft && (
                    <div className="pl-10 md:pl-0 md:pr-8">
                      <TimelineCard item={item} />
                    </div>
                  )}
                </div>

                {/* ===== DESKTOP DOT ===== */}
                <div className="hidden md:flex md:w-2/12 justify-center items-center">
                  <TimelineDot item={item} />
                </div>

                {/* ===== DESKTOP KANAN ===== */}
                <div
                  className={`flex-1 md:w-5/12 ${
                    !isLeft ? "" : "md:invisible"
                  }`}
                >
                  {!isLeft && (
                    <div className="pl-10 md:pl-8">
                      <TimelineCard item={item} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FOOTER NOTE ================= */}
      <div className="mt-8 flex justify-center">
        <p className="inline-flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800/50 backdrop-blur-sm shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Perjalanan kurikulum disusun secara kronologis
        </p>
      </div>
    </div>
  );
}

/* ================= DOT COMPONENT ================= */
function TimelineDot({ item, small = false }) {
  return (
    <div
      className={`flex ${
        small ? "w-8 h-8" : "w-14 h-14"
      } rounded-2xl border-4 items-center justify-center z-20 shadow-xl transition-all duration-500
        ${
          item.status === "completed"
            ? "bg-[#020617] text-sky-400 border-sky-500"
            : item.status === "current"
              ? "bg-emerald-950 text-emerald-400 border-emerald-400 active-glow"
              : "bg-[#020617] text-slate-600 border-slate-700"
        }`}
    >
      {item.status === "completed" && <CheckCircle2 size={small ? 16 : 26} />}
      {item.status === "current" && <Clock size={small ? 16 : 26} />}
      {item.status === "upcoming" && <CircleDashed size={small ? 16 : 26} />}
    </div>
  );
}

/* ================= CARD COMPONENT ================= */
function TimelineCard({ item }) {
  return (
    <div
      className={`p-6 rounded-3xl border backdrop-blur-md transition-all duration-500 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl ${
        item.status === "current"
          ? "bg-linear-to-br from-emerald-900/20 to-emerald-950/30 border-emerald-500/50"
          : "bg-linear-to-br from-slate-900/90 to-slate-950/90 border-slate-800"
      }`}
    >
      {/* Aksen warna atas */}
      <div
        className={`absolute top-0 left-0 right-0 h-2 rounded-t-3xl ${
          item.status === "completed"
            ? "bg-sky-500"
            : item.status === "current"
              ? "bg-emerald-400"
              : "bg-slate-700"
        }`}
      />

      <div className="flex items-center justify-between mb-4 mt-2">
        <span className="text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest bg-slate-800/50 text-slate-300 border border-slate-700">
          {item.semester}
        </span>

        {item.status === "current" && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full border border-emerald-500/30 animate-pulse">
            <Sparkles size={12} /> AKTIF
          </span>
        )}
      </div>

      <h4 className="text-xl font-bold mb-2 text-slate-200">{item.title}</h4>

      <p className="text-sm text-slate-400 mb-4">{item.desc}</p>

      <div className="pt-4 border-t border-slate-800/30 flex justify-between text-xs text-slate-500">
        <span>{item.status}</span>
        <span>{item.date}</span>
      </div>
    </div>
  );
}
