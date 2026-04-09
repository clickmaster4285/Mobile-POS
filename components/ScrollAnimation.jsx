'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

const formatFrameIndex = (index, padding) => {
  return index.toString().padStart(padding, '0');
};

const clamp = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

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
  minFramesToStart = 30, // Show content after 30 frames
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
  const isLoadingCompleteRef = useRef(false);

  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------
  const [loadingState, setLoadingState] = useState({
    loaded: 0,
    total: totalFrames,
    percentage: 0,
  });
  const [isReadyToScroll, setIsReadyToScroll] = useState(false);
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

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    offscreenCanvasRef.current.width = rect.width;
    offscreenCanvasRef.current.height = rect.height;
  }, []);

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

    let renderWidth = canvasWidth;
    let renderHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (frameAspect > canvasAspect) {
      renderWidth = canvasHeight * frameAspect;
      offsetX = (canvasWidth - renderWidth) / 2;
    } else {
      renderHeight = canvasWidth / frameAspect;
      offsetY = (canvasHeight - renderHeight) / 2;
    }

    offscreenCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    offscreenCtx.drawImage(frame, offsetX, offsetY, renderWidth, renderHeight);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(offscreenCanvas, 0, 0);
  }, []);

  const animationLoop = useCallback(() => {
    const targetFrame = targetFrameRef.current;
    const currentFrame = currentFrameRef.current;

    if (Math.abs(targetFrame - currentFrame) > 0.01) {
      const diff = targetFrame - currentFrame;
      currentFrameRef.current += diff * 0.15;
      currentFrameRef.current = clamp(currentFrameRef.current, 0, totalFrames - 1);
      renderFrame();
    }

    rafRef.current = requestAnimationFrame(animationLoop);
  }, [totalFrames, renderFrame]);

  // ---------------------------------------------------------------------------
  // FRAME PRELOADING
  // ---------------------------------------------------------------------------

  const preloadFrames = useCallback(async () => {
    const batchSize = 5;
    const frames = new Array(totalFrames).fill(null);
    framesRef.current = frames;

    let loadedCount = 0;
    let firstFrameRendered = false;

    const loadSingleFrame = (index) => {
      const url = frameUrls[index];
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          framesRef.current[index] = img;
          loadedCount++;
          
          setLoadingState((prev) => ({
            loaded: loadedCount,
            total: totalFrames,
            percentage: Math.round((loadedCount / totalFrames) * 100),
          }));

          if (index === 0 && !firstFrameRendered) {
            firstFrameRendered = true;
            renderFrame();
          }

          if (loadedCount >= minFramesToStart && !isReadyToScroll) {
            setIsReadyToScroll(true);
          }

          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
        img.src = url;
        img.crossOrigin = 'anonymous';
      });
    };

    // 1. Load the first few frames aggressively
    for (let i = 0; i < Math.min(minFramesToStart, totalFrames); i++) {
      await loadSingleFrame(i);
    }

    // 2. Load the rest in background batches
    const loadRemaining = async () => {
      for (let i = minFramesToStart; i < totalFrames; i += batchSize) {
        const batch = [];
        for (let j = 0; j < batchSize && i + j < totalFrames; j++) {
          batch.push(loadSingleFrame(i + j));
        }
        await Promise.all(batch);
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      setIsLoaded(true);
      isLoadingCompleteRef.current = true;
      if (onLoadComplete) onLoadComplete();
    };

    loadRemaining();
  }, [frameUrls, totalFrames, minFramesToStart, renderFrame, isReadyToScroll, onLoadComplete]);

  // ---------------------------------------------------------------------------
  // SCROLL HANDLING
  // ---------------------------------------------------------------------------

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const scrollStart = rect.top - windowHeight;
    const scrollEnd = rect.bottom;
    const scrollDistance = scrollEnd - scrollStart;
    const currentScroll = -scrollStart;
    const progress = clamp(currentScroll / scrollDistance, 0, 1);

    scrollProgressRef.current = progress;
    targetFrameRef.current = progress * (totalFrames - 1);

    if (backgroundLayerRef.current) {
      const bgOffset = progress * 100 * parallaxSpeeds.background;
      backgroundLayerRef.current.style.transform = `translateY(${bgOffset}px)`;
    }

    if (foregroundLayerRef.current) {
      const fgOffset = progress * -100 * parallaxSpeeds.foreground;
      foregroundLayerRef.current.style.transform = `translateY(${fgOffset}px)`;
    }

    const newVisibleOverlays = new Set();
    textOverlays.forEach((overlay, index) => {
      if (progress >= overlay.startProgress && progress <= overlay.endProgress) {
        newVisibleOverlays.add(index);
      }
    });
    setVisibleOverlays(newVisibleOverlays);

    if (onScrollProgress) onScrollProgress(progress);

    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
  }, [totalFrames, parallaxSpeeds, textOverlays, onScrollProgress]);

  const handleResize = useCallback(() => {
    setupCanvas();
    renderFrame();
  }, [setupCanvas, renderFrame]);

  // ---------------------------------------------------------------------------
  // EFFECTS
  // ---------------------------------------------------------------------------

  useEffect(() => {
    setupCanvas();
    preloadFrames();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [setupCanvas, preloadFrames]);

  useEffect(() => {
    if (isReadyToScroll) {
      rafRef.current = requestAnimationFrame(animationLoop);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReadyToScroll, animationLoop]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
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
      {/* Loading Overlay - Hide when isReadyToScroll is true */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 transition-opacity duration-700 ease-out ${
          isReadyToScroll ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="text-center">
          <div className="mb-4 h-1 w-64 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${loadingState.percentage}%` }}
            />
          </div>
          <p className="font-mono text-sm text-zinc-400">
            <span className="text-cyan-400">{loadingState.loaded}</span>
            <span className="mx-2 text-zinc-600">/</span>
            <span>{loadingState.total}</span>
            <span className="ml-2 text-zinc-500">frames</span>
          </p>
          <p className="mt-2 text-2xl font-light text-white">
            {loadingState.percentage}%
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-zinc-500">
            {loadingState.loaded < minFramesToStart ? 'Initializing Engine...' : 'Optimizing Performance...'}
          </p>
        </div>
      </div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
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

        {textOverlays.map((overlay, index) => {
          const isVisible = visibleOverlays.has(index);
          const progress = scrollProgressRef.current;
          const fadeStart = overlay.startProgress;
          const fadeEnd = overlay.endProgress;
          const fadeDuration = 0.1;

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

        <div
          ref={foregroundLayerRef}
          className="pointer-events-none absolute inset-0 z-30 will-change-transform"
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-zinc-950/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-zinc-950/50 to-transparent" />
          <div className="absolute top-8 left-8 h-16 w-16 border-l-2 border-t-2 border-cyan-500/30" />
          <div className="absolute top-8 right-8 h-16 w-16 border-r-2 border-t-2 border-cyan-500/30" />
          <div className="absolute bottom-8 left-8 h-16 w-16 border-l-2 border-b-2 border-cyan-500/30" />
          <div className="absolute bottom-8 right-8 h-16 w-16 border-r-2 border-b-2 border-cyan-500/30" />
        </div>

        <div className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-linear-to-b from-transparent via-zinc-500 to-zinc-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
