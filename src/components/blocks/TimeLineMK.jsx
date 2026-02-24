import React, { useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  CircleDashed,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { TIMELINE_DATA } from "../../data/MockData";

export default function TimeLineMK() {
  // Animasi masuk bertahap (bisa pakai Intersection Observer, untuk sederhana kita pakai CSS delay)
  // Tidak perlu scroll handler lagi

  return (
    <div className="w-full relative animate-[fadeIn_0.6s_ease-out]">
      {/* INJEKSI CSS ANIMASI KUSTOM */}
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
        /* Garis vertikal tengah */
        .timeline-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #1e293b, #334155, #1e293b);
          border-radius: 999px;
          z-index: 0;
        }
        /* Responsif: di layar kecil, garis hilang dan card di tengah */
        @media (max-width: 768px) {
          .timeline-line {
            display: none;
          }
          .mobile-stack {
            flex-direction: column !important;
            align-items: center !important;
          }
          .mobile-card-full {
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .mobile-hide-side {
            display: none !important;
          }
          .mobile-timeline-dot {
            margin: 1rem 0;
          }
        }
      `}</style>

      {/* HEADER HALAMAN */}
      <div className="bg-slate-900/50 backdrop-blur-md border border-sky-900/50 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-2xl">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse delay-700"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-emerald-400 flex items-center gap-3 mb-2">
              <GraduationCap
                className="text-sky-500 float-animation"
                size={32}
              />
              Peta Kurikulum
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl">
              Pantau perjalanan akademis Anda, dari dasar teknologi informasi
              hingga pengembangan sistem yang kompleks.
            </p>
          </div>
        </div>
      </div>

      {/* TIMELINE VERTIKAL ZIGZAG */}
      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        {/* Garis tengah vertikal (hanya di desktop) */}
        <div className="timeline-line hidden md:block"></div>

        {/* Container daftar item */}
        <div className="relative z-10 flex flex-col space-y-8 md:space-y-12">
          {TIMELINE_DATA.map((item, index) => {
            // Tentukan posisi card: genap di kiri, ganjil di kanan
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 0.15}s` }}
                className="flex flex-col md:flex-row md:items-center w-full animate-card mobile-stack"
              >
                {/* Kolom Kiri (untuk card kiri atau kosong) */}
                <div
                  className={`flex-1 md:w-5/12 ${isLeft ? "" : "md:invisible"}`}
                >
                  {isLeft && (
                    <div className="md:pr-8">
                      {/* Card ditampilkan jika isLeft = true */}
                      <TimelineCard item={item} />
                    </div>
                  )}
                </div>

                {/* Kolom Tengah (Titik Indikator) */}
                <div className="flex-none md:w-2/12 flex justify-center items-center my-4 md:my-0 mobile-timeline-dot">
                  <div
                    className={`hidden md:flex w-14 h-14 rounded-2xl border-4  items-center justify-center z-20 shadow-xl transition-all duration-500 transform-gpu
                      ${
                        item.status === "completed"
                          ? "bg-[#020617] text-sky-400 border-sky-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]"
                          : item.status === "current"
                            ? "bg-emerald-950 text-emerald-400 border-emerald-400 active-glow scale-110"
                            : "bg-[#020617] text-slate-600 border-slate-700 group-hover:border-slate-500"
                      }`}
                  >
                    {item.status === "completed" && (
                      <CheckCircle2
                        size={26}
                        className="animate-[bounce_1s_ease-in-out_infinite]"
                      />
                    )}
                    {item.status === "current" && (
                      <Clock
                        size={26}
                        className="animate-[spin_4s_linear_infinite]"
                      />
                    )}
                    {item.status === "upcoming" && <CircleDashed size={26} />}
                  </div>
                </div>

                {/* Kolom Kanan (untuk card kanan atau kosong) */}
                <div
                  className={`flex-1 md:w-5/12 ${!isLeft ? "" : "md:invisible"}`}
                >
                  {!isLeft && (
                    <div className="md:pl-8">
                      {/* Card ditampilkan jika isLeft = false */}
                      <TimelineCard item={item} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note Kecil untuk user (opsional) */}
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

// Komponen Card terpisah agar kode lebih rapi
function TimelineCard({ item }) {
  return (
    <div
      className={`p-6 rounded-3xl border backdrop-blur-md transition-all duration-500 relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl
        ${
          item.status === "current"
            ? "bg-linear-to-br from-emerald-900/20 to-emerald-950/30 border-emerald-500/50 shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
            : "bg-linear-to-br from-slate-900/90 to-slate-950/90 border-slate-800 hover:border-sky-500/40 hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)]"
        }`}
    >
      {/* Efek shiny di pojok card */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-white/5 to-transparent rounded-bl-3xl"></div>

      {/* Aksen Warna di atas card */}
      <div
        className={`absolute top-0 left-0 right-0 h-2 rounded-t-3xl transition-colors duration-500
          ${
            item.status === "completed"
              ? "bg-sky-500"
              : item.status === "current"
                ? "bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]"
                : "bg-slate-700"
          }`}
      ></div>

      {/* Badge Semester & Tanggal */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <span
          className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest backdrop-blur-sm
            ${
              item.status === "completed"
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : item.status === "current"
                  ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700"
            }`}
        >
          {item.semester}
        </span>

        {item.status === "current" && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full border border-emerald-500/30 animate-pulse backdrop-blur-sm">
            <Sparkles size={12} /> AKTIF
          </span>
        )}
      </div>

      <h4
        className={`text-xl font-bold mb-2 leading-tight transition-colors duration-300
          ${item.status === "current" ? "text-white" : "text-slate-200 group-hover:text-sky-300"}`}
      >
        {item.title}
      </h4>

      <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
        {item.desc}
      </p>

      {/* Status Bawah */}
      <div className="pt-4 mt-auto border-t border-slate-800/30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium">
          {item.status === "completed" && (
            <span className="text-sky-400 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="animate-pulse" /> Selesai
            </span>
          )}
          {item.status === "current" && (
            <span className="text-emerald-400 flex items-center gap-1.5">
              <Clock size={16} className="animate-spin" /> Sedang Berjalan
            </span>
          )}
          {item.status === "upcoming" && (
            <span className="text-slate-500 flex items-center gap-1.5">
              <CircleDashed size={16} /> Belum Dipelajari
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-500 font-mono bg-slate-950/50 px-2 py-1 rounded-lg backdrop-blur-sm">
          {item.date}
        </span>
      </div>
    </div>
  );
}
