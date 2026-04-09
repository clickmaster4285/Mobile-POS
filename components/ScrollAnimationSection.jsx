'use client';

import ScrollAnimation from './ScrollAnimation';

// =============================================================================
// SCROLL ANIMATION SECTION - Client Component
// =============================================================================
// This component wraps ScrollAnimation to fix hydration issues.
// All client-side only code (useEffect, useRef, canvas, scroll events)
// is contained within this component.
// =============================================================================

export default function ScrollAnimationSection() {
  return (
    <section className="relative">
      <ScrollAnimation
        totalFrames={454}
        framesPath="/frames/"
        framePattern="ezgif-frame-{index}.jpg"
        framePadding={3}
        scrollHeight={300}
        aspectRatio={16 / 9}
        parallaxSpeeds={{ background: 0.3, foreground: 1.5 }}
        textOverlays={[
          {
            text: 'Precision',
            startProgress: 0.1,
            endProgress: 0.25,
            position: { top: '20%', left: '10%' },
            size: 'text-3xl md:text-5xl lg:text-6xl',
            className: 'text-cyan-400',
          },
          {
            text: 'Innovation',
            startProgress: 0.3,
            endProgress: 0.45,
            position: { top: '30%', right: '10%' },
            size: 'text-3xl md:text-5xl lg:text-6xl',
            className: 'text-purple-400',
          },
          {
            text: 'Battery',
            startProgress: 0.5,
            endProgress: 0.65,
            position: { bottom: '25%', left: '15%' },
            size: 'text-2xl md:text-4xl lg:text-5xl',
          },
          {
            text: 'Motherboard',
            startProgress: 0.7,
            endProgress: 0.85,
            position: { top: '25%', right: '15%' },
            size: 'text-2xl md:text-4xl lg:text-5xl',
          },
          {
            text: 'Perfection',
            startProgress: 0.85,
            endProgress: 0.98,
            position: { bottom: '30%', left: '50%', right: '50%' },
            size: 'text-4xl md:text-6xl lg:text-7xl',
            className: '-translate-x-1/2 text-center whitespace-nowrap',
          },
        ]}
        onLoadComplete={() => { }}
        onScrollProgress={(progress) => {
          // Optional: track scroll progress
        }}
      />
    </section>
  );
}
