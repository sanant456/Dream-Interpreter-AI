import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, BookOpen, Clock } from 'lucide-react';

export default function Hero() {
    return (
        <main className="container mx-auto px-4 mt-20 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-6xl font-extrabold mb-6">Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-dream-gold to-yellow-200 drop-shadow-md">Subconscious</span></h1>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    AI analyzes dreams using Jungian psychology, tracks mood progression, and automatically tags deep recurring themes.
                </p>
                <Link to="/auth" className="inline-flex items-center space-x-2 bg-dream-gold text-dream-dark px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition transform shadow-[0_0_20px_rgba(235,180,52,0.6)]">
                    <Sparkles size={20} />
                    <span>Interpret Dream Free</span>
                </Link>
            </motion.div>

            <div className="mt-32 grid md:grid-cols-3 gap-8 text-left mb-20">
                <div className="glass-panel p-8 hover:border-dream-gold/50 transition">
                    <Brain className="text-dream-gold w-12 h-12 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Jungian Analysis</h3>
                    <p className="text-gray-400">Deep psychological interpretation based on universal archetypes.</p>
                </div>
                <div className="glass-panel p-8 hover:border-dream-gold/50 transition">
                    <BookOpen className="text-dream-gold w-12 h-12 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Auto Tagging</h3>
                    <p className="text-gray-400">AI automatically scans and tags hidden motifs in your entries.</p>
                </div>
                <div className="glass-panel p-8 hover:border-dream-gold/50 transition">
                    <Clock className="text-dream-gold w-12 h-12 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Mood Graphs</h3>
                    <p className="text-gray-400">Track quantified emotional evolution with interactive charts.</p>
                </div>
            </div>
        </main>
    );
}
