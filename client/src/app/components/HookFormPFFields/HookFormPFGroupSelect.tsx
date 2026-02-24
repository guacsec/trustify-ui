import React from "react";
import type { FieldValues, Path } from "react-hook-form";

import {
  Button,
  MenuToggle,
  Select,
  SelectList,
} from "@patternfly/react-core";
import {
  TimesIcon,
} from "@patternfly/react-icons";

import type { SBOMGroup } from "@app/queries/sbom-groups";
import { useFetchSBOMGroups } from "@app/queries/sbom-groups";
import { getValidatedFromErrors } from "@app/utils/utils";

import {
  type BaseHookFormPFGroupControllerProps,
  HookFormPFGroupController,
  extractGroupControllerProps,
} from "./HookFormPFGroupController";
import { MenuWithDrilldown } from "../WithDrillDownMenu";

export type HookFormPFGroupSelectProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = BaseHookFormPFGroupControllerProps<TFieldValues, TName> & {
  placeholderText?: string;
  limit?: number;
};

export const HookFormPFGroupSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>(
  props: HookFormPFGroupSelectProps<TFieldValues, TName>,
) => {
  const { extractedProps } = extractGroupControllerProps<
    TFieldValues,
    TName,
    HookFormPFGroupSelectProps<TFieldValues, TName>
  >(props);
  const { fieldId, helperText, isRequired, errorsSuppressed } = extractedProps;
  const placeholderText = props.placeholderText || "Select a group";
  const limit = props.limit || 100;

  return (
    <HookFormPFGroupController<TFieldValues, TName>
      {...extractedProps}
      renderInput={({
        field: { onChange, value, name },
        fieldState: { isDirty, error, isTouched },
      }) => (
        <GroupSelectTypeahead
          fieldId={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          placeholderText={placeholderText}
          limit={limit}
          helperText={helperText}
          isRequired={isRequired}
          validated={
            errorsSuppressed
              ? "default"
              : getValidatedFromErrors(error, isDirty, isTouched)
          }
        />
      )}
    />
  );
};

interface GroupSelectTypeaheadProps {
  fieldId: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholderText: string;
  limit: number;
  helperText?: React.ReactNode;
  isRequired?: boolean;
  validated?: "success" | "warning" | "error" | "default";
}

const GroupSelectTypeahead: React.FC<GroupSelectTypeaheadProps> = ({
  fieldId,
  value,
  onChange,
  placeholderText,
  limit,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Debounced search query
  const [searchQuery, setSearchQuery] = React.useState("");

  // Fetch groups with search query
  const { groups } = useFetchSBOMGroups({
    ...(searchQuery && { q: `name~${searchQuery}` }),
    parents: "resolve",
    limit,
  });

  // Find group by ID recursively
  const findGroupById = React.useCallback(
    (groupList: SBOMGroup[], id: string): SBOMGroup | undefined => {
      for (const group of groupList) {
        if (group.id === id) {
          return group;
        }
        if (group.children) {
          const found = findGroupById(group.children, id);
          if (found) return found;
        }
      }
      return undefined;
    },
    [],
  );

  // Find group name by ID
  const findGroupNameById = (id: string): string => {
    const group = findGroupById(groups, id);
    return group?.name || id;
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (group: SBOMGroup) => {
    onChange(group.id);
    setSearchQuery("");
    setIsOpen(false);
  };

  const toggle = (toggleRef: React.Ref<HTMLButtonElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggle}
      isExpanded={isOpen}
      isFullWidth
      icon={(!!value) && <Button
        variant="plain"
        onClick={(e) => {
          e.stopPropagation();
            onChange("");
        }}
        aria-label="Clear chosen value"
      >
        <TimesIcon />
      </Button>}
    >
      {value ? findGroupNameById(value) : placeholderText}
    </MenuToggle>
  );

  return (
    <Select
      id={`${fieldId}-select`}
      isOpen={isOpen}
      selected={undefined}
      onOpenChange={setIsOpen}
      toggle={toggle}
    >
      <SelectList>
        <MenuWithDrilldown options={groups} onSelect={onSelect} onInputChange={setSearchQuery} />
      </SelectList> 
    </Select>
  );
};
