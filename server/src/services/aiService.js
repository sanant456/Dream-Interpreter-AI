const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.interpretDream = async (content) => {
    // Local mock for testing
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
        return {
            summary: "This dream represents a profound desire for freedom and intellectual exploration.",
            emotion: "Wonder 70% | Anxiety 30%",
            interpretation: "The vastness of the setting signifies an expanded consciousness, while the specific obstacles point to your waking anxieties about meeting deadlines or expectations.",
            suggestions: [
                "Keep a dream journal near your bed",
                "Practice grounding exercises to reduce the latent anxiety"
            ],
            tags: ["freedom", "exploration", "anxiety", "lucid-potential", "water"]
        };
    }

    const systemPrompt = `You are an expert dream interpreter and psychologist.
    
    Analyze this dream:
    {dream_text}

    Return ONLY a valid JSON object matching this schema exactly:
    {
      "summary": "1-2 sentence overview",
      "emotion": "Dominant emotion and percentage breakdown (e.g., Fear 60% | Awe 40%)",
      "interpretation": "Deep psychological analysis using Jungian principles. Not generic.",
      "suggestions": ["Actionable therapeutic advice 1", "Actionable advice 2"],
      "tags": ["tag1", "tag2", "tag3"]
    }`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // or 'gpt-4o'
            messages: [
                { role: 'system', content: systemPrompt.replace('{dream_text}', content) },
                { role: 'user', content: content }
            ],
            temperature: 0.7,
            max_tokens: 600
        });

        const replyContent = response.choices[0].message.content.trim();
        return JSON.parse(replyContent);
    } catch (err) {
        console.error("OpenAI API Error:", err);
        throw new Error("Failed to process AI response");
    }
};
