import crypto from 'crypto';
import { generateStartupIdea } from "../services/hfService.js";

export const generateIdea = async (req, res) => {
    const { industry, interest } = req.body;
    
    // Validation
    if (!industry && !interest) {
        return res.status(400).json({ error: 'Either industry or interest is required' });
    }

    try {
        const rawOutput = await generateStartupIdea(industry || "", interest || "");
        
        // We just return the raw markdown string as the idea
        let structuredOutput = { text: rawOutput };
        
        res.json({
            id: crypto.randomBytes(4).toString('hex'),
            input: industry || interest,
            parsedIdea: structuredOutput,
            ts: Date.now()
        });
    } catch (error) {
        console.error('Error generating idea:', error);
        res.status(500).json({ error: error.message || 'Failed to generate idea' });
    }
};
