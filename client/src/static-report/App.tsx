import type React from "react";
import { Outlet } from "react-router-dom";

import { NotificationsProvider } from "@app/components/NotificationsContext";
import { DefaultLayout } from "@static-report/layout";

import "@patternfly/patternfly/patternfly-addons.css";
import "@patternfly/patternfly/patternfly.css";

const App: React.FC = () => {
  return (
    <NotificationsProvider>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </NotificationsProvider>
  );
};

export default App;
