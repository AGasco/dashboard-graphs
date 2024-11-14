import { Incident, Location, IncidentType, Status } from '@/types';
import { records } from '@/data';

let cachedIncidents: Incident[] | null = null;

export const getMappedIncidents = (): Incident[] => {
  if (cachedIncidents) return cachedIncidents;

  const mappedIncidents = records.map((record) => ({
    ...record,
    location: record.location as Location,
    incident_type: record.incident_type as IncidentType,
    status: record.status as Status,
    date_reported: new Date(record.date_reported),
    resolution_date: record.resolution_date
      ? new Date(record.resolution_date)
      : undefined
  }));

  cachedIncidents = mappedIncidents;

  return cachedIncidents;
};
