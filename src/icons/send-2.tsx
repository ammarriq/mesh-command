import * as React from "react";

const Send2Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity="0.4"
      d="M7.11039 5.96003L16.1304 2.95003C20.1804 1.60003 22.3804 3.81003 21.0404 7.86003L18.0304 16.88C16.0104 22.95 12.6904 22.95 10.6704 16.88L9.78039 14.2L7.10039 13.31C1.04039 11.3 1.04039 7.99003 7.11039 5.96003Z"
      fill="white"
    />
    <path d="M12.1201 11.6301L15.9301 7.81006L12.1201 11.6301Z" fill="white" />
    <path
      d="M12.1196 12.38C11.9296 12.38 11.7396 12.31 11.5896 12.16C11.2996 11.87 11.2996 11.39 11.5896 11.1L15.3896 7.28C15.6796 6.99 16.1596 6.99 16.4496 7.28C16.7396 7.57 16.7396 8.05 16.4496 8.34L12.6496 12.16C12.4996 12.3 12.3096 12.38 12.1196 12.38Z"
      fill="white"
    />
  </svg>
);

export default Send2Icon;
