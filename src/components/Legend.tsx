import type { Settings } from '../types';

type Props = { settings: Settings };

export function Legend({ settings }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
      <span className="font-medium text-slate-500">Referencias:</span>
      <span className="chip">
        <span
          className="h-3 w-3 rounded-sm"
          style={{
            background: `linear-gradient(to right, ${settings.jorgeColor} 50%, transparent 50%)`,
          }}
        />
        {settings.jorgeName}
      </span>
      <span className="chip">
        <span
          className="h-3 w-3 rounded-sm"
          style={{
            background: `linear-gradient(to right, transparent 50%, ${settings.germanColor} 50%)`,
          }}
        />
        {settings.germanName}
      </span>
      <span className="chip">
        <span
          className="h-3 w-3 rounded-sm"
          style={{ background: settings.bothColor }}
        />
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
