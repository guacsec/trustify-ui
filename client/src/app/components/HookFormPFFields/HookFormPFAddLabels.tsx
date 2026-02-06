import React from "react";

import {
  Card,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Label,
  LabelGroup,
  Stack,
  StackItem,
  TextInput,
} from "@patternfly/react-core";
import type { FieldValues, Path } from "react-hook-form";

import {
  type BaseHookFormPFGroupControllerProps,
  HookFormPFGroupController,
  extractGroupControllerProps,
} from "./HookFormPFGroupController";

export type HookFormPFAddLabelsProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = BaseHookFormPFGroupControllerProps<TFieldValues, TName> & {
  /**
   * Placeholder text for the label input.
   */
  inputPlaceholder?: string;
  /**
   * Aria-label for the label input.
   */
  inputAriaLabel?: string;
  /**
   * Restricted labels for adding, f.e Product inside SBOM create group form.
   */
  restrictedLabels?: string[];
};

export const HookFormPFAddLabels = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>(
  props: HookFormPFAddLabelsProps<TFieldValues, TName>,
) => {
  const { extractedProps, remainingProps } = extractGroupControllerProps<
    TFieldValues,
    TName,
    HookFormPFAddLabelsProps<TFieldValues, TName>
  >(props);

  const {
    inputPlaceholder = "Add label",
    inputAriaLabel = "add-label-input",
    restrictedLabels = [],
  } = remainingProps as {
    inputPlaceholder?: string;
    inputAriaLabel?: string;
    restrictedLabels?: string[];
  };

  const [newLabel, setNewLabel] = React.useState<string>("");
  const [labelError, setLabelError] = React.useState<string | null>(null);

  return (
    <HookFormPFGroupController<TFieldValues, TName>
      {...extractedProps}
      renderInput={({ field: { value, onChange } }) => {
        const labels = (value ?? []) as string[];

        const handleAdd = () => {
          const trimmed = newLabel.trim();
          if (!trimmed) {
            return;
          }
          if (restrictedLabels.includes(trimmed)) {
            setLabelError(`The label '${trimmed}' is reserved`);
            return;
          }
          if (labels.includes(trimmed)) {
            setLabelError("Label already exists");
            return;
          }
          onChange([...labels, trimmed]);
          setNewLabel("");
          setLabelError(null);
        };

        const handleDelete = (labelToRemove: string) => {
          onChange(labels.filter((l) => l !== labelToRemove));
        };

        return (
          <Stack hasGutter>
            <StackItem>Add metadata labels</StackItem>
            <StackItem>
              <Card style={{ padding: 10, minHeight: 100, borderRadius: 8 }}>
                <LabelGroup numLabels={10}>
                  {labels.map((label) => (
                    <Label
                      key={label}
                      color="blue"
                      onClose={() => handleDelete(label)}
                    >
                      {label}
                    </Label>
                  ))}
                </LabelGroup>
              </Card>
            </StackItem>
            <StackItem>
              <TextInput
                value={newLabel}
                aria-label={inputAriaLabel}
                placeholder={inputPlaceholder}
                onChange={(_event, value) => {
                  setNewLabel(value);
                  if (labelError) {
                    setLabelError(null);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAdd();
                  }
                }}
              />
              {labelError && (
                <FormHelperText>
                  <HelperText>
                    <HelperTextItem variant="error">
                      {labelError}
                    </HelperTextItem>
                  </HelperText>
                </FormHelperText>
              )}
            </StackItem>
          </Stack>
        );
      }}
    />
  );
};
