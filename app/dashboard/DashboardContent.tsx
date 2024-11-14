'use client';
import { Button, Input, Pagination, Select } from '@/components';
import { IncidentType, Location, NextResponse, Status } from '@/types';
import { enumToOptions, formatDate } from '@/utils';
import useFetchData from 'hooks/useFetchData';
import { ChangeEvent, useMemo, useState } from 'react';
import { PulseLoader } from 'react-spinners';

const initialState = {
  query: '',
  status: '',
  incidentType: '',
  location: '',
  dateReportedFrom: '',
  dateReportedTo: '',
  resolutionDateFrom: '',
  resolutionDateTo: ''
};

const DashboardContent = () => {
  const [inputData, setInputData] = useState(initialState);
  const [page, setPage] = useState(1);

  // TODO Extract this complex logic to a hook
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    params.append('page', page.toString());
    params.append('limit', '20');

    if (inputData.query.trim() !== '')
      params.append('query', inputData.query.trim());
    if (inputData.status) params.append('status', inputData.status);
    if (inputData.incidentType)
      params.append('incident_type', inputData.incidentType);
    if (inputData.location) params.append('location', inputData.location);
    if (inputData.dateReportedFrom)
      params.append('date_reported_from', inputData.dateReportedFrom);
    if (inputData.dateReportedTo)
      params.append('date_reported_to', inputData.dateReportedTo);
    if (inputData.resolutionDateFrom)
      params.append('resolution_date_from', inputData.resolutionDateFrom);
    if (inputData.resolutionDateTo)
      params.append('resolution_date_to', inputData.resolutionDateTo);

    return params.toString();
  }, [page, inputData]);

  const { data, error, isLoading } = useFetchData<NextResponse>(
    `/data?${queryString}`
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  if (isLoading) return <PulseLoader />; // TODO Change color based on theme
  if (error) return <div className="text-red-500">{error.message}</div>;

  const incidents = data?.data || [];
  const total = data?.total || 0;

  return (
    <div>
      {/* Search and Filter Controls */}
      {/* TODO: Make form a separate component */}
      <div className="mb-4 space-y-2">
        <Input
          type="text"
          name="query"
          value={inputData.query}
          placeholder="Search..."
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />

        {/* Status Filter */}
        <Select
          name="status"
          options={enumToOptions(Status)}
          defaultOptionLabel={'All Statuses'}
          value={inputData.status}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />

        {/* Incident Type Filter */}
        <Select
          name="incidentType"
          options={enumToOptions(IncidentType)}
          defaultOptionLabel={'All Incident Types'}
          value={inputData.incidentType}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />

        {/* Location Filter */}
        <Select
          name="location"
          options={enumToOptions(Location)}
          defaultOptionLabel={'All locations'}
          value={inputData.location}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />

        {/* Date Reported Range Filter */}
        <div className="flex space-x-2">
          <Input
            type="date"
            name="dateReportedFrom"
            label="Date Reported From"
            value={inputData.dateReportedFrom}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <Input
            type="date"
            name="dateReportedTo"
            label="Date Reported To"
            value={inputData.dateReportedTo}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Resolution Date Range Filter */}
        <div className="flex space-x-2">
          <Input
            type="date"
            name="resolutionDateFrom"
            label="Resolution Date From"
            value={inputData.resolutionDateFrom}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
          <Input
            type="date"
            name="resolutionDateTo"
            label="Resolution Date To"
            value={inputData.resolutionDateTo}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>

        {/* Apply Filters Button */}
        <Button
          onClick={() => setPage(1)}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Apply Filters
        </Button>
      </div>
      {/* TODO: Make list a separate component */}
      {incidents.length && (
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Assigned To</th>
              <th className="p-2 border">Date Reported</th>
              <th className="p-2 border">Resolution Date</th>
              <th className="p-2 border">Cost</th>
            </tr>
          </thead>
          <tbody>
            {incidents?.map((incident) => (
              <tr key={incident.id}>
                <td className="p-2 border">{incident.id}</td>
                <td className="p-2 border">{incident.location}</td>
                <td className="p-2 border">{incident.incident_type}</td>
                <td className="p-2 border">{incident.status}</td>
                <td className="p-2 border">{incident.assigned_to}</td>
                <td className="p-2 border">
                  {formatDate(incident.date_reported)}
                </td>
                <td className="p-2 border">
                  {formatDate(incident.resolution_date)}
                </td>
                <td className="p-2 border">€{incident.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={page}
        totalItems={total}
        itemsPerPage={20}
        onPageChange={(newPage: number) => setPage(newPage)}
      />
    </div>
  );
};

export default DashboardContent;
