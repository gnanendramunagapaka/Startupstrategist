export default function IdeaHistory({ view, items, onLoad, onDelete }) {
    return (
        <div>
            <div className="mb-6">
                <h2 className="font-syne text-2xl font-bold text-white mb-1">
                    {view === 'hist' ? 'Generation History' : 'Saved Ideas'}
                </h2>
                <p className="text-[#8f8aaa] text-sm">
                    {items.length} ideas {view === 'hist' ? 'generated' : 'saved'}
                </p>
            </div>

            {items.length === 0 ? (
                <div className="bg-[#0c0c1e] rounded-2xl border border-white/5 p-12 text-center text-[#504d6e]">
                    Nothing here yet.
                </div>
            ) : (
                <div className="grid gap-3">
                    {items.map(item => (
                        <div key={item.id} className="bg-[#0c0c1e] border border-white/5 rounded-2xl p-4 flex gap-4 items-center transition-all hover:bg-[#111126] hover:border-white/10 group">
                            <div className="w-10 h-10 rounded-xl bg-[#6d4eff]/10 flex items-center justify-center text-[#a78bfa] shrink-0">✦</div>
                            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onLoad(item)}>
                                <div className="font-semibold text-[#ede9ff] truncate mb-0.5">{item.parsedIdea.name}</div>
                                <div className="text-sm text-[#8f8aaa] truncate mb-1">"{item.parsedIdea.tagline}"</div>
                                <div className="text-[11px] text-[#504d6e]">{new Date(item.ts).toLocaleString()}</div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onLoad(item)} className="px-3 py-1.5 rounded-lg border border-indigo-500/30 text-indigo-300 text-xs hover:bg-indigo-500/10">Open</button>
                                <button onClick={() => onDelete(item.id)} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-300 text-xs hover:bg-red-500/10">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
