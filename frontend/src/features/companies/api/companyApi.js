import { sendRequest } from "../../../api/httpClient.js";
import { API_ROUTES } from "../../../config/api.js";

export function getCompanyProfile(id) {
  return sendRequest({
    method: "GET",
    url: `${API_ROUTES.companies}/${id}`,
  });
}

export function getCompanyDropdown() {
  return sendRequest({
    method: "GET",
    url: API_ROUTES.companyDropdown,
  });
}
