'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Formats frame index with padding (e.g., 1 -> '001')
 * @param {number} index - Frame index
 * @param {number} padding - Number of digits
 * @returns {string} Formatted index
 */
const formatFrameIndex = (index, padding) => {
  return index.toString().padStart(padding, '0');
};

/**
 * Interpolates between two values based on progress
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} progress - Progress (0-1)
 * @returns {number} Interpolated value
 */
const lerp = (start, end, progress) => {
  return start + (end - start) * progress;
};

/**
 * Easing function for smoother animation
 * Cubic ease-out: fast start, slow end
 * @param {number} t - Input (0-1)
 * @returns {number} Eased value
 */
const easeOutCubic = (t) => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Clamps value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
const clamp = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * ScrollAnimation Component
 * @param {Object} props - Component props
 * @param {number} props.totalFrames - Total number of frames in the sequence
 * @param {string} [props.framesPath='/frames/'] - Path to frames directory
 * @param {string} [props.framePattern='frame_{index}.jpg'] - Filename pattern
 * @param {number} [props.framePadding=3] - Zero padding for frame numbers
 * @param {number} [props.startFrame=1] - Starting frame number
 * @param {number} [props.scrollHeight=300] - Scroll container height in vh
 * @param {number} [props.aspectRatio=16/9] - Aspect ratio of frames
 * @param {Object} [props.parallaxSpeeds={background: 0.3, foreground: 1.5}] - Parallax speeds
 * @param {Array} [props.textOverlays=[]] - Text overlay configurations
 * @param {Function} [props.onLoadComplete] - Callback when frames loaded
 * @param {Function} [props.onScrollProgress] - Callback with scroll progress
 * @param {boolean} [props.debug=false] - Enable debug logging
 */
export default function ScrollAnimation({
  totalFrames,
  framesPath = '/frames/',
  framePattern = 'frame_{index}.jpg',
  framePadding = 3,
  startFrame = 1,
  scrollHeight = 300,
  aspectRatio = 16 / 9,
  parallaxSpeeds = { background: 0.3, foreground: 1.5 },
  textOverlays = [],
  onLoadComplete,
  onScrollProgress,
  debug = false,
}) {
  // ---------------------------------------------------------------------------
  // REFS
  // ---------------------------------------------------------------------------
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const framesRef = useRef([]);
  const rafRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const backgroundLayerRef = useRef(null);
  const foregroundLayerRef = useRef(null);

  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const [loadingState, setLoadingState] = useState({
    loaded: 0,
    total: totalFrames,
    percentage: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleOverlays, setVisibleOverlays] = useState(new Set());

  // ---------------------------------------------------------------------------
  // MEMOIZED VALUES
  // ---------------------------------------------------------------------------
  const frameUrls = useMemo(() => {
    const urls = [];
    for (let i = 0; i < totalFrames; i++) {
      const frameIndex = startFrame + i;
      const formattedIndex = formatFrameIndex(frameIndex, framePadding);
      const filename = framePattern.replace('{index}', formattedIndex);
      urls.push(`${framesPath}${filename}`);
    }
    return urls;
  }, [totalFrames, framesPath, framePattern, framePadding, startFrame]);

  // ---------------------------------------------------------------------------
  // CANVAS SETUP & RENDERING
  // ---------------------------------------------------------------------------

  /**
   * Sets up canvas with device pixel ratio for sharp rendering
   */
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
    const rect = canvas.getBoundingClientRect();

    // Set actual canvas size (scaled by DPR for sharpness)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set display size via CSS
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Scale context to match DPR
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Create offscreen canvas for double buffering
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    offscreenCanvasRef.current.width = rect.width;
    offscreenCanvasRef.current.height = rect.height;

    if (debug) {
      console.log(`Canvas setup: ${rect.width}x${rect.height} @ ${dpr}x DPR`);
    }
  }, [debug]);

  /**
   * Renders current frame to canvas
   */
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const offscreenCanvas = offscreenCanvasRef.current;
    if (!canvas || !offscreenCanvas) return;

    const ctx = canvas.getContext('2d');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (!ctx || !offscreenCtx) return;

    const frameIndex = Math.round(currentFrameRef.current);
    const frame = framesRef.current[frameIndex];

    if (!frame || !frame.complete) return;

    const rect = canvas.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const frameAspect = frame.naturalWidth / frame.naturalHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    // Calculate cover sizing
    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (frameAspect > canvasAspect) {
      // Frame is wider than canvas
      renderWidth = canvasHeight * frameAspect;
      offsetX = (canvasWidth - renderWidth) / 2;
    } else {
      // Frame is taller than canvas
      renderHeight = canvasWidth / frameAspect;
      offsetY = (canvasHeight - renderHeight) / 2;
    }

    // Clear and draw
    offscreenCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    offscreenCtx.drawImage(frame, offsetX, offsetY, renderWidth, renderHeight);

    // Copy to main canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(offscreenCanvas, 0, 0);
  }, []);

  /**
   * Animation loop using requestAnimationFrame
   */
  const animationLoop = useCallback(() => {
    if (!isLoaded) return;

    // Smooth frame interpolation
    const targetFrame = targetFrameRef.current;
    const currentFrame = currentFrameRef.current;

    if (Math.abs(targetFrame - currentFrame) > 0.01) {
      // Use easing for smoother transitions
      const diff = targetFrame - currentFrame;
      currentFrameRef.current += diff * 0.15; // Smooth interpolation factor

      // Clamp to valid frame range
      currentFrameRef.current = clamp(
        currentFrameRef.current,
        0,
        totalFrames - 1
      );

      renderFrame();
    }

    rafRef.current = requestAnimationFrame(animationLoop);
  }, [isLoaded, totalFrames, renderFrame]);

  // ---------------------------------------------------------------------------
  // FRAME PRELOADING
  // ---------------------------------------------------------------------------

  /**
   * Preloads all frames in batches for performance
   */
  const preloadFrames = useCallback(async () => {
    const batchSize = 10; // Load 10 frames at a time
    const frames = [];

    for (let i = 0; i < frameUrls.length; i += batchSize) {
      const batch = frameUrls.slice(i, i + batchSize);
      const batchPromises = batch.map((url, index) => {
        const actualIndex = i + index;
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadingState((prev) => ({
              loaded: prev.loaded + 1,
              total: totalFrames,
              percentage: Math.round(((prev.loaded + 1) / totalFrames) * 100),
            }));
            resolve(img);
          };
          img.onerror = () => {
            console.warn(`Failed to load frame: ${url}`);
            // Resolve with empty image to continue loading
            resolve(img);
          };
          img.src = url;
          img.crossOrigin = 'anonymous';
        });
      });

      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach((img, index) => {
        frames[i + index] = img;
      });

      // Small delay between batches to prevent main thread blocking
      if (i + batchSize < frameUrls.length) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    framesRef.current = frames;
    setIsLoaded(true);
    if (onLoadComplete) onLoadComplete();

    if (debug) {
      console.log(`Preloaded ${frames.length} frames`);
    }
  }, [frameUrls, totalFrames, onLoadComplete, debug]);

  // ---------------------------------------------------------------------------
  // SCROLL HANDLING
  // ---------------------------------------------------------------------------

  /**
   * Handles scroll events and updates progress
   */
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate scroll progress (0 to 1)
    // Progress is 0 when container top enters viewport
    // Progress is 1 when container bottom leaves viewport
    const scrollStart = rect.top - windowHeight;
    const scrollEnd = rect.bottom;
    const scrollDistance = scrollEnd - scrollStart;
    const currentScroll = -scrollStart;
    const progress = clamp(currentScroll / scrollDistance, 0, 1);

    scrollProgressRef.current = progress;
    targetFrameRef.current = progress * (totalFrames - 1);

    // Update parallax layers
    if (backgroundLayerRef.current) {
      const bgOffset = progress * 100 * parallaxSpeeds.background;
      backgroundLayerRef.current.style.transform = `translateY(${bgOffset}px)`;
    }

    if (foregroundLayerRef.current) {
      const fgOffset = progress * -100 * parallaxSpeeds.foreground;
      foregroundLayerRef.current.style.transform = `translateY(${fgOffset}px)`;
    }

    // Update visible text overlays
    const newVisibleOverlays = new Set();
    textOverlays.forEach((overlay, index) => {
      if (progress >= overlay.startProgress && progress <= overlay.endProgress) {
        newVisibleOverlays.add(index);
      }
    });
    setVisibleOverlays(newVisibleOverlays);

    // Notify parent
    if (onScrollProgress) onScrollProgress(progress);

    isScrollingRef.current = true;

    // Clear scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, [totalFrames, parallaxSpeeds, textOverlays, onScrollProgress]);

  // ---------------------------------------------------------------------------
  // RESIZE HANDLING
  // ---------------------------------------------------------------------------

  const handleResize = useCallback(() => {
    setupCanvas();
    renderFrame();
  }, [setupCanvas, renderFrame]);

  // ---------------------------------------------------------------------------
  // EFFECTS
  // ---------------------------------------------------------------------------

  // Initial setup
  useEffect(() => {
    setupCanvas();
    preloadFrames();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [setupCanvas, preloadFrames]);

  // Start animation loop when loaded
  useEffect(() => {
    if (isLoaded) {
      rafRef.current = requestAnimationFrame(animationLoop);
    }
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isLoaded, animationLoop]);

  // Scroll and resize listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleResize]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 transition-opacity duration-700 ease-out ${
          isLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-center">
          {/* Progress Bar */}
          <div className="mb-4 h-1 w-64 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${loadingState.percentage}%` }}
            />
          </div>

          {/* Progress Text */}
          <p className="font-mono text-sm text-zinc-400">
            <span className="text-cyan-400">{loadingState.loaded}</span>
            <span className="mx-2 text-zinc-600">/</span>
            <span>{loadingState.total}</span>
            <span className="ml-2 text-zinc-500">frames</span>
          </p>

          {/* Percentage */}
          <p className="mt-2 text-2xl font-light text-white">
            {loadingState.percentage}%
          </p>
        </div>
      </div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Parallax Layer */}
        <div
          ref={backgroundLayerRef}
          className="absolute inset-0 -top-20 -bottom-20 z-0 will-change-transform"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              linear-gradient(to bottom, #09090b, #18181b)
            `,
          }}
        />

        {/* Main Canvas Layer */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8"
            style={{ aspectRatio }}
          >
            <canvas
              ref={canvasRef}
              className="h-full w-full rounded-lg"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
            />
          </div>
        </div>

        {/* Text Overlays */}
        {textOverlays.map((overlay, index) => {
          const isVisible = visibleOverlays.has(index);
          const progress = scrollProgressRef.current;
          const fadeStart = overlay.startProgress;
          const fadeEnd = overlay.endProgress;
          const fadeDuration = 0.1; // 10% fade in/out

          let opacity = 0;
          if (progress >= fadeStart && progress <= fadeEnd) {
            if (progress < fadeStart + fadeDuration) {
              opacity = (progress - fadeStart) / fadeDuration;
            } else if (progress > fadeEnd - fadeDuration) {
              opacity = (fadeEnd - progress) / fadeDuration;
            } else {
              opacity = 1;
            }
          }

          return (
            <div
              key={index}
              className={`absolute z-20 transition-opacity duration-300 ${
                overlay.className || ''
              }`}
              style={{
                top: overlay.position.top,
                bottom: overlay.position.bottom,
                left: overlay.position.left,
                right: overlay.position.right,
                opacity: isVisible ? opacity : 0,
                pointerEvents: 'none',
              }}
            >
              <h2
                className={`font-bold tracking-tight text-white drop-shadow-lg ${
                  overlay.size || 'text-4xl md:text-6xl lg:text-7xl'
                }`}
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                }}
              >
                {overlay.text}
              </h2>
            </div>
          );
        })}

        {/* Foreground Parallax Layer (decorative elements) */}
        <div
          ref={foregroundLayerRef}
          className="pointer-events-none absolute inset-0 z-30 will-change-transform"
        >
          {/* Decorative gradient overlays */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950/50 to-transparent" />

          {/* Corner accents */}
          <div className="absolute top-8 left-8 h-16 w-16 border-l-2 border-t-2 border-cyan-500/30" />
          <div className="absolute top-8 right-8 h-16 w-16 border-r-2 border-t-2 border-cyan-500/30" />
          <div className="absolute bottom-8 left-8 h-16 w-16 border-l-2 border-b-2 border-cyan-500/30" />
          <div className="absolute bottom-8 right-8 h-16 w-16 border-r-2 border-b-2 border-cyan-500/30" />
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-zinc-500 to-zinc-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
