import type { RecentChange, State, Who } from '../types';
import { compressRanges, formatRange } from './dates';

function nameFor(state: State, who: Who): string {
  return who === 'jorge' ? state.settings.jorgeName : state.settings.germanName;
}

export function buildMailto(state: State, siteUrl?: string): string | null {
  if (!state.settings.germanEmail) return null;
  if (state.recentChanges.length === 0) return null;

  const since = state.lastNotifiedAt;
  const fresh = state.recentChanges.filter((c) => c.at > since);
  if (fresh.length === 0) return null;

  const byBucket = new Map<string, string[]>();
  for (const c of fresh) {
    const key = `${c.action}|${c.who}`;
    const arr = byBucket.get(key) ?? [];
    arr.push(c.date);
    byBucket.set(key, arr);
  }

  const lines: string[] = [`Hola ${state.settings.germanName}, actualicé las vacaciones:`, ''];

  const labelFor = (action: RecentChange['action'], who: Who): string => {
    const verb = action === 'add' ? 'Agregué' : 'Saqué';
    return `${verb} (${nameFor(state, who)})`;
  };

  for (const [key, dates] of byBucket) {
    const [action, who] = key.split('|') as [RecentChange['action'], Who];
    const ranges = compressRanges(dates).map(formatRange).join(', ');
    lines.push(`• ${labelFor(action, who)}: ${ranges}`);
  }

  if (siteUrl) {
    lines.push('', `Ver el calendario: ${siteUrl}`);
  }

  const subject = `Actualicé vacaciones (${fresh.length} ${fresh.length === 1 ? 'cambio' : 'cambios'})`;
  const body = lines.join('\n');

  return `mailto:${encodeURIComponent(state.settings.germanEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function pendingChangesCount(state: State): number {
  return state.recentChanges.filter((c) => c.at > state.lastNotifiedAt).length;
}
