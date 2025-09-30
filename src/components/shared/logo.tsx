import LogoIcon from "@/icons/logo";
import React from "react";

interface LogoProps {
  isNavBar?: boolean;
}

function Logo({ isNavBar }: LogoProps) {
  return (
    <div className="flex items-center gap-3 2xl:gap-3.5 logoFont">
      <LogoIcon className="size-14 2xl:size-16" />
      <LogoText isNavBar={isNavBar} />
    </div>
  );
}

export function LogoText({ isNavBar }: LogoProps) {
  return (
    <hgroup
      className={`${isNavBar ? "hidden sm:flex" : "flex"} flex-col items-start`}
    >
      <h3 className="text-2xl md:text-3xl 2xl:text-4xl text-primary font-extrabold leading-6 sm:leading-7">
        Mesh Command
      </h3>
      <p className="text-text-secondary text-sm md:text-[17px] 2xl:text-xl leading-tight">
        Redwood Real Estate Service
      </p>
    </hgroup>
  );
}
export default Logo;
