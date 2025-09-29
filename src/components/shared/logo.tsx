import LogoIcon from "@/icons/logo";
import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-3.5 logoFont">
      <LogoIcon className="size-14 sm:size-16" />
      <LogoText />
    </div>
  );
}

export function LogoText() {
  return (
    <hgroup className="flex flex-col items-start ">
      <h3 className="text-2xl sm:text-3xl text-primary font-extrabold leading-6 sm:leading-7">
        Mesh Command
      </h3>
      <p className="text-text-secondary text-sm sm:text-[17px] leading-tight">
        Redwood Real Estate Service
      </p>
    </hgroup>
  );
}
export default Logo;
