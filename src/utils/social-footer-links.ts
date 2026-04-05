import type { LucideIcon } from "lucide-react";
import { Facebook, Github, Globe, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import type { SocialProfile } from "@/lib/contentful-social";

export type FooterSocialLink = {
  key: string;
  href: string;
  label: string;
  Icon: LucideIcon;
};

function mailHref(email: string): string {
  const e = email.trim();
  return e.startsWith("mailto:") ? e : `mailto:${e}`;
}

function telHref(phone: string): string {
  const trimmed = phone.trim();
  if (trimmed.startsWith("tel:")) return trimmed;
  const rest = trimmed.replace(/[^\d+]/g, "");
  return rest ? `tel:${rest}` : trimmed;
}

/** Ordered footer icons — only entries with a usable URL. */
export function getFooterSocialLinks(profile: SocialProfile): FooterSocialLink[] {
  const out: FooterSocialLink[] = [];

  if (profile.linkedin) {
    out.push({ key: "linkedin", href: profile.linkedin, label: "LinkedIn", Icon: Linkedin });
  }
  if (profile.email) {
    out.push({ key: "email", href: mailHref(profile.email), label: "Email", Icon: Mail });
  }
  if (profile.github) {
    out.push({ key: "github", href: profile.github, label: "GitHub", Icon: Github });
  }
  if (profile.facebook) {
    out.push({ key: "facebook", href: profile.facebook, label: "Facebook", Icon: Facebook });
  }
  if (profile.twitter) {
    out.push({ key: "twitter", href: profile.twitter, label: "Twitter", Icon: Twitter });
  }
  if (profile.website) {
    out.push({ key: "website", href: profile.website, label: "Website", Icon: Globe });
  }
  if (profile.phone) {
    out.push({ key: "phone", href: telHref(profile.phone), label: "Phone", Icon: Phone });
  }

  return out;
}
