import type { Settings, State } from '../types';
import { nextHoliday, personStatsForYear, upcomingDays } from '../lib/stats';
import { formatLong, formatShort } from '../lib/dates';

type Props = {
  state: State;
  year: number;
};

function pct(n: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((n / total) * 100));
}

function PersonCard({
  name,
  color,
  taken,
  planned,
  remaining,
  quota,
}: {
  name: string;
  color: string;
  taken: number;
  planned: number;
  remaining: number;
  quota: number;
}) {
  return (
    <div className="surface surface-hover p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full shadow-sm"
            style={{ background: color, boxShadow: `0 0 12px ${color}66` }}
            aria-hidden
          />
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
            {name}
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          cupo {quota}
        </span>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className="flex h-full">
          <div
            className="h-full transition-[width]"
            style={{ width: `${pct(taken, quota)}%`, background: color }}
            title={`Tomados: ${taken}`}
          />
          <div
            className="h-full opacity-40 transition-[width]"
            style={{ width: `${pct(planned, quota)}%`, background: color }}
            title={`Planeados: ${planned}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
            {taken}
          </div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Tomados
          </div>
        </div>
        <div>
          <div className="text-xl font-bold tabular-nums text-slate-900 dark:text-slate-50">
            {planned}
          </div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Planeados
          </div>
        </div>
        <div>
          <div
            className="text-xl font-bold tabular-nums"
            style={{ color }}
          >
            {remaining}
          </div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-500">
            Restantes
          </div>
        </div>
      </div>
    </div>
  );
}

function NextHolidayCard() {
  const next = nextHoliday();
  if (!next) {
    return (
      <div className="surface p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Próximo feriado
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No tengo feriados cargados después de hoy. Subí el año en Settings.
        </p>
      </div>
    );
  }
  const { holiday, daysUntil } = next;
  return (
    <div className="surface relative overflow-hidden p-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-holiday/10 blur-2xl dark:bg-holiday/15"
      />
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Próximo feriado
      </h3>
      <div className="flex items-baseline gap-2">
        <div className="text-4xl font-bold tabular-nums text-holiday">
          {daysUntil}
        </div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {daysUntil === 1 ? 'día' : 'días'}
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
        {holiday.name}
      </p>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
        {formatLong(holiday.date)}
        {holiday.movable && holiday.originalDate && (
          <span className="ml-1 opacity-70">
            (trasladado de {holiday.originalDate.slice(8, 10)}/
            {holiday.originalDate.slice(5, 7)})
          </span>
        )}
      </p>
    </div>
  );
}

function UpcomingCard({ state }: { state: State }) {
  const upcoming = upcomingDays(state, 5);
  return (
    <div className="surface p-4">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Próximos días
      </h3>
      {upcoming.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-500">
          No hay vacaciones cargadas a futuro.
        </p>
      ) : (
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          {upcoming.map((u) => (
            <li key={u.date} className="flex items-center justify-between gap-2">
              <span className="truncate">{formatShort(u.date)}</span>
              <span className="flex gap-1">
                {u.german && (
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: state.settings.germanColor }}
                    title={state.settings.germanName}
                  />
                )}
                {u.jorge && (
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: state.settings.jorgeColor }}
                    title={state.settings.jorgeName}
                  />
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Dashboard({ state, year }: Props) {
  const jorge = personStatsForYear(state, 'jorge', year);
  const german = personStatsForYear(state, 'german', year);
  const s: Settings = state.settings;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <PersonCard
        name={s.germanName}
        color={s.germanColor}
        quota={s.yearlyQuota}
        {...german}
      />
      <PersonCard
        name={s.jorgeName}
        color={s.jorgeColor}
        quota={s.yearlyQuota}
        {...jorge}
      />
      <NextHolidayCard />
      <UpcomingCard state={state} />
    </div>
  );
}
