import { IncidentChartStats } from '@/types';
import { useMemo } from 'react';

const emptyObject = { labels: [], datasets: [] };

const useDashboardCharts = (stats: IncidentChartStats | null) => {
  const incidentsByTypeData = useMemo(() => {
    if (!stats?.incidentsByType) return emptyObject;

    const dataValues = Object.values(stats.incidentsByType).filter(
      (value): value is number => value !== null && typeof value === 'number'
    );

    return {
      labels: Object.keys(stats.incidentsByType),
      datasets: [
        {
          label: 'Incidents by Type',
          data: dataValues,
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    };
  }, [stats?.incidentsByType]);

  const incidentsByDateData = useMemo(() => {
    if (!stats?.incidentsByDate) return emptyObject;

    const incidentsByDateLabels = Object.keys(stats.incidentsByDate).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return {
      labels: incidentsByDateLabels,
      datasets: [
        {
          label: 'Incidents Over Time',
          data: incidentsByDateLabels.map(
            (date) => stats.incidentsByDate[date]
          ),
          fill: false,
          borderColor: 'rgba(75,192,192,1)'
        }
      ]
    };
  }, [stats?.incidentsByDate]);

  const incidentsByStatusData = useMemo(() => {
    if (!stats?.incidentsByStatus) return emptyObject;

    const dataValues = Object.values(stats.incidentsByStatus).filter(
      (value): value is number => value !== null && typeof value === 'number'
    );

    return {
      labels: Object.keys(stats.incidentsByStatus),
      datasets: [
        {
          label: 'Incidents by Status',
          data: dataValues,
          backgroundColor: [
            '#FF6384', // Open
            '#36A2EB', // In Progress
            '#FFCE56', // Resolved
            '#4BC0C0' // Closed
          ]
        }
      ]
    };
  }, [stats?.incidentsByStatus]);

  const incidentsByCostData = useMemo(() => {
    if (!stats?.incidentsByCost) return emptyObject;

    const labels = Object.keys(stats.incidentsByCost);
    const dataValues = labels.map((key) => stats.incidentsByCost[key]);

    return {
      labels,
      datasets: [
        {
          label: 'Total Cost by Incident Type',
          data: dataValues,
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    };
  }, [stats?.incidentsByCost]);

  return {
    incidentsByTypeData,
    incidentsByDateData,
    incidentsByStatusData,
    incidentsByCostData
  };
};

export default useDashboardCharts;
