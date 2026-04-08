'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BackgroundDecoration from './BackgroundDecoration';
import Icon from './Icons';

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content entrance animation
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Floating animation for decorative elements
      gsap.to('.floating-element-1', {
        y: -15,
        x: 8,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.floating-element-2', {
        y: 12,
        x: -10,
        rotation: -3,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });
      gsap.to('.floating-element-3', {
        y: -10,
        x: -6,
        rotation: 4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Rich Background Decoration */}
      <BackgroundDecoration
        dots
        grid
        gradients
        floating
        variant="warm"
        opacity={0.7}
      />

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

      {/* Diagonal Gradient Lines */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100" y2="100" stroke="url(#gradient1)" strokeWidth="0.3" />
          <line x1="20" y1="0" x2="100" y2="80" stroke="url(#gradient1)" strokeWidth="0.2" />
          <line x1="0" y1="20" x2="80" y2="100" stroke="url(#gradient1)" strokeWidth="0.2" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full glass border-amber-glow">
          <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          <span className="text-sm text-navy uppercase tracking-widest font-semibold">
            Modern POS Solution for Mobile Shops
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-text-primary mb-6 leading-[1.1]">
          Revolutionize Your
          <br />
          <span className="text-gradient">Mobile Shop</span>
          <br />
          with Clickmasters POS
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
          Streamline sales, inventory, and customer management with our powerful
          point-of-sale solution designed specifically for mobile retailers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-amber text-navy-dark font-bold rounded-lg hover:bg-amber-light transition-all duration-300 glow-amber text-lg"
          >
            Get Started Today
            <div className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <Icon name="arrowRight" />
            </div>
          </a>
          <a
            href="#features"
            className="px-8 py-4 glass text-navy font-semibold rounded-lg hover:bg-white/80 transition-all duration-300 border border-bg-accent text-lg"
          >
            Book a Demo
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-text-secondary text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-amber">
              <Icon name="checkCircle" />
            </div>
            <span>Easy Setup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-amber">
              <Icon name="checkCircle" />
            </div>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-amber">
              <Icon name="checkCircle" />
            </div>
            <span>Trusted by 500+ Shops</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-10 rounded-full border-2 border-bg-accent flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber animate-bounce" />
          </div>
          <span className="text-xs text-text-muted uppercase tracking-widest">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
