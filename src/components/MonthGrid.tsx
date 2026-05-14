import { useMemo } from 'react';
import {
  MONTH_NAMES_ES,
  WEEKDAY_SHORT_ES,
  dateKey,
  isWeekend,
  monthMatrix,
  todayKey,
} from '../lib/dates';
import { bridgeFor, getHoliday } from '../lib/holidays';
import type { DayEntry, Settings, State, Who } from '../types';
import { DayCell } from './DayCell';

type Props = {
  year: number;
  month: number; // 0-indexed
  days: State['days'];
  settings: Settings;
  activePerson: Who;
  dragState: {
    isDragging: boolean;
    isInRange: (key: string) => boolean;
    targetValue: boolean;
    onPointerDown: (e: React.PointerEvent, key: string, current: boolean) => void;
  };
  onContextMenu: (date: string) => void;
};

export function MonthGrid({
  year,
  month,
  days,
  settings,
  activePerson,
  dragState,
  onContextMenu,
}: Props) {
  const today = todayKey();
  const matrix = useMemo(() => monthMatrix(year, month), [year, month]);
  const trimmed = useMemo(
    () => matrix.filter((week) => week.some((d) => d.month() === month)),
    [matrix, month],
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-slate-800">
          {MONTH_NAMES_ES[month]}
        </h3>
        <span className="text-[10px] uppercase tracking-wide text-slate-400">
          {year}
        </span>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-0.5 text-[10px] font-semibold text-slate-400">
        {WEEKDAY_SHORT_ES.map((d, i) => (
          <div key={i} className="text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {trimmed.flat().map((d) => {
          const key = dateKey(d);
          const inCurrentMonth = d.month() === month;
          const baseEntry = days[key];
          const inDrag = dragState.isDragging && dragState.isInRange(key);
          // Proyectar la entrada según el drag activo.
          let entry: DayEntry | undefined = baseEntry;
          if (inDrag) {
            const next: DayEntry = {
              ...(baseEntry ?? {}),
              [activePerson]: dragState.targetValue || undefined,
            };
            // Limpiar flags falsos para no pintar.
            if (!next.jorge) delete next.jorge;
            if (!next.german) delete next.german;
            entry = next.jorge || next.german || next.note ? next : undefined;
          }
          return (
            <DayCell
              key={key}
              date={key}
              dayNumber={d.date()}
              inCurrentMonth={inCurrentMonth}
              isToday={key === today}
              isWeekend={isWeekend(d)}
              holiday={getHoliday(key)}
              bridge={bridgeFor(key)}
              entry={entry}
              inDrag={inDrag}
              settings={settings}
              onPointerDown={(e) =>
                dragState.onPointerDown(e, key, !!baseEntry?.[activePerson])
              }
              onContextMenu={(e) => {
                e.preventDefault();
                onContextMenu(key);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
