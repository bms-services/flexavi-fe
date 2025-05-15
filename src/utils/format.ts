
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isToday, isYesterday, differenceInDays } from "date-fns";
import { nl } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
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
