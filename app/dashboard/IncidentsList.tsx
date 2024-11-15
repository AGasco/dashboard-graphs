import { Pagination } from '@/components';
import { Incident } from '@/types';
import { formatDate } from '@/utils';

interface Props {
  incidents: Incident[];
  incidentsPage: number;
  totalIncidents: number;
  onPageChange: (page: number) => void;
}

const IncidentsList = ({
  incidents,
  incidentsPage,
  totalIncidents,
  onPageChange
}: Props) => {
  return incidents.length > 0 ? (
    <>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Assigned To</th>
            <th className="p-2 border">Date Reported</th>
            <th className="p-2 border">Resolution Date</th>
            <th className="p-2 border">Cost</th>
          </tr>
        </thead>
        <tbody>
          {incidents?.map((incident) => (
            <tr key={incident.id}>
              <td className="p-2 border">{incident.id}</td>
              <td className="p-2 border">{incident.location}</td>
              <td className="p-2 border">{incident.incident_type}</td>
              <td className="p-2 border">{incident.status}</td>
              <td className="p-2 border">{incident.assigned_to}</td>
              <td className="p-2 border">
                {formatDate(incident.date_reported)}
              </td>
              <td className="p-2 border">
                {formatDate(incident.resolution_date)}
              </td>
              <td className="p-2 border">€{incident.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={incidentsPage}
        totalItems={totalIncidents}
        itemsPerPage={20}
        onPageChange={onPageChange}
      />
    </>
  ) : (
    <p className="w-full text-center">No records found.</p>
  );
};

export default IncidentsList;
