import React from 'react';

interface EprayogLogoProps {
  /** Size in pixels (both width and height). Default: 56 */
  size?: number;
  /** Unique suffix to avoid SVG gradient/filter ID collisions. Default: 'default' */
  idSuffix?: string;
}

/**
 * Animated orbital E-Prayog logo mark.
 * Uses the same design as the Navbar logo but is self-contained
 * with prefixed IDs so multiple instances don't clash.
 */
const EprayogLogo: React.FC<EprayogLogoProps> = ({ size = 56, idSuffix = 'default' }) => {
  const p = `ep-${idSuffix}`; // unique prefix

  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-label="E-Prayog Logo"
      style={{ overflow: 'visible', display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`${p}-outerG`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1A73E8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00C896" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${p}-innerG`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#00C896" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${p}-eG`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#60AAFF" />
          <stop offset="100%" stopColor="#1A73E8" />
        </linearGradient>
        <radialGradient id={`${p}-eGlow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1A73E8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1A73E8" stopOpacity="0" />
        </radialGradient>
        <filter id={`${p}-outerElecGlow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={`${p}-innerElecGlow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={`${p}-ringGlow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.7" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={`${p}-eGlowF`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <path id={`${p}-outerPath`} d="M 67.2,40 A 27.2,11.2 0 1 1 67.19,39.97" fill="none" />
        <path id={`${p}-innerPath`} d="M 57.6,40 A 17.6,7.2 0 1 1 57.59,39.97"  fill="none" />
      </defs>

      {/* Outer ring */}
      <g className="ep-outer-ring" style={{ transformOrigin: '40px 40px' }}>
        <ellipse cx="40" cy="40" rx="27.2" ry="11.2"
          fill="none" stroke={`url(#${p}-outerG)`} strokeWidth="1.6" strokeOpacity="1"
          filter={`url(#${p}-ringGlow)`}
          transform="rotate(-20,40,40)"
        />
      </g>

      {/* Inner ring */}
      <g className="ep-inner-ring" style={{ transformOrigin: '40px 40px' }}>
        <ellipse cx="40" cy="40" rx="17.6" ry="7.2"
          fill="none" stroke={`url(#${p}-innerG)`} strokeWidth="1.6" strokeOpacity="1"
          filter={`url(#${p}-ringGlow)`}
          transform="rotate(55,40,40)"
        />
      </g>

      {/* Outer electrons */}
      <g className="ep-outer-ring" style={{ transformOrigin: '40px 40px' }}>
        <g filter={`url(#${p}-outerElecGlow)`}>
          <circle r="2.2" fill="#1A73E8">
            <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear">
              <mpath xlinkHref={`#${p}-outerPath`} />
            </animateMotion>
          </circle>
          <circle r="1.5" fill="#1A73E8" opacity="0.45">
            <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-0.17s">
              <mpath xlinkHref={`#${p}-outerPath`} />
            </animateMotion>
          </circle>
        </g>
        <g filter={`url(#${p}-outerElecGlow)`}>
          <circle r="2.2" fill="#00C896">
            <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-3s">
              <mpath xlinkHref={`#${p}-outerPath`} />
            </animateMotion>
          </circle>
          <circle r="1.5" fill="#00C896" opacity="0.45">
            <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-3.17s">
              <mpath xlinkHref={`#${p}-outerPath`} />
            </animateMotion>
          </circle>
        </g>
      </g>

      {/* Inner electron */}
      <g className="ep-inner-ring" style={{ transformOrigin: '40px 40px' }}>
        <g filter={`url(#${p}-innerElecGlow)`}>
          <circle r="2" fill="#FF8C00">
            <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear">
              <mpath xlinkHref={`#${p}-innerPath`} />
            </animateMotion>
          </circle>
          <circle r="1.3" fill="#FF8C00" opacity="0.4">
            <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear" begin="-0.14s">
              <mpath xlinkHref={`#${p}-innerPath`} />
            </animateMotion>
          </circle>
        </g>
      </g>

      {/* E glow */}
      <ellipse cx="40" cy="40" rx="9" ry="9" fill={`url(#${p}-eGlow)`} className="ep-eglow" />

      {/* Central E */}
      <g className="ep-eletter" style={{ transformOrigin: '40px 40px' }}>
        <text
          x="40" y="44"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="20"
          fill={`url(#${p}-eG)`}
          filter={`url(#${p}-eGlowF)`}
          style={{ userSelect: 'none' }}
        >E</text>
      </g>

      {/* Sparks */}
      <circle cx="62" cy="22" r="1"   fill="#60AAFF" className="ep-spark ep-s1" />
      <circle cx="18" cy="26" r="0.8" fill="#00C896" className="ep-spark ep-s2" />
      <circle cx="64" cy="57" r="0.9" fill="#FF8C00" className="ep-spark ep-s3" />
      <circle cx="16" cy="54" r="1"   fill="#60AAFF" className="ep-spark ep-s4" />
    </svg>
  );
};

export default EprayogLogo;
