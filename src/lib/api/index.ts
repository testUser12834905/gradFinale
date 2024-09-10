import config from "../utils/config";
import {
  type ApiResponseType,
  type TApiRoute,
  apiEndpoints,
} from "./constants";

const api = async <T extends TApiRoute>(
  apiAction: T,
  body?: object,
  overwrite?: RequestInit,
): Promise<ApiResponseType<T>> => {
  const endpoint = config("backendEndPoint");

  const token = 123;
  const apiEndpoint = apiEndpoints[apiAction];
  const fetchUrl = `${endpoint}/${apiEndpoint.version}${apiEndpoint.route}`;

  return fetch(fetchUrl, {
    method: apiEndpoint.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    ...(body && { body: JSON.stringify(body) }),
    ...overwrite,
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
