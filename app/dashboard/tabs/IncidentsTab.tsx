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

  const { data, error, isLoading } = useFetchData<NextResponse>(
    `/data?${queryString}`
  );

  if (error) return <div className="text-red-500">{error.message}</div>;

  const incidents = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/3 px-3">
          <Card className="h-full">
            <DashboardFilters
              inputData={inputData}
              handleChange={handleChange}
            />
          </Card>
        </div>

        <div className="w-full md:w-2/3 px-3">
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
    </div>
  );
};

export default IncidentsTab;
