
import React from 'react';

export const CoffeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <style>
      {`
        @keyframes steam {
          0% { transform: translateY(0) scaleX(1); opacity: 0.5; }
          50% { transform: translateY(-5px) scaleX(1.1); opacity: 0.8; }
          100% { transform: translateY(-10px) scaleX(1); opacity: 0; }
        }
        .steam1 { animation: steam 3s ease-out infinite; animation-delay: 0s; }
        .steam2 { animation: steam 3s ease-out infinite; animation-delay: 1s; }
        .steam3 { animation: steam 3s ease-out infinite; animation-delay: 2s; }
      `}
    </style>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h14v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line className="steam1" x1="6" y1="2" x2="6" y2="5" />
    <line className="steam2" x1="10" y1="2" x2="10" y2="5" />
    <line className="steam3" x1="14" y1="2" x2="14" y2="5" />
  </svg>
);
