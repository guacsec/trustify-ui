import type React from "react";
import { useState } from "react";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import {
  Button,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  NumberInput,
  Split,
  SplitItem,
  Stack,
  StackItem,
  Switch,
  TextInput,
} from "@patternfly/react-core";
import MinusIcon from "@patternfly/react-icons/dist/esm/icons/minus-icon";
import PlusCircleIcon from "@patternfly/react-icons/dist/esm/icons/plus-circle-icon";

import { Autocomplete } from "@app/components/Autocomplete/Autocomplete";
import type { AutocompleteOptionProps } from "@app/components/Autocomplete/type-utils";
import {
  HookFormPFGroupController,
  HookFormPFTextInput,
} from "@app/components/HookFormPFFields";
import { getString } from "@app/utils/utils";

import type { ImporterWizardFormValues } from "./schema";
import {
  ALL_CLEARLY_DEFINED_PACKAGE_TYPES,
  ALL_PERIOD_UNITS,
  ALL_SIZE_LIMITS,
  PERIOD_UNIT_LIST,
} from "./type-utils";

export const SetConfiguration: React.FC = () => {
  const [clearlyDefinedInputValue, setClearlyDefinedInputValue] = useState("");

  // Form
  const { control } = useFormContext<ImporterWizardFormValues>();

  const watchType = useWatch({
    control,
    name: "type",
  });

  const {
    fields: fieldsOnlyPatterns,
    append: appendOnlyPatterns,
    remove: removeOnlyPatterns,
  } = useFieldArray({
    control: control,
    name: "onlyPatterns",
  });

  const {
    fields: fieldsKeys,
    append: appendKeys,
    remove: removeKeys,
  } = useFieldArray({
    control: control,
    name: "keys",
  });

  const {
    fields: fieldsYears,
    append: appendYears,
    remove: removeYears,
  } = useFieldArray({
    control: control,
    name: "years",
  });

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <HookFormPFTextInput
        control={control}
        name="source"
        label="Source"
        fieldId="source"
        isRequired
      />
      <FormGroup label="Execution period" isRequired>
        <Split hasGutter>
          <SplitItem>
            <HookFormPFGroupController
              control={control}
              name="periodValue"
              fieldId="periodValue"
              renderInput={({ field: { value, onChange } }) => (
                <NumberInput
                  value={value}
                  onMinus={() => {
                    onChange(value - 1);
                  }}
                  onChange={onChange}
                  onPlus={() => {
                    onChange(value + 1);
                  }}
                  inputName="periodValue"
                  inputAriaLabel="period value"
                  minusBtnAriaLabel="minus"
                  plusBtnAriaLabel="plus"
                />
              )}
            />
          </SplitItem>
          <SplitItem>
            <HookFormPFGroupController
              control={control}
              name="periodUnit"
              fieldId="periodUnit"
              renderInput={({ field: { value, onChange, onBlur } }) => (
                <FormSelect
                  aria-label="period-unit"
                  isRequired
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  style={{ width: 110 }}
                >
                  {ALL_PERIOD_UNITS.map((option) => (
                    <FormSelectOption
                      key={option}
                      value={option}
                      label={PERIOD_UNIT_LIST[option].label}
                    />
                  ))}
                </FormSelect>
              )}
            />
          </SplitItem>
        </Split>
      </FormGroup>

      {(watchType === "sbom" || watchType === "csaf") && (
        <HookFormPFGroupController
          control={control}
          name="v3Signatures"
          fieldId="v3Signatures"
          renderInput={({ field: { value, onChange } }) => (
            <Switch
              id="v3Signatures"
              label="Enable v3 signatures"
              aria-label="v3 signature"
              isChecked={value}
              onChange={(_, checked) => {
                onChange(checked);
              }}
            />
          )}
        />
      )}
      {(watchType === "sbom" || watchType === "csaf") && (
        <HookFormPFGroupController
          control={control}
          name="ignoreMissing"
          fieldId="ignoreMissing"
          renderInput={({ field: { value, onChange } }) => (
            <Switch
              id="ignoreMissing"
              label="Ignore missing"
              aria-label="Ignore missing"
              isChecked={value}
              onChange={(_, checked) => {
                onChange(checked);
              }}
            />
          )}
        />
      )}
      {(watchType === "sbom" || watchType === "csaf") && (
        <Split>
          <SplitItem>
            <HookFormPFTextInput
              control={control}
              name="fetchRetries"
              label="Fetch retries"
              fieldId="fetchRetries"
              type="number"
            />
          </SplitItem>
        </Split>
      )}
      {(watchType === "sbom" || watchType === "quay") && (
        <FormGroup label="Size limit">
          <Split hasGutter>
            <SplitItem>
              <HookFormPFGroupController
                control={control}
                name="sizeLimitValue"
                fieldId="sizeLimitValue"
                renderInput={({ field: { value, onChange } }) => (
                  <TextInput
                    aria-label="size limit value"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </SplitItem>
            <SplitItem>
              <HookFormPFGroupController
                control={control}
                name="sizeLimitUnit"
                fieldId="sizeLimitUnit"
                renderInput={({ field: { value, onChange, onBlur } }) => (
                  <FormSelect
                    aria-label="size-limit-unit"
                    isRequired
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    style={{ width: 110 }}
                  >
                    {ALL_SIZE_LIMITS.map((option) => (
                      <FormSelectOption
                        key={option}
                        value={option}
                        label={option}
                      />
                    ))}
                  </FormSelect>
                )}
              />
            </SplitItem>
          </Split>
        </FormGroup>
      )}
      {(watchType === "sbom" || watchType === "csaf") && (
        <FormGroup label="Only patterns" fieldId="onlyPatterns">
          <Stack hasGutter>
            {fieldsOnlyPatterns.map((field, index) => {
              return (
                <StackItem key={field.id}>
                  <Split hasGutter>
                    <SplitItem isFilled>
                      <HookFormPFGroupController
                        control={control}
                        name={`onlyPatterns.${index}.value`}
                        fieldId={`onlyPatterns.${index}.value`}
                        renderInput={({
                          field: { value, onChange, onBlur },
                        }) => (
                          <TextInput
                            aria-label="only patterns"
                            onChange={(_, value) => {
                              onChange(value);
                            }}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                    </SplitItem>
                    <SplitItem>
                      <Button
                        icon={<MinusIcon />}
                        variant="tertiary"
                        onClick={() => {
                          removeOnlyPatterns(index);
                        }}
                      >
                        Remove
                      </Button>
                    </SplitItem>
                  </Split>
                </StackItem>
              );
            })}
            <StackItem>
              <Button
                icon={<PlusCircleIcon />}
                variant="tertiary"
                onClick={() => appendOnlyPatterns({ value: "" })}
              >
                Add Pattern
              </Button>
            </StackItem>
          </Stack>
        </FormGroup>
      )}
      {watchType === "sbom" && (
        <FormGroup label="Keys" fieldId="keys">
          <Stack hasGutter>
            {fieldsKeys.map((field, index) => {
              return (
                <StackItem key={field.id}>
                  <Split hasGutter>
                    <SplitItem isFilled>
                      <HookFormPFGroupController
                        control={control}
                        name={`keys.${index}.value`}
                        fieldId={`keys.${index}.value`}
                        renderInput={({
                          field: { value, onChange, onBlur },
                        }) => (
                          <TextInput
                            aria-label="keys"
                            onChange={(_, value) => {
                              onChange(value);
                            }}
                            onBlur={onBlur}
                            value={value}
                          />
                        )}
                      />
                    </SplitItem>
                    <SplitItem>
                      <Button
                        icon={<MinusIcon />}
                        variant="tertiary"
                        onClick={() => {
                          removeKeys(index);
                        }}
                      >
                        Remove
                      </Button>
                    </SplitItem>
                  </Split>
                </StackItem>
              );
            })}
            <StackItem>
              <Button
                icon={<PlusCircleIcon />}
                variant="tertiary"
                onClick={() => appendKeys({ value: "" })}
              >
                Add Key
              </Button>
            </StackItem>
          </Stack>
        </FormGroup>
      )}
      {watchType === "osv" && (
        <HookFormPFTextInput
          control={control}
          name="branch"
          label="Branch"
          fieldId="branch"
        />
      )}
      {watchType === "osv" && (
        <HookFormPFTextInput
          control={control}
          name="path"
          label="Path"
          fieldId="path"
        />
      )}
      {(watchType === "osv" || watchType === "cve") && (
        <FormGroup label="Years" fieldId="years">
          <Stack hasGutter>
            {fieldsYears.map((field, index) => {
              return (
                <StackItem key={field.id}>
                  <Split hasGutter>
                    <SplitItem>
                      <HookFormPFGroupController
                        control={control}
                        name={`years.${index}.value`}
                        fieldId={`years.${index}.value`}
                        renderInput={({
                          field: { value, onChange, onBlur },
                        }) => (
                          <TextInput
                            aria-label="years"
                            onChange={(_, value) => {
                              onChange(value);
                            }}
                            onBlur={onBlur}
                            value={value}
                            type="number"
                          />
                        )}
                      />
                    </SplitItem>
                    <SplitItem>
                      <Button
                        icon={<MinusIcon />}
                        variant="tertiary"
                        onClick={() => {
                          removeYears(index);
                        }}
                      >
                        Remove
                      </Button>
                    </SplitItem>
                  </Split>
                </StackItem>
              );
            })}
            <StackItem>
              <Button
                icon={<PlusCircleIcon />}
                variant="tertiary"
                onClick={() => appendYears({ value: 1 })}
              >
                Add Year
              </Button>
            </StackItem>
          </Stack>
        </FormGroup>
      )}
      {(watchType === "osv" || watchType === "cve") && (
        <Split>
          <SplitItem>
            <HookFormPFTextInput
              control={control}
              name="startYear"
              label="Start year"
              fieldId="startYear"
              type="number"
            />
          </SplitItem>
        </Split>
      )}
      {(watchType === "clearly_defined" ||
        watchType === "clearly_defined_curation") && (
        <HookFormPFGroupController
          control={control}
          name="clearlyDefinedTypes"
          label="Types"
          fieldId="clearlyDefinedTypes"
          renderInput={({ field: { value, onChange } }) => (
            <Autocomplete
              showChips
              options={ALL_CLEARLY_DEFINED_PACKAGE_TYPES.filter(
                (e) => e.indexOf(clearlyDefinedInputValue) !== -1,
              ).map((option) => ({
                id: option,
                name: option,
              }))}
              selections={value?.map((value) => {
                const option: AutocompleteOptionProps = {
                  id: value,
                  name: value,
                };
                return option;
              })}
              onChange={(selections) => {
                const newFilterValue = selections.map((option) =>
                  getString(option.name),
                );
                onChange(newFilterValue);
              }}
              noResultsMessage="No search results"
              placeholderText="Types"
              searchInputAriaLabel="select-autocomplete-listbox"
              onSearchChange={setClearlyDefinedInputValue}
            />
          )}
        />
      )}
      {watchType === "quay" && (
        <HookFormPFTextInput
          control={control}
          name="apiToken"
          label="Api Token"
          fieldId="apiToken"
          isRequired
          type="password"
        />
      )}
      {watchType === "quay" && (
        <HookFormPFTextInput
          control={control}
          name="namespace"
          label="Namespace"
          fieldId="namespace"
          isRequired
        />
      )}
      {watchType === "quay" && (
        <HookFormPFTextInput
          control={control}
          name="concurrency"
          label="Concurrency"
          fieldId="concurrency"
          type="number"
        />
      )}
    </Form>
  );
};
