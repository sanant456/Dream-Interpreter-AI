import { useState, useRef } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';

export default function DreamInput({ onAnalyze, isAnalyzing }) {
    const [content, setContent] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const toggleListen = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Your browser does not support Speech Recognition.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
            let currentTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                currentTranscript += event.results[i][0].transcript;
            }
            setContent(prev => prev + ' ' + currentTranscript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
        recognitionRef.current = recognition;
        setIsListening(true);
    };

    const handleSubmit = () => {
        if (!content.trim()) return;
        onAnalyze(content);
        setContent('');
    };

    return (
        <div className="glass-panel p-6 shadow-lg rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Record Your Dream</h2>
                <button 
                    onClick={toggleListen} 
                    className={`p-2 rounded-full transition ${isListening ? 'bg-red-500 animate-pulse' : 'bg-dream-violet hover:bg-dream-purple'}`}
                    title={isListening ? "Stop listening" : "Start speaking"}
                >
                    {isListening ? <MicOff size={20}/> : <Mic size={20}/>}
                </button>
            </div>
            
            <textarea 
                className="w-full h-32 bg-dream-dark/50 border border-dream-violet rounded-lg p-4 text-white focus:outline-none focus:border-dream-gold transition resize-none mb-4"
                placeholder="I dreamed I was wandering through an endless library underwater..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isAnalyzing}
            />
            
            <button 
                onClick={handleSubmit}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center space-x-2 bg-dream-gold text-dream-dark font-bold py-3 rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
            >
                <Send size={18} />
                <span>{isAnalyzing ? 'Connecting to Subconscious...' : 'Analyze Deeply'}</span>
            </button>
        </div>
    );
}
