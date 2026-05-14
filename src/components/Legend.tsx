import type { Settings } from '../types';

type Props = { settings: Settings };

function Swatch({ color }: { color: string }) {
  return (
    <span
      className="h-3 w-3 rounded-sm"
      style={{ background: color, boxShadow: `0 0 8px ${color}66` }}
    />
  );
}

export function Legend({ settings }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
      <span className="font-semibold text-slate-500 dark:text-slate-400">
        Referencias:
      </span>
      <span className="chip">
        <Swatch color={settings.germanColor} />
        {settings.germanName}
      </span>
      <span className="chip">
        <Swatch color={settings.jorgeColor} />
        {settings.jorgeName}
      </span>
      <span className="chip">
        <Swatch color={settings.bothColor} />
        Los dos
      </span>
      <span className="chip">
        <span className="h-3 w-3 rounded-sm bg-holiday/30 ring-1 ring-holiday/40" />
        Feriado
      </span>
      <span className="chip">💡 Puente</span>
    </div>
  );
}
