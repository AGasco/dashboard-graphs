import { IncidentFilters } from '@/types';
import { enumToOptions } from '@/utils';
import { render, screen } from '@testing-library/react';
import DashboardFilters from './DashboardFilters';

jest.mock('@/utils', () => ({
  enumToOptions: jest.fn()
}));

jest.mock('@/components', () => ({
  Input: ({
    type,
    name,
    value,
    placeholder,
    onChange,
    className,
    label,
    containerClassName,
    ...props
  }: any) => (
    <div>
      {label && (
        <label htmlFor={`input-${name}`} className="block mb-1 font-semibold">
          {label}
        </label>
      )}
      <input
        id={`input-${name}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        {...props}
      />
    </div>
  ),
  Select: ({
    name,
    options,
    defaultOptionLabel,
    value,
    onChange,
    className,
    ...props
  }: any) => (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    >
      <option value="">{defaultOptionLabel}</option>
      {options.map((option: { label: string; value: string }) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}));

describe('DashboardFilters', () => {
  const mockHandleChange = jest.fn();

  const mockInputData: IncidentFilters = {
    query: 'test query',
    status: 'Open',
    incidentType: 'Equipment Failure',
    location: 'Plant A',
    dateReportedFrom: '2023-01-01',
    dateReportedTo: '2023-12-31',
    resolutionDateFrom: '2023-01-10',
    resolutionDateTo: '2023-12-31',
    minCost: 100,
    maxCost: 1000
  };

  beforeEach(() => {
    (enumToOptions as jest.Mock).mockImplementation((enumObj) =>
      Object.values(enumObj).map((value) => ({ label: value, value }))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders all filter inputs with correct values', () => {
    render(
      <DashboardFilters
        inputData={mockInputData}
        handleChange={mockHandleChange}
      />
    );

    const queryInput = screen.getByPlaceholderText('Search...');
    expect(queryInput).toBeInTheDocument();
    expect(queryInput).toHaveValue(mockInputData.query);

    const selects = screen.getAllByRole('combobox');

    const statusSelect = selects.find(
      (select) => select.getAttribute('name') === 'status'
    );
    expect(statusSelect).toBeInTheDocument();
    expect(statusSelect).toHaveValue(mockInputData.status);

    const incidentTypeSelect = selects.find(
      (select) => select.getAttribute('name') === 'incidentType'
    );
    expect(incidentTypeSelect).toBeInTheDocument();
    expect(incidentTypeSelect).toHaveValue(mockInputData.incidentType);

    const locationSelect = selects.find(
      (select) => select.getAttribute('name') === 'location'
    );
    expect(locationSelect).toBeInTheDocument();
    expect(locationSelect).toHaveValue(mockInputData.location);

    const dateReportedFrom = screen.getByLabelText('Date Reported From');
    expect(dateReportedFrom).toBeInTheDocument();
    expect(dateReportedFrom).toHaveValue(mockInputData.dateReportedFrom);

    const dateReportedTo = screen.getByLabelText('Date Reported To');
    expect(dateReportedTo).toBeInTheDocument();
    expect(dateReportedTo).toHaveValue(mockInputData.dateReportedTo);

    const resolutionDateFrom = screen.getByLabelText('Resolution Date From');
    expect(resolutionDateFrom).toBeInTheDocument();
    expect(resolutionDateFrom).toHaveValue(mockInputData.resolutionDateFrom);

    const resolutionDateTo = screen.getByLabelText('Resolution Date To');
    expect(resolutionDateTo).toBeInTheDocument();
    expect(resolutionDateTo).toHaveValue(mockInputData.resolutionDateTo);

    const minCostInput = screen.getByLabelText('Min Cost');
    expect(minCostInput).toBeInTheDocument();
    expect(minCostInput).toHaveValue(mockInputData.minCost);

    const maxCostInput = screen.getByLabelText('Max Cost');
    expect(maxCostInput).toBeInTheDocument();
    expect(maxCostInput).toHaveValue(mockInputData.maxCost);
  });

  test('renders all select options correctly', () => {
    render(
      <DashboardFilters
        inputData={mockInputData}
        handleChange={mockHandleChange}
      />
    );

    const statusOptions = screen.getAllByRole('option', {
      name: /All Statuses|Open|In Progress|Resolved|Closed/i
    });
    expect(statusOptions).toHaveLength(5);

    const incidentTypeOptions = screen.getAllByRole('option', {
      name: /All Incident Types|Equipment Failure|Human Error|Safety Compliance|Chemical Spill|Electrical Fault|Fire Incident|Workplace Injury|Environmental Hazard/i
    });
    expect(incidentTypeOptions).toHaveLength(9);

    const locationOptions = screen.getAllByRole('option', {
      name: /All locations|Plant A|Plant B|Plant C|Warehouse A|Warehouse B|Warehouse C|Facility A|Facility B|Facility C|Storage Site A|Storage Site B|Storage Site C/i
    });
    expect(locationOptions).toHaveLength(13);
  });
});
