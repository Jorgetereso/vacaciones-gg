import type { State, Who } from '../types';
import { todayKey, isWeekend } from './dates';
import { isHoliday } from './holidays';

export type PersonStats = {
  taken: number; // días pasados marcados (no cuentan finde ni feriado)
  planned: number; // días futuros marcados
  remaining: number; // cupo - (taken + planned)
};

// Cuenta solo días hábiles: ni sábado, ni domingo, ni feriado.
// Sigue la convención laboral argentina (los feriados no consumen vacaciones).
function isBusinessDay(key: string): boolean {
  return !isWeekend(key) && !isHoliday(key);
}

export function personStatsForYear(
  state: State,
  who: Who,
  year: number,
): PersonStats {
  const today = todayKey();
  let taken = 0;
  let planned = 0;
  const yearPrefix = String(year) + '-';
  for (const [key, entry] of Object.entries(state.days)) {
    if (!key.startsWith(yearPrefix)) continue;
    if (!entry[who]) continue;
    if (!isBusinessDay(key)) continue;
    if (key <= today) taken += 1;
    else planned += 1;
  }
  return {
    taken,
    planned,
    remaining: Math.max(0, state.settings.yearlyQuota - taken - planned),
  };
}

export type UpcomingDay = {
  date: string;
  jorge: boolean;
  german: boolean;
  note?: string;
};

export function upcomingDays(state: State, limit = 5): UpcomingDay[] {
  const today = todayKey();
  return Object.entries(state.days)
    .filter(([key, entry]) => key >= today && (entry.jorge || entry.german))
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([date, entry]) => ({
      date,
      jorge: !!entry.jorge,
      german: !!entry.german,
      note: entry.note,
    }));
}
