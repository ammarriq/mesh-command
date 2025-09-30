import React from "react";

const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  fill = "#78829D",
  stroke = "#78829D",
  ...props
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      opacity="0.4"
      d="M20.4101 6.96V9.8L7.40009 19.34L4.77009 17.37C4.12009 16.88 3.59009 15.83 3.59009 15.02V6.96C3.59009 5.84 4.45009 4.6 5.50009 4.21L10.9701 2.16C11.5401 1.95 12.4601 1.95 13.0301 2.16L18.5001 4.21C19.5501 4.6 20.4101 5.84 20.4101 6.96Z"
      fill={fill}
      stroke={stroke}
    />
    <path
      d="M20.4101 11.17V15.02C20.4101 15.83 19.8801 16.88 19.2301 17.37L13.7601 21.46C13.2801 21.82 12.6401 22 12.0001 22C11.3601 22 10.7201 21.82 10.2401 21.46L8.32007 20.03L20.4101 11.17Z"
      fill={fill}
      stroke={stroke}
    />
  </svg>
);

export default ShieldIcon;
