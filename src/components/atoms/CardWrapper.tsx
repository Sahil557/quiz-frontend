import React, { ReactNode, MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type CardWrapperProps = {
  children: ReactNode;
  className?: string;
  noShadow?: boolean;
  noBorder?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  className = "",
  noShadow = false,
  noBorder = false,
  onClick,
}) => {
  return (
    <div
      className={twMerge(
        "bg-white rounded-lg p-4",
        noShadow ? "" : "shadow-light",
        noBorder ? "" : "border border-mist",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardWrapper;
