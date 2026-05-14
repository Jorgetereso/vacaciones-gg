import type { Settings, Who } from '../types';

type Props = {
  active: Who;
  onChange: (who: Who) => void;
  settings: Settings;
};

function pill(color: string, isActive: boolean): React.CSSProperties {
  if (!isActive) return {};
  return {
    background: color,
    color: 'white',
    boxShadow: `0 8px 24px -10px ${color}aa`,
  };
}

export function PersonToggle({ active, onChange, settings }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Marcando como"
      className="inline-flex items-center gap-1 rounded-xl bg-white p-1 ring-1 ring-slate-200 dark:bg-slate-900/60 dark:ring-slate-800"
    >
      <span className="px-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        Soy
      </span>
      <button
        role="tab"
        type="button"
        aria-selected={active === 'german'}
        onClick={() => onChange('german')}
        className="rounded-lg px-3 py-1.5 text-sm font-semibold transition-all dark:text-slate-300"
        style={pill(settings.germanColor, active === 'german')}
      >
        {settings.germanName}
      </button>
      <button
        role="tab"
        type="button"
        aria-selected={active === 'jorge'}
        onClick={() => onChange('jorge')}
        className="rounded-lg px-3 py-1.5 text-sm font-semibold transition-all dark:text-slate-300"
        style={pill(settings.jorgeColor, active === 'jorge')}
      >
        {settings.jorgeName}
      </button>
    </div>
  );
}
