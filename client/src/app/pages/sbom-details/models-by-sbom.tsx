import React from "react";

import {
  Button,
  Content,
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Flex,
  FlexItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import text from "@patternfly/react-styles/css/utilities/Text/text";

import type { SbomModel } from "@app/client";
import { ConditionalDataListBody } from "@app/components/DataListControls";
import { FilterToolbar, FilterType } from "@app/components/FilterToolbar";
import { PageDrawerContent } from "@app/components/PageDrawerContext";
import { SimplePagination } from "@app/components/SimplePagination";
import { FILTER_TEXT_CATEGORY_KEY } from "@app/Constants";
import {
  getHubRequestParams,
  useTableControlProps,
  useTableControlState,
} from "@app/hooks/table-controls";
import { useFetchModelsBySbomId } from "@app/queries/sboms";

import { getModelProperties, ModelDetailDrawer } from "./model-detail-drawer";

interface ModelsProps {
  sbomId: string;
}

export const ModelsBySbom: React.FC<ModelsProps> = ({ sbomId }) => {
  const [selectedModel, setSelectedModel] = React.useState<SbomModel | null>(
    null,
  );

  const tableControlState = useTableControlState({
    tableName: "models-table",
    columnNames: {
      name: "Name",
    },
    isPaginationEnabled: true,
    isFilterEnabled: true,
    filterCategories: [
      {
        categoryKey: FILTER_TEXT_CATEGORY_KEY,
        title: "Filter text",
        placeholderText: "Search",
        type: FilterType.search,
      },
    ],
  });

  const {
    result: { data: models, total: totalItemCount },
    isFetching,
    fetchError,
  } = useFetchModelsBySbomId(
    sbomId,
    getHubRequestParams({
      ...tableControlState,
    }),
  );

  const tableControls = useTableControlProps({
    ...tableControlState,
    idProperty: "id",
    currentPageItems: models,
    totalItemCount,
    isLoading: isFetching,
  });

  const {
    currentPageItems,
    propHelpers: {
      toolbarProps,
      filterToolbarProps,
      paginationToolbarItemProps,
      paginationProps,
    },
  } = tableControls;

  return (
    <>
      <Toolbar {...toolbarProps} aria-label="Models toolbar">
        <ToolbarContent>
          <FilterToolbar {...filterToolbarProps} />
          <ToolbarItem {...paginationToolbarItemProps}>
            <SimplePagination
              idPrefix="models-table"
              isTop
              paginationProps={paginationProps}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>

      <ConditionalDataListBody
        isLoading={isFetching}
        isError={!!fetchError}
        isNoData={totalItemCount === 0}
        noDataEmptyState={
          <Content component="p">No models found for this SBOM.</Content>
        }
      >
        <DataList aria-label="Models list">
          {currentPageItems?.map((model) => {
            const props = getModelProperties(model.properties);
            return (
              <DataListItem
                key={model.id}
                aria-labelledby={`model-${model.id}`}
              >
                <DataListItemRow>
                  <DataListItemCells
                    dataListCells={[
                      <DataListCell key="name" isFilled>
                        <Flex
                          direction={{ default: "column" }}
                          gap={{ default: "gapXs" }}
                        >
                          <FlexItem>
                            <Button
                              id={`model-${model.id}`}
                              variant="link"
                              isInline
                              onClick={() => setSelectedModel(model)}
                            >
                              {model.name}
                            </Button>
                          </FlexItem>
                          <FlexItem>
                            <small>
                              {model?.purls.map((e) => e.purl).join(",")}
                            </small>
                          </FlexItem>
                          <FlexItem>
                            <Flex spaceItems={{ default: "spaceItemsSm" }}>
                              <FlexItem>
                                {props.suppliedBy && (
                                  <Content component="p">
                                    <span className={text.fontWeightBold}>
                                      Supplied by:
                                    </span>{" "}
                                    {props.suppliedBy}
                                  </Content>
                                )}
                              </FlexItem>
                              <FlexItem>
                                {props.licenses && (
                                  <Content component="p">
                                    <span className={text.fontWeightBold}>
                                      License:
                                    </span>{" "}
                                    {props.licenses}
                                  </Content>
                                )}
                              </FlexItem>
                            </Flex>
                          </FlexItem>
                        </Flex>
                      </DataListCell>,
                    ]}
                  />
                </DataListItemRow>
              </DataListItem>
            );
          })}
        </DataList>
      </ConditionalDataListBody>

      <SimplePagination
        idPrefix="models-table"
        isTop={false}
        paginationProps={paginationProps}
      />

      <PageDrawerContent
        isExpanded={selectedModel !== null}
        onCloseClick={() => setSelectedModel(null)}
        header={<Content component="h2">{selectedModel?.name}</Content>}
        pageKey="sbom-details-models"
      >
        {selectedModel && <ModelDetailDrawer model={selectedModel} />}
      </PageDrawerContent>
    </>
  );
};
