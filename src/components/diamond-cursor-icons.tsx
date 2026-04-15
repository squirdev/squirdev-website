"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Sharp diamond frame — reads like a chip / neural node at cursor size. */
export function IconAi({ className }: { className?: string }) {
  return (
    <svg className={cn(className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2 22 12 12 22 2 12 12 2zm0 4.5L6.5 12 12 17.5 17.5 12 12 6.5z"
      />
    </svg>
  );
}

/** Bitcoin-style mark: orange disk + ₿ */
export function IconBtc({ className }: { className?: string }) {
  return (
    <svg className={cn(className)} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#F7931A" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fill="white"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        ₿
      </text>
    </svg>
  );
}

/** Solana-inspired tilted bars (gradient). */
export function IconSol({ className }: { className?: string }) {
  const gradId = useId().replace(/:/g, "");
  return (
    <svg className={cn(className)} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9945FF" />
          <stop offset="100%" stopColor="#14F195" />
        </linearGradient>
      </defs>
      <g transform="translate(12 12) rotate(-11) translate(-12 -12)">
        <rect x="3" y="6" width="18" height="2.8" rx="1" fill={`url(#${gradId})`} />
        <rect x="3" y="10.6" width="18" height="2.8" rx="1" fill="#14F195" opacity={0.95} />
        <rect x="3" y="15.2" width="18" height="2.8" rx="1" fill="#9945FF" opacity={0.9} />
      </g>
    </svg>
  );
}

export type DiamondParticleKind = "ai" | "btc" | "sol";

export function DiamondParticleIcon({ kind, className }: { kind: DiamondParticleKind; className?: string }) {
  switch (kind) {
    case "btc":
      return <IconBtc className={className} />;
    case "sol":
      return <IconSol className={className} />;
    default:
      return <IconAi className={cn("text-primary", className)} />;
  }
}
