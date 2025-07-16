
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isToday, isYesterday, differenceInDays } from "date-fns";
import { nl } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEuro(amount: string | number | null | undefined): string {
  if (amount == null || amount === "") return "€ 0,00";
  const numeric = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numeric)) return "€ 0,00";

  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}


export function formatCurrency(input: string): string {
  if (!input) return "0.00";
  const normalized = input.replace(/\./g, '').replace(',', '.');
  const parsed = parseFloat(normalized).toFixed(2);
  return parsed;
}

export function formatCurrencyToNumber(value: string | null | undefined): number {
  if (!value) return 0;
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned);
}

export function formatPercentage(value: string | number | null | undefined): string {
  if (value == null || value === "") return "0,00%";
  const numeric = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numeric)) return "0,00%";
  return new Intl.NumberFormat("nl-NL", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric / 100);
}

export function formatIsoToDate(date: string): string {
  return format(new Date(date), "dd MMMM yyyy", { locale: nl });
}

export function formatDate(date: Date): string {
  return format(date, "dd MMMM yyyy", { locale: nl });
}

export function formatDateTime(date: Date): string {
  return format(date, "dd MMM yyyy HH:mm", { locale: nl });
}

export function formatRelativeDate(date: Date): string {
  if (isToday(date)) {
    return `Vandaag ${format(date, "HH:mm")}`;
  }

  if (isYesterday(date)) {
    return `Gisteren ${format(date, "HH:mm")}`;
  }

  const daysAgo = differenceInDays(new Date(), date);

  if (daysAgo < 7) {
    return formatDistanceToNow(date, { addSuffix: true, locale: nl });
  }

  return format(date, "d MMM yyyy", { locale: nl });
}

export function formatTimeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: nl });
}


export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const formatNormalizeCurrency = (value: unknown): number => {
  if (typeof value === "string") {
    const cleaned = value.replace(",", ".").replace(/[^0-9.-]+/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  return typeof value === "number" ? value : 0;
};

export const formatCurrencyToString = (value: number): string => {
  if (isNaN(value)) return "0,00";
  return new Intl.NumberFormat("nl-NL", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value).replace(".", ",");
}