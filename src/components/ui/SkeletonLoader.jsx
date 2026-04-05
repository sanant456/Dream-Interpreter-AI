import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonLoader({ type }) {
    if (type === 'card') {
        return (
            <div className="glass-panel p-6 w-full animate-pulse">
                <Skeleton baseColor="#2A1B3D" highlightColor="#4A3B69" height={20} width="60%" className="mb-4" />
                <Skeleton baseColor="#2A1B3D" highlightColor="#4A3B69" count={3} className="mb-2" />
                <Skeleton baseColor="#2A1B3D" highlightColor="#4A3B69" height={20} width="40%" className="mt-4" />
            </div>
        );
    }
    
    return <Skeleton baseColor="#2A1B3D" highlightColor="#4A3B69" />;
}
