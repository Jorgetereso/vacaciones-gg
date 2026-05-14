import { useState } from 'react';
import { MONTH_NAMES_ES, SUPPORTED_YEARS } from '../lib/dates';
import type { Settings, State, Who } from '../types';
import { MonthGrid } from './MonthGrid';

type Props = {
  year: number;
  onYearChange: (y: number) => void;
  days: State['days'];
  settings: Settings;
  activePerson: Who;
  dragState: React.ComponentProps<typeof MonthGrid>['dragState'];
  onContextMenu: (date: string) => void;
};

const TODAY = new Date();
const MIN_YEAR = SUPPORTED_YEARS[0];
const MAX_YEAR = SUPPORTED_YEARS[SUPPORTED_YEARS.length - 1];

export function MobileMonthView({
  year,
  onYearChange,
  days,
  settings,
  activePerson,
  dragState,
  onContextMenu,
}: Props) {
  const [month, setMonth] = useState<number>(() =>
    TODAY.getFullYear() === year ? TODAY.getMonth() : 0,
  );

  const atStart = year === MIN_YEAR && month === 0;
  const atEnd = year === MAX_YEAR && month === 11;

  const prev = () => {
    if (atStart) return;
    if (month === 0) {
      onYearChange(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const next = () => {
    if (atEnd) return;
    if (month === 11) {
      onYearChange(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={prev}
          disabled={atStart}
          aria-label="Mes anterior"
          className="btn btn-secondary !px-3 !py-2 text-base disabled:opacity-30"
        >
          ‹
        </button>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          aria-label="Mes"
          className="input flex-1 text-center font-semibold"
        >
          {MONTH_NAMES_ES.map((n, i) => (
            <option key={i} value={i}>
              {n} {year}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={next}
          disabled={atEnd}
          aria-label="Mes siguiente"
          className="btn btn-secondary !px-3 !py-2 text-base disabled:opacity-30"
        >
          ›
        </button>
      </div>
      <MonthGrid
        year={year}
        month={month}
        days={days}
        settings={settings}
        activePerson={activePerson}
        dragState={dragState}
        onContextMenu={onContextMenu}
        hideTitle
      />
    </div>
  );
}
