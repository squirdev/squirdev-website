/**
 * Legacy URL map — prefer `useSocialProfile()` / Contentful `social` entry.
 * Kept for quick reference; values mirror `socialProfileFallback`.
 */
import { socialProfileFallback } from "@/data/social.fallback";

export const SOCIAL_URLS = {
  github: socialProfileFallback.github ?? "",
  linkedin: socialProfileFallback.linkedin ?? "",
  gmail: socialProfileFallback.email ? `mailto:${socialProfileFallback.email.replace(/^mailto:/i, "")}` : "",
} as const;
