import { Incident, IncidentType, Location, Status } from '@/types';
import { formatDate } from '@/utils';
import { fireEvent, render, screen } from '@testing-library/react';
import IncidentsList from './IncidentsList';

// Mock Pagination component
jest.mock('@/components/Pagination', () => ({
  __esModule: true,
  default: ({ currentPage, totalItems, itemsPerPage, onPageChange }: any) => (
    <div data-testid="mock-pagination">
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
    </div>
  )
}));

// Mock formatDate utility
jest.mock('@/utils', () => ({
  formatDate: jest.fn()
}));

const mockFormatDate = formatDate as jest.Mock;

describe('IncidentsList', () => {
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

  beforeEach(() => {
    // Mock formatDate to return formatted strings
    mockFormatDate.mockImplementation((date: Date | null) =>
      date ? date.toISOString().split('T')[0] : 'N/A'
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders table headers correctly', () => {
    render(
      <IncidentsList
        incidents={mockIncidents}
        incidentsPage={1}
        totalIncidents={2}
        onPageChange={jest.fn()}
      />
    );

    const headers = [
      'ID',
      'Location',
      'Type',
      'Status',
      'Assigned To',
      'Date Reported',
      'Resolution Date',
      'Cost'
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders incidents data correctly', () => {
    render(
      <IncidentsList
        incidents={mockIncidents}
        incidentsPage={1}
        totalIncidents={2}
        onPageChange={jest.fn()}
      />
    );

    mockIncidents.forEach((incident) => {
      expect(screen.getByText(incident.id.toString())).toBeInTheDocument();
      expect(screen.getByText(incident.location)).toBeInTheDocument();
      expect(screen.getByText(incident.incident_type)).toBeInTheDocument();
      expect(screen.getByText(incident.status)).toBeInTheDocument();
      expect(screen.getByText(incident.assigned_to)).toBeInTheDocument();
      expect(
        screen.getByText(mockFormatDate(incident.date_reported))
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockFormatDate(incident.resolution_date))
      ).toBeInTheDocument();
      expect(screen.getByText(`€${incident.cost}`)).toBeInTheDocument();
    });
  });

  test('calls onPageChange when pagination button is clicked', () => {
    const mockOnPageChange = jest.fn();
    render(
      <IncidentsList
        incidents={mockIncidents}
        incidentsPage={1}
        totalIncidents={2}
        onPageChange={mockOnPageChange}
      />
    );

    const nextPageButton = screen.getByText('Next Page');
    fireEvent.click(nextPageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('displays "No records found." when incidents list is empty', () => {
    render(
      <IncidentsList
        incidents={[]}
        incidentsPage={1}
        totalIncidents={0}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByText('No records found.')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-incidents-list')).not.toBeInTheDocument();
  });

  test('renders pagination when there are incidents', () => {
    render(
      <IncidentsList
        incidents={mockIncidents}
        incidentsPage={1}
        totalIncidents={2}
        onPageChange={jest.fn()}
      />
    );

    expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
  });
});
