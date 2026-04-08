'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundDecoration from './BackgroundDecoration';

gsap.registerPlugin(ScrollTrigger);

const brands = [
  'Samsung', 'Apple', 'Xiaomi', 'OPPO', 'Huawei', 'Vivo',
  'OnePlus', 'Realme', 'Nokia', 'Motorola', 'Sony', 'LG',
  'Google Pixel', 'HTC', 'Lenovo', 'ZTE', 'Infinix', 'Tecno',
];

const brandsRow1 = [...brands, ...brands, ...brands];
const brandsRow2 = [...brands.slice().reverse(), ...brands.slice().reverse(), ...brands.slice().reverse()];

export default function TrustBarSection() {
  const sectionRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const statsRef = useRef(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats on scroll
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
        }
      );

      // Marquee Row 1: Left to Right
      if (marquee1Ref.current) {
        const marqueeWidth = marquee1Ref.current.scrollWidth / 3;
        const tl1 = gsap.timeline({ repeat: -1 });
        tl1.fromTo(
          marquee1Ref.current,
          { x: -marqueeWidth },
          { x: 0, duration: 40, ease: 'none' }
        );
        // Pause on hover
        if (marquee1Ref.current.parentElement) {
          marquee1Ref.current.parentElement.addEventListener('mouseenter', () => tl1.pause());
          marquee1Ref.current.parentElement.addEventListener('mouseleave', () => tl1.play());
        }
      }

      // Marquee Row 2: Right to Left
      if (marquee2Ref.current) {
        const marqueeWidth = marquee2Ref.current.scrollWidth / 3;
        const tl2 = gsap.timeline({ repeat: -1 });
        tl2.fromTo(
          marquee2Ref.current,
          { x: 0 },
          { x: -marqueeWidth, duration: 40, ease: 'none' }
        );
        // Pause on hover
        if (marquee2Ref.current.parentElement) {
          marquee2Ref.current.parentElement.addEventListener('mouseenter', () => tl2.pause());
          marquee2Ref.current.parentElement.addEventListener('mouseleave', () => tl2.play());
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 bg-section-gradient border-y border-border/50 overflow-hidden"
    >
      <BackgroundDecoration dots gradients variant="neutral" opacity={0.4} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Compatible with all major mobile brands and certified for retail excellence
          </p>
        </div>

        {/* Infinite Scrolling Brand Logos - Two Rows */}
        <div className="relative overflow-hidden -mx-4 py-8">
          {/* Gradient fade on edges */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-bg-secondary to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-bg-secondary to-transparent z-10 pointer-events-none" />

          {/* Row 1: Left to Right */}
          <div className="overflow-hidden mb-6">
            <div
              ref={marquee1Ref}
              className="flex gap-8 md:gap-16 whitespace-nowrap cursor-pointer"
            >
              {brandsRow1.map((brand, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex items-center justify-center px-6 md:px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/30"
                >
                  <span className="text-2xl md:text-4xl font-extrabold tracking-tight text-muted-foreground/30 hover:text-text-primary transition-colors select-none">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="overflow-hidden">
            <div
              ref={marquee2Ref}
              className="flex gap-8 md:gap-16 whitespace-nowrap cursor-pointer"
            >
              {brandsRow2.map((brand, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex items-center justify-center px-6 md:px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/30"
                >
                  <span className="text-2xl md:text-4xl font-extrabold tracking-tight text-muted-foreground/30 hover:text-text-primary transition-colors select-none">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          ref={statsRef}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '500+', label: 'Active Shops' },
            { value: '50K+', label: 'Transactions/Day' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
