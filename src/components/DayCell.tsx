import type { CSSProperties, PointerEvent, MouseEvent } from 'react';
import type { DayEntry, Holiday, Settings } from '../types';

type Props = {
  date: string;
  dayNumber: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  holiday?: Holiday;
  bridge?: 'before' | 'after' | null;
  // Entry proyectado: incluye preview de drag si corresponde.
  entry?: DayEntry;
  inDrag: boolean;
  settings: Settings;
  onPointerDown: (e: PointerEvent<HTMLButtonElement>) => void;
  onContextMenu: (e: MouseEvent<HTMLButtonElement>) => void;
};

function buildBackground(
  jorge: boolean,
  german: boolean,
  settings: Settings,
): CSSProperties {
  if (jorge && german) return { background: settings.bothColor };
  if (german) {
    return {
      background: `linear-gradient(to right, ${settings.germanColor} 50%, transparent 50%)`,
    };
  }
  if (jorge) {
    return {
      background: `linear-gradient(to right, transparent 50%, ${settings.jorgeColor} 50%)`,
    };
  }
  return {};
}

export function DayCell({
  date,
  dayNumber,
  inCurrentMonth,
  isToday,
  isWeekend,
  holiday,
  bridge,
  entry,
  inDrag,
  settings,
  onPointerDown,
  onContextMenu,
}: Props) {
  const jorge = !!entry?.jorge;
  const german = !!entry?.german;

  const classes = [
    'day-cell',
    isToday && 'is-today',
    isWeekend && 'is-weekend',
    holiday && 'is-holiday',
    bridge && 'is-bridge',
    !inCurrentMonth && 'is-other-month',
    inDrag && 'in-drag',
  ]
    .filter(Boolean)
    .join(' ');

  const tooltipParts: string[] = [];
  if (holiday) tooltipParts.push(`Feriado: ${holiday.name}`);
  if (bridge)
    tooltipParts.push(
      bridge === 'before'
        ? '💡 Puente sugerido (martes feriado)'
        : '💡 Puente sugerido (jueves feriado)',
    );
  if (entry?.note) tooltipParts.push(`📝 ${entry.note}`);
  const title = tooltipParts.length > 0 ? tooltipParts.join('\n') : date;

  return (
    <button
      type="button"
      data-day-key={date}
      className={classes}
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onContextMenu={onContextMenu}
      title={title}
    >
      <span
        className="absolute inset-0 rounded-md"
        style={buildBackground(jorge, german, settings)}
        aria-hidden
      />
      <span className="relative z-10 flex h-full w-full items-center justify-center">
        {dayNumber}
      </span>
      {entry?.note && (
        <span
          className="absolute bottom-0.5 right-0.5 z-10 text-[8px] leading-none"
          aria-label="tiene nota"
        >
          📝
        </span>
      )}
    </button>
  );
}
