'use client';
import { Card } from '@/components';
import { useTheme } from '@/contexts';
import { useFetchData } from '@/hooks';
import { NextResponse } from '@/types';
import { PulseLoader } from 'react-spinners';
import DashboardFilters from '../DashboardFilters';
import IncidentsList from '../IncidentsList';
import useDashboardFilters from '../useDashboardFilters';

const IncidentsTab = () => {
  const { theme } = useTheme();
  const { inputData, queryString, page, setPage, handleChange } =
    useDashboardFilters();

  const { data, error, isLoading } = useFetchData<NextResponse>(
    `/data?${queryString}`
  );

  if (error) return <div className="text-red-500">{error.message}</div>;

  const incidents = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="space-y-6 px-12">
      <div className="flex">
        <div className="w-full md:w-1/3 px-3 flex flex-1">
          <Card className="flex-1">
            <DashboardFilters
              inputData={inputData}
              handleChange={handleChange}
            />
          </Card>
        </div>

        <div className="w-full md:w-2/3 px-3 flex">
          <Card className="flex-1">
            {!isLoading ? (
              <IncidentsList
                incidents={incidents}
                incidentsPage={page}
                totalIncidents={total}
                onPageChange={(page) => setPage(page)}
              />
            ) : (
              <div className="flex justify-center items-center h-full w-full">
                <PulseLoader color={theme === 'dark' ? '#f7fafc' : '#3b82f6'} />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentsTab;
