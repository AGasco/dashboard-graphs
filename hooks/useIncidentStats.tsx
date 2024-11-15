import { axios } from '@/services';
import { IncidentChartStats } from '@/types';
import { useEffect, useState } from 'react';

const useIncidentStats = () => {
  const [stats, setStats] = useState<IncidentChartStats | null>(null);
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
