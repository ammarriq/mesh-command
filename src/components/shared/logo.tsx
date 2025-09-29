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
      <h3 className="text-[28px] text-primary font-extrabold leading-6 sm:leading-7">
        Mesh Command
      </h3>
      <p className="text-text-secondary text-base leading-tight">
        Redwood Real Estate Service
      </p>
    </hgroup>
  );
}
export default Logo;
