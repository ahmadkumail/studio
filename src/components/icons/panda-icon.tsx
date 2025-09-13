import React from 'react';

export const PandaIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <circle cx="12" cy="12" r="10" fill="white" />
    <path
      d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0"
      stroke="none"
      fill="currentColor"
    />
    <path
      d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0"
      fill="white"
      stroke="currentColor"
    />
    <path
      d="M15.5 15.5a3.5 3.5 0 0 1-7 0"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M8.5 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M18.5 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M10 10.5c-.7-1-2-1.5-3.5-1.5s-2.8.5-3.5 1.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M14 10.5c.7-1 2-1.5 3.5-1.5s2.8.5 3.5 1.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
