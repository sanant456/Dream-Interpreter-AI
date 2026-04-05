import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="p-6 flex justify-between items-center glass-panel m-4 sticky top-4 z-50">
            <div className="text-2xl font-bold text-dream-gold tracking-wide">DreamAI</div>
            <div className="space-x-6">
                <Link to="/auth" className="text-dream-light hover:text-dream-gold transition">Login</Link>
                <Link to="/auth" className="bg-dream-gold text-dream-dark px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition shadow-[0_0_15px_rgba(235,180,52,0.4)]">
                    Get Started
                </Link>
            </div>
        </nav>
    );
}
