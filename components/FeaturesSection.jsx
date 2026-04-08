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
    description:
      'Track stock levels, get low-stock alerts, and manage your entire inventory from one dashboard.',
  },
  {
    icon: 'sales',
    title: 'Smart Sales Tracking',
    description:
      'Monitor daily sales, generate reports, and gain insights into your best-performing products.',
  },
  {
    icon: 'customers',
    title: 'Customer Management',
    description:
      'Build customer profiles, track purchase history, and offer personalized promotions.',
  },
  {
    icon: 'mobile',
    title: 'Mobile-First Design',
    description:
      'Access your POS from any device. Perfect for mobile shop owners on the go.',
  },
  {
    icon: 'security',
    title: 'Secure Transactions',
    description:
      'Bank-grade encryption ensures every transaction is safe and compliant.',
  },
  {
    icon: 'analytics',
    title: 'Analytics & Reports',
    description:
      'Visualize your business performance with beautiful charts and actionable insights.',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.children,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Animate section header
      gsap.fromTo(
        sectionRef.current.querySelector('.section-header > *'),
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 px-4 bg-bg-primary overflow-hidden"
    >
      {/* Background Decoration */}
      <BackgroundDecoration
        dots
        grid
        gradients
        variant="warm"
        opacity={0.5}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
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

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-surface border border-bg-accent hover:border-amber/40 transition-all duration-500 cursor-pointer glow-card hover:glow-card-hover overflow-hidden"
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-amber/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Icon Container */}
                <div className="w-14 h-14 mb-6 p-3 rounded-xl bg-linear-to-br from-amber/10 to-amber/5 text-amber group-hover:from-amber/20 group-hover:to-amber/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <Icon name={feature.icon} />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 group-hover:text-amber-dark transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Indicator Line */}
                <div className="mt-6 h-0.5 w-0 group-hover:w-full bg-linear-to-r from-amber to-amber-light rounded-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
