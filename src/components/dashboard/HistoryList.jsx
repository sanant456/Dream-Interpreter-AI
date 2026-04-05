import { motion } from 'framer-motion';

export default function HistoryList({ dreams }) {
    if (!dreams || dreams.length === 0) {
        return <div className="text-gray-500 text-center py-10">No dreams recorded yet.</div>;
    }

    return (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {dreams.map((dream) => (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={dream._id} 
                    className="glass-panel p-6 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-dream-gold"></div>
                    <p className="text-gray-300 italic mb-4">"{dream.content}"</p>
                    
                    {dream.analysis && (
                        <div className="mt-4 pt-4 border-t border-dream-violet/50 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">{new Date(dream.createdAt).toLocaleDateString()}</span>
                                <span className="text-xs text-gray-400">Mood: {dream.emotionScore}/100</span>
                            </div>
                            <p className="text-sm font-semibold">{dream.analysis.summary}</p>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                                {dream.analysis.tags?.map((tag, i) => (
                                    <div key={i} className="text-[10px] bg-dream-violet/30 px-2 py-1 rounded text-dream-gold">
                                        #{tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
