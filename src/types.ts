export type Who = 'jorge' | 'german';

export type DayEntry = {
  jorge?: boolean;
  german?: boolean;
  note?: string;
};

export type RecentChange = {
  date: string;
  action: 'add' | 'remove';
  who: Who;
  at: number;
};

export type Settings = {
  yearlyQuota: number;
  jorgeName: string;
  germanName: string;
  jorgeEmail: string;
  germanEmail: string;
  jorgeColor: string;
  germanColor: string;
  bothColor: string;
};

export type State = {
  days: Record<string, DayEntry>;
  settings: Settings;
  recentChanges: RecentChange[];
  lastNotifiedAt: number;
};

export type Holiday = {
  date: string;
  name: string;
  movable?: boolean;
  originalDate?: string;
};
