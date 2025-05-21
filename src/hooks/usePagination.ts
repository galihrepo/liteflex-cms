import { useCallback, useEffect, useState } from "react";

type FetchFunction<T> = (page: number, perPage: number) => Promise<{ data: T[]; total: number }>;

export function usePagination<T>(fetchFunction: FetchFunction<T>, perPage = 15) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFunction(pageNum, perPage);
      setData(res.data);
      setTotal(res.total);
      setPage(pageNum);
    } catch (e) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, perPage]);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  const nextPage = () => {
    if (page * perPage < total) {
      loadPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      loadPage(page - 1);
    }
  };

  return { data, page, total, perPage, loading, error, nextPage, prevPage };
}
