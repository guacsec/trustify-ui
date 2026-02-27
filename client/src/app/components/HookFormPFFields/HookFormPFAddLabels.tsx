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
import { splitStringAsKeyValue } from "@app/api/model-utils";

export interface RestrictedLabelPattern {
  pattern: string | RegExp;
  errorMessage: string;
}

export type RestrictedLabel = string | RestrictedLabelPattern;

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
   * Restricted labels for adding.
   * Accepts strings (exact match, default error) or objects with pattern + errorMessage.
   *
   * @example
   * // exact match with default error
   * "Product"
   * // pattern match with custom error
   * { pattern: /^type=/, errorMessage: "Groups designated as products cannot have additional 'type' labels" }
   */
  restrictedLabels?: RestrictedLabel[];
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
    restrictedLabels?: RestrictedLabel[];
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
          if (
            !!trimmed &&
            trimmed.length > 0 &&
            /^(?!.*\\)(?!\s*\\)(?!\s*=)[^=\\\s][^=\\]*\s*=?\s*[^=\\]+$/.test(
              trimmed,
            )
          ) {
            const matchedRestriction = restrictedLabels.find((rule) => {
              if (typeof rule === "string") {
                return rule === trimmed;
              }
              const regex =
                rule.pattern instanceof RegExp
                  ? rule.pattern
                  : new RegExp(rule.pattern);
              return regex.test(trimmed);
            });
            if (matchedRestriction) {
              setLabelError(
                typeof matchedRestriction === "string"
                  ? `The label '${trimmed}' is reserved`
                  : matchedRestriction.errorMessage,
              );
              return;
            }
            if (labels.includes(trimmed)) {
              setLabelError("Label already exists");
              return;
            }
            const newOptionKeyValue = splitStringAsKeyValue(trimmed);
            const filteredLabels = labels.filter((label) => {
              const optionKeyValue = splitStringAsKeyValue(label);
              return optionKeyValue.key !== newOptionKeyValue.key;
            });
            onChange([...filteredLabels, trimmed]);
            setNewLabel("");
            setLabelError(null);
          } else return;
        };

        const handleDelete = (labelToRemove: string) => {
          onChange(labels.filter((l) => l !== labelToRemove));
        };

        return (
          <Stack hasGutter>
            <StackItem>Add metadata labels as key-value pairs</StackItem>
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
                validated={labelError ? "error" : "default"}
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
