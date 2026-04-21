import type React from "react";

import {
  Banner,
  Flex,
  FlexItem,
  Page,
  SkipToContent,
} from "@patternfly/react-core";
import InfoCircleIcon from "@patternfly/react-icons/dist/esm/icons/info-circle-icon";

import { Notifications } from "@app/components/Notifications";
import { PageContentWithDrawerProvider } from "@app/components/PageDrawerContext";
import { useReadOnlyContext } from "@app/components/ReadOnlyContext";
import { HeaderApp } from "./header";
import { SidebarApp } from "./sidebar";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { isReadOnly } = useReadOnlyContext();
  const pageId = "main-content-page-layout-horizontal-nav";
  const PageSkipToContent = (
    <SkipToContent href={`#${pageId}`}>Skip to content</SkipToContent>
  );

  return (
    <Page
      masthead={<HeaderApp />}
      sidebar={<SidebarApp />}
      isManagedSidebar
      skipToContent={PageSkipToContent}
      mainContainerId={pageId}
    >
      {isReadOnly && (
        <Banner
          isSticky
          status="info"
          screenReaderText="Info banner: application is in read-only mode"
        >
          <Flex
            justifyContent={{ default: "justifyContentCenter" }}
            alignItems={{ default: "alignItemsCenter" }}
            gap={{ default: "gapSm" }}
          >
            <FlexItem>
              <InfoCircleIcon />
            </FlexItem>
            <FlexItem>
              This instance is running in read-only mode. Uploads, imports, and
              other modifications are disabled.
            </FlexItem>
          </Flex>
        </Banner>
      )}
      <PageContentWithDrawerProvider>
        {children}
        <Notifications />
      </PageContentWithDrawerProvider>
    </Page>
  );
};
