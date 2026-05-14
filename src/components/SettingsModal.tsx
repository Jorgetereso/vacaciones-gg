import { useState, useEffect } from 'react';
import type { Settings } from '../types';
import { Modal } from './Modal';

type Props = {
  open: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (patch: Partial<Settings>) => void;
  onClearAll: () => void;
};

export function SettingsModal({ open, onClose, settings, onSave, onClearAll }: Props) {
  const [form, setForm] = useState<Settings>(settings);

  useEffect(() => {
    if (open) setForm(settings);
  }, [open, settings]);

  const update = (patch: Partial<Settings>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Configuración"
      footer={
        <>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (confirm('¿Borrar todos los días marcados y volver a defaults? Esto no se puede deshacer.')) {
                onClearAll();
                onClose();
              }
            }}
          >
            Borrar todo
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onSave(form);
              onClose();
            }}
          >
            Guardar
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <label className="block text-xs font-medium text-slate-600">
          Cupo anual (días)
          <input
            type="number"
            min={0}
            max={365}
            value={form.yearlyQuota}
            onChange={(e) =>
              update({ yearlyQuota: Math.max(0, Number(e.target.value) || 0) })
            }
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
          />
        </label>

        <div className="rounded-md border border-slate-200 p-3">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ background: form.jorgeColor }}
            />
            <h3 className="text-sm font-semibold text-slate-700">Persona 1</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="col-span-2 block text-xs text-slate-600">
              Nombre
              <input
                type="text"
                value={form.jorgeName}
                onChange={(e) => update({ jorgeName: e.target.value })}
                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
              />
            </label>
            <label className="block text-xs text-slate-600">
              Color
              <input
                type="color"
                value={form.jorgeColor}
                onChange={(e) => update({ jorgeColor: e.target.value })}
                className="mt-1 h-9 w-full cursor-pointer rounded-md border border-slate-200"
              />
            </label>
            <label className="col-span-3 block text-xs text-slate-600">
              Email
              <input
                type="email"
                value={form.jorgeEmail}
                onChange={(e) => update({ jorgeEmail: e.target.value })}
                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
              />
            </label>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 p-3">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full"
              style={{ background: form.germanColor }}
            />
            <h3 className="text-sm font-semibold text-slate-700">Persona 2</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <label className="col-span-2 block text-xs text-slate-600">
              Nombre
              <input
                type="text"
                value={form.germanName}
                onChange={(e) => update({ germanName: e.target.value })}
                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
              />
            </label>
            <label className="block text-xs text-slate-600">
              Color
              <input
                type="color"
                value={form.germanColor}
                onChange={(e) => update({ germanColor: e.target.value })}
                className="mt-1 h-9 w-full cursor-pointer rounded-md border border-slate-200"
              />
            </label>
            <label className="col-span-3 block text-xs text-slate-600">
              Email (para "Avisar")
              <input
                type="email"
                value={form.germanEmail}
                onChange={(e) => update({ germanEmail: e.target.value })}
                placeholder="german@…"
                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
              />
            </label>
          </div>
        </div>

        <label className="block text-xs text-slate-600">
          Color "Los dos"
          <input
            type="color"
            value={form.bothColor}
            onChange={(e) => update({ bothColor: e.target.value })}
            className="mt-1 h-9 w-20 cursor-pointer rounded-md border border-slate-200"
          />
        </label>
      </div>
    </Modal>
  );
}
