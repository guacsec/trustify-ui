import React from "react";

import {
  Badge,
  Card,
  CardBody,
  PageSection,
  PageSectionVariants,
  Popover,
  SearchInput,
  Split,
  SplitItem,
  Tab,
  TabAction,
  TabTitleText,
  Tabs,
  Text,
  TextContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import HelpIcon from "@patternfly/react-icons/dist/esm/icons/help-icon";

import { FilterPanel } from "@app/components/FilterPanel";
import { FILTER_TEXT_CATEGORY_KEY } from "@app/Constants";

import { SearchProvider } from "./search-context";

import { AdvisorySearchContext } from "../advisory-list/advisory-context";
import { AdvisoryTable } from "../advisory-list/advisory-table";
import { PackageSearchContext } from "../package-list/package-context";
import { PackageTable } from "../package-list/package-table";
import { SbomSearchContext } from "../sbom-list/sbom-context";
import { SbomTable } from "../sbom-list/sbom-table";
import { VulnerabilitySearchContext } from "../vulnerability-list/vulnerability-context";
import { VulnerabilityTable } from "../vulnerability-list/vulnerability-table";

export const SearchPage: React.FC = () => {
  return (
    <SearchProvider>
      <Search />
    </SearchProvider>
  );
};

export const Search: React.FC = () => {
  const { tableControls: sbomTableControls } =
    React.useContext(SbomSearchContext);
  const { tableControls: packageTableControls } =
    React.useContext(PackageSearchContext);
  const { tableControls: vulnerabilityTableControls } = React.useContext(
    VulnerabilitySearchContext
  );
  const { tableControls: advisoryTableControls } = React.useContext(
    AdvisorySearchContext
  );

  const {
    totalItemCount: sbomTotalCount,
    tableControls: {
      propHelpers: { filterPanelProps: sbomFilterPanelProps },
    },
  } = React.useContext(SbomSearchContext);

  const {
    totalItemCount: packageTotalCount,
    tableControls: {
      propHelpers: { filterPanelProps: packageFilterPanelProps },
    },
  } = React.useContext(PackageSearchContext);

  const {
    totalItemCount: vulnerabilityTotalCount,
    tableControls: {
      propHelpers: { filterPanelProps: vulnerabilityFilterPanelProps },
    },
  } = React.useContext(VulnerabilitySearchContext);

  const {
    totalItemCount: advisoryTotalCount,
    tableControls: {
      propHelpers: { filterPanelProps: advisoryFilterPanelProps },
    },
  } = React.useContext(AdvisorySearchContext);

  // Search

  const [searchValue, setSearchValue] = React.useState(
    sbomTableControls.filterState.filterValues[FILTER_TEXT_CATEGORY_KEY]?.[0] ||
      ""
  );

  const onChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const onClearSearchValue = () => {
    setSearchValue("");
  };

  const onChangeContextSearchValue = () => {
    sbomTableControls.filterState.setFilterValues({
      ...sbomTableControls.filterState.filterValues,
      [FILTER_TEXT_CATEGORY_KEY]: [searchValue],
    });
    packageTableControls.filterState.setFilterValues({
      ...packageTableControls.filterState.filterValues,
      [FILTER_TEXT_CATEGORY_KEY]: [searchValue],
    });
    vulnerabilityTableControls.filterState.setFilterValues({
      ...vulnerabilityTableControls.filterState.filterValues,
      [FILTER_TEXT_CATEGORY_KEY]: [searchValue],
    });
    advisoryTableControls.filterState.setFilterValues({
      ...advisoryTableControls.filterState.filterValues,
      [FILTER_TEXT_CATEGORY_KEY]: [searchValue],
    });
  };

  // Tabs

  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);

  const handleTabClick = (
    _event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const sbomPopoverRef = React.createRef<HTMLElement>();

  const sbomPopover = (popoverRef: React.RefObject<any>) => (
    <Popover
      bodyContent={
        <div>Software Bill of Materials for Products and Containers.</div>
      }
      position={"right"}
      triggerRef={popoverRef}
    />
  );

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <Toolbar isStatic>
          <ToolbarContent>
            <ToolbarGroup align={{ default: "alignLeft" }}>
              <TextContent>
                <Text component="h1">Search Results</Text>
              </TextContent>
            </ToolbarGroup>
            <ToolbarGroup
              variant="icon-button-group"
              align={{ default: "alignRight" }}
            >
              <ToolbarGroup visibility={{ default: "hidden", lg: "visible" }}>
                <ToolbarItem widths={{ default: "500px" }}>
                  <SearchInput
                    placeholder="Search for an SBOM, Package, or Vulnerability"
                    value={searchValue}
                    onChange={(_event, value) => onChangeSearchValue(value)}
                    onClear={onClearSearchValue}
                    onKeyDown={(event: React.KeyboardEvent) => {
                      if (event.key && event.key !== "Enter") return;
                      onChangeContextSearchValue();
                    }}
                  />
                </ToolbarItem>
              </ToolbarGroup>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </PageSection>
      <PageSection>
        <Split hasGutter>
          <SplitItem>
            <Card isFullHeight>
              <CardBody style={{ width: 241 }}>
                {activeTabKey === 0 ? (
                  <FilterPanel
                    omitFilterCategoryKeys={[""]}
                    {...sbomFilterPanelProps}
                  />
                ) : activeTabKey === 1 ? (
                  <FilterPanel
                    omitFilterCategoryKeys={[""]}
                    {...packageFilterPanelProps}
                  />
                ) : activeTabKey === 2 ? (
                  <FilterPanel
                    omitFilterCategoryKeys={[""]}
                    {...vulnerabilityFilterPanelProps}
                  />
                ) : activeTabKey === 3 ? (
                  <FilterPanel
                    omitFilterCategoryKeys={[""]}
                    {...advisoryFilterPanelProps}
                  />
                ) : null}
              </CardBody>
            </Card>
          </SplitItem>
          <SplitItem isFilled>
            <Tabs
              isBox
              activeKey={activeTabKey}
              onSelect={handleTabClick}
              aria-label="Tabs"
              role="region"
            >
              <Tab
                eventKey={0}
                title={
                  <TabTitleText>
                    SBOMs{"  "}
                    <Badge screenReaderText="Search Result Count">
                      {sbomTotalCount}
                    </Badge>
                  </TabTitleText>
                }
                actions={
                  <>
                    <TabAction
                      aria-label={`SBOM help popover`}
                      ref={sbomPopoverRef}
                    >
                      <HelpIcon />
                    </TabAction>
                    {sbomPopover(sbomPopoverRef)}
                  </>
                }
              >
                <SbomTable />
              </Tab>
              <Tab
                eventKey={1}
                title={
                  <TabTitleText>
                    Packages{"  "}
                    <Badge screenReaderText="Search Result Count">
                      {packageTotalCount}
                    </Badge>
                  </TabTitleText>
                }
              >
                <PackageTable />
              </Tab>
              <Tab
                eventKey={2}
                title={
                  <TabTitleText>
                    CVEs{"  "}
                    <Badge screenReaderText="Search Result Count">
                      {vulnerabilityTotalCount}
                    </Badge>
                  </TabTitleText>
                }
              >
                <VulnerabilityTable />
              </Tab>
              <Tab
                eventKey={3}
                title={
                  <TabTitleText>
                    Advisories{"  "}
                    <Badge screenReaderText="Advisory Result Count">
                      {vulnerabilityTotalCount}
                    </Badge>
                  </TabTitleText>
                }
              >
                <AdvisoryTable />
              </Tab>
            </Tabs>
          </SplitItem>
        </Split>
      </PageSection>
    </>
  );
};
