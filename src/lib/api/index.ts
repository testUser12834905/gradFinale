import config from "../utils/config";
import {
  type ApiResponseType,
  type TApiRoute,
  apiEndpoints,
} from "./constants";

const api = async <T extends TApiRoute>(
  apiRoute: T,
  init?: RequestInit,
  token?: string,
): Promise<ApiResponseType<T>> => {
  const endpoint = config("backendEndPoint");

  const apiEndpoint = apiEndpoints[apiRoute];
  const fetchUrl = `${endpoint}/${apiEndpoint.version}${apiEndpoint.route}`;

  return fetch(fetchUrl, {
    method: apiEndpoint.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    ...init,
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export default api;
