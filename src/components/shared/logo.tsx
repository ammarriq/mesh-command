import LogoIcon from "@/icons/logo";
import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-3.5 logoFont">
      <LogoIcon className="size-16" />
      <LogoText />
    </div>
  );
}

export function LogoText() {
  return (
    <hgroup className="flex flex-col items-start ">
      <h3 className="text-xl sm:text-2xl md:text-[26px] 2xl:text-[28px] text-primary font-extrabold leading-6 sm:leading-7">
        Mesh Command
      </h3>
      <p className="text-text-secondary leading-tight">
        Redwood Real Estate Service
      </p>
    </hgroup>
  );
}
export default Logo;
