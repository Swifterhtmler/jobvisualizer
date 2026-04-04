// src/lib/utils/dataMonth.ts

export function getLatestDataMonth(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 2);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}M${month}`;
}

export function formatMonthLabel(month: string): string {
  // "2026M02" -> "2/2026"
  return month.replace('M', '/').split('/').reverse().join('/');
}