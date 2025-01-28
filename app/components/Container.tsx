import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx(className, "px-6 lg:px-8")}>
      <div>{children}</div>
    </div>
  );
};

export default Container;
