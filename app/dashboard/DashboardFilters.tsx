import { Input, Select } from '@/components';
import { IncidentFilters, IncidentType, Location, Status } from '@/types';
import { ChangeEvent } from 'react';
import { enumToOptions } from 'utils/utils';

interface Props {
  inputData: IncidentFilters;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const DashboardFilters = ({ inputData, handleChange }: Props) => {
  return (
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
    </div>
  );
};

export default DashboardFilters;
