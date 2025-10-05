import React from 'react';

function LossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      {...props}
    >
      <path
        d="M11 6.5L7.06568 2.56568C6.86768 2.36768 6.76867 2.26867 6.65451 2.23158C6.55409 2.19895 6.44591 2.19895 6.34549 2.23158C6.23133 2.26867 6.13232 2.36768 5.93431 2.56569L4.56568 3.93432C4.36768 4.13232 4.26867 4.23133 4.15451 4.26842C4.05409 4.30105 3.94591 4.30105 3.84549 4.26842C3.73133 4.23133 3.63232 4.13232 3.43431 3.93431L1 1.5M11 6.5H7.5M11 6.5V3"
        stroke="#F04438"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default LossIcon;
