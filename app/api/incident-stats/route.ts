import { getMappedIncidents } from '@/data';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function GET() {
  const incidents = getMappedIncidents();

  const incidentsByType: { [key: string]: number } = {};
  const incidentsByDate: { [key: string]: number } = {};
  const incidentsByStatus: { [key: string]: number } = {};
  const incidentsByCost: { [key: string]: number } = {};

  incidents.forEach(({ incident_type, date_reported, status, cost }) => {
    incidentsByType[incident_type] = (incidentsByType[incident_type] || 0) + 1;

    const month = format(date_reported, 'yyyy-MM');
    incidentsByDate[month] = (incidentsByDate[month] || 0) + 1;

    incidentsByStatus[status] = (incidentsByStatus[status] || 0) + 1;

    incidentsByCost[incident_type] =
      (incidentsByCost[incident_type] || 0) + (cost || 0);
  });

  return NextResponse.json({
    incidentsByType,
    incidentsByDate,
    incidentsByStatus,
    incidentsByCost
  });
}
