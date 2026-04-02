import type { PortfolioCard } from "@/lib/contentful-portfolio";

/** Unique image URLs for grid thumbnail + modal carousel (`image` first, then `images`). */
export function getProjectGalleryUrls(project: Pick<PortfolioCard, "image" | "images">): string[] {
  const list = [project.image, ...(project.images ?? [])].filter(Boolean) as string[];
  return [...new Set(list)];
}
