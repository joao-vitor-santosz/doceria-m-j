import type { PropsWithChildren } from "react";

type EntranceProps = PropsWithChildren<{ delay?: number; className?: string }>;

export function Entrance({
  children,
  delay = 0,
  className = "",
}: EntranceProps) {
  return (
    <div
      className={`animate-entrance ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
