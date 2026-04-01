import { env } from "@/config/env";
import { requestContentfulGraphql } from "@/lib/contentful-graphql";

/** Parent `portfolios.name` value used for this portfolio owner. */
export const CONTENTFUL_PORTFOLIOS_OWNER_NAME = env.contentfulOwnerName ?? "aichannode";
export const CONTENT_TYPE_PORTFOLIOS = "portfolios";

export type PortfolioCard = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  image?: string;
  link?: string;
};

function toUrl(url: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

type GqlAsset = { url?: string | null } | null;

type GqlPortfolio = {
  sys: { id: string };
  title?: string | null;
  description?: string | null;
  skills?: Array<string | null> | null;
  link?: string | null;
  image?: GqlAsset;
};

type GqlPortfoliosCollectionData = {
  [key: string]: {
    items: Array<{
      itemsCollection?: {
        items: Array<GqlPortfolio | null>;
      } | null;
    }>;
  };
};

function mapPortfolioItem(item: GqlPortfolio): PortfolioCard | null {
  const title = (item.title ?? "").trim();
  const description = (item.description ?? "").trim();
  if (!title && !description) return null;
  return {
    id: item.sys.id,
    title: title || "Untitled",
    description: description || "",
    skills: (item.skills ?? [])
      .map((v) => (v ?? "").trim())
      .filter(Boolean),
    image: toUrl((item.image?.url ?? "").trim()),
    link: toUrl((item.link ?? "").trim()),
  };
}

function portfoliosContentType(): string {
  return env.contentfulCtPortfolios ?? CONTENT_TYPE_PORTFOLIOS;
}

export async function fetchPortfoliosFromCms(): Promise<PortfolioCard[]> {
  const ctSingle = portfoliosContentType();
  const ctCollection = `${portfoliosContentType()}Collection`;
  const entryId = env.contentfulPortfoliosEntryId;

  let rawItems: Array<GqlPortfolio | null> = [];

  if (entryId) {
    const queryById = `
      query PortfoliosById($entryId: String!) {
        ${ctSingle}(id: $entryId) {
          itemsCollection(limit: 50) {
            items {
              __typename
              ... on Portfolio {
                sys { id }
                title
                description
                link
                skills
                image {
                  url
                }
              }
            }
          }
        }
      }
    `;
    const data = await requestContentfulGraphql<Record<string, { itemsCollection?: { items: Array<GqlPortfolio | null> } | null } | null>>(
      queryById,
      { entryId },
    );
    rawItems = data[ctSingle]?.itemsCollection?.items ?? [];
  } else {
    const queryByName = `
      query PortfoliosByOwner($ownerName: String!) {
        ${ctCollection}(limit: 1, where: { name: $ownerName }) {
          items {
            itemsCollection(limit: 50) {
              items {
                __typename
                ... on Portfolio {
                  sys { id }
                  title
                  description
                  link
                  skills
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;
    const data = await requestContentfulGraphql<GqlPortfoliosCollectionData>(queryByName, {
      ownerName: CONTENTFUL_PORTFOLIOS_OWNER_NAME,
    });
    const collection = data[ctCollection];
    if (!collection?.items?.length) return [];
    rawItems = collection.items[0]?.itemsCollection?.items ?? [];
  }

  return rawItems
    .filter((item): item is GqlPortfolio => Boolean(item?.sys?.id))
    .map((item) => mapPortfolioItem(item))
    .filter((item): item is PortfolioCard => Boolean(item));
}
