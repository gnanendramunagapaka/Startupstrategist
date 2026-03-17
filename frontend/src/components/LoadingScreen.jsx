import { useEffect, useState } from 'react';

const LOADING_MSGS = [
    "Scanning real-world pain points...",
    "Researching market gaps...",
    "Designing your startup concept...",
    "Building the business model...",
    "Crafting something meaningful...",
];

export default function LoadingScreen() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setStep(p => (p + 1) % LOADING_MSGS.length), 1600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full mt-5 py-3.5 px-6 rounded-xl bg-gradient-to-br bg-white/10 text-white font-syne text-[15px] font-bold flex items-center justify-center gap-2.5 opacity-70">
            <span className="w-4 h-4 rounded-full border-2 border-white/15 border-t-white inline-block animate-[spin_0.75s_linear_infinite]" />
            {LOADING_MSGS[step]}
        </div>
    );
}
