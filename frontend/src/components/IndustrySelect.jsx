import { useState } from 'react';

const INDUSTRIES = [
    { label: "🤖 AI / ML", value: "AI and Machine Learning" },
    { label: "💸 FinTech", value: "Financial Technology" },
    { label: "🏥 HealthTech", value: "Healthcare Technology" },
    { label: "📚 EdTech", value: "Education Technology" },
    { label: "✈️ Travel", value: "Travel and Tourism" },
    { label: "🌱 CleanTech", value: "Sustainability and Clean Technology" },
    { label: "🌾 AgriTech", value: "Agriculture Technology" },
    { label: "🤝 Social Impact", value: "Social Impact" },
    { label: "⚡ Productivity", value: "Productivity and SaaS" },
    { label: "🔐 Cybersecurity", value: "Cybersecurity" },
    { label: "🧠 Mental Health", value: "Mental Health and Wellness" },
    { label: "⚖️ LegalTech", value: "Legal Technology" },
    { label: "🏠 PropTech", value: "Real Estate Technology" },
    { label: "🚗 Mobility", value: "Transportation and Mobility" },
    { label: "🛒 RetailTech", value: "Retail Technology" },
    { label: "🎮 Gaming", value: "Gaming and Entertainment" },
];

const HINTS = [
    "AI tools for solo developers",
    "Affordable rural healthcare",
    "Student focus & productivity",
    "Gig worker finance",
    "Travel safety for solo women",
    "Carbon footprint tracking",
    "Remote team wellness",
    "Food waste reduction",
];

export default function IndustrySelect({ onGenerate }) {
    const [tab, setTab] = useState("industry");
    const [selInd, setSelInd] = useState("");
    const [itext, setItext] = useState("");

    const handleGen = () => {
        const input = tab === "industry" ? selInd : itext.trim();
        if (input) onGenerate(input);
    };

    return (
        <div className="bg-[#0c0c1e] border border-white/10 rounded-2xl overflow-hidden mb-5 relative">
            <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-[#6d4eff]/70 to-transparent" />
            <div className="p-6">
                <div className="flex gap-1.5 mb-5 bg-[#090918] rounded-xl p-1">
                    {[["industry", "🏭 By Industry"], ["interest", "💡 By Interest"]].map(([k, l]) => (
                        <button key={k} onClick={() => setTab(k)} className={`flex-1 py-2 px-3.5 rounded-lg border-none cursor-pointer font-medium text-[13.5px] transition-all hover:text-[#ede9ff] ${tab === k ? 'bg-[#141428] text-[#ede9ff] shadow-[0_1px_6px_rgba(0,0,0,0.5)]' : 'bg-transparent text-[#504d6e]'}`}>
                            {l}
                        </button>
                    ))}
                </div>

                {tab === "industry" && (
                    <>
                        <div className="text-[10px] font-bold tracking-widest uppercase text-[#4a4868] mb-2 flex items-center gap-2">Select an industry</div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(106px,1fr))] gap-2 mb-1">
                            {INDUSTRIES.map(ind => (
                                <button key={ind.value} onClick={() => setSelInd(ind.value)} className={`py-2 px-1.5 rounded-xl border cursor-pointer text-center transition-all text-[12.5px] hover:border-[#6d4eff]/50 hover:bg-[#6d4eff]/10 hover:text-[#c4b5fd] ${selInd === ind.value ? 'border-[#6d4eff]/55 bg-[#6d4eff]/10 text-[#c4b5fd] font-medium' : 'border-white/5 bg-[#0e0e1e] text-[#504d6e] font-normal'}`}>
                                    {ind.label}
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {tab === "interest" && (
                    <>
                        <div className="text-[10px] font-bold tracking-widest uppercase text-[#4a4868] mb-2 flex items-center gap-2">Describe your interest or skill area</div>
                        <textarea value={itext} onChange={e => setItext(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && e.metaKey) handleGen(); }} placeholder="e.g. AI tools for solo developers, affordable healthcare in rural areas..." className="w-full p-3 rounded-xl border border-white/10 bg-[#0e0e1e] text-[#ede9ff] text-sm outline-none resize-y min-h-[88px] leading-relaxed transition-colors focus:border-[#6d4eff]/50" />
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {HINTS.map(h => (
                                <button key={h} onClick={() => setItext(h)} className="py-1 px-3 rounded-full border border-white/10 bg-transparent text-[#3d3b58] text-xs cursor-pointer transition-all hover:border-[#6d4eff]/40 hover:text-[#c4b5fd]">{h}</button>
                            ))}
                        </div>
                    </>
                )}

                <button onClick={handleGen} className="w-full mt-5 py-3.5 px-6 rounded-xl border-none cursor-pointer bg-gradient-to-br from-[#5035c4] to-[#7c6af7] text-white font-syne text-[15px] font-bold tracking-wide transition-all shadow-[0_4px_22px_rgba(109,78,255,0.3)] flex items-center justify-center gap-2.5 hover:bg-[#6b5cf0]">
                    ✦ Generate Startup Idea
                </button>
            </div>
        </div>
    );
}
