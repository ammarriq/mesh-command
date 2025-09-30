import React from "react";

const LogoutIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  fill = "#78829D",
  stroke = "#78829D",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path fill={fill} d="M12 20a8 8 0 1 1 0-16z" opacity={0.5}></path>
    <path
      fill={fill}
      stroke={stroke}
      fillRule="evenodd"
      d="M16.47 8.47a.75.75 0 0 0 0 1.06l1.72 1.72H10a.75.75 0 0 0 0 1.5h8.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default LogoutIcon;
