'use client';
import { Card } from '@/components';
import { NextResponse } from '@/types';
import useFetchData from 'hooks/useFetchData';
import { PulseLoader } from 'react-spinners';
import DashboardChart from './DashboardChart';
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
    <div className="space-y-6">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3">
          <Card className="h-full">
            <DashboardFilters
              inputData={inputData}
              handleChange={handleChange}
            />
          </Card>
        </div>
        <div className="w-full md:w-1/2 px-3 mt-6 md:mt-0">
          <Card className="h-full">
            <DashboardChart />
          </Card>
        </div>
      </div>

      <div>
        <Card>
          {!isLoading ? (
            <IncidentsList
              incidents={incidents}
              incidentsPage={page}
              totalIncidents={total}
              onPageChange={(page) => setPage(page)}
            />
          ) : (
            <PulseLoader className="text-center" />
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
