import { useAuthorizationStore } from "../state/authorize";
import config from "../utils/config";
import {
  type ApiResponseType,
  type TApiRoute,
  apiEndpoints,
} from "./constants";

type Api<T> = {
  apiAction: T;
  body?: object;
  overwrite?: RequestInit;
};

export const api = async <T extends TApiRoute>({
  apiAction,
  body,
  overwrite,
}: Api<T>): Promise<ApiResponseType<T>> => {
  const endpoint = config("backendEndPoint");

  const apiEndpoint = apiEndpoints[apiAction];
  const fetchUrl = `${endpoint}/${apiEndpoint.version}${apiEndpoint.route}`;

  return fetch(fetchUrl, {
    method: apiEndpoint.method,
    headers: {
      "Content-Type": "application/json",
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

export const useApiWithAuth = (): typeof api => {
  const accessToken = useAuthorizationStore((state) => state.accessToken);

  const authenticatedApi: typeof api = (apiArgs) => {
    return api({
      overwrite: {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      },
      ...apiArgs,
    });
  };

  return authenticatedApi;
};
