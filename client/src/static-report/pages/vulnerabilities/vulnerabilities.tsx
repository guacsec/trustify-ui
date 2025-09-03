import React from "react";

import {
  Content,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  type MenuToggleElement,
  PageSection,
  Split,
  SplitItem,
} from "@patternfly/react-core";

import { WINDOW_PURLS } from "@app/Constants";

import { useVulnerabilitiesOfSbomByPurls } from "@static-report/hooks/useVulnerabilitiesOfSbom";

import { VulnerabilityTable } from "./components/VulnerabilityTable";

export const Vulnerabilities: React.FC = () => {
  // Actions dropdown
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] =
    React.useState(false);

  const handleActionsDropdownToggle = () => {
    setIsActionsDropdownOpen(!isActionsDropdownOpen);
  };

  //

  const {
    data: { vulnerabilities },
    isFetching,
    fetchError,
  } = useVulnerabilitiesOfSbomByPurls(
    // biome-ignore lint/suspicious/noExplicitAny: allowed
    (window as any)[WINDOW_PURLS] as string[],
  );

  return (
    <>
      <PageSection>
        <Split>
          <SplitItem isFilled>
            <Content>
              <Content component="h1">Vulnerabilities</Content>
              <Content component="p">
                This is a temporary vulnerability report.
              </Content>
            </Content>
          </SplitItem>
          <SplitItem>
            <Dropdown
              isOpen={isActionsDropdownOpen}
              onSelect={() => setIsActionsDropdownOpen(false)}
              onOpenChange={(isOpen) => setIsActionsDropdownOpen(isOpen)}
              popperProps={{ position: "right" }}
              toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                <MenuToggle
                  ref={toggleRef}
                  onClick={handleActionsDropdownToggle}
                  isExpanded={isActionsDropdownOpen}
                >
                  Actions
                </MenuToggle>
              )}
              ouiaId="BasicDropdown"
              shouldFocusToggleOnSelect
            >
              <DropdownList>
                <DropdownItem key="csv">Download CSV</DropdownItem>
              </DropdownList>
            </Dropdown>
          </SplitItem>
        </Split>
      </PageSection>
      <PageSection>
        <VulnerabilityTable
          vulnerabilities={vulnerabilities}
          isFetching={isFetching}
          fetchError={fetchError}
        />
      </PageSection>
    </>
  );
};
