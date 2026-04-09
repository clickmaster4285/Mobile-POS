'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundDecoration from './BackgroundDecoration';
import Icon from './Icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [formRef.current, infoRef.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
        // console.error('API Error:', result.message);
      }
    } catch (error) {
      setSubmitStatus('error');
      // console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-4 bg-bg-primary overflow-hidden"
    >
      <BackgroundDecoration dots gradients variant="warm" opacity={0.5} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber/10 text-amber-dark rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mt-4 mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Ready to get started? Reach out for a free demo or any questions
            about Clickmasters POS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card ref={formRef} className="glow-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-card-foreground">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text" id="name" name="name" value={formData.name}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg text-card-foreground placeholder:text-muted-foreground focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email" id="email" name="email" value={formData.email}
                    onChange={handleChange} required
                    className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg text-card-foreground placeholder:text-muted-foreground focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel" id="phone" name="phone" value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg text-card-foreground placeholder:text-muted-foreground focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-all"
                    placeholder="03XX-XXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message" name="message" value={formData.message}
                    onChange={handleChange} required rows={5}
                    className="w-full px-4 py-3 bg-muted/50 border border-input rounded-lg text-card-foreground placeholder:text-muted-foreground focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-all resize-none"
                    placeholder="Tell us about your shop and requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg bg-amber text-navy-dark font-bold hover:bg-amber/90 glow-amber disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </Button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    ✗ Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-6">Get in Touch</h3>
              <p className="text-text-secondary leading-relaxed mb-8">
                Visit us, give us a call, or send an email. We're here to help
                you transform your mobile shop with the best POS solution.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber/10 rounded-lg text-amber">
                  <div className="w-6 h-6"><Icon name="location" /></div>
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">Location</h4>
                  <p className="text-text-secondary">
                    Main PWD Rd, PWD Housing Society Sector A,<br />
                    PWD Society, Islamabad, Punjab 45700, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber/10 rounded-lg text-amber">
                  <div className="w-6 h-6"><Icon name="phone" /></div>
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">Phone</h4>
                  <a href="tel:03325394285" className="text-text-secondary hover:text-amber transition-colors">
                    0332-5394285
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber/10 rounded-lg text-amber">
                  <div className="w-6 h-6"><Icon name="email" /></div>
                </div>
                <div>
                  <h4 className="text-text-primary font-semibold mb-1">Email</h4>
                  <a href="mailto:sales.clickmasters.pk" className="text-text-secondary hover:text-amber transition-colors">
                    sales.clickmasters.pk
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 p-1 bg-muted/50 rounded-2xl">
              <div className="w-full h-64 bg-muted rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground text-sm">📍 Map Integration Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
