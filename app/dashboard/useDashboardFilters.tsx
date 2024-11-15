import { PAGINATION_LIMIT } from '@/consts';
import { useDebounce } from '@/hooks';
import { IncidentFilters } from '@/types';
import { ChangeEvent, useMemo, useState } from 'react';

const initialState: IncidentFilters = {
  query: '',
  status: '',
  incidentType: '',
  location: '',
  dateReportedFrom: '',
  dateReportedTo: '',
  resolutionDateFrom: '',
  resolutionDateTo: ''
};

const useDashboardFilters = () => {
  const [inputData, setInputData] = useState<IncidentFilters>(initialState);
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(inputData.query);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value
    }));
    setPage(1);
  };

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    params.append('page', page.toString());
    params.append('limit', PAGINATION_LIMIT);

    if (debouncedQuery.trim() !== '')
      params.append('query', debouncedQuery.trim());
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
  }, [page, inputData, debouncedQuery]);

  return { inputData, queryString, page, setPage, handleChange };
};

export default useDashboardFilters;
