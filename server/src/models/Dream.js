const mongoose = require('mongoose');

const DreamSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    analysis: {
        summary: { type: String },
        emotion: { type: String },
        interpretation: { type: String },
        suggestions: [{ type: String }],
        tags: [{ type: String }]
    },
    emotionScore: { type: Number, default: 50 }, // 0 (Negative) to 100 (Positive). Will calculate based on string matching for the Mood Graph
    createdAt: { type: Date, default: Date.now }
});

DreamSchema.pre('save', function() {
    if (this.analysis && this.analysis.emotion) {
        const emotionLower = this.analysis.emotion.toLowerCase();
        let score = 50; 
        if (emotionLower.includes('fear') || emotionLower.includes('anxiety') || emotionLower.includes('sadness')) score -= 30;
        if (emotionLower.includes('joy') || emotionLower.includes('wonder') || emotionLower.includes('awe')) score += 30;
        if (score < 0) score = 0;
        if (score > 100) score = 100;
        this.emotionScore = score;
    }
});

module.exports = mongoose.model('Dream', DreamSchema);
