import { useRef } from 'react';
import type { State } from '../types';

type Props = {
  state: State;
  onImport: (next: State) => void;
};

export function ImportExport({ state, onImport }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function doExport() {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const today = new Date().toISOString().slice(0, 10);
    a.download = `vacaciones-gg-${today}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function doImport(file: File) {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (typeof parsed !== 'object' || parsed === null || typeof parsed.days !== 'object') {
        throw new Error('Archivo inválido: falta "days"');
      }
      if (
        !confirm(
          '¿Reemplazar el estado actual con el del archivo? Tu data actual se va a perder.',
        )
      ) {
        return;
      }
      onImport(parsed as State);
    } catch (err) {
      alert(`No se pudo importar: ${(err as Error).message}`);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={doExport}
        title="Descargá un JSON con todo el estado para mandárselo al otro"
      >
        ⬇ Exportar
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => fileRef.current?.click()}
        title="Subí un JSON exportado por el otro para sincronizar"
      >
        ⬆ Importar
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void doImport(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
