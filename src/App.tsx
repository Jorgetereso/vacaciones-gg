import { useCallback, useMemo, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DashboardMobile } from './components/DashboardMobile';
import { EditDayModal } from './components/EditDayModal';
import { Header } from './components/Header';
import { Legend } from './components/Legend';
import { MobileMonthView } from './components/MobileMonthView';
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
    toggleTheme,
    markNotified,
    replaceAll,
    clearAll,
  } = useStore();

  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [activePerson, setActivePerson] = useState<Who>('german');
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
        onToggleTheme={toggleTheme}
      />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <section aria-label="Resumen" className="mb-6">
          <div className="hidden sm:block">
            <Dashboard state={state} year={year} />
          </div>
          <div className="sm:hidden">
            <DashboardMobile state={state} year={year} />
          </div>
        </section>
        <section className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Legend settings={state.settings} />
          <div className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">
            Tip: click → toggle de{' '}
            <b className="text-slate-700 dark:text-slate-200">
              {state.settings[activePerson === 'jorge' ? 'jorgeName' : 'germanName']}
            </b>
            . Arrastrá para marcar un rango. Click derecho (o tap largo) abre la nota.
          </div>
        </section>
        <div className="hidden sm:block">
          <YearView
            year={year}
            days={state.days}
            settings={state.settings}
            activePerson={activePerson}
            dragState={dragState}
            onContextMenu={(date) => setEditingDate(date)}
          />
        </div>
        <div className="sm:hidden">
          <MobileMonthView
            year={year}
            onYearChange={setYear}
            days={state.days}
            settings={state.settings}
            activePerson={activePerson}
            dragState={dragState}
            onContextMenu={(date) => setEditingDate(date)}
          />
        </div>
        {drag.isDragging && (
          <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg ring-1 ring-slate-800 animate-fade-in dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-300">
            {drag.targetValue ? '✓ Marcando' : '✕ Desmarcando'}{' '}
            {drag.rangeSize} {drag.rangeSize === 1 ? 'día' : 'días'} de{' '}
            {state.settings[activePerson === 'jorge' ? 'jorgeName' : 'germanName']}
          </div>
        )}
      </main>
      <footer className="mx-auto max-w-7xl px-4 pb-8 text-center text-xs text-slate-400 dark:text-slate-500">
        Prototipo · datos solo en este navegador (localStorage) · compartí con
        Exportar/Importar
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
