import type { Settings, Who } from '../types';

type Props = {
  active: Who;
  onChange: (who: Who) => void;
  settings: Settings;
};

export function PersonToggle({ active, onChange, settings }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Marcando como"
      className="inline-flex items-center gap-1 rounded-lg bg-white p-1 ring-1 ring-slate-200"
    >
      <span className="px-2 text-xs font-medium text-slate-500">Soy</span>
      <button
        role="tab"
        type="button"
        aria-selected={active === 'jorge'}
        onClick={() => onChange('jorge')}
        className="rounded-md px-3 py-1 text-sm font-medium transition-colors"
        style={
          active === 'jorge'
            ? { background: settings.jorgeColor, color: 'white' }
            : { color: '#475569' }
        }
      >
        {settings.jorgeName}
      </button>
      <button
        role="tab"
        type="button"
        aria-selected={active === 'german'}
        onClick={() => onChange('german')}
        className="rounded-md px-3 py-1 text-sm font-medium transition-colors"
        style={
          active === 'german'
            ? { background: settings.germanColor, color: 'white' }
            : { color: '#475569' }
        }
      >
        {settings.germanName}
      </button>
    </div>
  );
}
