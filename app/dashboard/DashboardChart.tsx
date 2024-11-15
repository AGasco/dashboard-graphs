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
import { Bar, Line, Doughnut } from 'react-chartjs-2';

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
      <div className="mb-5 w-1/3 px-3">
        <h2 className="text-xl font-bold mb-4">Incidents By Type</h2>
        <Bar data={incidentsByTypeData} />
      </div>
      <div className="mb-5  w-1/3 px-3">
        <h2 className="text-xl font-bold mb-4">Incidents Over Time</h2>
        <Line data={incidentsByDateData} />
      </div>
      <div className="mb-5  w-1/3 px-3">
        <h2 className="text-xl font-bold mb-4">Incidents By Status</h2>
        <Doughnut data={incidentsByStatusData} />
      </div>
    </div>
  );
};

export default DashboardChart;
