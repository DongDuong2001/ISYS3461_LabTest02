export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:10000";

export const API_ROUTES = {
  tours: "/tours",
  companies: "/companies",
  companyDropdown: "/companies/dropdown",
};

export const TOUR_PAGE_SIZE = 5;
