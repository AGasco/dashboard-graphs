'use client';
import { axios } from '@/services';
import { useEffect, useState } from 'react';

interface FetchDataResult<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

const useFetchData = <T,>(url: string): FetchDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      await axios
        .get(url)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          if (isMounted) setError(err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, error, isLoading };
};

export default useFetchData;
