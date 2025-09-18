import React, { PropsWithChildren } from "react";

interface Props {
  title: string;
}

function FormHeading({ title, children }: Props & PropsWithChildren) {
  return (
    <header className="space-y-1.5 sm:space-y-2">
      <h1 className="text-2xl sm:text-3xl text-text-primary">{title}</h1>
      {children}
    </header>
  );
}

export default FormHeading;
