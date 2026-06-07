import { useEffect, useState } from "react";
import { getCompanyDropdown } from "../../companies/api/companyApi.js";
import { createTour, updateTour } from "../api/tourApi.js";

function getInitialValues(tour) {
  return {
    name: tour?.name ?? "",
    price: tour?.price ?? "",
    companyId: tour?.company?.id ? String(tour.company.id) : "",
  };
}

export default function useTourForm({ tour = null, onSuccess }) {
  const [values, setValues] = useState(() => getInitialValues(tour));
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues(getInitialValues(tour));
  }, [tour]);

  useEffect(() => {
    getCompanyDropdown()
      .then(setCompanies)
      .catch(() =>
        setErrors((currentErrors) => ({
          ...currentErrors,
          companyId: "Unable to load companies",
        }))
      );
  }, []);

  const setField = (field, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Tour name is required";
    }
    if (values.price === "") {
      nextErrors.price = "Tour price is required";
    } else if (Number(values.price) <= 0) {
      nextErrors.price = "Price must be larger than 0";
    }
    if (!values.companyId) {
      nextErrors.companyId = "Operating company is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: values.name.trim(),
        price: Number(values.price),
        companyId: Number(values.companyId),
      };

      if (tour) {
        await updateTour(tour.id, payload);
      } else {
        await createTour(payload);
        setValues(getInitialValues(null));
      }

      setErrors({});
      await onSuccess();
    } catch (requestError) {
      if (requestError.response?.data?.errors) {
        const serverErrors = {};
        requestError.response.data.errors.forEach((error) => {
          serverErrors[error.field] = error.message;
        });
        setErrors(serverErrors);
      } else {
        setErrors({
          form:
            requestError.response?.data?.message ??
            "Unable to save the tour.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    companies,
    errors,
    submitting,
    setField,
    submit,
  };
}
