import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Brain, BookOpen, Palette, Clock, Star, Check, X, Zap, Moon } from 'lucide-react';
import { lazy, Suspense, useEffect } from 'react';

// Lazy-loaded 3D components — zero impact if WebGL is unavailable
const DreamScene = lazy(() => import('../components/3d/DreamScene'));
const BackgroundParticles = lazy(() => import('../components/3d/BackgroundParticles'));

// CSS starfield (lightweight fallback that always shows)
const Stars = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {Array.from({ length: 80 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          width: Math.random() * 2 + 1 + 'px',
          height: Math.random() * 2 + 1 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          opacity: Math.random() * 0.5 + 0.1,
          animation: `twinkle ${Math.random() * 4 + 2}s infinite alternate`,
        }}
      />
    ))}
  </div>
);

export default function LandingPage() {
  // Subtle mouse parallax for hero 3D orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const orbX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const orbY = useTransform(mouseY, [-1, 1], [-12, 12]);

  const handleMouseMove = (e) => {
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0015 0%, #120820 40%, #0d0118 100%)' }}
      onMouseMove={handleMouseMove}
    >
      {/* CSS stars always visible */}
      <Stars />

      {/* 3D particle background — lazy, non-blocking */}
      <Suspense fallback={null}>
        <BackgroundParticles />
      </Suspense>

      {/* ── NAVBAR ── */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-4 border-b border-purple-900/40 backdrop-blur-md bg-black/20 sticky top-0">
        <div className="flex items-center space-x-2">
          <Moon className="text-yellow-400 w-6 h-6" />
          <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">DreamAI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm text-purple-200">
          <a href="#" className="hover:text-yellow-400 transition">Home</a>
          <a href="#analyze" className="hover:text-yellow-400 transition">Analyze Dreams</a>
          <a href="#features" className="hover:text-yellow-400 transition">Gallery</a>
          <a href="#pricing" className="hover:text-yellow-400 transition">Pricing</a>
          <Link to="/auth" className="hover:text-yellow-400 transition">Login</Link>
        </div>
        <Link
          to="/auth"
          className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold px-5 py-2 rounded-full text-sm hover:from-yellow-400 hover:to-yellow-300 transition shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]"
        >
          <Sparkles className="w-4 h-4" />
          <span>Interpret Dream Free</span>
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 text-center px-4 pt-24 pb-16" style={{ minHeight: '100vh' }}>
        {/* 3D Dream Orb — constrained to top portion only, never overlaps the preview box */}
        <motion.div
          className="absolute left-0 right-0 top-0 flex items-center justify-center pointer-events-none"
          style={{ x: orbX, y: orbY, zIndex: 1, height: '58%' }}
        >
          <Suspense fallback={null}>
            <DreamScene />
          </Suspense>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} style={{ position: 'relative', zIndex: 2 }}>
          <div className="inline-flex items-center space-x-2 bg-purple-900/40 border border-purple-700/50 rounded-full px-4 py-1.5 text-xs text-purple-300 mb-8">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>AI-Powered Dream Analysis · Jungian Psychology</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Unlock Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(234,179,8,0.5)]">
              Subconscious.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-purple-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI analyzes dreams using Jungian psychology + creates surreal artwork.
          </p>

          <Link
            to="/auth"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold px-8 py-4 rounded-full text-lg shadow-[0_0_40px_rgba(234,179,8,0.5)] hover:shadow-[0_0_60px_rgba(234,179,8,0.7)] hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            <span>Interpret Dream Free</span>
          </Link>
        </motion.div>

        {/* Dream Input Preview Box */}
        <motion.div
          id="analyze"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="bg-purple-950/60 border border-purple-700/50 rounded-2xl p-6 text-left backdrop-blur-md shadow-[0_0_60px_rgba(139,92,246,0.2)]">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-purple-400">Dream Journal Entry</span>
            </div>
            <p className="text-purple-200 text-sm mb-4 italic">
              "I dreamed of flying through clouds made of crystal..."
              <span className="inline-block w-0.5 h-4 bg-yellow-400 ml-0.5 animate-pulse" />
            </p>
            <div className="bg-purple-900/50 border border-purple-700/40 rounded-xl p-4">
              <p className="text-xs text-yellow-400 font-semibold mb-2">✦ AI Analysis</p>
              <p className="text-sm text-purple-100 leading-relaxed">
                Flying represents <span className="text-yellow-300">freedom and transcendence</span>. The crystal clouds suggest <span className="text-yellow-300">clarity of thought</span> and a desire to see the world with pure perspective...
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── PROBLEM vs SOLUTION ── */}
      <section className="relative z-10 px-4 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why Dreams Fade Into Mystery</h2>
        <p className="text-center text-purple-300 mb-12">Common struggles vs. DreamAI solutions</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { problem: 'Dreams fade by sunrise', solution: 'Instant AI capture & recall' },
            { problem: 'Psychology is too complex', solution: "Jung's wisdom simplified" },
            { problem: 'No pattern recognition', solution: 'Tracks recurring symbols' },
            { problem: 'Isolated insights', solution: 'Connected dream journal' },
          ].map((item, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <div className="bg-red-950/30 border border-red-900/40 rounded-xl p-4 flex items-start space-x-3">
                <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-200">{item.problem}</p>
              </div>
              <div className="bg-green-950/30 border border-green-900/40 rounded-xl p-4 flex items-start space-x-3">
                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <p className="text-sm text-green-200">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI ANALYSIS EXAMPLE ── */}
      <section className="relative z-10 px-4 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">See AI Analysis In Action</h2>
        <p className="text-center text-purple-300 mb-12">Real dream → Deep Jungian interpretation</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-purple-950/50 border border-purple-700/40 rounded-2xl p-6">
            <p className="text-xs text-purple-400 uppercase tracking-widest mb-3">Dream Input</p>
            <p className="text-purple-100 italic text-sm leading-relaxed">
              "I was wandering through an ancient library submerged underwater. The books floated around me, their pages blank yet glowing..."
            </p>
          </div>
          <div className="bg-purple-950/50 border border-yellow-500/30 rounded-2xl p-6">
            <p className="text-xs text-yellow-400 uppercase tracking-widest mb-3">✦ AI Analysis + Art</p>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-purple-400">Archetype</span>
                <p className="text-white font-semibold">The Sage</p>
              </div>
              <div>
                <span className="text-xs text-purple-400">Symbols</span>
                <p className="text-sm text-purple-100">Library = <span className="text-yellow-300">wisdom quest</span></p>
                <p className="text-sm text-purple-100">Water = <span className="text-yellow-300">unconscious mind</span></p>
              </div>
              <div>
                <span className="text-xs text-purple-400">Emotional Tone</span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-purple-900 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-300" style={{ width: '85%' }} />
                  </div>
                  <span className="text-xs text-yellow-300">Wonder 85%</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-purple-900 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-300" style={{ width: '15%' }} />
                  </div>
                  <span className="text-xs text-blue-300">Anxiety 15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 px-4 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Mystical Features</h2>
        <p className="text-center text-purple-300 mb-12">Everything you need to decode your dreams</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Brain, title: 'Jungian Analysis', desc: 'Deep psychological interpretation using Jungian archetypes and shadow work.' },
            { icon: BookOpen, title: 'Symbol Dictionary', desc: 'Access to 500+ dream symbols with their archetypal meanings.' },
            { icon: Palette, title: 'AI Dream Art', desc: 'Stunning surreal artwork generated from your dream using Stable Diffusion.' },
            { icon: Clock, title: 'Dream Journal', desc: 'Track recurring patterns and emotional evolution over time.' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-purple-950/50 border border-purple-700/40 rounded-2xl p-6 hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-purple-500/20 border border-yellow-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="font-bold mb-2">{title}</h3>
              <p className="text-sm text-purple-300 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-4xl mx-auto bg-purple-950/40 border border-purple-700/40 rounded-3xl p-10">
          <div className="grid grid-cols-3 gap-8 text-center mb-10">
            {[
              { number: '50K+', label: 'Dreams Analyzed' },
              { number: '98%', label: 'Accuracy Rate' },
              { number: '4.9/5', label: 'User Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">{stat.number}</p>
                <p className="text-sm text-purple-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-purple-900/40 border border-purple-700/30 rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-purple-100 italic">"This app completely changed how I understand myself. The Jungian analysis is life-changing."</p>
            <p className="text-sm text-purple-400 mt-2">— Sarah D., Verified User</p>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative z-10 px-4 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Choose Your Journey</h2>
        <p className="text-center text-purple-300 mb-12">Start free, upgrade when ready</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'FREE', price: '₹0', sub: 'Forever free',
              features: ['3 analyses / month', '1 AI artwork / month', 'Basic symbol lookup', 'Dream journal'],
              cta: 'Get Started Free', highlight: false,
            },
            {
              name: 'PRO', price: '₹9', sub: '/ month',
              features: ['Unlimited analyses', 'Unlimited AI artwork', 'Full symbol dictionary', 'Pattern tracking', 'Priority support'],
              cta: 'Upgrade to Pro', highlight: true,
            },
            {
              name: 'ENTERPRISE', price: 'Custom', sub: 'For teams',
              features: ['Everything in Pro', 'Team dashboard', 'API access', 'Dedicated support', 'Custom integrations'],
              cta: 'Contact Us', highlight: false,
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-yellow-500/10 to-purple-900/60 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.2)]'
                  : 'bg-purple-950/50 border-purple-700/40 hover:border-purple-500/50'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-400 text-black text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <p className="text-xs text-purple-400 uppercase tracking-widest mb-2">{plan.name}</p>
              <div className="flex items-baseline space-x-1 mb-1">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-sm text-purple-400">{plan.sub}</span>
              </div>
              <ul className="space-y-2 my-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center space-x-2 text-sm text-purple-200">
                    <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-400 text-black hover:from-yellow-400 hover:to-amber-300 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                    : 'bg-purple-800/60 text-white border border-purple-600/40 hover:bg-purple-700/60'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative z-10 px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            <span className="text-sm text-purple-300 ml-2">4.9/5.0 from 500+ reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Last chance to unlock your{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">subconscious</span>
          </h2>
          <p className="text-purple-300 mb-8">Join 50,000+ dreamers discovering hidden meanings in their sleep</p>
          <Link
            to="/auth"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold px-10 py-4 rounded-full text-lg shadow-[0_0_50px_rgba(234,179,8,0.5)] hover:shadow-[0_0_70px_rgba(234,179,8,0.7)] hover:scale-105 transition-all duration-300"
          >
            <Zap className="w-5 h-5" />
            <span>Get Started Free — No Card Needed</span>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-purple-900/40 py-8 text-center text-sm text-purple-500">
        © 2026 DreamAI · Unlock the mysteries of your subconscious mind
      </footer>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
