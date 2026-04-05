import type { ExperienceCard } from "@/lib/contentful-experience";

/** Used when Contentful is not configured or returns no items. */
export const experiencesFallback: ExperienceCard[] = [
  {
    id: "fallback-copy-ai",
    role: "Full-Stack & LLM Engineer",
    company: "Copy.ai",
    period: "Oct 2024 – Feb 2026",
    current: true,
    summary:
      "Built and maintained GTM AI features—workflows, chat, and integrations—plus RAG with LangChain and Pinecone, prompt guardrails, and production LLM APIs with cost and latency tuning.",
  },
  {
    id: "fallback-thorswap",
    role: "Software Engineer",
    company: "Thorswap Finance",
    period: "Oct 2023 – Sep 2024",
    current: false,
    summary:
      "Built SwapKit and APIs for cross-asset swaps, integrated liquidity and routing providers, improved wallet flows, and shipped screening and compliance hooks where required.",
  },
  {
    id: "fallback-flash",
    role: "Full-Stack Engineer",
    company: "Flash Technologies",
    period: "Mar 2021 – Oct 2023",
    current: false,
    summary:
      "Shipped launch and presale products, NFT features, and internal tooling end to end; coordinated security reviews with auditors and improved release quality across the stack.",
  },
  {
    id: "fallback-icicb",
    role: "Full-Stack Developer",
    company: "ICICB",
    period: "Jan 2019 – Jul 2020",
    current: false,
    summary:
      "Delivered React Native and web apps, trading and marketplace flows, and third-party integrations with a focus on performance and maintainable UI.",
  },
  {
    id: "fallback-beyond",
    role: "Web & Mobile Developer",
    company: "Beyond Finance",
    period: "Jan 2016 – Dec 2018",
    current: false,
    summary:
      "Built full-stack features for a consumer debt-resolution product on Node.js and AWS, React/Next.js dashboards, and a consolidated React Native app shipped to the App Store and Google Play.",
  },
];
