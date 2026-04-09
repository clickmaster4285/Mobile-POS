'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundDecoration from './BackgroundDecoration';
import Icon from './Icons';
import { Card, CardContent } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Ahmed Khan',
    role: 'Owner, Mobile Zone Islamabad',
    content:
      'Clickmasters POS transformed how we manage our shop. Inventory tracking is flawless, and the sales reports help me make better business decisions every day.',
    rating: 5,
  },
  {
    name: 'Sara Ali',
    role: 'Manager, Tech Mart Rawalpindi',
    content:
      'The customer management feature is incredible. We can now track purchase history and offer personalized deals. Our repeat customer rate has increased by 40%.',
    rating: 5,
  },
  {
    name: 'Usman Malik',
    role: 'CEO, Phone Hub Lahore',
    content:
      'We expanded from 2 to 8 shops, and Clickmasters POS scaled with us perfectly. The multi-store management is a game-changer.',
    rating: 5,
  },
  {
    name: 'Fatima Noor',
    role: 'Owner, Smart Mobile Karachi',
    content:
      'Setup was incredibly easy. Within a day, my entire team was trained and using the system. The support team is always available when we need help.',
    rating: 5,
  },
];

export default function ReviewsSection() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current.children,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index) => setCurrentIndex(index);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-32 px-4 bg-bg-primary overflow-hidden"
    >
      <BackgroundDecoration dots gradients variant="warm" opacity={0.4} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-amber/10 text-amber-dark rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Don't just take our word for it. Hear from mobile shop owners who
            trust Clickmasters POS every day.
          </p>
        </div>

        <div ref={carouselRef} className="relative">
          <div className="min-h-75 flex items-center justify-center">
            <Card className="text-center max-w-3xl mx-auto p-10 glow-card border-0 relative">
              {/* Quote Mark */}
              <div className="absolute -top-4 left-8 text-6xl text-amber/20 font-serif leading-none">"</div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <div key={i} className="w-7 h-7 text-amber">
                    <Icon name="star" />
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-card-foreground leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div>
                <div className="text-lg font-semibold text-card-foreground">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-muted-foreground">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={goPrev}
              className="p-3 rounded-full bg-card hover:border-amber/50 transition-all shadow-sm hover:shadow-md border border-border/50"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-amber w-8' : 'bg-muted w-3 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="p-3 rounded-full bg-card hover:border-amber/50 transition-all shadow-sm hover:shadow-md border border-border/50"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
