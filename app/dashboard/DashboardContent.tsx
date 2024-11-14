'use client';
import { Pagination } from '@/components';
import { NextResponse } from '@/types';
import useFetchData from 'hooks/useFetchData';
import { PulseLoader } from 'react-spinners';
import DashboardFilters from './DashboardFilters';
import IncidentsList from './IncidentsList';
import useDashboardFilters from './useDashboardFilters';

const DashboardContent = () => {
  const { inputData, queryString, page, setPage, handleChange } =
    useDashboardFilters();

  const { data, error, isLoading } = useFetchData<NextResponse>(
    `/data?${queryString}`
  );

  if (error) return <div className="text-red-500">{error.message}</div>;

  const incidents = data?.data || [];
  const total = data?.total || 0;

  return (
    <div>
      <DashboardFilters inputData={inputData} handleChange={handleChange} />

      {!isLoading ? (
        <IncidentsList incidents={incidents} />
      ) : (
        <PulseLoader className="text-center" />
      )}

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
