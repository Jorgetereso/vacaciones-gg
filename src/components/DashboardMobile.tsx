import { formatLong, formatShort } from '../lib/dates';
import { nextHoliday, personStatsForYear, upcomingDays } from '../lib/stats';
import type { State } from '../types';

type Props = {
  state: State;
  year: number;
};

function pct(n: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((n / total) * 100));
}

function PersonChip({
  name,
  color,
  taken,
  planned,
  quota,
}: {
  name: string;
  color: string;
  taken: number;
  planned: number;
  quota: number;
}) {
  return (
    <div className="surface min-w-0 flex-1 p-3">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: color, boxShadow: `0 0 8px ${color}66` }}
            aria-hidden
          />
          <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
            {name}
          </span>
        </div>
        <span className="shrink-0 text-xs font-medium tabular-nums text-slate-500 dark:text-slate-400">
          {taken + planned}/{quota}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="flex h-full">
          <div
            className="h-full"
            style={{ width: `${pct(taken, quota)}%`, background: color }}
          />
          <div
            className="h-full opacity-40"
            style={{ width: `${pct(planned, quota)}%`, background: color }}
          />
        </div>
      </div>
    </div>
  );
}

export function DashboardMobile({ state, year }: Props) {
  const jorge = personStatsForYear(state, 'jorge', year);
  const german = personStatsForYear(state, 'german', year);
  const next = nextHoliday();
  const upcoming = upcomingDays(state, 5);
  const s = state.settings;

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <PersonChip
          name={s.germanName}
          color={s.germanColor}
          taken={german.taken}
          planned={german.planned}
          quota={s.yearlyQuota}
        />
        <PersonChip
          name={s.jorgeName}
          color={s.jorgeColor}
          taken={jorge.taken}
          planned={jorge.planned}
          quota={s.yearlyQuota}
        />
      </div>

      {next && (
        <div className="surface relative flex items-center gap-3 overflow-hidden p-3">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full bg-holiday/10 blur-2xl dark:bg-holiday/15"
          />
          <div className="relative text-3xl font-bold tabular-nums text-holiday">
            {next.daysUntil}
          </div>
          <div className="relative min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Próximo feriado
            </div>
            <div className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
              {next.holiday.name}
            </div>
            <div className="truncate text-xs text-slate-500 dark:text-slate-400">
              {formatLong(next.holiday.date)}
            </div>
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <details className="surface group p-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-200">
            <span>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Próximos días
              </span>
              <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">
                ({upcoming.length})
              </span>
            </span>
            <span className="text-slate-400 transition-transform group-open:rotate-180 dark:text-slate-500">
              ▾
            </span>
          </summary>
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {upcoming.map((u) => (
              <li key={u.date} className="flex items-center justify-between gap-2">
                <span className="truncate">{formatShort(u.date)}</span>
                <span className="flex gap-1">
                  {u.german && (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: s.germanColor }}
                      title={s.germanName}
                    />
                  )}
                  {u.jorge && (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: s.jorgeColor }}
                      title={s.jorgeName}
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
