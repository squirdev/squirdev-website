import { useQuery } from "@tanstack/react-query";
import { env } from "@/config/env";
import { CONTENTFUL_OWNER_NICKNAME, fetchExperiencesFromCms } from "@/lib/contentful-experience";
import { isContentfulConfigured } from "@/lib/contentful";

export function useExperiences() {
  const cacheKey =
    env.contentfulExperiencesEntryId ??
    env.contentfulExperiencesNickname ??
    CONTENTFUL_OWNER_NICKNAME;

  return useQuery({
    queryKey: ["contentful", "experiences", cacheKey],
    queryFn: () => fetchExperiencesFromCms(),
    enabled: isContentfulConfigured(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
