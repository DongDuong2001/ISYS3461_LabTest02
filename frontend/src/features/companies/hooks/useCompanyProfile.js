import { useEffect, useState } from "react";
import { getCompanyProfile } from "../api/companyApi.js";

export default function useCompanyProfile(companyId) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getCompanyProfile(companyId)
      .then(setCompany)
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ?? "Unable to load company."
        )
      )
      .finally(() => setLoading(false));
  }, [companyId]);

  return { company, loading, error };
}
