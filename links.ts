import type { Wish } from "./types";

export function normalizeLinkForComparison(link: unknown): string {
  if (typeof link !== "string") return "";

  const trimmedLink = link.trim();
  if (!trimmedLink) return "";

  const linkWithProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmedLink)
    ? trimmedLink
    : `https://${trimmedLink}`;

  try {
    const url = new URL(linkWithProtocol);
    const path = url.pathname.replace(/\/+$/, "");
    const port = url.port ? `:${url.port}` : "";

    return `${url.hostname.toLowerCase()}${port}${path}${url.search}`;
  } catch {
    return trimmedLink
      .replace(/#.*$/, "")
      .replace(/\/+$/, "")
      .toLowerCase();
  }
}

export function findWishWithDuplicateLink(
  wishes: Pick<Wish, "id" | "title" | "link">[],
  link: string,
  excludedWishId?: string
): Pick<Wish, "id" | "title" | "link"> | undefined {
  const normalizedLink = normalizeLinkForComparison(link);
  if (!normalizedLink) return undefined;

  return wishes.find(
    (wish) =>
      wish.id !== excludedWishId &&
      normalizeLinkForComparison(wish.link) === normalizedLink
  );
}
