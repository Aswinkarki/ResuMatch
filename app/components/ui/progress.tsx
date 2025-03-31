import React from "react";
import { cn } from "../../lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  return (
    <div className={cn("relative w-full bg-gray-200 rounded-full h-2", className)}>
      <div
        className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}