import { useCallback, useEffect, useRef, useState } from 'react';
import { rangeDays } from '../lib/dates';

type DragState = {
  anchor: string;
  current: string;
  baseValue: boolean;
};

type Apply = (dates: string[], targetValue: boolean) => void;

export function useDragSelect(onApply: Apply) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const onApplyRef = useRef(onApply);

  useEffect(() => {
    onApplyRef.current = onApply;
  }, [onApply]);

  const sync = useCallback((next: DragState | null) => {
    dragRef.current = next;
    setDrag(next);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent, dateKey: string, currentValue: boolean) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      sync({ anchor: dateKey, current: dateKey, baseValue: currentValue });
    },
    [sync],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const cur = dragRef.current;
      if (!cur) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const cell = (el as HTMLElement | null)?.closest<HTMLElement>('[data-day-key]');
      const k = cell?.dataset.dayKey;
      if (k && k !== cur.current) {
        sync({ ...cur, current: k });
      }
    };
    const onUp = () => {
      const cur = dragRef.current;
      if (!cur) return;
      const dates = rangeDays(cur.anchor, cur.current);
      onApplyRef.current(dates, !cur.baseValue);
      sync(null);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [sync]);

  const isInRange = useCallback(
    (key: string) => {
      if (!drag) return false;
      const [a, b] =
        drag.anchor < drag.current
          ? [drag.anchor, drag.current]
          : [drag.current, drag.anchor];
      return key >= a && key <= b;
    },
    [drag],
  );

  const rangeSize = drag
    ? rangeDays(drag.anchor, drag.current).length
    : 0;

  return {
    isDragging: drag !== null,
    isInRange,
    onPointerDown,
    targetValue: drag ? !drag.baseValue : false,
    rangeSize,
  };
}
