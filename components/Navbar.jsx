'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState('dark');

  // Track scroll for glassmorphism background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track section themes using IntersectionObserver
  useEffect(() => {
    // Store intersection ratios to determine which section is most visible
    const sectionRatios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        // Update ratios for all entries
        entries.forEach((entry) => {
          sectionRatios.set(entry.target, entry.intersectionRatio);
        });

        // Find the section with the highest intersection ratio
        let maxRatio = 0;
        let activeSection = null;

        sectionRatios.forEach((ratio, section) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            activeSection = section;
          }
        });

        // Update theme based on the most visible section
        if (activeSection) {
          const theme = activeSection.dataset.navTheme || 'light';
          setNavTheme(theme);
        }
      },
      {
        rootMargin: '-70px 0px -70% 0px', // Focus on navbar area only
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    const sections = document.querySelectorAll('[data-nav-theme]');
    sections.forEach((section) => {
      sectionRatios.set(section, 0);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  // Theme-based color classes
  const textColor = navTheme === 'dark' ? 'text-white/70 hover:text-amber' : 'text-navy/70 hover:text-navy-dark';
  const logoColor = navTheme === 'dark' ? 'text-white' : 'text-navy-dark';
  const mobileMenuBg = navTheme === 'dark' ? 'bg-black/20' : 'bg-white/90';
  const mobileTextColor = navTheme === 'dark' ? 'text-white/70' : 'text-navy/70';
  const borderColor = navTheme === 'dark' ? 'border-white/10' : 'border-navy/10';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? navTheme === 'dark'
            ? 'bg-white/10 backdrop-blur-xl shadow-lg border-b border-white/10'
            : 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-navy/10'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className={`text-2xl font-bold text-gradient transition-colors duration-500 ${logoColor}`}>
              Clickmasters
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${textColor} transition-colors duration-500 text-sm uppercase tracking-wider font-medium`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-amber text-navy-dark font-semibold hover:bg-amber/90 glow-amber">
              <a href="#contact">Get Started</a>
            </Button>
          </div>

          <button
            className={`md:hidden p-2 transition-colors duration-500 ${navTheme === 'dark' ? 'text-white' : 'text-navy-dark'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${borderColor} ${mobileMenuBg} backdrop-blur-xl`}>
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${mobileTextColor} hover:text-amber transition-colors py-2 font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="bg-amber text-navy-dark font-semibold hover:bg-amber/90">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Get Started</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
