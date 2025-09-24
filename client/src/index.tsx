import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { OidcProvider } from "@app/components/OidcProvider";
import "@app/dayjs";
import { AppRoutes } from "@app/Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const container = document.getElementById("root");

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
