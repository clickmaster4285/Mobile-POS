'use client';

import React from 'react';

/**
 * Background decoration component with grid, dots, gradients, and floating elements
 * @param {Object} props
 * @param {boolean} props.grid - Show grid pattern
 * @param {boolean} props.dots - Show dot pattern
 * @param {boolean} props.gradients - Show gradient orbs
 * @param {boolean} props.floating - Show floating elements
 * @param {string} props.variant - Color variant: 'warm', 'cool', 'neutral'
 * @param {string} props.opacity - Pattern opacity (0-1)
 * @param {string} props.className - Additional CSS classes
 */
export default function BackgroundDecoration({
  grid = false,
  dots = false,
  gradients = true,
  floating = false,
  variant = 'warm',
  opacity = 0.6,
  className = '',
}) {
  const gradientColors = {
    warm: {
      primary: 'rgba(255, 193, 7, 0.15)',
      secondary: 'rgba(255, 160, 0, 0.1)',
      tertiary: 'rgba(255, 143, 0, 0.08)',
    },
    cool: {
      primary: 'rgba(30, 58, 95, 0.08)',
      secondary: 'rgba(59, 130, 246, 0.1)',
      tertiary: 'rgba(99, 102, 241, 0.06)',
    },
    neutral: {
      primary: 'rgba(148, 163, 184, 0.08)',
      secondary: 'rgba(100, 116, 139, 0.06)',
      tertiary: 'rgba(71, 85, 105, 0.04)',
    },
  };

  const colors = gradientColors[variant];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      {/* Dot Pattern */}
      {dots && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(30, 58, 95, 0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {/* Grid Pattern */}
      {grid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 58, 95, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 58, 95, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
      )}

      {/* Gradient Orbs */}
      {gradients && (
        <>
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }}
          />
          <div
            className="absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)` }}
          />
          <div
            className="absolute -bottom-32 left-1/3 w-72 h-72 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${colors.tertiary} 0%, transparent 70%)` }}
          />
        </>
      )}

      {/* Floating Elements */}
      {floating && (
        <>
          <div className="floating-element-1 absolute top-16 left-12 w-12 h-12">
            <svg viewBox="0 0 48 48" className="w-full h-full text-amber/20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="24" cy="24" r="20" />
              <path d="M24 4 C24 4 44 24 24 44 C4 24 24 4 24 4Z" />
            </svg>
          </div>
          <div className="floating-element-2 absolute top-32 right-20 w-8 h-8">
            <svg viewBox="0 0 32 32" className="w-full h-full text-navy/15" fill="currentColor">
              <rect x="4" y="4" width="12" height="12" rx="2" />
              <rect x="16" y="4" width="12" height="12" rx="2" />
              <rect x="4" y="16" width="12" height="12" rx="2" />
              <rect x="16" y="16" width="12" height="12" rx="2" />
            </svg>
          </div>
          <div className="floating-element-3 absolute bottom-24 left-1/4 w-16 h-16">
            <svg viewBox="0 0 64 64" className="w-full h-full text-amber/10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="32,4 60,60 4,60" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
