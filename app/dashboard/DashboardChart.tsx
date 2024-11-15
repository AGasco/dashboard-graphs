import { ChartWrapper } from '@/components';
import { CHART_BAR, CHART_DOUGHNUT, CHART_LINE } from '@/consts';
import { useIncidentStats } from '@/hooks';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import useDashboardCharts from './useDashboardCharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const { stats, error, isLoading } = useIncidentStats();
  const { incidentsByTypeData, incidentsByDateData, incidentsByStatusData } =
    useDashboardCharts(stats);

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart: {error.message}</div>;
  if (!stats) return null;

  return (
    <div className="flex items-center">
      <ChartWrapper
        title="Incidents by Type"
        type={CHART_BAR}
        data={incidentsByTypeData}
      />
      <ChartWrapper
        title="Incidents Over Time"
        type={CHART_LINE}
        data={incidentsByDateData}
      />
      <ChartWrapper
        title="Incidents by Status"
        type={CHART_DOUGHNUT}
        data={incidentsByStatusData}
      />
    </div>
  );
};

export default DashboardChart;
