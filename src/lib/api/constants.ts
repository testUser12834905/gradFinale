export type ApiResponseType<T extends TApiRoute> = Partial<
  (typeof apiEndpoints)[T]["responseType"]
>;

export const apiEndpoints = {
  login: {
    route: "/login",
    method: "POST",
    version: "v1",
    responseType: {} as {
      accessToken: string;
      refreshToken: string;
    },
  },
  "refresh-token": {
    route: "/login",
    method: "POST",
    version: "v1",
    responseType: {} as {
      accessToken: string;
      refreshToken: string;
    },
  },
} as const;

export type TApiRoute = keyof typeof apiEndpoints;
export type TApiEndpoint = (typeof apiEndpoints)[keyof typeof apiEndpoints];
