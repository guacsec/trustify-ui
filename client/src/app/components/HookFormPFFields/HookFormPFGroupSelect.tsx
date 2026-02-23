import React from "react";
import type { FieldValues, Path } from "react-hook-form";

import {
  Button,
  Divider,
  Icon,
  MenuToggle,
  SearchInput,
  Select,
  SelectList,
  SelectOption,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities,
} from "@patternfly/react-core";
import {
  AngleLeftIcon,
  AngleRightIcon,
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

interface BreadcrumbItem {
  id: string;
  name: string;
}

const GroupSelectTypeahead: React.FC<GroupSelectTypeaheadProps> = ({
  fieldId,
  value,
  onChange,
  placeholderText,
  limit,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([]);
  const [currentGroups, setCurrentGroups] = React.useState<SBOMGroup[]>([]);

  // Debounced search query
  const [searchQuery, setSearchQuery] = React.useState("");

  // Fetch groups with search query
  const { groups, isFetching } = useFetchSBOMGroups({
    q: searchQuery,
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

  // Update current groups when fetched groups change
  React.useEffect(() => {
    // If user is searching, reset breadcrumbs and show all matching groups
    if (searchQuery) {
      setBreadcrumbs([]);
      setCurrentGroups(groups);
    } else if (breadcrumbs.length === 0) {
      setCurrentGroups(groups);
    } else {
      // Navigate to the current breadcrumb level
      const currentGroup = findGroupById(
        groups,
        breadcrumbs[breadcrumbs.length - 1].id,
      );
      setCurrentGroups(currentGroup?.children || []);
    }
  }, [groups, breadcrumbs, searchQuery, findGroupById]);

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Find group name by ID
  const findGroupNameById = (id: string): string => {
    const group = findGroupById(groups, id);
    return group?.name || id;
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (groupId: string) => {
    onChange(groupId);
    setInputValue("");
    setSearchQuery("");
    setIsOpen(false);
    setBreadcrumbs([]);
  };

  const onClear = () => {
    setInputValue("");
    setSearchQuery("");
  };

  const onNavigateToChildren = (event: React.MouseEvent, group: SBOMGroup) => {
    event.stopPropagation();
    setBreadcrumbs([...breadcrumbs, { id: group.id, name: group.name }]);
    setCurrentGroups(group.children || []);
  };

  const onNavigateBack = () => {
    const newBreadcrumbs = breadcrumbs.slice(0, -1);
    setBreadcrumbs(newBreadcrumbs);

    if (newBreadcrumbs.length === 0) {
      setCurrentGroups(groups);
    } else {
      const parentGroup = findGroupById(
        groups,
        newBreadcrumbs[newBreadcrumbs.length - 1].id,
      );
      setCurrentGroups(parentGroup?.children || []);
    }
  };

  const toggle = (toggleRef: React.Ref<HTMLButtonElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggle}
      isExpanded={isOpen}
      isFullWidth
      variant="typeahead"
    >
      <TextInputGroup isPlain>
        <TextInputGroupMain
          value={inputValue}
          onClick={onToggle}
          onChange={(_event, val) => setInputValue(val)}
          id={fieldId}
          autoComplete="off"
          placeholder={value ? findGroupNameById(value) : placeholderText}
        />
        {(!!inputValue || !!value) && (
          <TextInputGroupUtilities>
            <Button
              variant="plain"
              onClick={(e) => {
                e.stopPropagation();
                if (inputValue) {
                  onClear();
                } else {
                  onChange("");
                }
              }}
              aria-label="Clear input value"
            >
              <TimesIcon />
            </Button>
          </TextInputGroupUtilities>
        )}
      </TextInputGroup>
    </MenuToggle>
  );

  // Get parent group name for back button
  const getParentGroupName = (): string => {
    return breadcrumbs[breadcrumbs.length - 1].name;
  };

  return (
    <Select
      id={`${fieldId}-select`}
      isOpen={isOpen}
      selected={undefined}
      onSelect={(_event, selection) => {
        if (typeof selection === "string") {
          onSelect(selection);
        }
      }}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
      toggle={toggle}
    >
      <SelectList>
        {breadcrumbs.length < 1 && (
          <>
            <div style={{ padding: "8px" }}>
              <SearchInput
                placeholder="Search groups"
                value={inputValue}
                onChange={(_event, val) => setInputValue(val)}
                onClear={() => {
                  setInputValue("");
                  setSearchQuery("");
                }}
              />
            </div>
            <Divider />
          </>
        )}
        {breadcrumbs.length > 0 && (
          <>
            <SelectOption key="back" onClick={onNavigateBack}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Icon>
                  <AngleLeftIcon />
                </Icon>
                <span>{getParentGroupName()}</span>
              </div>
            </SelectOption>
            <Divider />
          </>
        )}
        {isFetching && (
          <SelectOption key="loading" isDisabled>
            Loading...
          </SelectOption>
        )}
        {!isFetching && currentGroups.length === 0 && (
          <SelectOption key="no-results" isDisabled>
            No results found
          </SelectOption>
        )}
        {!isFetching &&
          currentGroups.map((group) => (
            <SelectOption
              key={group.id}
              value={group.id}
              description={
                breadcrumbs.length > 0
                  ? `Child of ${breadcrumbs[breadcrumbs.length - 1].name}`
                  : undefined
              }
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>{group.name}</span>
                {group.children && group.children.length > 0 && (
                  <Icon
                    onClick={(e) => onNavigateToChildren(e, group)}
                    style={{ cursor: "pointer", marginLeft: "auto" }}
                  >
                    <AngleRightIcon />
                  </Icon>
                )}
              </div>
            </SelectOption>
          ))}
      </SelectList>
    </Select>
  );
};
