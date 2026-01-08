import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@app/queries/config";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { OidcProvider } from "@app/components/OidcProvider";
import "@app/dayjs";
import { AppRoutes } from "@app/Routes";
import { initInterceptors } from "@app/axios-config";

const container = document.getElementById("root");

initInterceptors();

// biome-ignore lint/style/noNonNullAssertion: container must exist
const root = createRoot(container!);

const renderApp = () => {
  return root.render(
    <React.StrictMode>
      <OidcProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={AppRoutes} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </OidcProvider>
    </React.StrictMode>,
  );
};

renderApp();
