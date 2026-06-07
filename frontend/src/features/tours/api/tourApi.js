import { sendRequest } from "../../../api/httpClient.js";
import { API_ROUTES } from "../../../config/api.js";

export function getTours(params = {}) {
  return sendRequest({
    method: "GET",
    url: API_ROUTES.tours,
    params,
  });
}

export function createTour(tour) {
  return sendRequest({
    method: "POST",
    url: API_ROUTES.tours,
    data: tour,
  });
}

export function updateTour(id, tour) {
  return sendRequest({
    method: "PUT",
    url: `${API_ROUTES.tours}/${id}`,
    data: tour,
  });
}

export function deleteTour(id) {
  return sendRequest({
    method: "DELETE",
    url: `${API_ROUTES.tours}/${id}`,
  });
}
