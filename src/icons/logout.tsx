import React from "react";
import type { SVGProps } from "react";

export function LogoutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={288}
      height={288}
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="#fff" d="M12 20a8 8 0 1 1 0-16z" opacity={0.5}></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M16.47 8.47a.75.75 0 0 0 0 1.06l1.72 1.72H10a.75.75 0 0 0 0 1.5h8.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
