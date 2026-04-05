import { useQuery } from "@tanstack/react-query";
import { env } from "@/config/env";
import { socialProfileFallback } from "@/data/social.fallback";
import { isContentfulConfigured } from "@/lib/contentful";
import { CONTENTFUL_SOCIAL_NAME, fetchSocialFromCms } from "@/lib/contentful-social";

export function useSocialProfile() {
  const cacheKey = env.contentfulSocialEntryId ?? CONTENTFUL_SOCIAL_NAME;
  const configured = isContentfulConfigured();

  const query = useQuery({
    queryKey: ["contentful", "social", cacheKey],
    queryFn: fetchSocialFromCms,
    enabled: configured,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const profile = configured ? (query.data ?? socialProfileFallback) : socialProfileFallback;

  return {
    profile,
    isLoading: configured && query.isLoading,
    isError: configured && query.isError,
    source: configured ? (query.data ? "cms" : "fallback") : "fallback",
  };
}
