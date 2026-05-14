import { useEffect, useState } from 'react';
import { formatLong } from '../lib/dates';
import { getHoliday } from '../lib/holidays';
import type { DayEntry, Settings, Who } from '../types';
import { Modal } from './Modal';

type Props = {
  date: string | null;
  entry: DayEntry | undefined;
  settings: Settings;
  onClose: () => void;
  onToggle: (date: string, who: Who) => void;
  onSetNote: (date: string, note: string) => void;
};

function checkboxStyle(active: boolean, color: string): React.CSSProperties {
  if (!active) return {};
  return {
    borderColor: color,
    background: `${color}1a`,
  };
}

export function EditDayModal({
  date,
  entry,
  settings,
  onClose,
  onToggle,
  onSetNote,
}: Props) {
  const [note, setNote] = useState('');

  useEffect(() => {
    setNote(entry?.note ?? '');
  }, [date, entry]);

  if (!date) return null;
  const holiday = getHoliday(date);

  return (
    <Modal
      open={!!date}
      onClose={onClose}
      title={formatLong(date)}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onSetNote(date, note);
              onClose();
            }}
          >
            Guardar
          </button>
        </>
      }
    >
      {holiday && (
        <p className="mb-3 rounded-lg bg-holiday/10 px-3 py-2 text-xs text-holiday dark:bg-rose-950/40 dark:text-rose-300">
          Feriado: {holiday.name}
          {holiday.movable && holiday.originalDate && (
            <span className="ml-1 opacity-70">
              (trasladado de {holiday.originalDate.slice(8, 10)}/
              {holiday.originalDate.slice(5, 7)})
            </span>
          )}
        </p>
      )}
      <div className="mb-4 grid grid-cols-2 gap-2">
        <label
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
          style={checkboxStyle(!!entry?.german, settings.germanColor)}
        >
          <input
            type="checkbox"
            checked={!!entry?.german}
            onChange={() => onToggle(date, 'german')}
            className="h-4 w-4 accent-current"
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: settings.germanColor }}
          />
          <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {settings.germanName}
          </span>
        </label>
        <label
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
          style={checkboxStyle(!!entry?.jorge, settings.jorgeColor)}
        >
          <input
            type="checkbox"
            checked={!!entry?.jorge}
            onChange={() => onToggle(date, 'jorge')}
            className="h-4 w-4 accent-current"
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: settings.jorgeColor }}
          />
          <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
            {settings.jorgeName}
          </span>
        </label>
      </div>
      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
        Nota
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Ej: Viaje a Brasil, casamiento, doctor…"
          className="input mt-1"
        />
      </label>
    </Modal>
  );
}
