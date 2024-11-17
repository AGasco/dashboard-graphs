import { render, screen, fireEvent } from '@testing-library/react';
import DashboardContent from './DashboardContent';
import { useTheme } from '@/contexts';

jest.mock('@/contexts', () => ({
  useTheme: jest.fn()
}));

jest.mock('./tabs/OverviewTab', () => ({
  __esModule: true,
  default: () => <div data-testid="overview-tab">Overview Content</div>
}));

jest.mock('./tabs/IncidentsTab', () => ({
  __esModule: true,
  default: () => <div data-testid="incidents-tab">Incidents Content</div>
}));

describe('DashboardContent', () => {
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Overview and Incidents tabs', () => {
    render(<DashboardContent />);
    expect(
      screen.getByRole('button', { name: /Overview/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Incidents/i })
    ).toBeInTheDocument();
  });

  test('renders Overview tab content by default', () => {
    render(<DashboardContent />);
    expect(screen.getByTestId('overview-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('incidents-tab')).not.toBeInTheDocument();
  });

  test('renders Incidents tab content when clicked', () => {
    render(<DashboardContent />);
    const incidentsTabButton = screen.getByRole('button', {
      name: /Incidents/i
    });
    fireEvent.click(incidentsTabButton);
    expect(screen.getByTestId('incidents-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('overview-tab')).not.toBeInTheDocument();
  });

  test('switches back to Overview tab when clicked again', () => {
    render(<DashboardContent />);
    const incidentsTabButton = screen.getByRole('button', {
      name: /Incidents/i
    });
    fireEvent.click(incidentsTabButton);
    expect(screen.getByTestId('incidents-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('overview-tab')).not.toBeInTheDocument();

    const overviewTabButton = screen.getByRole('button', { name: /Overview/i });
    fireEvent.click(overviewTabButton);
    expect(screen.getByTestId('overview-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('incidents-tab')).not.toBeInTheDocument();
  });
});
