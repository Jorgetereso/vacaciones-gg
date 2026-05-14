import { SUPPORTED_YEARS } from '../lib/dates';
import { buildMailto, pendingChangesCount } from '../lib/notify';
import type { State, Who } from '../types';
import { ImportExport } from './ImportExport';
import { PersonToggle } from './PersonToggle';

type Props = {
  state: State;
  year: number;
  onYearChange: (y: number) => void;
  activePerson: Who;
  onPersonChange: (w: Who) => void;
  onOpenSettings: () => void;
  onImport: (next: State) => void;
  onMarkNotified: () => void;
};

export function Header({
  state,
  year,
  onYearChange,
  activePerson,
  onPersonChange,
  onOpenSettings,
  onImport,
  onMarkNotified,
}: Props) {
  const siteUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : undefined;
  const mailto = buildMailto(state, siteUrl);
  const pending = pendingChangesCount(state);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📅</span>
          <div>
            <h1 className="text-lg font-bold leading-tight text-slate-900">
              Vacaciones GG
            </h1>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Prototipo · {state.settings.jorgeName} & {state.settings.germanName}
            </p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 focus:border-slate-400 focus:outline-none"
            aria-label="Año"
          >
            {SUPPORTED_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <PersonToggle
            active={activePerson}
            onChange={onPersonChange}
            settings={state.settings}
          />

          <a
            className={`btn ${mailto ? '' : 'btn-secondary pointer-events-none opacity-60'}`}
            href={mailto ?? undefined}
            onClick={() => mailto && onMarkNotified()}
            title={
              mailto
                ? `Avisar a ${state.settings.germanName} (${pending} cambios)`
                : pending === 0
                  ? 'No hay cambios pendientes'
                  : 'Configurá el email en Settings'
            }
          >
            📧 Avisar
            {pending > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-slate-900">
                {pending}
              </span>
            )}
          </a>

          <ImportExport state={state} onImport={onImport} />

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onOpenSettings}
            aria-label="Configuración"
          >
            ⚙
          </button>
        </div>
      </div>
    </header>
  );
}
