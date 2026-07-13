export type CurrencyCode = "USD" | "JPY" | "CLP";

export function normalizeCurrency(value: string): CurrencyCode {
  if (value === "JPY") return "JPY";
  if (value === "CLP") return "CLP";
  return "USD";
}

export function formatCurrency(amount: number, currency: string): string {
  const code = normalizeCurrency(currency);
  if (code === "CLP") {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  if (code === "JPY") {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
