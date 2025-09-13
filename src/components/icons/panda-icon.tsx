import React from 'react';

export const PandaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    {...props}
  >
    <style>
      {`
        .ear, .eye, .nose, .mouth { fill: #333; }
        .head { fill: #fff; stroke: #333; stroke-width: 2; }
        .blush { fill: #ff9999; opacity: 0; }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes blush-anim {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.7; }
        }
        .eye { animation: blink 3s infinite; transform-origin: center; }
        .blush { animation: blush-anim 5s infinite; }
      `}
    </style>
    
    <g>
      {/* Ears */}
      <circle className="ear" cx="25" cy="25" r="12" />
      <circle className="ear" cx="75" cy="25" r="12" />

      {/* Head */}
      <circle className="head" cx="50" cy="50" r="40" />

      {/* Eyes */}
      <ellipse className="eye" cx="35" cy="45" rx="5" ry="8" />
      <ellipse className="eye" cx="65" cy="45" rx="5" ry="8" />

      {/* Blush */}
      <circle className="blush" cx="28" cy="60" r="7" />
      <circle className="blush" cx="72" cy="60" r="7" />

      {/* Nose */}
      <circle className="nose" cx="50" cy="55" r="5" />

      {/* Mouth */}
      <path className="mouth" d="M 45 65 Q 50 70 55 65" stroke="#333" fill="none" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);