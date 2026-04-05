import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-dream-dark border border-dream-violet p-3 rounded shadow-lg max-w-[200px]">
                <p className="text-dream-gold font-bold mb-1">{label}</p>
                <p className="text-xs text-gray-300">{payload[0].payload.summary}</p>
                <p className="text-xs mt-2 text-dream-light">Mood Score: {payload[0].value}/100</p>
            </div>
        );
    }
    return null;
};

export default function MoodChart({ data }) {
    if (!data || data.length === 0) {
        return <div className="text-gray-500 text-sm text-center py-6">Not enough data to generate graph. Record more dreams!</div>;
    }

    return (
        <div className="glass-panel p-6 mb-8 w-full">
            <h3 className="text-xl font-bold mb-4">Emotional Evolution</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EBB434" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#EBB434" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A3B69" vertical={false} />
                        <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} />
                        <YAxis stroke="#888" fontSize={12} tickLine={false} domain={[0, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="moodScore" stroke="#EBB434" fillOpacity={1} fill="url(#colorMood)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
