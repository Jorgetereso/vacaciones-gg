import { useCallback, useEffect, useState } from 'react';
import type {
  DayEntry,
  RecentChange,
  Settings,
  State,
  Theme,
  Who,
} from '../types';

const STORAGE_KEY = 'vacaciones-gg-v1';
const MAX_RECENT_CHANGES = 200;

const DEFAULT_SETTINGS: Settings = {
  yearlyQuota: 45,
  jorgeName: 'Jorge',
  germanName: 'Germán',
  jorgeEmail: 'jorge@3dar.com',
  germanEmail: '',
  jorgeColor: '#3b82f6',
  germanColor: '#f97316',
  bothColor: '#10b981',
  theme: 'light',
};

const DEFAULT_STATE: State = {
  days: {},
  settings: DEFAULT_SETTINGS,
  recentChanges: [],
  lastNotifiedAt: 0,
};

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<State>;
    const merged: State = {
      days: parsed.days ?? {},
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      recentChanges: parsed.recentChanges ?? [],
      lastNotifiedAt: parsed.lastNotifiedAt ?? 0,
    };
    // Migración: si quedó el cupo viejo de 20 (default v1) y nunca lo tocaron, lo subo a 45.
    // No toco valores custom (e.g. 14, 30, 60).
    if (merged.settings.yearlyQuota === 20) {
      merged.settings.yearlyQuota = 45;
    }
    return merged;
  } catch {
    return DEFAULT_STATE;
  }
}

function applyThemeClass(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function cleanDay(entry: DayEntry): DayEntry | null {
  const next: DayEntry = {};
  if (entry.jorge) next.jorge = true;
  if (entry.german) next.german = true;
  if (entry.note && entry.note.trim().length > 0) next.note = entry.note.trim();
  return Object.keys(next).length === 0 ? null : next;
}

function pushChange(prev: RecentChange[], change: RecentChange): RecentChange[] {
  const next = [...prev, change];
  if (next.length > MAX_RECENT_CHANGES) {
    return next.slice(next.length - MAX_RECENT_CHANGES);
  }
  return next;
}

export function useStore() {
  const [state, setState] = useState<State>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignorar quota errors
    }
    applyThemeClass(state.settings.theme);
  }, [state]);

  const setPersonOnRange = useCallback(
    (dates: string[], who: Who, value: boolean) => {
      setState((prev) => {
        const days = { ...prev.days };
        const changes: RecentChange[] = [];
        const now = Date.now();
        for (const date of dates) {
          const current = days[date] ?? {};
          const wasOn = !!current[who];
          if (wasOn === value) continue;
          const next: DayEntry = { ...current, [who]: value || undefined };
          const cleaned = cleanDay(next);
          if (cleaned) days[date] = cleaned;
          else delete days[date];
          changes.push({ date, who, action: value ? 'add' : 'remove', at: now });
        }
        if (changes.length === 0) return prev;
        return {
          ...prev,
          days,
          recentChanges: changes.reduce(pushChange, prev.recentChanges),
        };
      });
    },
    [],
  );

  const togglePerson = useCallback((date: string, who: Who) => {
    setState((prev) => {
      const current = prev.days[date] ?? {};
      const value = !current[who];
      const days = { ...prev.days };
      const next: DayEntry = { ...current, [who]: value || undefined };
      const cleaned = cleanDay(next);
      if (cleaned) days[date] = cleaned;
      else delete days[date];
      const change: RecentChange = {
        date,
        who,
        action: value ? 'add' : 'remove',
        at: Date.now(),
      };
      return {
        ...prev,
        days,
        recentChanges: pushChange(prev.recentChanges, change),
      };
    });
  }, []);

  const setNote = useCallback((date: string, note: string) => {
    setState((prev) => {
      const current = prev.days[date] ?? {};
      const next: DayEntry = { ...current, note };
      const cleaned = cleanDay(next);
      const days = { ...prev.days };
      if (cleaned) days[date] = cleaned;
      else delete days[date];
      return { ...prev, days };
    });
  }, []);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...patch },
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        theme: prev.settings.theme === 'dark' ? 'light' : 'dark',
      },
    }));
  }, []);

  const markNotified = useCallback(() => {
    setState((prev) => ({ ...prev, lastNotifiedAt: Date.now() }));
  }, []);

  const replaceAll = useCallback((next: State) => {
    setState({
      ...DEFAULT_STATE,
      ...next,
      settings: { ...DEFAULT_SETTINGS, ...(next.settings ?? {}) },
    });
  }, []);

  const clearAll = useCallback(() => {
    setState({ ...DEFAULT_STATE, settings: DEFAULT_SETTINGS });
  }, []);

  return {
    state,
    setPersonOnRange,
    togglePerson,
    setNote,
    updateSettings,
    toggleTheme,
    markNotified,
    replaceAll,
    clearAll,
  };
}

export type Store = ReturnType<typeof useStore>;
