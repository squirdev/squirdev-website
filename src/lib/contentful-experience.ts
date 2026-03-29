import type { Entry, EntryCollection } from "contentful";
import { env } from "@/config/env";
import { getContentfulClient, isContentfulConfigured } from "@/lib/contentful";

/** Your Contentful filter value for the parent `experiences` entry (Short text field `nickname`). */
export const CONTENTFUL_OWNER_NICKNAME = "aichannode";

/** Default content type API IDs — override with `VITE_CONTENTFUL_CT_EXPERIENCES` if yours differ. */
export const CONTENT_TYPE_EXPERIENCES = "experiences";
export const CONTENT_TYPE_EXPERIENCE = "experience";

export type ExperienceCard = {
  id: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  summary: string;
};

/** Contentful often returns localized fields as `{ "en-US": value }` (or other locale keys). */
function unwrapLocale<T = unknown>(value: T): T | unknown {
  if (value == null) return value;
  if (typeof value !== "object" || Array.isArray(value)) return value;
  const o = value as Record<string, unknown>;
  const keys = Object.keys(o);
  if (keys.length === 0) return value;
  const localeLike = (k: string) => /^[a-z]{2}(-[A-Z]{2})?$/.test(k);
  if (keys.every(localeLike)) {
    const v =
      o["en-US"] ??
      o["en"] ??
      o[keys[0]];
    return v as unknown;
  }
  return value;
}

function asString(v: unknown): string {
  const u = unwrapLocale(v);
  return typeof u === "string" ? u : u == null ? "" : String(u);
}

function readTextField(fields: Record<string, unknown>, key: string): string {
  return asString(fields[key]).trim();
}

function readBooleanField(fields: Record<string, unknown>, key: string): boolean {
  const u = unwrapLocale(fields[key]);
  return u === true || u === "true";
}

function getEntryFields(entry: Entry): Record<string, unknown> {
  const raw = entry.fields as Record<string, unknown>;
  if (!raw) return {};
  return raw;
}

function mapExperienceEntry(entry: Entry): ExperienceCard | null {
  const f = getEntryFields(entry);
  const role = readTextField(f, "role");
  const company = readTextField(f, "company");
  if (!role && !company) return null;
  return {
    id: entry.sys.id,
    role: role || "—",
    company: company || "—",
    period: readTextField(f, "period") || "—",
    current: readBooleanField(f, "current"),
    summary: readTextField(f, "summary") || "",
  };
}

function collectIncludedEntries(includes: EntryCollection<Entry>["includes"]): Map<string, Entry> {
  const map = new Map<string, Entry>();
  if (!includes) return map;
  const list = includes.Entry;
  if (!Array.isArray(list)) return map;
  for (const e of list) {
    if (e?.sys?.id) map.set(e.sys.id, e);
  }
  return map;
}

function getItemsArray(parent: Entry): unknown[] {
  const f = getEntryFields(parent);
  const raw = unwrapLocale(f.items);
  if (Array.isArray(raw)) return raw;
  return [];
}

function resolveExperienceItems(parent: Entry, includes: EntryCollection<Entry>["includes"]): ExperienceCard[] {
  const raw = getItemsArray(parent);
  const byId = collectIncludedEntries(includes);
  const out: ExperienceCard[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const obj = item as Entry | { sys?: { id?: string; type?: string; linkType?: string } };

    if ("fields" in obj && obj.fields && typeof (obj as Entry).sys?.id === "string") {
      const card = mapExperienceEntry(obj as Entry);
      if (card) out.push(card);
      continue;
    }

    const sys = obj.sys;
    const id =
      sys?.type === "Link" && sys.linkType === "Entry" && "id" in sys && typeof sys.id === "string"
        ? sys.id
        : undefined;
    if (id) {
      const linked = byId.get(id);
      if (linked) {
        const card = mapExperienceEntry(linked);
        if (card) out.push(card);
      }
    }
  }

  return out;
}

function experiencesContentType(): string {
  return env.contentfulCtExperiences ?? CONTENT_TYPE_EXPERIENCES;
}

/**
 * Loads the published `experiences` parent entry and resolves `items` → `experience` entries.
 *
 * - Prefer `VITE_CONTENTFUL_EXPERIENCES_ENTRY_ID` when set.
 * - Otherwise queries by `nickname` (non-localized or common `en-US` / `en` field paths).
 */
export async function fetchExperiencesFromCms(): Promise<ExperienceCard[]> {
  if (!isContentfulConfigured()) {
    throw new Error("Contentful is not configured.");
  }

  const client = getContentfulClient();
  const ct = experiencesContentType();
  const entryId = env.contentfulExperiencesEntryId;

  if (entryId) {
    const res = (await client.getEntries({
      "sys.id": entryId,
      include: 10,
      limit: 1,
    })) as EntryCollection<Entry>;
    if (!res.items?.length) return [];
    return resolveExperienceItems(res.items[0], res.includes);
  }

  const nickname = env.contentfulExperiencesNickname ?? CONTENTFUL_OWNER_NICKNAME;

  const attempts: Record<string, string>[] = [
    { "fields.nickname": nickname },
    { "fields.nickname.en-US": nickname },
    { "fields.nickname.en": nickname },
  ];

  for (const fieldQuery of attempts) {
    const res = (await client.getEntries({
      content_type: ct,
      ...fieldQuery,
      limit: 1,
      include: 10,
    })) as EntryCollection<Entry>;

    if (res.items?.length) {
      return resolveExperienceItems(res.items[0], res.includes);
    }
  }

  return [];
}
