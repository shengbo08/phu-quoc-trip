import type { CurrencyCode, Money } from '../data/trip';

export const currencyLabels: Record<CurrencyCode, string> = {
  TWD: 'NT$',
  VND: '₫',
  JPY: 'JP¥',
  USD: 'US$',
  EUR: '€',
  KRW: '₩',
  THB: '฿',
};

export const budgetCategoryLabels = {
  flight: '機票',
  accommodation: '住宿',
  transport: '交通',
  food: '餐飲',
  ticket: '門票',
  other: '其他',
} as const;

export const transportTypeLabels = {
  flight: '航班',
  train: '火車',
  bus: '巴士',
  car: '租車',
  other: '其他',
} as const;

export function formatDate(date: string) {
  if (!date) return '尚未填寫';

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(parsed);
}

export function formatMoney(money?: Money) {
  if (!money) return '尚未填寫';

  return `${currencyLabels[money.currency]}${new Intl.NumberFormat('zh-TW', {
    maximumFractionDigits: money.currency === 'TWD' ? 0 : 2,
  }).format(money.amount)} ${money.currency}`;
}

export function formatTwd(amount: number) {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function valueOrEmpty(value?: string) {
  return value?.trim() ? value : '尚未填寫';
}
