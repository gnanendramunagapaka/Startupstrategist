import { useState } from 'react';
import IndustrySelect from '../components/IndustrySelect';
import IdeaCard from '../components/IdeaCard';
import ChatBox from '../components/ChatBox';
import IdeaHistory from '../components/IdeaHistory';
import LoadingScreen from '../components/LoadingScreen';
import { generateIdeaApi } from '../services/api';

function storageGet(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function storageSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } }

export default function Home() {
    const [view, setView] = useState("gen"); // gen, hist, saved
    const [genLoad, setGenLoad] = useState(false);
    const [genErr, setGenErr] = useState("");
    const [ideaData, setIdeaData] = useState(null);
    const [qaHistory, setQaHistory] = useState([]);
    const [history, setHistory] = useState(() => storageGet("app_hist", []));
    const [saved, setSaved] = useState(() => storageGet("app_saved", []));
    const [saveOk, setSaveOk] = useState(false);

    const handleGenerate = async (input) => {
        setGenLoad(true); setGenErr(""); setIdeaData(null); setQaHistory([]);
        try {
            const data = await generateIdeaApi(input);
            setIdeaData(data);
            
            // Add to history
            const nh = [data, ...history].slice(0, 20);
            setHistory(nh); storageSet("app_hist", nh);
        } catch (e) {
            setGenErr(e.message);
        } finally {
            setGenLoad(false);
        }
    };

    const handleSave = () => {
        if (!ideaData) return;
        if (saved.some(s => s.id === ideaData.id)) { setSaveOk(true); setTimeout(() => setSaveOk(false), 2000); return; }
        const ns = [{ ...ideaData, qaHistory }, ...saved];
        setSaved(ns); storageSet("app_saved", ns);
        setSaveOk(true); setTimeout(() => setSaveOk(false), 2500);
    };

    const loadIdea = (ideaItem) => {
        setIdeaData(ideaItem);
        setQaHistory(ideaItem.qaHistory || []);
        setView("gen");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Nav */}
            <div className="sticky top-0 z-50 bg-[#06060f]/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-[860px] mx-auto px-5 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl text-[#7c6af7]">✦</span>
                        <span className="font-syne font-extrabold text-white text-lg">IdeaForge</span>
                    </div>
                    <div className="flex gap-1.5">
                        {[{ k: "gen", l: "Generator" }, { k: "hist", l: `History (${history.length})` }, { k: "saved", l: `Saved (${saved.length})` }].map(n => (
                            <button key={n.k} onClick={() => setView(n.k)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === n.k ? 'bg-[#6d4eff]/10 text-[#c4b5fd]' : 'text-[#8f8aaa] hover:text-[#ede9ff]'}`}>
                                {n.l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-[860px] mx-auto px-5 pb-20 pt-8">
                {view === "gen" && (
                    <>
                        <div className="text-center mb-10">
                            <h1 className="font-syne text-[clamp(28px,5vw,46px)] font-extrabold tracking-tight bg-gradient-to-br from-white via-indigo-200 to-cyan-300 text-transparent bg-clip-text mb-3">AI Startup Idea Generator</h1>
                            <p className="text-[#8f8aaa] text-sm">Generate ideas, ask an AI advisor, and save the best concepts.</p>
                        </div>
                        
                        {!ideaData && !genLoad && <IndustrySelect onGenerate={handleGenerate} />}
                        {genLoad && <LoadingScreen />}
                        {genErr && <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl mb-6">{genErr}</div>}
                        
                        {ideaData && !genLoad && (
                            <>
                                <IdeaCard idea={ideaData.parsedIdea} rawIdea={ideaData.raw} onGenerateAnother={() => setIdeaData(null)} onSave={handleSave} saveOk={saveOk} />
                                <ChatBox idea={ideaData.parsedIdea} qaHistory={qaHistory} onUpdateQa={setQaHistory} />
                            </>
                        )}
                    </>
                )}

                {(view === "hist" || view === "saved") && (
                    <IdeaHistory 
                        view={view} 
                        items={view === "hist" ? history : saved} 
                        onLoad={loadIdea} 
                        onDelete={id => {
                            if (view === "hist") {
                                const nu = history.filter(x => x.id !== id);
                                setHistory(nu); storageSet("app_hist", nu);
                            } else {
                                const nu = saved.filter(x => x.id !== id);
                                setSaved(nu); storageSet("app_saved", nu);
                            }
                        }} 
                    />
                )}
            </div>
        </>
    );
}
