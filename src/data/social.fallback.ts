import type { SocialProfile } from "@/lib/contentful-social";

/** Used when Contentful is off or returns no `social` entry. */
export const socialProfileFallback: SocialProfile = {
  id: "fallback-social",
  name: "fallback",
  fullname: "Jesus Monroig",
  role: "Blockchain & AI Engineer",
  phone: undefined,
  location: "Puerto Rico",
  email: "aichannode@gmail.com",
  linkedin: "https://www.linkedin.com/in/aichannode",
  github: "https://github.com/aichannode",
  facebook: undefined,
  twitter: undefined,
  website: undefined,
};
