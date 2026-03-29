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
    role: "Web3 Engineer",
    company: "Thorswap Finance",
    period: "Oct 2023 – Sep 2024",
    current: false,
    summary:
      "Worked on SwapKit and APIs for cross-chain swaps across many networks, integrating THORChain, Chainflip, and Maya, plus wallet flows and optional AML/KYT screening.",
  },
  {
    id: "fallback-flash",
    role: "Full-Stack & Blockchain Engineer",
    company: "Flash Technologies",
    period: "Mar 2021 – Oct 2023",
    current: false,
    summary:
      "Shipped DeFi products—token launches, presales, launchpads, and NFT utilities—with Solidity on EVM, Solana programs in Rust/Anchor, audit coordination (CertiK), and Slither-based analysis.",
  },
  {
    id: "fallback-icicb",
    role: "Blockchain Developer",
    company: "ICICB",
    period: "Jan 2019 – Jul 2020",
    current: false,
    summary:
      "Delivered Web3 integrations and a React Native wallet, customized DEX-style platforms, trading automation, and NFT marketplaces and games.",
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
