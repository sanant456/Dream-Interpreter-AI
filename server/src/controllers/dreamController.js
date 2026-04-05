const { analyzeDreamML } = require("../services/mlService");
const Dream = require('../models/Dream');
const aiService = require('../services/aiService');

exports.analyzeDream = async (req, res, next) => {
    try {
    const { dreamText } = req.body;

    // 🔥 Call ML API
    const mlResult = await analyzeDreamML(dreamText);

    res.json({
      success: true,
      ml: mlResult,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getHistory = async (req, res, next) => {
    try {
        const dreams = await Dream.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(dreams);
    } catch (err) {
        next(err);
    }
};

exports.getInsights = async (req, res, next) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentDreams = await Dream.find({ 
            user: req.user.id,
            createdAt: { $gte: sevenDaysAgo }
        }).sort({ createdAt: 1 }); // Chronological

        if (recentDreams.length === 0) {
            return res.json({ msg: "Not enough data for weekly insights", data: [] });
        }

        const moodGraphData = recentDreams.map(d => ({
            date: new Date(d.createdAt).toLocaleDateString(),
            moodScore: d.emotionScore,
            summary: d.analysis.summary
        }));

        res.json({ data: moodGraphData });
    } catch (err) {
        next(err);
    }
};
