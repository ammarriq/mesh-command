import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 2xl:gap-3 logoFont">
      <LogoBox />
      <LogoText />
    </div>
  );
}

export function LogoBox() {
  return (
    <h2 className="bg-primary size-9 sm:size-10 md:size-11 2xl:size-12 text-white aspect-square text-2xl sm:text-3xl 2xl:text-4xl leading-none font-extrabold flex items-center justify-center rounded-sm">
      M
    </h2>
  );
}

export function LogoText() {
  return (
    <hgroup className="flex flex-col justify-center">
      <h3 className="text-xl sm:text-2xl md:text-[26px] 2xl:text-[28px] text-primary font-extrabold leading-6 sm:leading-7">
        Mesh Command
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary leading-tight">Redwood Real Estate Service</p>
    </hgroup>
  );
}
export default Logo;
