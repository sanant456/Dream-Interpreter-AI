import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, BrainCircuit } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import toast from 'react-hot-toast';

export default function ResultCard({ analysis, content }) {
    const cardRef = useRef(null);

    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 0.95 });
            const link = document.createElement('a');
            link.download = 'dream-analysis.png';
            link.href = dataUrl;
            link.click();
            toast.success('Dream Card Downloaded!');
        } catch (err) {
            toast.error('Failed to generate image');
        }
    };

    if (!analysis) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
        >
            <div className="flex justify-end mb-2">
                <button onClick={handleDownload} className="text-sm flex items-center space-x-1 text-gray-400 hover:text-white transition">
                    <Download size={16} /> <span>Share Card</span>
                </button>
            </div>
            
            <div ref={cardRef} className="glass-panel p-8 bg-gradient-to-br from-dream-purple/90 to-dream-dark rounded-2xl border border-dream-gold/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-dream-gold"></div>
                <BrainCircuit className="absolute top-4 right-4 opacity-10 text-dream-gold w-32 h-32" />
                
                <h3 className="text-2xl font-bold text-dream-gold mb-2">Analysis Complete</h3>
                <p className="text-sm text-gray-300 italic mb-6 border-l-2 border-gray-600 pl-4">{content}</p>

                <div className="space-y-4">
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Emotion Profile</span>
                        <span className="font-semibold text-lg">{analysis.emotion}</span>
                    </div>

                    <div>
                        <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Summary</span>
                        <p className="text-gray-200">{analysis.summary}</p>
                    </div>

                    <div>
                        <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Jungian Interpretation</span>
                        <p className="text-gray-200 leading-relaxed">{analysis.interpretation}</p>
                    </div>

                    <div className="pt-4">
                        <span className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Actionable Suggestions</span>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                            {analysis.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>

                    {analysis.tags && analysis.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-dream-violet/50">
                            {analysis.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-dream-violet px-3 py-1 rounded-full text-dream-gold">#{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
