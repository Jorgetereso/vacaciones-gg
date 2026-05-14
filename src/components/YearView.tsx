import type { Settings, State, Who } from '../types';
import { MonthGrid } from './MonthGrid';

type Props = {
  year: number;
  days: State['days'];
  settings: Settings;
  activePerson: Who;
  dragState: React.ComponentProps<typeof MonthGrid>['dragState'];
  onContextMenu: (date: string) => void;
};

export function YearView({
  year,
  days,
  settings,
  activePerson,
  dragState,
  onContextMenu,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }, (_, i) => (
        <MonthGrid
          key={i}
          year={year}
          month={i}
          days={days}
          settings={settings}
          activePerson={activePerson}
          dragState={dragState}
          onContextMenu={onContextMenu}
        />
      ))}
    </div>
  );
}
