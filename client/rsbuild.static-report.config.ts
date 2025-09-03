import * as path from "node:path";

import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

import { pluginTypeCheck } from "@rsbuild/plugin-type-check";

import {
  SERVER_ENV_KEYS,
  TRUSTIFICATION_ENV,
  brandingStrings,
  encodeEnv,
} from "@trustify-ui/common";

import {
  brandingPath,
  faviconPath,
  ignoreProcessEnv,
  manifestPath,
} from "./rsbuild.config";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginTypeCheck({
      enable: process.env.NODE_ENV === "production",
      tsCheckerOptions: {
        issue: {
          exclude: [
            ({ file = "" }) => /[\\/]node_modules[\\/]/.test(file),
            ({ file = "" }) => {
              return /\/src\/app\/client(?:\/[^/]+)*\/[^/]+\.ts$/.test(file);
            },
          ],
        },
      },
    }),
    ignoreProcessEnv(),
  ],
  source: {
    entry: {
      index: path.join(__dirname, "src", "static-report", "index.tsx"),
    },
  },
  html: {
    template: path.join(__dirname, "src", "static-report", "index.html"),
    templateParameters: {
      _env: encodeEnv({ ...TRUSTIFICATION_ENV, MOCK: "on" }, SERVER_ENV_KEYS),
      branding: brandingStrings,
    },
  },
  tools: {
    swc: {
      jsc: {
        experimental: {
          plugins:
            process.env.NODE_ENV === "development"
              ? [["swc-plugin-coverage-instrument", {}]]
              : [],
        },
      },
    },
  },
  output: {
    assetPrefix: "./",
    distPath: {
      root: path.join(__dirname, "dist", "static-report"),
    },
    copy: [
      {
        from: manifestPath,
        to: ".",
      },
      {
        from: faviconPath,
        to: ".",
      },
      {
        from: brandingPath,
        to: "branding",
      },
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              from: "src/static-report/data.js",
              to: ".",
            },
          ]
        : []),
    ],
    sourceMap: process.env.NODE_ENV === "development",
  },
  server: {
    proxy: {
      "/auth": {
        target: TRUSTIFICATION_ENV.OIDC_SERVER_URL || "http://localhost:8090",
        changeOrigin: true,
      },
      "/api": {
        target: TRUSTIFICATION_ENV.TRUSTIFY_API_URL || "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
