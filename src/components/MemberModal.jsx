import React, { useEffect } from "react";
import { X, User, Instagram } from "lucide-react";

export default function MemberModal({ member, onClose }) {
  useEffect(() => {
    // document.body.style.overflow = 'hidden';
    if (member) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Kembalikan scroll saat komponen dilepas
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [member]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
        onClick={onClose}
      ></div>
      <div className="relative glass-panel border border-sky-500/50 rounded-xl w-full max-w-lg p-6 md:p-8 overflow-hidden animate-[slideUp_0.4s_ease-out] shadow-[0_0_30px_rgba(14,165,233,0.2)]">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(14,165,233,0.05)_50%)] bg-size-[100%_4px] z-10 opacity-50"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-sky-400 transition-colors z-20 bg-slate-900/50 rounded-full p-1 cursor-hover border border-transparent hover:border-sky-500/50"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-2 mb-6 border-b border-sky-900/50 pb-4">
          <User className="text-sky-400" size={24} />
          <h3 className="font-mono text-xl text-sky-400 font-bold tracking-widest uppercase">
            DATA ARCHIVE
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-20">
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-slate-900 rounded-lg border-2 border-sky-500/30 p-2 relative group overflow-hidden shadow-[0_0_15px_rgba(14,165,233,0.2)]">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover relative z-10"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-sky-500/20 to-transparent"></div>
          </div>
          <div className="flex-1 w-full font-mono text-sm space-y-4">
            <div>
              <p className="text-sky-500/70 text-[10px] uppercase mb-1">
                IDENTITAS_NAMA
              </p>
              <p className="text-xl font-bold text-white font-sans">
                {member.name}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sky-500/70 text-[10px] uppercase mb-1">
                  ID_NPM
                </p>
                <p className="text-sky-200">{member.npm}</p>
              </div>
              <div>
                <p className="text-sky-500/70 text-[10px] uppercase mb-1">
                  ROLE
                </p>
                <span className="inline-block px-2 py-0.5 bg-sky-900/40 text-sky-400 rounded text-xs border border-sky-500/30">
                  {member.role}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sky-500/70 text-[10px] uppercase mb-1">
                TTL (LOKASI_LAHIR)
              </p>
              <p className="text-slate-300">{member.ttl}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sky-500/70 text-[10px] uppercase mb-1">
                  MINAT_HOBBY
                </p>
                <p className="text-slate-300">{member.hobby}</p>
              </div>
              <div>
                <a
                  href={`https://instagram.com/${member.sosmed}`}
                  className="text-sky-500/70 text-[10px] uppercase mb-1 cursor-target"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-sky-900/10 border-l-4 border-sky-500 rounded-r relative z-20">
          <p className="text-sky-500/70 text-[10px] font-mono uppercase mb-2">
            MOTTO_HIDUP
          </p>
          <p className="italic text-slate-300 font-sans text-sm relative">
            <span className="text-sky-500 text-2xl absolute -top-2 -left-2 opacity-50">
              "
            </span>
            &nbsp;&nbsp;{member.motto}
          </p>
        </div>
      </div>
    </div>
  );
}
