import { useState, useEffect, lazy, Suspense } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import DreamInput from '../components/dashboard/DreamInput';
import ResultCard from '../components/dashboard/ResultCard';
import HistoryList from '../components/dashboard/HistoryList';
import MoodChart from '../components/dashboard/MoodChart';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import toast from 'react-hot-toast';

// Lazy 3D — shown beside ResultCard
const FloatingMind = lazy(() => import('../components/3d/FloatingMind'));

export default function Dashboard() {
    const { user, api } = useAuth();
    const [dreams, setDreams] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [currentAnalysis, setCurrentAnalysis] = useState(null);
    const [currentContent, setCurrentContent] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(true);

    const fetchData = async () => {
        try {
            const [dreamsRes, insightsRes] = await Promise.all([
                api.get('/dreams'),
                api.get('/dreams/insights')
            ]);
            setDreams(dreamsRes.data);
            setChartData(insightsRes.data.data || []);
        } catch (err) {
            toast.error('Failed to load history');
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAnalyze = async (content) => {
        setIsAnalyzing(true);
        setCurrentAnalysis(null);
        setCurrentContent(content);
        try {
            const res = await api.post('/dreams', { content });
            setCurrentAnalysis(res.data.analysis);
            toast.success('Analysis Complete!');
            fetchData(); // Refresh history & chart
        } catch (err) {
            toast.error(err.response?.data?.errors?.[0]?.msg || err.response?.data?.msg || 'Failed to analyze dream');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen pb-20" style={{ background: 'linear-gradient(180deg, #0a0015 0%, #120820 40%, #0d0118 100%)' }}>
            <Navbar />
            
            <div className="px-6 mb-8 text-center mt-10">
                <h1 className="text-3xl font-bold" style={{ background: 'linear-gradient(135deg, #eab308, #fde68a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dream Portal</h1>
                <p className="text-purple-300 mt-2">Welcome back to your subconscious, <span className="text-white font-semibold">{user?.username}</span>.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
                {/* Left Column: Input & Results */}
                <div className="space-y-6">
                    <MoodChart data={chartData} />
                    
                    <DreamInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
                    
                    {isAnalyzing && <SkeletonLoader type="card" />}
                    
                    {currentAnalysis && !isAnalyzing && (
                        <div className="relative">
                            {/* FloatingMind 3D orb — top-right decorative overlay */}
                            <div className="absolute -top-6 -right-6 pointer-events-none" style={{ zIndex: 0 }}>
                                <Suspense fallback={null}>
                                    <FloatingMind size={160} />
                                </Suspense>
                            </div>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <ResultCard analysis={currentAnalysis} content={currentContent} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: History */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4 pl-2 border-l-2 border-dream-gold">Journal History</h2>
                    {loadingHistory ? (
                        <div className="space-y-4">
                            <SkeletonLoader type="card" />
                            <SkeletonLoader type="card" />
                        </div>
                    ) : (
                        <HistoryList dreams={dreams} />
                    )}
                </div>
            </div>
        </div>
    );
}
