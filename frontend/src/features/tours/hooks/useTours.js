import { useCallback, useEffect, useState } from "react";
import { TOUR_PAGE_SIZE } from "../../../config/api.js";
import {
  deleteTour as deleteTourRequest,
  getTours,
} from "../api/tourApi.js";

export default function useTours({ companyId = null, lazy = true } = {}) {
  const [tours, setTours] = useState([]);
  const [totalTours, setTotalTours] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTours = useCallback(
    async (pageNumber = 1, append = false) => {
      setLoading(true);
      setError("");

      try {
        const params = companyId
          ? { companyId }
          : { page: pageNumber, limit: TOUR_PAGE_SIZE };
        const data = await getTours(params);

        if (Array.isArray(data)) {
          setTours(data);
          setTotalTours(data.length);
        } else {
          setTours((currentTours) =>
            append ? [...currentTours, ...data.tours] : data.tours
          );
          setTotalTours(data.total);
        }
        setPage(pageNumber);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ?? "Unable to load tours."
        );
      } finally {
        setLoading(false);
      }
    },
    [companyId]
  );

  useEffect(() => {
    loadTours(1, false);
  }, [loadTours]);

  const refreshTours = useCallback(
    () => loadTours(1, false),
    [loadTours]
  );

  const loadMoreTours = useCallback(() => {
    if (lazy && tours.length < totalTours && !loading) {
      return loadTours(page + 1, true);
    }
    return Promise.resolve();
  }, [lazy, loadTours, loading, page, totalTours, tours.length]);

  const removeTour = useCallback(
    async (tourId) => {
      await deleteTourRequest(tourId);
      await refreshTours();
    },
    [refreshTours]
  );

  return {
    tours,
    totalTours,
    loading,
    error,
    hasMore: lazy && tours.length < totalTours,
    refreshTours,
    loadMoreTours,
    removeTour,
  };
}
