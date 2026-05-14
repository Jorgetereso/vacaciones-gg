import type { Settings, State } from '../types';
import { holidaysOfYear } from '../lib/holidays';
import { personStatsForYear, upcomingDays } from '../lib/stats';
import { formatLong } from '../lib/dates';

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
  settings,
  taken,
  planned,
  remaining,
}: {
  name: string;
  color: string;
  settings: Settings;
  taken: number;
  planned: number;
  remaining: number;
}) {
  const quota = settings.yearlyQuota;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: color }}
            aria-hidden
          />
          <h3 className="font-semibold text-slate-800">{name}</h3>
        </div>
        <span className="text-xs text-slate-500">cupo {quota}</span>
      </div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full">
          <div
            className="h-full"
            style={{
              width: `${pct(taken, quota)}%`,
              background: color,
            }}
            title={`Tomados: ${taken}`}
          />
          <div
            className="h-full opacity-40"
            style={{
              width: `${pct(planned, quota)}%`,
              background: color,
            }}
            title={`Planeados: ${planned}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-lg font-semibold text-slate-800">{taken}</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            Tomados
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-800">{planned}</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            Planeados
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-slate-800">{remaining}</div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            Restantes
          </div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard({ state, year }: Props) {
  const jorge = personStatsForYear(state, 'jorge', year);
  const german = personStatsForYear(state, 'german', year);
  const holidays = holidaysOfYear(year);
  const upcoming = upcomingDays(state, 5);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <PersonCard
        name={state.settings.jorgeName}
        color={state.settings.jorgeColor}
        settings={state.settings}
        {...jorge}
      />
      <PersonCard
        name={state.settings.germanName}
        color={state.settings.germanColor}
        settings={state.settings}
        {...german}
      />
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-slate-700">
          Feriados {year}
        </h3>
        <div className="text-3xl font-bold text-slate-800">
          {holidays.length}
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {holidays.filter((h) => h.movable).length} trasladados de fecha
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-1">
        <h3 className="mb-2 text-sm font-semibold text-slate-700">
          Próximos días
        </h3>
        {upcoming.length === 0 ? (
          <p className="text-xs text-slate-500">
            No hay vacaciones cargadas a futuro.
          </p>
        ) : (
          <ul className="space-y-1 text-xs text-slate-600">
            {upcoming.map((u) => (
              <li key={u.date} className="flex items-baseline justify-between gap-2">
                <span className="truncate">{formatLong(u.date)}</span>
                <span className="flex gap-1">
                  {u.jorge && (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: state.settings.jorgeColor }}
                      title={state.settings.jorgeName}
                    />
                  )}
                  {u.german && (
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: state.settings.germanColor }}
                      title={state.settings.germanName}
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
