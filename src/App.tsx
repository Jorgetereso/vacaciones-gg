import { useCallback, useMemo, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { EditDayModal } from './components/EditDayModal';
import { Header } from './components/Header';
import { Legend } from './components/Legend';
import { SettingsModal } from './components/SettingsModal';
import { YearView } from './components/YearView';
import { useDragSelect } from './hooks/useDragSelect';
import { useStore } from './hooks/useStore';
import type { Who } from './types';

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {
  const {
    state,
    setPersonOnRange,
    togglePerson,
    setNote,
    updateSettings,
    markNotified,
    replaceAll,
    clearAll,
  } = useStore();

  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [activePerson, setActivePerson] = useState<Who>('jorge');
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const applyDrag = useCallback(
    (dates: string[], targetValue: boolean) => {
      setPersonOnRange(dates, activePerson, targetValue);
    },
    [setPersonOnRange, activePerson],
  );

  const drag = useDragSelect(applyDrag);

  const dragState = useMemo(
    () => ({
      isDragging: drag.isDragging,
      isInRange: drag.isInRange,
      targetValue: drag.targetValue,
      onPointerDown: drag.onPointerDown,
    }),
    [drag],
  );

  return (
    <div className="min-h-full">
      <Header
        state={state}
        year={year}
        onYearChange={setYear}
        activePerson={activePerson}
        onPersonChange={setActivePerson}
        onOpenSettings={() => setSettingsOpen(true)}
        onImport={replaceAll}
        onMarkNotified={markNotified}
      />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <section aria-label="Resumen" className="mb-6">
          <Dashboard state={state} year={year} />
        </section>
        <section className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Legend settings={state.settings} />
          <div className="text-xs text-slate-500">
            Tip: click → toggle de {state.settings[activePerson === 'jorge' ? 'jorgeName' : 'germanName']}.
            Arrastrá para marcar un rango. Click derecho (o tap largo) abre la nota.
          </div>
        </section>
        <YearView
          year={year}
          days={state.days}
          settings={state.settings}
          activePerson={activePerson}
          dragState={dragState}
          onContextMenu={(date) => setEditingDate(date)}
        />
        {drag.isDragging && (
          <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
            {drag.targetValue ? '✓ Marcando' : '✕ Desmarcando'}{' '}
            {drag.rangeSize} {drag.rangeSize === 1 ? 'día' : 'días'} de{' '}
            {state.settings[activePerson === 'jorge' ? 'jorgeName' : 'germanName']}
          </div>
        )}
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-8 text-center text-xs text-slate-400">
        Prototipo · datos solo en este navegador (localStorage) · compartí con Exportar/Importar
      </footer>

      <EditDayModal
        date={editingDate}
        entry={editingDate ? state.days[editingDate] : undefined}
        settings={state.settings}
        onClose={() => setEditingDate(null)}
        onToggle={togglePerson}
        onSetNote={setNote}
      />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={state.settings}
        onSave={updateSettings}
        onClearAll={clearAll}
      />
    </div>
  );
}
