'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundDecoration from './BackgroundDecoration';
import Icon from './Icons';

export default function CTASection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden bg-gradient-to-br from-amber/5 via-blue-50 to-amber/10"
    >
      {/* Background Decoration */}
      <BackgroundDecoration gradients floating variant="warm" opacity={0.6} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
          Ready to Transform Your
          <br />
          <span className="text-gradient">Mobile Shop?</span>
        </h2>

        <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
          Join 500+ mobile shops already using Clickmasters POS. Get started
          today and see the difference in your business.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-10 py-5 bg-amber text-navy-dark font-bold rounded-lg hover:bg-amber-light transition-all duration-300 glow-amber-strong text-lg"
          >
            Book a Free Demo
            <div className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <Icon name="arrowRight" />
            </div>
          </a>
          <a
            href="tel:03325394285"
            className="inline-flex items-center gap-2 px-10 py-5 bg-surface border border-bg-accent text-navy font-semibold rounded-lg hover:border-amber/50 transition-all duration-300 text-lg shadow-sm hover:shadow-md"
          >
            <div className="w-5 h-5 text-amber"><Icon name="phone" /></div>
            Call Us: 0332-5394285
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-text-secondary text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-amber"><Icon name="checkCircle" /></div>
            <span>Free Setup</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-amber"><Icon name="checkCircle" /></div>
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-amber"><Icon name="checkCircle" /></div>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
