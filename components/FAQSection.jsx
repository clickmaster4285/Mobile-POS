'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundDecoration from './BackgroundDecoration';
import Icon from './Icons';

const faqs = [
  {
    question: 'What is Clickmasters POS?',
    answer:
      'Clickmasters POS is a comprehensive point-of-sale system designed specifically for mobile shops. It helps you manage sales, inventory, customers, and generate reports—all from one easy-to-use platform.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Most shops are fully set up and running within 24 hours. Our team provides onboarding support to ensure everything is configured correctly for your business needs.',
  },
  {
    question: 'Can I use it on multiple devices?',
    answer:
      'Yes! Clickmasters POS is cloud-based and works on any device with a web browser—laptops, tablets, and phones. You can manage your shop from anywhere.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Absolutely. We use bank-grade encryption and store all data on secure cloud servers. Regular backups ensure you never lose your business data.',
  },
  {
    question: 'Do you offer training for my staff?',
    answer:
      'Yes, we provide free training sessions for your entire team. Our intuitive interface means most users are productive within the first hour.',
  },
  {
    question: 'What support do you offer?',
    answer:
      'We offer 24/7 customer support via phone, email, and WhatsApp. Our average response time is under 15 minutes during business hours.',
  },
  {
    question: 'Can I try it before buying?',
    answer:
      'Of course! We offer a free demo and a 14-day trial period so you can experience the full power of Clickmasters POS before making any commitment.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  const itemRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen && contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      } else if (contentRef.current) {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }, itemRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="border border-bg-accent rounded-xl overflow-hidden mb-4 hover:border-amber/50 transition-colors bg-surface glow-card"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left bg-surface hover:bg-surface-hover transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-text-primary pr-4 text-left">
          {faq.question}
        </span>
        <div className={`w-6 h-6 text-amber flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <Icon name="chevronDown" />
        </div>
      </button>
      <div ref={contentRef} className="hidden">
        <div className="p-6 pt-0 text-text-secondary leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-item',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="relative py-32 px-4 bg-section-gradient overflow-hidden">
      {/* Background Decoration */}
      <BackgroundDecoration dots grid gradients variant="cool" opacity={0.4} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber/10 text-amber-dark rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Got questions? We've got answers. Find everything you need to know
            about Clickmasters POS below.
          </p>
        </div>

        {/* FAQ Items */}
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <FAQItem
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
