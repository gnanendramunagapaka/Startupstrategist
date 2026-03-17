import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function IdeaCard({ idea, rawIdea, genLoad, onGenerateAnother, onSave, saveOk }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!rawIdea) return;
        navigator.clipboard.writeText(idea.text || rawIdea).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
    };

    return (
        <div className="bg-[#0c0c1e] border border-white/10 rounded-[18px] overflow-hidden mb-5 animate-[up_0.4s_ease]">
            <div className="p-6 pb-4 bg-gradient-to-br from-[#6d4eff]/10 to-transparent relative border-b border-white/5">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6d4eff]/50 to-transparent" />
                <div className="font-syne text-[clamp(22px,4vw,34px)] font-extrabold tracking-tight text-[#ede9ff] mb-1.5">Startup Idea</div>
            </div>

            {/* Markdown Text */}
            <div className="p-[20px_32px] text-base text-[#8f8aaa] leading-[1.8] font-light idea-markdown">
                <ReactMarkdown>{idea.text || ""}</ReactMarkdown>
            </div>
            
            <div className="h-[1px] bg-white/5" />

            {/* Actions */}
            <div className="p-4 flex gap-2 flex-wrap bg-black/20 print:hidden">
                <button onClick={onGenerateAnother} disabled={genLoad} className="px-4 py-2 rounded-lg border border-[#6d4eff]/35 bg-[#6d4eff]/10 text-[#c4b5fd] text-[13px] font-medium transition-all hover:bg-[#6d4eff]/20">
                    ✦ Generate Another
                </button>
                <button onClick={onSave} className={`px-4 py-2 rounded-lg border text-[13px] font-medium transition-all ${saveOk ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10" : "border-white/10 bg-[#10101e] text-[#7b77a0] hover:border-white/20"}`}>
                    {saveOk ? "★ Saved!" : "★ Save Idea"}
                </button>
                <button onClick={handleCopy} className={`px-4 py-2 rounded-lg border text-[13px] font-medium transition-all ${copied ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10" : "border-white/10 bg-[#10101e] text-[#7b77a0] hover:border-white/20"}`}>
                    {copied ? "✓ Copied!" : "⎘ Copy Text"}
                </button>
                <button onClick={() => window.print()} className="px-4 py-2 rounded-lg border border-white/10 bg-[#10101e] text-[#7b77a0] text-[13px] font-medium transition-all hover:border-white/20 ml-auto">
                    📄 Save as PDF
                </button>
            </div>
        </div>
    );
}
