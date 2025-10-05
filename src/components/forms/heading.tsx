import React, { PropsWithChildren } from "react";

interface Props {
  title: string;
}

function FormHeading({ title, children }: Props & PropsWithChildren) {
  return (
    <header className="flex flex-col items-start gap-2">
      <h1 className="text-2xl sm:text-3xl text-text-primary">{title}</h1>
      {children}
    </header>
  );
}

export default FormHeading;
