import React, { useState } from "react";
import { MEMBERS_DATA } from "../data/MockData";
import MemberModal from "../components/MemberModal";

export default function MemberSection() {
  const [filter, setFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredMembers =
    filter === "all"
      ? MEMBERS_DATA
      : MEMBERS_DATA.filter((m) => m.category === filter);

  return (
    <section id="galeri" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-sm font-mono text-sky-500 tracking-widest mb-2">
            // DATABASE
          </h2>
          <h3 className="text-4xl font-bold text-white uppercase tracking-wider font-sans">
            Member{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-400 to-blue-600">
              Gallery
            </span>
          </h3>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: "all", label: "ALL DATA" },
            { id: "inti", label: "PENGURUS INTI" },
            { id: "reguler", label: "MEMBER REGULER" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-6 py-2 rounded-full border text-sm font-mono transition-all ${filter === btn.id ? "bg-sky-500/10 border-sky-500 text-sky-400" : "border-slate-700 text-slate-400"}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 hover:border-sky-500 transition-all cursor-hover"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-48 md:h-56 object-cover p-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-mono text-sky-400 uppercase bg-slate-900/80 px-2 py-1 rounded backdrop-blur border border-sky-500/30">
                  {member.role}
                </span>
                <p className="font-bold mt-2 text-white font-sans truncate">
                  {member.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panggil Modal */}
      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}
