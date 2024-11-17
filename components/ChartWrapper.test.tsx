import { render, screen } from '@testing-library/react';
import ChartWrapper from './ChartWrapper';
import { CHART_BAR, CHART_LINE, CHART_DOUGHNUT } from '@/consts';

jest.mock('react-chartjs-2', () => ({
  Bar: (props: any) => <div data-testid="mock-bar-chart">Bar Chart</div>,
  Line: (props: any) => <div data-testid="mock-line-chart">Line Chart</div>,
  Doughnut: (props: any) => (
    <div data-testid="mock-doughnut-chart">Doughnut Chart</div>
  )
}));

describe('ChartWrapper', () => {
  test('renders Bar chart when type is CHART_BAR', () => {
    const mockData = {
      labels: ['Type A', 'Type B'],
      datasets: [
        {
          label: 'Incidents by Type',
          data: [10, 20],
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    };
    render(
      <ChartWrapper title="Test Bar Chart" type={CHART_BAR} data={mockData} />
    );
    expect(screen.getByTestId('mock-bar-chart')).toBeInTheDocument();
    expect(screen.getByText('Test Bar Chart')).toBeInTheDocument();
  });

  test('renders Line chart when type is CHART_LINE', () => {
    const mockData = {
      labels: ['Jan', 'Feb'],
      datasets: [
        {
          label: 'Incidents Over Time',
          data: [5, 15],
          fill: false,
          borderColor: 'rgba(75,192,192,1)'
        }
      ]
    };
    render(
      <ChartWrapper title="Test Line Chart" type={CHART_LINE} data={mockData} />
    );
    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument();
    expect(screen.getByText('Test Line Chart')).toBeInTheDocument();
  });

  test('renders Doughnut chart when type is CHART_DOUGHNUT', () => {
    const mockData = {
      labels: ['Open', 'Closed'],
      datasets: [
        {
          label: 'Incidents by Status',
          data: [10, 15],
          backgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    };
    render(
      <ChartWrapper
        title="Test Doughnut Chart"
        type={CHART_DOUGHNUT}
        data={mockData}
      />
    );
    expect(screen.getByTestId('mock-doughnut-chart')).toBeInTheDocument();
    expect(screen.getByText('Test Doughnut Chart')).toBeInTheDocument();
  });

  test('does not render chart if type is invalid', () => {
    const mockData = {};
    render(
      <ChartWrapper
        title="Invalid Chart"
        type={'invalidType' as any}
        data={mockData as any}
      />
    );
    expect(screen.queryByTestId(/mock-.*-chart/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Invalid Chart')).not.toBeInTheDocument();
  });
});
