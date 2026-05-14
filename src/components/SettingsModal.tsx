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

function PersonSection({
  title,
  name,
  email,
  color,
  emailPlaceholder,
  onChange,
}: {
  title: string;
  name: string;
  email: string;
  color: string;
  emailPlaceholder?: string;
  onChange: (patch: { name?: string; email?: string; color?: string }) => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-4 w-4 rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}66` }}
        />
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className="col-span-2 block text-xs text-slate-600 dark:text-slate-400">
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="input mt-1"
          />
        </label>
        <label className="block text-xs text-slate-600 dark:text-slate-400">
          Color
          <input
            type="color"
            value={color}
            onChange={(e) => onChange({ color: e.target.value })}
            className="mt-1 h-9 w-full cursor-pointer rounded-md border border-slate-200 dark:border-slate-700"
          />
        </label>
        <label className="col-span-3 block text-xs text-slate-600 dark:text-slate-400">
          Email
          <input
            type="email"
            value={email}
            placeholder={emailPlaceholder}
            onChange={(e) => onChange({ email: e.target.value })}
            className="input mt-1"
          />
        </label>
      </div>
    </div>
  );
}

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
              if (
                confirm(
                  '¿Borrar todos los días marcados y volver a defaults? Esto no se puede deshacer.',
                )
              ) {
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
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
            Cupo anual (días)
            <input
              type="number"
              min={0}
              max={365}
              value={form.yearlyQuota}
              onChange={(e) =>
                update({ yearlyQuota: Math.max(0, Number(e.target.value) || 0) })
              }
              className="input mt-1"
            />
          </label>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Tema
            <div className="mt-1 inline-flex rounded-lg ring-1 ring-slate-200 dark:ring-slate-700">
              <button
                type="button"
                className={`rounded-l-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  form.theme === 'dark'
                    ? 'bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                onClick={() => update({ theme: 'dark' })}
              >
                🌙 Oscuro
              </button>
              <button
                type="button"
                className={`rounded-r-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  form.theme === 'light'
                    ? 'bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                onClick={() => update({ theme: 'light' })}
              >
                🌞 Claro
              </button>
            </div>
          </div>
        </div>

        <PersonSection
          title="Germán"
          name={form.germanName}
          email={form.germanEmail}
          color={form.germanColor}
          emailPlaceholder="german@…"
          onChange={(p) =>
            update({
              germanName: p.name ?? form.germanName,
              germanEmail: p.email ?? form.germanEmail,
              germanColor: p.color ?? form.germanColor,
            })
          }
        />

        <PersonSection
          title="Jorge"
          name={form.jorgeName}
          email={form.jorgeEmail}
          color={form.jorgeColor}
          onChange={(p) =>
            update({
              jorgeName: p.name ?? form.jorgeName,
              jorgeEmail: p.email ?? form.jorgeEmail,
              jorgeColor: p.color ?? form.jorgeColor,
            })
          }
        />

        <label className="block text-xs text-slate-600 dark:text-slate-400">
          Color "Los dos"
          <input
            type="color"
            value={form.bothColor}
            onChange={(e) => update({ bothColor: e.target.value })}
            className="mt-1 h-9 w-20 cursor-pointer rounded-md border border-slate-200 dark:border-slate-700"
          />
        </label>
      </div>
    </Modal>
  );
}
