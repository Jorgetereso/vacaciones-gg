import { SUPPORTED_YEARS } from '../lib/dates';
import { buildMailto, pendingChangesCount } from '../lib/notify';
import type { State, Theme, Who } from '../types';
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
  onToggleTheme: () => void;
};

function ThemeButton({
  theme,
  onClick,
}: {
  theme: Theme;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="btn btn-secondary !px-2.5"
      onClick={onClick}
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label="Cambiar tema"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}

export function Header({
  state,
  year,
  onYearChange,
  activePerson,
  onPersonChange,
  onOpenSettings,
  onImport,
  onMarkNotified,
  onToggleTheme,
}: Props) {
  const siteUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : undefined;
  const mailto = buildMailto(state, siteUrl);
  const pending = pendingChangesCount(state);

  const avisarTitle = mailto
    ? `Abrir mail a ${state.settings.germanName} con resumen de ${pending} ${pending === 1 ? 'cambio' : 'cambios'} (no se manda solo)`
    : pending === 0
      ? 'No hay cambios pendientes para avisar'
      : `Configurá el email de ${state.settings.germanName} en ⚙ Settings para usar este botón`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/75">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-xl shadow-lg shadow-indigo-500/30">
            📅
          </span>
          <div>
            <h1 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-50">
              Vacaciones GG
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {state.settings.germanName} & {state.settings.jorgeName}
            </p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <select
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
            className="input !w-auto !py-1.5 font-semibold"
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

          <div className="relative">
            <a
              className={`btn ${mailto ? 'btn-primary' : 'btn-secondary pointer-events-none opacity-60'}`}
              href={mailto ?? undefined}
              onClick={() => mailto && onMarkNotified()}
              title={avisarTitle}
            >
              📧 Avisar a {state.settings.germanName}
              {pending > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/90 px-1.5 text-xs font-bold text-slate-900 shadow-sm">
                  {pending}
                </span>
              )}
            </a>
          </div>

          <ImportExport state={state} onImport={onImport} />

          <ThemeButton theme={state.settings.theme} onClick={onToggleTheme} />

          <button
            type="button"
            className="btn btn-secondary !px-2.5"
            onClick={onOpenSettings}
            aria-label="Configuración"
          >
            ⚙
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 dark:border-slate-900 dark:bg-slate-950/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <span>
            🔒 Nada se manda automáticamente — apretá <b>Avisar</b> cuando
            quieras notificar a {state.settings.germanName}.
          </span>
        </div>
      </div>
    </header>
  );
}
