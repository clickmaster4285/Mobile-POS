'use client';

import React from 'react';
import Lottie from 'lottie-react';

/**
 * LottieAnimation Component
 * @param {Object} props - Component props
 * @param {Object} props.animationData - Lottie animation JSON data
 * @param {string} [props.className] - Optional CSS classes
 * @param {boolean} [props.loop=true] - Whether to loop the animation
 * @param {boolean} [props.autoplay=true] - Whether to autoplay
 */
const LottieAnimation = ({ animationData, className = '', loop = true, autoplay = true }) => {
  if (!animationData) return null;

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  );
};

export default LottieAnimation;
