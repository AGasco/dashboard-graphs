import { render, screen } from '@testing-library/react';
import OverviewTab from './OverviewTab';
import {
  CHART_BY_TYPE,
  CHART_BY_DATE,
  CHART_BY_COST,
  CHART_BY_STATUS
} from '@/consts';

jest.mock('../DashboardChart', () => ({
  __esModule: true,
  default: ({ chartType }: { chartType: string }) => (
    <div data-testid={`dashboard-chart-${chartType}`}>{chartType} Chart</div>
  )
}));

describe('OverviewTab', () => {
  test('renders four DashboardChart components with correct chart types', () => {
    render(<OverviewTab />);

    expect(
      screen.getByTestId(`dashboard-chart-${CHART_BY_TYPE}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`dashboard-chart-${CHART_BY_DATE}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`dashboard-chart-${CHART_BY_COST}`)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`dashboard-chart-${CHART_BY_STATUS}`)
    ).toBeInTheDocument();

    expect(screen.getByText(`${CHART_BY_TYPE} Chart`)).toBeInTheDocument();
    expect(screen.getByText(`${CHART_BY_DATE} Chart`)).toBeInTheDocument();
    expect(screen.getByText(`${CHART_BY_COST} Chart`)).toBeInTheDocument();
    expect(screen.getByText(`${CHART_BY_STATUS} Chart`)).toBeInTheDocument();
  });

  test('renders the correct number of DashboardChart components', () => {
    render(<OverviewTab />);
    const charts = screen.getAllByTestId(/dashboard-chart-/i);
    expect(charts).toHaveLength(4);
  });

  test('applies correct card class names to each Chart', () => {
    const { container } = render(<OverviewTab />);
    const cards = container.querySelectorAll(
      'div[data-testid^="dashboard-chart-"]'
    );
    cards.forEach((card) => {
      expect(card.parentElement).toHaveClass(
        'min-h-[280px]',
        'max-w-full',
        '2xl:min-w-[650px]',
        'pb-5'
      );
    });
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<OverviewTab />);
    expect(asFragment()).toMatchSnapshot();
  });
});
