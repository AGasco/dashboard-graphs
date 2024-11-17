import { useFetchData } from '@/hooks';
import {
  Incident,
  IncidentType,
  Location,
  NextResponse,
  Status
} from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import useDashboardFilters from '../useDashboardFilters';
import IncidentsTab from './IncidentsTab';

jest.mock('../../../components/ui/Card', () => ({
  __esModule: true,
  default: ({ children, className }: any) => (
    <div data-testid="mock-card" className={className}>
      {children}
    </div>
  )
}));

jest.mock('../DashboardFilters', () => ({
  __esModule: true,
  default: ({ inputData, handleChange }: any) => (
    <div data-testid="mock-dashboard-filters">
      <button
        onClick={() =>
          handleChange({ target: { name: 'query', value: 'test' } })
        }
      >
        Change Query
      </button>
    </div>
  )
}));

jest.mock('../IncidentsList', () => ({
  __esModule: true,
  default: ({
    incidents,
    incidentsPage,
    totalIncidents,
    onPageChange
  }: any) => (
    <div data-testid="mock-incidents-list">
      {incidents.map((incident: Incident) => (
        <div key={incident.id}>{incident.description}</div>
      ))}
      <button onClick={() => onPageChange(incidentsPage + 1)}>Next Page</button>
    </div>
  )
}));

jest.mock('@/hooks/useFetchData');

const mockUseFetchData = useFetchData as jest.Mock;

jest.mock('../useDashboardFilters');

const mockUseDashboardFilters = useDashboardFilters as jest.Mock;

describe('IncidentsTab', () => {
  const mockSetPage = jest.fn();
  const mockHandleChange = jest.fn();

  const mockInputData = {
    query: '',
    status: '',
    incidentType: '',
    location: '',
    dateReportedFrom: '',
    dateReportedTo: '',
    resolutionDateFrom: '',
    resolutionDateTo: '',
    minCost: 0,
    maxCost: 0
  };

  const mockIncidents: Incident[] = [
    {
      id: 1,
      location: Location.PlantA,
      incident_type: IncidentType.EquipmentFailure,
      description: 'Equipment malfunctioned',
      status: Status.Open,
      assigned_to: 'John Doe',
      date_reported: new Date('2023-01-01'),
      resolution_date: null,
      reported_by: 'Jane Smith',
      cost: 1000
    },
    {
      id: 2,
      location: Location.WarehouseB,
      incident_type: IncidentType.HumanError,
      description: 'Incorrect data entry',
      status: Status.Resolved,
      assigned_to: 'Alice Johnson',
      date_reported: new Date('2023-02-15'),
      resolution_date: new Date('2023-02-20'),
      reported_by: 'Bob Brown',
      cost: 500
    }
  ];

  const mockData: NextResponse = {
    data: mockIncidents,
    total: 2,
    page: 1,
    limit: '10'
  };

  beforeEach(() => {
    mockUseDashboardFilters.mockReturnValue({
      inputData: mockInputData,
      queryString: '',
      page: 1,
      setPage: mockSetPage,
      handleChange: mockHandleChange
    });

    mockUseFetchData.mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false
    });

    jest.clearAllMocks();
  });

  test('renders DashboardFilters and IncidentsList inside Card components', () => {
    render(<IncidentsTab />);

    const cards = screen.getAllByTestId('mock-card');
    expect(cards).toHaveLength(2);

    expect(screen.getByTestId('mock-dashboard-filters')).toBeInTheDocument();

    expect(screen.getByTestId('mock-incidents-list')).toBeInTheDocument();
  });

  test('displays loading spinner when data is loading', () => {
    mockUseFetchData.mockReturnValueOnce({
      data: null,
      error: null,
      isLoading: true
    });

    render(<IncidentsTab />);

    const loader = screen.getByTestId('spinner');
    expect(loader).toBeInTheDocument();
  });

  test('displays error message when data fetching fails', () => {
    mockUseFetchData.mockReturnValueOnce({
      data: null,
      error: new Error('Failed to fetch data'),
      isLoading: false
    });

    render(<IncidentsTab />);

    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });

  test('renders incidents list correctly when data is fetched', () => {
    render(<IncidentsTab />);

    mockIncidents.forEach((incident) => {
      expect(screen.getByText(incident.description)).toBeInTheDocument();
    });

    const nextPageButton = screen.getByText('Next Page');
    expect(nextPageButton).toBeInTheDocument();
  });

  test('handles filter changes correctly', () => {
    render(<IncidentsTab />);

    const changeQueryButton = screen.getByText('Change Query');
    fireEvent.click(changeQueryButton);

    expect(mockHandleChange).toHaveBeenCalledWith({
      target: { name: 'query', value: 'test' }
    });
  });

  test('handles pagination correctly', () => {
    render(<IncidentsTab />);

    const nextPageButton = screen.getByText('Next Page');
    fireEvent.click(nextPageButton);

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
