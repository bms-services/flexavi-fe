
import React from "react";

interface BlockCardProps {
  children: React.ReactNode;
  className?: string;
}

export const BlockCard: React.FC<BlockCardProps> = ({ children, className = "" }) => (
  <div
    className={
      "bg-[#F6FBFF] border border-[#B8D8FF] rounded-2xl px-4 py-4 shadow-sm flex flex-col gap-3 " +
      (className || "")
    }
    style={{ minWidth: 0 }}
  >
    {children}
  </div>
);
