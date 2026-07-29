export type CurrencyCode = "USD" | "RUB" | "AMD" | "EUR";

export interface CurrencyOption {
  code: CurrencyCode;
  label: string;
  symbol: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: "USD", label: "Dollars", symbol: "$" },
  { code: "RUB", label: "Rubles", symbol: "₽" },
  { code: "AMD", label: "Drams", symbol: "֏" },
  { code: "EUR", label: "Euros", symbol: "€" },
];

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

export function isCurrencyCode(value: string | null): value is CurrencyCode {
  return CURRENCY_OPTIONS.some((option) => option.code === value);
}

export function getCurrencyOption(code: CurrencyCode): CurrencyOption {
  return CURRENCY_OPTIONS.find((option) => option.code === code) ?? CURRENCY_OPTIONS[0];
}

export function formatPrice(price: string, currency: CurrencyCode): string {
  const amount = price
    .trim()
    .replace(/^(\$|₽|֏|€)\s*/, "")
    .replace(/\s*(USD|RUB|AMD|EUR)$/i, "")
    .trim();

  return amount ? `${getCurrencyOption(currency).symbol}${amount}` : "";
}
