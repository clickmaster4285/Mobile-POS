import ScrollAnimationSection from '../components/ScrollAnimationSection';

// =============================================================================
// EXAMPLE PAGE - Parallax Scroll Animation (App Router)
// =============================================================================
// This page demonstrates how to use the ScrollAnimation component with:
// - Frame sequence animation controlled by scroll
// - Parallax background and foreground layers
// - Text overlays that fade in/out based on scroll progress
// - Loading progress indicator
//
// SETUP INSTRUCTIONS:
// 1. Place your frame images in /public/frames/ directory
// 2. Name them sequentially: ezgif-frame-001.jpg, ezgif-frame-002.jpg, etc.
// 3. Update totalFrames below to match your frame count
// 4. Adjust aspectRatio to match your video's aspect ratio
// =============================================================================

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
            style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Assembly
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Experience the journey of creation. Scroll to control the animation
            and watch the magic unfold.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-600" />
            <span className="text-sm text-zinc-500 uppercase tracking-widest">
              Scroll to begin
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-600" />
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex justify-center pt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
            </div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
          </div>
        </div>
      </section>

      {/* Scroll Animation Section - Client Component */}
      <ScrollAnimationSection />

      {/* Content After Animation */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-sm text-cyan-400 uppercase tracking-widest">
              The Result
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Masterfully Crafted
          </h2>

          <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed">
            Every component meticulously placed. Every connection precisely engineered.
            Experience technology that understands you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Components', value: '120+' },
              { label: 'Precision', value: '99.9%' },
              { label: 'Crafted', value: 'By Hand' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-zinc-500 text-sm">Scroll Animation Demo</div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-zinc-500 hover:text-cyan-400 transition-colors text-sm"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-cyan-400 transition-colors text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
