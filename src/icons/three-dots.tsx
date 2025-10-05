import React from "react";

const ThreeDotsIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  fill = "#5F0101",
  stroke = "#5F0101",
  ...props
}) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      opacity="0.4"
      d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
      fill={fill}
      stroke={stroke}
    />
    <path
      d="M12 13.5C11.44 13.5 11 13.05 11 12.5C11 11.95 11.45 11.5 12 11.5C12.55 11.5 13 11.95 13 12.5C13 13.05 12.56 13.5 12 13.5Z"
      fill={fill}
      stroke={stroke}
    />
    <path
      d="M16 13.5C15.44 13.5 15 13.05 15 12.5C15 11.95 15.45 11.5 16 11.5C16.55 11.5 17 11.95 17 12.5C17 13.05 16.56 13.5 16 13.5Z"
      fill={fill}
      stroke={stroke}
    />
    <path
      d="M8 13.5C7.44 13.5 7 13.05 7 12.5C7 11.95 7.45 11.5 8 11.5C8.55 11.5 9 11.95 9 12.5C9 13.05 8.56 13.5 8 13.5Z"
      fill={fill}
      stroke={stroke}
    />
  </svg>
);

export default ThreeDotsIcon;
