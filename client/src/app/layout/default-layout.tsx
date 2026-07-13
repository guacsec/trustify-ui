import React from "react";

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
import { ReadOnlyContext } from "@app/components/ReadOnlyContext";

import { HeaderApp } from "./header";
import { SidebarApp } from "./sidebar";
import { LoadingWrapper } from "@tsd-ui/core";
import { getAxiosErrorMessage } from "@app/utils/utils";
import type { AxiosError } from "axios";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { isLoading, areMutationsDisabled } = React.useContext(ReadOnlyContext);
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
      <LoadingWrapper<AxiosError>
        isFetching={isLoading}
        isFetchingState={<></>}
        fetchErrorState={(error) => (
          <Banner isSticky status="danger">
            {getAxiosErrorMessage(error)}
          </Banner>
        )}
      >
        {areMutationsDisabled && (
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
                This instance is running in read-only mode. Uploads, imports,
                and other modifications are disabled.
              </FlexItem>
            </Flex>
          </Banner>
        )}
      </LoadingWrapper>
      <PageContentWithDrawerProvider>
        {children}
        <Notifications />
      </PageContentWithDrawerProvider>
    </Page>
  );
};
