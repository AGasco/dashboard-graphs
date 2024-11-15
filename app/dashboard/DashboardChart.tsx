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

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart: {error.message}</div>;
  if (!stats) return null;

  const incidentsByTypeData = {
    labels: Object.keys(stats.incidentsByType),
    datasets: [
      {
        label: 'Incidents by Type',
        data: Object.values(stats.incidentsByType),
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  };

  const incidentsByDateLabels = Object.keys(stats.incidentsByDate).sort();
  const incidentsByDateData = {
    labels: incidentsByDateLabels,
    datasets: [
      {
        label: 'Incidents Over Time',
        data: incidentsByDateLabels.map((date) => stats.incidentsByDate[date]),
        fill: false,
        borderColor: 'rgba(75,192,192,1)'
      }
    ]
  };

  const incidentsByStatusData = {
    labels: Object.keys(stats.incidentsByStatus),
    datasets: [
      {
        label: 'Incidents by Status',
        data: Object.values(stats.incidentsByStatus),
        backgroundColor: [
          '#FF6384', // Open
          '#36A2EB', // In Progress
          '#FFCE56', // Resolved
          '#4BC0C0' // Closed
        ]
      }
    ]
  };

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
        title="Incidents by Type"
        type={CHART_DOUGHNUT}
        data={incidentsByStatusData}
      />
    </div>
  );
};

export default DashboardChart;
