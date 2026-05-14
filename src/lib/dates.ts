import dayjs, { type Dayjs } from 'dayjs';

export type DayLike = Dayjs | Date | string;

export const MONTH_NAMES_ES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const WEEKDAY_SHORT_ES = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
export const WEEKDAY_LONG_ES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export function dateKey(d: DayLike): string {
  return dayjs(d).format('YYYY-MM-DD');
}

export function fromKey(key: string): Dayjs {
  return dayjs(key);
}

export function todayKey(): string {
  return dayjs().format('YYYY-MM-DD');
}

// Returns a 6-row x 7-col matrix of days for the calendar grid, starting Sunday.
export function monthMatrix(year: number, month: number): Dayjs[][] {
  const first = dayjs(new Date(year, month, 1));
  const startWeekday = first.day(); // sun = 0
  const start = first.subtract(startWeekday, 'day');
  const weeks: Dayjs[][] = [];
  let cursor = start;
  for (let w = 0; w < 6; w++) {
    const week: Dayjs[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(cursor);
      cursor = cursor.add(1, 'day');
    }
    weeks.push(week);
  }
  return weeks;
}

export function rangeDays(a: string, b: string): string[] {
  let start = dayjs(a);
  let end = dayjs(b);
  if (start.isAfter(end)) [start, end] = [end, start];
  const out: string[] = [];
  let cursor = start;
  while (!cursor.isAfter(end)) {
    out.push(cursor.format('YYYY-MM-DD'));
    cursor = cursor.add(1, 'day');
  }
  return out;
}

export function isWeekend(date: DayLike): boolean {
  const dow = dayjs(date).day();
  return dow === 0 || dow === 6;
}

export function formatShort(date: string): string {
  const d = dayjs(date);
  return `${d.date()} ${MONTH_NAMES_ES[d.month()].slice(0, 3).toLowerCase()}`;
}

export function formatLong(date: string): string {
  const d = dayjs(date);
  return `${WEEKDAY_LONG_ES[d.day()]} ${d.date()} ${MONTH_NAMES_ES[d.month()]} ${d.year()}`;
}

// Collapse a sorted list of date keys into contiguous ranges for display.
export function compressRanges(dates: string[]): Array<{ start: string; end: string }> {
  if (dates.length === 0) return [];
  const sorted = [...dates].sort();
  const ranges: Array<{ start: string; end: string }> = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    const cur = sorted[i];
    if (dayjs(prev).add(1, 'day').format('YYYY-MM-DD') === cur) {
      prev = cur;
    } else {
      ranges.push({ start, end: prev });
      start = cur;
      prev = cur;
    }
  }
  ranges.push({ start, end: prev });
  return ranges;
}

export function formatRange(r: { start: string; end: string }): string {
  if (r.start === r.end) return formatShort(r.start);
  const a = dayjs(r.start);
  const b = dayjs(r.end);
  if (a.year() === b.year() && a.month() === b.month()) {
    return `${a.date()}–${b.date()} ${MONTH_NAMES_ES[a.month()].slice(0, 3).toLowerCase()} ${a.year()}`;
  }
  return `${formatShort(r.start)} – ${formatShort(r.end)}`;
}

export const SUPPORTED_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

// Returns '#0f172a' (slate-900) or '#ffffff' depending on bg luminance.
// Use to pick the most readable text color over a colored cell.
export function contrastingTextColor(hex: string): string {
  let value = hex.trim();
  if (value.startsWith('#')) value = value.slice(1);
  if (value.length === 3) {
    value = value
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (value.length !== 6) return '#0f172a';
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? '#0f172a' : '#ffffff';
}
