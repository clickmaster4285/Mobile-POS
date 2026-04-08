'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundDecoration from './BackgroundDecoration';

gsap.registerPlugin(ScrollTrigger);
import { Card, CardContent } from '@/components/ui/card';

const milestones = [
  {
    year: '2018',
    title: 'The Beginning',
    description:
      'Clickmasters was founded with a vision to simplify mobile shop management.',
  },
  {
    year: '2019',
    title: 'First POS Launch',
    description:
      'Launched our first POS system, serving 50+ mobile shops in Islamabad.',
  },
  {
    year: '2021',
    title: 'Scaling Up',
    description:
      'Expanded to 200+ shops across Punjab with enhanced features and cloud support.',
  },
  {
    year: '2023',
    title: 'Next-Gen POS',
    description:
      'Released version 3.0 with AI-powered analytics and mobile app integration.',
  },
  {
    year: '2025',
    title: 'Industry Leader',
    description:
      'Now trusted by 500+ shops, becoming the #1 POS solution for mobile retailers in Pakistan.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50) },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' } }
      );
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power2.inOut', scrollTrigger: { trigger: timelineRef.current, start: 'top 75%', end: 'bottom 25%', scrub: 1 } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-4 bg-section-gradient overflow-hidden">
      <BackgroundDecoration grid gradients variant="cool" opacity={0.4} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-amber/10 text-amber-dark rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6">
            The Journey of{' '}
            <span className="text-gradient">Clickmasters</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            From a small startup to the leading POS provider for mobile shops in
            Pakistan. Here's how we got here.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber to-amber-dark rounded-full transform -translate-x-1/2 origin-top" />

          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-row`}
            >
              <div className="w-full md:w-1/2 px-8">
                <Card
                  className={`p-6 glow-card hover:border-amber-glow transition-all duration-300 border-0 ${
                    index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                  }`}
                >
                  <CardContent className="p-0">
                    <span className="inline-block px-3 py-1 bg-amber/10 text-amber-dark rounded-full text-sm font-semibold mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="text-2xl font-bold text-card-foreground mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-amber glow-amber border-4 border-card z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
