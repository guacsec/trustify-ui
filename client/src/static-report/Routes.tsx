import { lazy } from "react";
import { createHashRouter } from "react-router-dom";

import { LazyRouteElement } from "@app/components/LazyRouteElement";

import App from "./App";

const Vulnerabilities = lazy(
  () => import("@static-report/pages/vulnerabilities"),
);

export const Paths = {} as const;

export enum PathParam {}

export const AppRoutes = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LazyRouteElement component={<Vulnerabilities />} />,
      },
    ],
  },
]);
