import React from "react";
import type { FieldValues, Path } from "react-hook-form";

import { useFetchSBOMGroups } from "@app/queries/sbom-groups";
import { getValidatedFromErrors } from "@app/utils/utils";

import {
  type BaseHookFormPFGroupControllerProps,
  HookFormPFGroupController,
  extractGroupControllerProps,
} from "../../../../components/HookFormPFFields/HookFormPFGroupController";
import { SelectWithDrilldown } from "../../../../components/WithDrillDownSelect";
import { buildHierarchy } from "./utils";
import type { Group } from "@app/client";

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
  value: Group | undefined;
  onChange: (value: Group | undefined) => void;
  placeholderText: string;
  limit: number;
  helperText?: React.ReactNode;
  isRequired?: boolean;
  validated?: "success" | "warning" | "error" | "default";
}

const GroupSelectTypeahead: React.FC<GroupSelectTypeaheadProps> = ({
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

  const mappedGroups = groups?.data
    ? buildHierarchy(groups?.data, searchQuery.length < 1)
    : [];

  const onClear = (_event: React.SyntheticEvent) => {
    _event.stopPropagation();
    onChange(undefined);
    setSearchQuery("");
  };

  const onSelect = (group: Group) => {
    onChange(group);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <SelectWithDrilldown
      options={mappedGroups.map((gr) => ({
        ...gr,
        description: gr.parentsNames,
      }))}
      onSelect={onSelect}
      onInputChange={setSearchQuery}
      inputValue={searchQuery}
      onClear={onClear}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      displayText={value?.name || placeholderText}
      showClearBrn={!!value}
    />
  );
};
