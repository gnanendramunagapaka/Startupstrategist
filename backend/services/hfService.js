import { InferenceClient } from "@huggingface/inference";

function getClient() {
  return new InferenceClient(process.env.HF_API_KEY);
}


// We use a model suitable for JSON generation and chat from the available free Serverless API tier
const MODEL = "meta-llama/Meta-Llama-3-8B-Instruct";

export async function generateStartupIdea(industry, interest) {
  const prompt = `
Generate a comprehensive startup idea based on the following:

Industry: ${industry}
Interest: ${interest}

Please provide a detailed text description including the startup name, tagline, problem, solution, target users, MVP features, revenue model, market opportunity, and some domain suggestions. Provide the response as a well-formatted markdown text document.`;

  const hf = getClient();
  const response = await hf.chatCompletion({
    model: MODEL,
    messages: [
      { role: "system", content: "You are a startup strategist. Always return pure JSON." },
      { role: "user", content: prompt }
    ],
    max_tokens: 1500,
    temperature: 0.7
  });

  return response.choices[0].message.content;
}

export async function answerQuestion(question, idea, history) {
  const systemPrompt = `You are a startup advisor. The user has generated a startup idea and wants expert advice.
Startup Idea Detail:
${idea.text || idea.rawIdea || "A startup idea"}

Be specific, practical, and concise. Max 3-4 sentences unless asked for more.
Provide your response as plain text or markdown format.`;

  const formattedHistory = (history || []).map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  }));

  const hf = getClient();
  const response = await hf.chatCompletion({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      ...formattedHistory,
      { role: "user", content: question }
    ],
    max_tokens: 1000,
    temperature: 0.7
  });

  return response.choices[0].message.content;
}
