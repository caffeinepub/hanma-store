export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface BusinessHours {
  [key: string]: string;
}

export const weeklySchedule: BusinessHours = {
  'Friday': '12 pm–12 am',
  'Saturday': '12 pm–12 am',
  'Sunday': '12 pm–12 am',
  'Monday': '1 pm–12 am',
  'Tuesday': '1 pm–12 am',
  'Wednesday': '1 pm–12 am',
  'Thursday': '1 pm–12 am',
};

export function getTodayHours(): string {
  const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return weeklySchedule[today] || '1 pm–12 am';
}

export function getFormattedSchedule(): Array<{ day: string; hours: string }> {
  const orderedDays: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return orderedDays.map(day => ({
    day,
    hours: weeklySchedule[day],
  }));
}

export function isOpenNow(): boolean {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay();
  
  // Friday (5), Saturday (6), Sunday (0): 12 pm–12 am (noon to midnight)
  if (currentDay === 5 || currentDay === 6 || currentDay === 0) {
    return currentHour >= 12 || currentHour < 0; // 12pm onwards
  }
  
  // Monday-Thursday: 1 pm–12 am
  return currentHour >= 13 || currentHour < 0; // 1pm onwards
}

export function getStatusText(): string {
  return isOpenNow() ? 'Open now' : 'Closed';
}
