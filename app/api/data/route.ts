import { PAGINATION_LIMIT } from '@/consts';
import { getMappedIncidents } from '@/data';
import { Incident } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // TODO Implement constants for these strings
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || PAGINATION_LIMIT);

  if (isNaN(page) || isNaN(limit)) {
    return NextResponse.json(
      { error: 'Invalid page or limit parameter' },
      { status: 400 }
    );
  }

  const query = searchParams.get('query')?.toLowerCase() || '';
  const statusParam = searchParams.get('status') || '';
  const incidentTypeParam = searchParams.get('incident_type') || '';
  const locationParam = searchParams.get('location') || '';

  const dateReportedFromParam = searchParams.get('date_reported_from');
  const dateReportedToParam = searchParams.get('date_reported_to');
  const resolutionDateFromParam = searchParams.get('resolution_date_from');
  const resolutionDateToParam = searchParams.get('resolution_date_to');

  const dateReportedFrom = dateReportedFromParam
    ? new Date(dateReportedFromParam)
    : null;
  const dateReportedTo = dateReportedToParam
    ? new Date(dateReportedToParam)
    : null;
  const resolutionDateFrom = resolutionDateFromParam
    ? new Date(resolutionDateFromParam)
    : null;
  const resolutionDateTo = resolutionDateToParam
    ? new Date(resolutionDateToParam)
    : null;

  const incidents = getMappedIncidents();

  let filteredIncidents = incidents;

  if (query) {
    filteredIncidents = filteredIncidents.filter(
      (incident) =>
        incident.reported_by.toLowerCase().includes(query) ||
        incident.assigned_to.toLowerCase().includes(query) ||
        incident.location.toLowerCase().includes(query)
    );
  }

  if (statusParam) {
    filteredIncidents = filteredIncidents.filter(
      (incident) => incident.status === (statusParam as Incident['status'])
    );
  }

  if (incidentTypeParam) {
    filteredIncidents = filteredIncidents.filter(
      (incident) =>
        incident.incident_type ===
        (incidentTypeParam as Incident['incident_type'])
    );
  }

  if (locationParam) {
    filteredIncidents = filteredIncidents.filter(
      (incident) =>
        incident.location === (locationParam as Incident['location'])
    );
  }

  if (dateReportedFrom || dateReportedTo) {
    filteredIncidents = filteredIncidents.filter((incident) => {
      const incidentDate = incident.date_reported;
      let include = true;

      if (dateReportedFrom && incidentDate < dateReportedFrom) {
        include = false;
      }

      if (dateReportedTo && incidentDate > dateReportedTo) {
        include = false;
      }

      return include;
    });
  }

  if (resolutionDateFrom || resolutionDateTo) {
    filteredIncidents = filteredIncidents.filter((incident) => {
      const incidentDate = incident.resolution_date;
      if (!incidentDate) {
        return false;
      }

      let include = true;

      if (resolutionDateFrom && incidentDate < resolutionDateFrom) {
        include = false;
      }

      if (resolutionDateTo && incidentDate > resolutionDateTo) {
        include = false;
      }

      return include;
    });
  }

  const startIndex = (page - 1) * limit;
  const paginatedData = filteredIncidents.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    page,
    limit,
    total: filteredIncidents.length,
    data: paginatedData
  });
}
