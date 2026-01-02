import type React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

import { NotificationsProvider } from "./components/NotificationsContext";
import { DefaultLayout } from "./layout";
import { useRouteDocumentTitle } from "./hooks/useRouteDocumentTitle";

import "@patternfly/patternfly/patternfly.css";
import "@patternfly/patternfly/patternfly-addons.css";

const App: React.FC = () => {
  useRouteDocumentTitle();

  return (
    <NotificationsProvider>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </NotificationsProvider>
  );
};

export default App;
