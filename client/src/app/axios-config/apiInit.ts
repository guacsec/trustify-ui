import axios from "axios";
import { User, UserManager } from "oidc-client-ts";

import {
  OIDC_CLIENT_ID,
  OIDC_SERVER_URL,
  oidcClientSettings,
  oidcSignoutArgs,
} from "@app/oidc";

import { createClient } from "@app/client/client";
import { isAuthRequired } from "@app/Constants";
import { queryClient } from "@app/queries/config";
import { TrustifyInfoQueryKey } from "@app/queries/trustifyInfo";

export const client = createClient({
  // set default base url for requests
  axios: axios,
  throwOnError: true,
});

function getUser() {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${OIDC_SERVER_URL}:${OIDC_CLIENT_ID}`,
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}

/** Detects 503 "ReadOnly" responses and invalidates the trustify info cache. */
export const readOnlyRejectionHandler = (error: unknown) => {
  const resp = (
    error as { response?: { status?: number; data?: { error?: string } } }
  ).response;
  if (resp?.status === 503 && resp?.data?.error === "ReadOnly") {
    queryClient.invalidateQueries({ queryKey: [TrustifyInfoQueryKey] });
  }
  return Promise.reject(error);
};

export const initInterceptors = () => {
  axios.interceptors.response.use(undefined, readOnlyRejectionHandler);

  if (!isAuthRequired) {
    return;
  }

  axios.interceptors.request.use(
    (config) => {
      const user = getUser();
      const token = user?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const userManager = new UserManager(oidcClientSettings);
        try {
          const refreshedUser = await userManager.signinSilent();
          const access_token = refreshedUser?.access_token;

          const retryCounter = error.config.retryCounter || 1;

          const retryConfig = {
            ...error.config,
            headers: {
              ...error.config.headers,
              Authorization: `Bearer ${access_token}`,
            },
          };

          // Retry limited times
          if (retryCounter < 2) {
            return axios({
              ...retryConfig,
              retryCounter: retryCounter + 1,
            });
          }
        } catch (_refreshError) {
          await userManager.signoutRedirect(oidcSignoutArgs);
        }
      }

      return Promise.reject(error);
    },
  );
};
