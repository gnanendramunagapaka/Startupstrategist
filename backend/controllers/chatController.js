import { answerQuestion } from '../services/hfService.js';

export const askQuestion = async (req, res) => {
    const { question, idea, history } = req.body;
    
    if (!question || !idea) {
        return res.status(400).json({ error: 'Question and idea are required' });
    }

    try {
        const rawOutput = await answerQuestion(question, idea, history);
        
        // Just return the raw text reply
        res.json({ reply: rawOutput });
    } catch (error) {
        console.error('Error in chat:', error);
        res.status(500).json({ error: error.message || 'Failed to get answer' });
    }
};
