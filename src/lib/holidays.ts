import type { Holiday } from '../types';
import { fromKey, dateKey } from './dates';

// Feriados argentinos hardcodeados para 2024-2030 (Ley 27.399 + decretos anuales).
// Las fechas trasladables ya están pre-calculadas a su lunes correspondiente.
export const HOLIDAYS: Holiday[] = [
  // 2024
  { date: '2024-01-01', name: 'Año Nuevo' },
  { date: '2024-02-12', name: 'Carnaval (lunes)' },
  { date: '2024-02-13', name: 'Carnaval (martes)' },
  { date: '2024-03-24', name: 'Día de la Memoria por la Verdad y la Justicia' },
  { date: '2024-03-29', name: 'Viernes Santo' },
  { date: '2024-04-02', name: 'Día del Veterano y los Caídos en Malvinas' },
  { date: '2024-05-01', name: 'Día del Trabajador' },
  { date: '2024-05-25', name: 'Día de la Revolución de Mayo' },
  { date: '2024-06-20', name: 'Paso a la Inmortalidad de Belgrano' },
  { date: '2024-07-09', name: 'Día de la Independencia' },
  { date: '2024-08-19', name: 'Paso a la Inmortalidad de San Martín', movable: true, originalDate: '2024-08-17' },
  { date: '2024-10-14', name: 'Día del Respeto a la Diversidad Cultural', movable: true, originalDate: '2024-10-12' },
  { date: '2024-11-18', name: 'Día de la Soberanía Nacional', movable: true, originalDate: '2024-11-20' },
  { date: '2024-12-08', name: 'Inmaculada Concepción de María' },
  { date: '2024-12-25', name: 'Navidad' },

  // 2025
  { date: '2025-01-01', name: 'Año Nuevo' },
  { date: '2025-03-03', name: 'Carnaval (lunes)' },
  { date: '2025-03-04', name: 'Carnaval (martes)' },
  { date: '2025-03-24', name: 'Día de la Memoria por la Verdad y la Justicia' },
  { date: '2025-04-02', name: 'Día del Veterano y los Caídos en Malvinas' },
  { date: '2025-04-18', name: 'Viernes Santo' },
  { date: '2025-05-01', name: 'Día del Trabajador' },
  { date: '2025-05-25', name: 'Día de la Revolución de Mayo' },
  { date: '2025-06-20', name: 'Paso a la Inmortalidad de Belgrano' },
  { date: '2025-07-09', name: 'Día de la Independencia' },
  { date: '2025-08-18', name: 'Paso a la Inmortalidad de San Martín', movable: true, originalDate: '2025-08-17' },
  { date: '2025-10-13', name: 'Día del Respeto a la Diversidad Cultural', movable: true, originalDate: '2025-10-12' },
  { date: '2025-11-24', name: 'Día de la Soberanía Nacional', movable: true, originalDate: '2025-11-20' },
  { date: '2025-12-08', name: 'Inmaculada Concepción de María' },
  { date: '2025-12-25', name: 'Navidad' },

  // 2026
  { date: '2026-01-01', name: 'Año Nuevo' },
  { date: '2026-02-16', name: 'Carnaval (lunes)' },
  { date: '2026-02-17', name: 'Carnaval (martes)' },
  { date: '2026-03-24', name: 'Día de la Memoria por la Verdad y la Justicia' },
  { date: '2026-04-02', name: 'Día del Veterano y los Caídos en Malvinas' },
  { date: '2026-04-03', name: 'Viernes Santo' },
  { date: '2026-05-01', name: 'Día del Trabajador' },
  { date: '2026-05-25', name: 'Día de la Revolución de Mayo' },
  { date: '2026-06-20', name: 'Paso a la Inmortalidad de Belgrano' },
  { date: '2026-07-09', name: 'Día de la Independencia' },
  { date: '2026-08-17', name: 'Paso a la Inmortalidad de San Martín' },
  { date: '2026-10-12', name: 'Día del Respeto a la Diversidad Cultural' },
  { date: '2026-11-23', name: 'Día de la Soberanía Nacional', movable: true, originalDate: '2026-11-20' },
  { date: '2026-12-08', name: 'Inmaculada Concepción de María' },
  { date: '2026-12-25', name: 'Navidad' },

  // 2027
  { date: '2027-01-01', name: 'Año Nuevo' },
  { date: '2027-02-08', name: 'Carnaval (lunes)' },
  { date: '2027-02-09', name: 'Carnaval (martes)' },
  { date: '2027-03-24', name: 'Día de la Memoria por la Verdad y la Justicia' },
  { date: '2027-03-26', name: 'Viernes Santo' },
  { date: '2027-04-02', name: 'Día del Veterano y los Caídos en Malvinas' },
  { date: '2027-05-01', name: 'Día del Trabajador' },
  { date: '2027-05-25', name: 'Día de la Revolución de Mayo' },
  { date: '2027-06-20', name: 'Paso a la Inmortalidad de Belgrano' },
  { date: '2027-07-09', name: 'Día de la Independencia' },
  { date: '2027-08-16', name: 'Paso a la Inmortalidad de San Martín', movable: true, originalDate: '2027-08-17' },
  { date: '2027-10-11', name: 'Día del Respeto a la Diversidad Cultural', movable: true, originalDate: '2027-10-12' },
  { date: '2027-11-22', name: 'Día de la Soberanía Nacional', movable: true, originalDate: '2027-11-20' },
  { date: '2027-12-08', name: 'Inmaculada Concepción de María' },
  { date: '2027-12-25', name: 'Navidad' },

  // 2028
  { date: '2028-01-01', name: 'Año Nuevo' },
  { date: '2028-02-28', name: 'Carnaval (lunes)' },
  { date: '2028-02-29', name: 'Carnaval (martes)' },
  { date: '2028-03-24', name: 'Día de la Memoria por la Verdad y la Justicia' },
  { date: '2028-04-02', name: 'Día del Veterano y los Caídos en Malvinas' },
  { date: '2028-04-14', name: 'Viernes Santo' },
  { date: '2028-05-01', name: 'Día del Trabajador' },
  { date: '2028-05-25', name: 'Día de la Revolución de Mayo' },
  { date: '2028-06-20', name: 'Paso a la Inmortalidad de Belgrano' },
  { date: '2028-07-09', name: 'Día de la Independencia' },
  { date: '2028-08-21', name: 'Paso a la Inmortalidad de San Martín', movable: true, originalDate: '2028-08-17' },
  { date: '2028-10-16', name: 'Día del Respeto a la Diversidad Cultural', movable: true, originalDate: '2028-10-12' },
  { date: '2028-11-20', name: 'Día de la Soberanía Nacional' },
  { date: '2028-12-08', name: 'Inmaculada Concepción de María' },
  { date: '2028-12-25', name: 'Navidad' },

  // 2029
  { date: '2029-01-01', name: 'Año Nuevo' },
  { date: '2029-02-12', name: 'Carnaval (lunes)' },
  { date: '2029-02-13', name: 'Carnaval (martes)' },
  { date: '2029-03-24', name: 'Día de la Memoria por la Verdad y la Justicia' },
  { date: '2029-03-30', name: 'Viernes Santo' },
  { date: '2029-04-02', name: 'Día del Veterano y los Caídos en Malvinas' },
  { date: '2029-05-01', name: 'Día del Trabajador' },
  { date: '2029-05-25', name: 'Día de la Revolución de Mayo' },
  { date: '2029-06-20', name: 'Paso a la Inmortalidad de Belgrano' },
  { date: '2029-07-09', name: 'Día de la Independencia' },
  { date: '2029-08-20', name: 'Paso a la Inmortalidad de San Martín', movable: true, originalDate: '2029-08-17' },
  { date: '2029-10-15', name: 'Día del Respeto a la Diversidad Cultural', movable: true, originalDate: '2029-10-12' },
  { date: '2029-11-19', name: 'Día de la Soberanía Nacional', movable: true, originalDate: '2029-11-20' },
  { date: '2029-12-08', name: 'Inmaculada Concepción de María' },
  { date: '2029-12-25', name: 'Navidad' },

  // 2030
  { date: '2030-01-01', name: 'Año Nuevo' },
  { date: '2030-03-04', name: 'Carnaval (lunes)' },
  { date: '2030-03-05', name: 'Carnaval (martes)' },
  { date: '2030-03-24', name: 'Día de la Memoria por la Verdad y la Justicia' },
  { date: '2030-04-02', name: 'Día del Veterano y los Caídos en Malvinas' },
  { date: '2030-04-19', name: 'Viernes Santo' },
  { date: '2030-05-01', name: 'Día del Trabajador' },
  { date: '2030-05-25', name: 'Día de la Revolución de Mayo' },
  { date: '2030-06-20', name: 'Paso a la Inmortalidad de Belgrano' },
  { date: '2030-07-09', name: 'Día de la Independencia' },
  { date: '2030-08-19', name: 'Paso a la Inmortalidad de San Martín', movable: true, originalDate: '2030-08-17' },
  { date: '2030-10-14', name: 'Día del Respeto a la Diversidad Cultural', movable: true, originalDate: '2030-10-12' },
  { date: '2030-11-18', name: 'Día de la Soberanía Nacional', movable: true, originalDate: '2030-11-20' },
  { date: '2030-12-08', name: 'Inmaculada Concepción de María' },
  { date: '2030-12-25', name: 'Navidad' },
];

const HOLIDAY_MAP = new Map<string, Holiday>(HOLIDAYS.map((h) => [h.date, h]));

export function getHoliday(date: string): Holiday | undefined {
  return HOLIDAY_MAP.get(date);
}

export function isHoliday(date: string): boolean {
  return HOLIDAY_MAP.has(date);
}

export function holidaysOfYear(year: number): Holiday[] {
  return HOLIDAYS.filter((h) => h.date.startsWith(String(year)));
}

// Returns 'before' if the day is a Monday and Tuesday is a holiday (suggesting to take Monday off as a bridge).
// Returns 'after' if the day is a Friday and Thursday is a holiday.
// Returns null otherwise. Doesn't suggest taking the holiday itself off.
export function bridgeFor(key: string): 'before' | 'after' | null {
  if (isHoliday(key)) return null;
  const d = fromKey(key);
  const dow = d.day();
  if (dow === 1) {
    const tue = dateKey(d.add(1, 'day'));
    if (isHoliday(tue)) return 'before';
  }
  if (dow === 5) {
    const thu = dateKey(d.subtract(1, 'day'));
    if (isHoliday(thu)) return 'after';
  }
  return null;
}
