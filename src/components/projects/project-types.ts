import type { PortfolioCard } from "@/lib/contentful-portfolio";

/** Featured project row: CMS card plus optional gradient when no image (fallback data). */
export type DisplayProject = PortfolioCard & { color?: string };
