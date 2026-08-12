import type http from "node:http";
import type { Options } from "http-proxy-middleware";

import * as cookie from "cookie";
import { TRUSTIFICATION_ENV } from "@trustify-ui/common";

const logger =
  process.env.DEBUG === "1"
    ? console
    : {
        info() {},
        warn: console.warn,
        error: console.error,
      };

export const proxyMap: Record<string, Options> = {
  ...(TRUSTIFICATION_ENV.OIDC_SERVER_IS_EMBEDDED === "true" && {
    auth: {
      pathFilter: "/auth",
      target: TRUSTIFICATION_ENV.OIDC_SERVER_URL || "http://localhost:8090",
      logger,
      changeOrigin: true,
      on: {
        proxyReq: (
          proxyReq: http.ClientRequest,
          req: http.IncomingMessage,
          _res: http.ServerResponse,
        ) => {
          if (req.socket.remoteAddress) {
            proxyReq.setHeader("X-Forwarded-For", req.socket.remoteAddress);
            proxyReq.setHeader("X-Real-IP", req.socket.remoteAddress);
          }
          if (req.headers.host) {
            proxyReq.setHeader("X-Forwarded-Host", req.headers.host);
          }
        },
      },
    },
  }),
  api: {
    pathFilter: "/api",
    target: TRUSTIFICATION_ENV.TRUSTIFY_API_URL || "http://localhost:8080",
    logger,
    changeOrigin: true,
    on: {
      proxyReq: (
        proxyReq: http.ClientRequest,
        req: http.IncomingMessage,
        _res: http.ServerResponse,
      ) => {
        const cookies = cookie.parse(req.headers.cookie ?? "");
        const bearerToken = cookies.keycloak_cookie;
        if (bearerToken && !req.headers.authorization) {
          proxyReq.setHeader("Authorization", `Bearer ${bearerToken}`);
        }
      },
      proxyRes: (
        proxyRes: http.IncomingMessage,
        req: http.IncomingMessage,
        res: http.ServerResponse,
      ) => {
        if (
          !req.headers.accept?.includes("application/json") &&
          (proxyRes.statusCode === 401 ||
            proxyRes.statusMessage === "Unauthorized")
        ) {
          res.writeHead(302, { Location: "/" }).end();
          proxyRes?.destroy();
        }
      },
    },
  },
  wellKnown: {
    pathFilter: "/.well-known/trustify",
    target: TRUSTIFICATION_ENV.TRUSTIFY_API_URL || "http://localhost:8080",
    logger,
    changeOrigin: true,
  },
  openapi: {
    pathFilter: "/openapi",
    target: TRUSTIFICATION_ENV.TRUSTIFY_API_URL || "http://localhost:8080",
    logger,
    changeOrigin: true,
  },
  openapiJson: {
    pathFilter: "/openapi.json",
    target: TRUSTIFICATION_ENV.TRUSTIFY_API_URL || "http://localhost:8080",
    logger,
    changeOrigin: true,
  },
};
