'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundDecoration from './BackgroundDecoration';
import Icon from './Icons';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: 'inventory',
    title: 'Real-Time Inventory Management',
    description: 'Track stock levels, get low-stock alerts, and manage your entire inventory from one dashboard.',
    color: 'from-amber/20 to-orange-200/10',
    borderColor: 'border-amber/30',
    iconBg: 'from-amber/20 to-amber/5',
  },
  {
    icon: 'sales',
    title: 'Smart Sales Tracking',
    description: 'Monitor daily sales, generate reports, and gain insights into your best-performing products.',
    color: 'from-blue-500/10 to-cyan-400/5',
    borderColor: 'border-blue-400/30',
    iconBg: 'from-blue-500/20 to-cyan-400/10',
  },
  {
    icon: 'customers',
    title: 'Customer Management',
    description: 'Build customer profiles, track purchase history, and offer personalized promotions.',
    color: 'from-purple-500/10 to-pink-400/5',
    borderColor: 'border-purple-400/30',
    iconBg: 'from-purple-500/20 to-pink-400/10',
  },
  {
    icon: 'mobile',
    title: 'Mobile-First Design',
    description: 'Access your POS from any device. Perfect for mobile shop owners on the go.',
    color: 'from-emerald-500/10 to-green-400/5',
    borderColor: 'border-emerald-400/30',
    iconBg: 'from-emerald-500/20 to-green-400/10',
  },
  {
    icon: 'security',
    title: 'Secure Transactions',
    description: 'Bank-grade encryption ensures every transaction is safe and compliant.',
    color: 'from-rose-500/10 to-red-400/5',
    borderColor: 'border-rose-400/30',
    iconBg: 'from-rose-500/20 to-red-400/10',
  },
  {
    icon: 'analytics',
    title: 'Analytics & Reports',
    description: 'Visualize your business performance with beautiful charts and actionable insights.',
    color: 'from-indigo-500/10 to-violet-400/5',
    borderColor: 'border-indigo-400/30',
    iconBg: 'from-indigo-500/20 to-violet-400/10',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 60, rotateX: 15, scale: 0.9 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        sectionRef.current.querySelectorAll('.section-header > *'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      // Floating elements animation
      gsap.to('.feature-float-1', {
        y: -15, x: 8, rotation: 5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to('.feature-float-2', {
        y: 12, x: -10, rotation: -3, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5,
      });
      gsap.to('.feature-float-3', {
        y: -10, x: -6, rotation: 4, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 px-4 bg-bg-primary overflow-hidden"
    >
      <BackgroundDecoration dots grid gradients variant="warm" opacity={0.5} />

      {/* Floating Widgets (copied from Hero) */}
      <div className="feature-float-1 absolute top-20 left-8 md:left-16 w-24 h-24 md:w-32 md:h-32 opacity-15">
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full text-amber">
          <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
          <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
        </svg>
      </div>

      <div className="feature-float-2 absolute bottom-24 right-8 md:right-24 w-20 h-20 md:w-28 md:h-28 opacity-12">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-navy">
          <rect x="10" y="10" width="80" height="80" rx="8" stroke="currentColor" strokeWidth="2" />
          <rect x="25" y="25" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <rect x="40" y="40" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="feature-float-3 absolute top-1/3 right-12 md:right-40 w-16 h-16 md:w-24 md:h-24 opacity-10">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full text-amber">
          <polygon points="40,5 75,70 5,70" stroke="currentColor" strokeWidth="2" />
          <polygon points="40,20 60,60 20,60" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="section-header text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-amber/10 text-amber-dark rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6">
            Everything You Need to{' '}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Powerful features designed to streamline your mobile shop operations
            and boost your bottom line.
          </p>
        </div>

        {/* Feature Cards with Clip-Path Design */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative cursor-pointer glow-card hover:glow-card-hover transition-all duration-700"
              style={{ perspective: '1000px' }}
            >
              {/* Clip-Path Card Background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.color} rounded-2xl transition-all duration-700 group-hover:scale-[1.02]`}
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                }}
              />

              {/* Corner Accents */}
              <div className={`absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 ${feature.borderColor} rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 ${feature.borderColor} rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Diagonal Gradient Line */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-bl ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
              />

              {/* Card Content */}
              <div className="relative z-10 p-8">
                {/* Icon Container with Hexagon Clip */}
                <div className={`w-16 h-16 mb-6 p-3 rounded-xl bg-linear-to-br ${feature.iconBg} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg overflow-hidden`}>
                  <div className="w-full h-full text-amber">
                    <Icon name={feature.icon} />
                  </div>
                </div>

                {/* Number Badge */}
                <div className={`absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-xs font-bold bg-linear-to-br ${feature.color} rounded-lg ${feature.borderColor} border text-text-muted`}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-4 group-hover:text-amber-dark transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="mt-6 flex items-center gap-3">
                  <div className={`h-0.5 w-8 bg-linear-to-r ${feature.color.split(' ')[0].replace('from-', 'from-').replace('/20', '')} to-transparent rounded-full group-hover:w-full transition-all duration-700`} />
                  <svg className="w-4 h-4 text-amber opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
