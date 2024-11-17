'use client';
import { Card } from '@/components';
import { useFetchData } from '@/hooks';
import { NextResponse } from '@/types';
import { PulseLoader } from 'react-spinners';
import DashboardFilters from '../DashboardFilters';
import IncidentsList from '../IncidentsList';
import useDashboardFilters from '../useDashboardFilters';

const IncidentsTab = () => {
  const { inputData, queryString, page, setPage, handleChange } =
    useDashboardFilters();

  // TODO This is not a NextResponse. Change to a better naming
  const { data, error, isLoading } = useFetchData<NextResponse>(
    `/data?${queryString}`
  );

  if (error) return <div className="text-red-500">{error.message}</div>;

  const incidents = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="space-y-6 px-2 3xl:max-w-3xl m-auto">
      <div className="flex">
        <div className="w-full h-full md:w-1/3 px-3">
          <Card className="min-h-[570px] flex-1">
            <DashboardFilters
              inputData={inputData}
              handleChange={handleChange}
            />
          </Card>
        </div>

        <div className="w-full h-full md:w-2/3 px-3">
          <Card className="min-h-[570px]">
            {!isLoading ? (
              <IncidentsList
                incidents={incidents}
                incidentsPage={page}
                totalIncidents={total}
                onPageChange={(page) => setPage(page)}
              />
            ) : (
              <PulseLoader
                className="flex-1 justify-center items-center h-full w-full mb-7"
                color="var(--primary)"
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentsTab;
