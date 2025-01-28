import React from "react";
import logoStarcoexSymbol from "../images/starcoex_symbol_logo.svg";
import clsx from "clsx";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={clsx(
        className,
        "flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4",
      )}
    >
      <Image
        alt="logoStarce"
        src={logoStarcoexSymbol}
        className="h-9 max-sm:mx-auto sm:h-10 lg:h-12"
      />
    </div>
  );
};
