import type { CSSProperties, PointerEvent, MouseEvent } from 'react';
import { contrastingTextColor } from '../lib/dates';
import type { DayEntry, Holiday, Settings } from '../types';

type Props = {
  date: string;
  dayNumber: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  holiday?: Holiday;
  bridge?: 'before' | 'after' | null;
  entry?: DayEntry;
  inDrag: boolean;
  settings: Settings;
  onPointerDown: (e: PointerEvent<HTMLButtonElement>) => void;
  onContextMenu: (e: MouseEvent<HTMLButtonElement>) => void;
};

function cellFill(entry: DayEntry | undefined, settings: Settings): {
  bg: string | null;
  text: string | null;
} {
  if (!entry) return { bg: null, text: null };
  if (entry.jorge && entry.german) {
    return { bg: settings.bothColor, text: contrastingTextColor(settings.bothColor) };
  }
  if (entry.german) {
    return { bg: settings.germanColor, text: contrastingTextColor(settings.germanColor) };
  }
  if (entry.jorge) {
    return { bg: settings.jorgeColor, text: contrastingTextColor(settings.jorgeColor) };
  }
  return { bg: null, text: null };
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
  const { bg, text } = cellFill(entry, settings);
  const isMarked = bg !== null;

  const classes = [
    'day-cell',
    isToday && 'is-today',
    isWeekend && 'is-weekend',
    holiday && !isMarked && 'is-holiday',
    bridge && 'is-bridge',
    !inCurrentMonth && 'is-other-month',
    inDrag && 'in-drag',
    isMarked && 'is-marked',
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

  const style: CSSProperties = isMarked
    ? { background: bg!, color: text!, boxShadow: `0 6px 18px -10px ${bg}` }
    : {};

  return (
    <button
      type="button"
      data-day-key={date}
      className={classes}
      style={{ touchAction: 'none', ...style }}
      onPointerDown={onPointerDown}
      onContextMenu={onContextMenu}
      title={title}
    >
      <span className="relative z-10 flex h-full w-full items-center justify-center">
        {dayNumber}
      </span>
      {entry?.note && (
        <span
          className="absolute bottom-0.5 right-1 z-10 text-[8px] leading-none drop-shadow-sm"
          aria-label="tiene nota"
        >
          📝
        </span>
      )}
    </button>
  );
}
