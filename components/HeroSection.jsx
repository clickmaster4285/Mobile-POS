'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import BackgroundDecoration from './BackgroundDecoration';
import Icon from './Icons';
import { Button } from '@/components/ui/button';

// Hero images - replace with your own images from Unsplash/Pexels
const heroImages = [
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80',
  'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1920&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80',
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );

      gsap.to('.floating-element-1', { y: -15, x: 8, rotation: 5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.floating-element-2', { y: 12, x: -10, rotation: -3, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 });
      gsap.to('.floating-element-3', { y: -10, x: -6, rotation: 4, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Auto-Scrolling Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            <img
              src={src}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70" />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/80 via-navy/60 to-amber-dark/30" />
      </div>

      {/* Slide Indicators */}
      <div className="absolute top-8 right-8 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === index ? 'w-8 bg-amber' : 'w-4 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Rich Background Decoration */}
      <BackgroundDecoration dots grid gradients floating variant="warm" opacity={0.7} />

      {/* Large Decorative SVG Elements */}
      <div className="floating-element-1 absolute top-20 left-8 md:left-16 w-24 h-24 md:w-32 md:h-32 opacity-15">
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-amber">
          <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
          <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
        </svg>
      </div>

      <div className="floating-element-2 absolute bottom-24 right-8 md:right-24 w-20 h-20 md:w-28 md:h-28 opacity-12">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-navy">
          <rect x="10" y="10" width="80" height="80" rx="8" stroke="currentColor" strokeWidth="2" />
          <rect x="25" y="25" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <rect x="40" y="40" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="floating-element-3 absolute top-1/3 right-12 md:right-40 w-16 h-16 md:w-24 md:h-24 opacity-10">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full text-amber">
          <polygon points="40,5 75,70 5,70" stroke="currentColor" strokeWidth="2" />
          <polygon points="40,20 60,60 20,60" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full glass border-amber-glow">
          <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          <span className="text-sm text-white uppercase tracking-widest font-semibold">
            Modern POS Solution for Mobile Shops
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          Revolutionize Your
          <br />
          <span className="text-gradient">Mobile Shop</span>
          <br />
          with Clickmasters POS
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-200 max-w-3xl mx-auto mb-10 leading-relaxed">
          Streamline sales, inventory, and customer management with our powerful
          point-of-sale solution designed specifically for mobile retailers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button asChild size="lg" className="px-8 py-6 text-lg bg-amber text-navy-dark font-bold hover:bg-amber/90 glow-amber group">
            <a href="#contact">
              Get Started Today
              <div className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-1">
                <Icon name="arrowRight" />
              </div>
            </a>
          </Button>

          <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-white/20 hover:border-amber/50 hover:bg-white/10">
            <a href="#features">Book a Demo</a>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-zinc-300 text-sm font-medium">
          {['Easy Setup', '24/7 Support', 'Trusted by 500+ Shops'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-5 h-5 text-amber"><Icon name="checkCircle" /></div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
