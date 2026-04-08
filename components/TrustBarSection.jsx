'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundDecoration from './BackgroundDecoration';
import Icon from './Icons';

const partners = [
  { name: 'Samsung', icon: 'mobile' },
  { name: 'Apple', icon: 'security' },
  { name: 'Xiaomi', icon: 'inventory' },
  { name: 'OPPO', icon: 'analytics' },
  { name: 'Huawei', icon: 'sales' },
  { name: 'Vivo', icon: 'customers' },
];

export default function TrustBarSection() {
  const sectionRef = useRef(null);
  const logosRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logosRef.current.children,
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        sectionRef.current.querySelectorAll('.stat-item > *'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.stats-grid'),
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 bg-section-gradient border-y border-bg-accent overflow-hidden"
    >
      {/* Background Decoration */}
      <BackgroundDecoration dots gradients variant="neutral" opacity={0.4} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Partnered with top mobile brands and certified for retail excellence
          </p>
        </div>

        {/* Partner Logos */}
        <div
          ref={logosRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center"
        >
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl glass hover:border-amber-glow transition-all duration-300 cursor-pointer glow-card hover:glow-card-hover"
            >
              <div className="w-12 h-12 p-2.5 rounded-lg bg-gradient-to-br from-bg-secondary to-bg-accent text-text-muted group-hover:text-amber transition-all duration-300 group-hover:scale-110">
                <Icon name={partner.icon} />
              </div>
              <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors font-medium">
                {partner.name}
              </span>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="stats-grid mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Active Shops' },
            { value: '50K+', label: 'Transactions/Day' },
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="stat-item text-center">
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
