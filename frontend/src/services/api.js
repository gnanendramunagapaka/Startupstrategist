const API_URL = 'http://localhost:5000/api';

export const generateIdeaApi = async (input) => {
    // Basic heuristic to spread input into industry or interest (could be improved)
    const payload = input.length < 30 ? { industry: input } : { interest: input };
    
    const res = await fetch(`${API_URL}/idea/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to generate idea');
    }
    return res.json();
};

export const askQuestionApi = async (question, idea, history) => {
    const res = await fetch(`${API_URL}/chat/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, idea, history })
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to ask question');
    }
    return res.json();
};
