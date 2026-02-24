import React, { useState } from "react";
import { SCHEDULE_DATA } from "../data/MockData";
import { Clock, MapPin, Coffee } from "lucide-react";

export default function JadwalSection() {
  const currentDay = new Date().getDay();

  return (
    <section id="jadwal" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-sm font-mono text-sky-500 tracking-widest mb-2">
          // TIME TABLE
        </h2>
        <h3 className="text-4xl font-bold text-white uppercase tracking-wider font-sans">
          Class{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-600">
            Schedule
          </span>
        </h3>
        <p className="text-slate-400 font-mono text-sm mt-4">
          Sistem menyorot jadwal hari ini secara otomatis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        {SCHEDULE_DATA.map((dayData, index) => {
          const isToday = currentDay === dayData.day;
          return (
            <div
              key={index}
              className={`cursor-target glass-panel p-6 rounded-xl border transition-all duration-300 relative overflow-hidden group ${isToday ? "border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.3)] -translate-y-2" : "border-slate-700/50"}`}
              data-aos="flip-left"
              data-aos-delay={index * 100}
            >
              {isToday && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform"></div>
              )}

              <h3 className="font-bold text-sky-400 border-b border-sky-900/50 pb-3 mb-4 font-mono text-lg flex justify-between items-center">
                {dayData.name}
                {isToday && (
                  <span className="text-[10px] px-2 py-1 bg-sky-500/20 border border-sky-500/50 rounded text-sky-300 shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                    TODAY
                  </span>
                )}
              </h3>

              {dayData.classes.length > 0 ? (
                <ul className="space-y-4">
                  {dayData.classes.map((cls, idx) => (
                    <li
                      key={idx}
                      className="group/item hover:pl-2 transition-all cursor-default"
                    >
                      <p className="text-sky-300 font-mono text-xs mb-1 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {cls.time}
                      </p>
                      <p className="font-medium text-white text-sm font-sans">
                        {cls.subject}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {cls.room}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="h-full min-h-30 flex flex-col justify-center items-center text-slate-500 py-4">
                  <Coffee size={32} className="mb-2 opacity-50" />
                  <p className="text-sm font-mono uppercase tracking-widest">
                    Free Day
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
