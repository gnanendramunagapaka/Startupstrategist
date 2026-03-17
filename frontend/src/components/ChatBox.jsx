import { useState, useRef, useEffect } from 'react';
import { askQuestionApi } from '../services/api';

export default function ChatBox({ idea, qaHistory, onUpdateQa }) {
    const [qaInput, setQaInput] = useState("");
    const [qaLoad, setQaLoad] = useState(false);
    const [qaErr, setQaErr] = useState("");
    const qaEnd = useRef(null);

    useEffect(() => {
        qaEnd.current?.scrollIntoView({ behavior: "smooth" });
    }, [qaHistory]);

    const handleAsk = async () => {
        const q = qaInput.trim();
        if (!q || qaLoad) return;
        
        const userMsg = { role: "user", content: q };
        const newHistory = [...qaHistory, userMsg];
        onUpdateQa(newHistory);
        setQaInput("");
        setQaLoad(true);
        setQaErr("");
        
        try {
            const response = await askQuestionApi(q, idea, qaHistory);
            onUpdateQa([...newHistory, { role: "assistant", content: response.reply }]);
        } catch (e) {
            setQaErr("Error: " + (e.message || "Try again."));
            onUpdateQa(newHistory);
        } finally {
            setQaLoad(false);
        }
    };

    return (
        <div className="bg-[#0c0c1e] border border-white/10 rounded-[18px] overflow-hidden mb-5">
            <div className="p-[18px_24px_14px] border-b border-white/5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#6d4eff]/15 flex items-center justify-center text-lg">💬</div>
                <div>
                    <div className="font-syne text-[15px] font-bold text-[#ede9ff]">Ask Your AI Startup Advisor</div>
                    <div className="text-xs text-[#504d6e]">Get specific advice for {idea.startupName || "your startup"}</div>
                </div>
            </div>

            {/* Messages */}
            {qaHistory.length > 0 && (
                <div className="p-[16px_24px] max-h-[400px] overflow-y-auto flex flex-col gap-3">
                    {qaHistory.map((m, i) => (
                        <div key={i} className={`flex gap-2 items-start ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            {m.role === "assistant" && <div className="w-7 h-7 rounded-lg bg-[#6d4eff]/20 flex items-center justify-center text-xs shrink-0 mt-0.5">✦</div>}
                            <div className={`max-w-[80%] p-3 text-[13.5px] font-light leading-relaxed whitespace-pre-wrap animate-[up_0.25s_ease] ${m.role === "user" ? "rounded-[14px_14px_4px_14px] bg-[#6d4eff]/15 border border-[#6d4eff]/30 text-[#c4b5fd]" : "rounded-[14px_14px_14px_4px] bg-[#111128] border border-white/5 text-[#8f8aaa]"}`}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {qaLoad && (
                        <div className="flex gap-2 items-center">
                            <div className="w-7 h-7 rounded-lg bg-[#6d4eff]/20 flex items-center justify-center text-xs shrink-0">✦</div>
                            <div className="bg-[#111128] border border-white/5 rounded-[14px_14px_14px_4px] p-[10px_16px] text-sm text-[#8f8aaa]">Thinking...</div>
                        </div>
                    )}
                    {qaErr && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-[13px]">{qaErr}</div>}
                    <div ref={qaEnd} />
                </div>
            )}

            {/* Input */}
            <div className="p-[14px_24px_18px]">
                <div className="flex gap-2">
                    <input value={qaInput} onChange={e => setQaInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) handleAsk(); }} placeholder="Ask anything about this startup idea..." className="flex-1 p-3 rounded-xl border border-white/10 bg-[#0e0e1e] text-[#ede9ff] outline-none transition-colors focus:border-[#6d4eff]/50" />
                    <button onClick={handleAsk} disabled={qaLoad || !qaInput.trim()} className="w-11 h-11 rounded-xl bg-[#5b3fd4] text-white flex items-center justify-center transition-all disabled:opacity-50 hover:bg-[#6b5cf0]">
                        ↑
                    </button>
                </div>
            </div>
        </div>
    );
}
