import { useState } from "react";

import {
  ColumnManagementModal,
  type ColumnManagementModalColumn,
} from "@patternfly/react-component-groups";
import {
  Button,
  OverflowMenu,
  OverflowMenuGroup,
  OverflowMenuItem,
  ToolbarItem,
} from "@patternfly/react-core";
import { ColumnsIcon } from "@patternfly/react-icons";

import type { ColumnState } from "@app/hooks/table-controls/column/useColumnState";

interface ManageColumnsToolbarProps<TColumnKey extends string> {
  columns: ColumnState<TColumnKey>[];
  defaultColumns: ColumnState<TColumnKey>[];
  setColumns: (newColumns: ColumnState<TColumnKey>[]) => void;
}

export const ManageColumnsToolbar = <TColumnKey extends string>({
  columns,
  setColumns,
  defaultColumns,
}: ManageColumnsToolbarProps<TColumnKey>) => {
  const [isOpen, setIsOpen] = useState(false);

  const onApplyColumns = (
    newUiColumns: ColumnManagementModalColumn[],
  ): void => {
    const newTableColumns = columns.map((tableColumn) => {
      const uiColumn = newUiColumns.find(
        (column) => column.key === tableColumn.id,
      );
      return { ...tableColumn, isVisible: uiColumn?.isShown ?? false };
    });
    setColumns(newTableColumns);
  };

  return (
    <>
      <ToolbarItem>
        <OverflowMenu breakpoint="md">
          <OverflowMenuGroup groupType="button" isPersistent>
            <OverflowMenuItem isPersistent>
              <Button
                variant="plain"
                onClick={() => setIsOpen(true)}
                icon={<ColumnsIcon />}
              ></Button>
            </OverflowMenuItem>
          </OverflowMenuGroup>
        </OverflowMenu>
      </ToolbarItem>
      <ColumnManagementModal
        appliedColumns={columns.map(({ id, label, isVisible, isIdentity }) => {
          const shouldBeShown = (isVisible: boolean, isIdentity?: boolean) => {
            return isVisible || (isIdentity ?? false);
          };
          const defaultColumn = defaultColumns.find((e) => e.id === id);

          return {
            key: id,
            title: label,
            isShownByDefault: defaultColumn
              ? shouldBeShown(defaultColumn.isVisible, defaultColumn.isIdentity)
              : false,
            isShown: shouldBeShown(isVisible, isIdentity),
            isUntoggleable: isIdentity,
          };
        })}
        applyColumns={onApplyColumns}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
