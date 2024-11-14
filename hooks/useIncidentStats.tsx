import { useEffect, useState } from 'react';
import { axios } from '@/services';

interface IncidentStats {
  incidentsByType: { [key: string]: number };
  incidentsByDate: { [key: string]: number };
  incidentsByStatus: { [key: string]: number };
}

const useIncidentStats = () => {
  const [stats, setStats] = useState<IncidentStats | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      await axios
        .get('/incident-stats')
        .then((res) => {
          console.log('incident-stats res', res);
          setStats(res.data);
        })
        .catch((err) => {
          if (isMounted) setError(err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, error, isLoading };
};

export default useIncidentStats;
