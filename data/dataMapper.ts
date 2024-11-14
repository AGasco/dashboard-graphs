import { records } from '@/data';
import { Incident, IncidentType, Location, Status } from '@/types';

let cachedIncidents: Incident[] | null = null;

const parseDate = (dateString: string): Date | null => {
  const [day, month, year] = dateString.split('/').map(Number);
  return !isNaN(day) && !isNaN(month) && !isNaN(year)
    ? new Date(year, month - 1, day)
    : null;
};

export const getMappedIncidents = (): Incident[] => {
  if (cachedIncidents) return cachedIncidents;

  const mappedIncidents = records.map(
    (record) =>
      ({
        ...record,
        location: record.location as Location,
        incident_type: record.incident_type as IncidentType,
        status: record.status as Status,
        date_reported: parseDate(record.date_reported),
        resolution_date: record.resolution_date
          ? parseDate(record.resolution_date)
          : undefined
      } as Incident)
  );

  cachedIncidents = mappedIncidents;

  return cachedIncidents;
};
