/**
 * Utility for generating and downloading RFC 5545 iCalendar (.ics) files
 */

export interface CalendarEventData {
  title: string;
  description: string;
  venue: string;
  startDate: string; // ISO string
  durationHours?: number;
}

export function generateIcsFile(event: CalendarEventData): void {
  const start = new Date(event.startDate);
  const end = new Date(start.getTime() + (event.durationHours || 2) * 60 * 60 * 1000);

  const formatIcsDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NTU Cyber Security Society//Events Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:ntu-css-${Date.now()}@ntu.edu.pk`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${event.title.replace(/[,;]/g, '\\$&')}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n').replace(/[,;]/g, '\\$&')}`,
    `LOCATION:${event.venue.replace(/[,;]/g, '\\$&')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
