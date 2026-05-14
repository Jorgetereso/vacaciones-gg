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

const LOGO_URL = `${import.meta.env.BASE_URL}logo_3dario.webp`;

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

function UserChip() {
  return (
    <div className="flex items-center gap-2 rounded-full px-1 py-1 ring-1 ring-slate-200 dark:ring-slate-800">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-xs font-bold text-white">
        J
      </span>
      <span className="hidden pr-3 text-sm font-medium text-slate-700 sm:inline dark:text-slate-200">
        Jorge Tereso
      </span>
    </div>
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
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* Row 1: logo + nav pill + user */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <a
          href="https://3dar.io"
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center"
          aria-label="3dar.io"
        >
          <img
            src={LOGO_URL}
            alt="3dar.io"
            className="h-7 w-auto select-none"
            draggable={false}
          />
        </a>
        <span
          aria-hidden
          className="hidden h-6 w-px bg-slate-200 sm:inline-block dark:bg-slate-800"
        />
        <nav className="flex items-center gap-1.5">
          <span className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
            Vacaciones
          </span>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <UserChip />
        </div>
      </div>

      {/* Row 2: toolbar */}
      <div className="border-t border-slate-100 bg-slate-50/70 dark:border-slate-900 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-2.5">
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

          <a
            className={`btn ${mailto ? 'btn-primary' : 'btn-secondary pointer-events-none opacity-60'}`}
            href={mailto ?? undefined}
            onClick={() => mailto && onMarkNotified()}
            title={avisarTitle}
          >
            📧 Notificar vía mail
            {pending > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/90 px-1.5 text-xs font-bold text-blue-700 shadow-sm">
                {pending}
              </span>
            )}
          </a>

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

      {/* Row 3: banner */}
      <div className="border-t border-slate-100 bg-blue-50/50 dark:border-slate-900 dark:bg-blue-500/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-[11px] text-slate-600 dark:text-slate-400">
          <span>
            🔒 Nada se manda automáticamente — apretá <b>Notificar vía mail</b>{' '}
            cuando quieras avisarle a {state.settings.germanName}.
          </span>
        </div>
      </div>
    </header>
  );
}
