import { Instagram, Github, Mail } from "lucide-react";

export default function Footer() {
const links = [
    { Icon: Instagram, href: "https://instagram.com/yourprofile" },
    { Icon: Github, href: "https://github.com/yourusername" },
    { Icon: Mail, href: "mailto:you@example.com" },
];

return (
    <footer className="py-10 border-t border-sky-900/30 glass-panel relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center z-10 relative">
            <div className="mb-6 md:mb-0 text-center md:text-left md:pr-20">
                <div
                    className="text-xl font-bold tracking-tighter mb-2 "
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                    SISFO<span className="text-sky-400">B'25</span>
                </div>
                <p className="text-slate-500 text-sm font-mono">
                    &copy; 2026 Class of 2025. Generation Beta.
                </p>
            </div>

            <div className="flex gap-4">
                {links.map(({ Icon, href }, i) => (
                    <a
                        key={i}
                        href={href}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="cursor-target w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_0_15px_#0ea5e9] cursor-hover"
                    >
                        <Icon size={18} />
                    </a>
                ))}
            </div>
        </div>
    </footer>
);
}
