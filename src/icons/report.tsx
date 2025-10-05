import React from "react";
import type { SVGProps } from "react";

export function ReportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={288}
      height={288}
      viewBox="0 0 24 24"
      {...props}
      stroke="#fff"
    >
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="m10 7l4-4l4 4"></path>
        <path d="M14 3v4.394A6.74 6.74 0 0 1 11 13a6.74 6.74 0 0 0-3 5.606V21"></path>
      </g>
    </svg>
  );
}
