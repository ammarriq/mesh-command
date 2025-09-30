import { RobotIcon } from "@/icons/robot";
import React from "react";

function LoadingRobotChat() {
  return (
    <div className="flex items-center gap-1">
      <RobotIcon className="size-5 fill-primary" fill="#5f0101" />
      <p className="text-xs text-primary font-semibold">
        Working on your request....
      </p>
    </div>
  );
}

export default LoadingRobotChat;
