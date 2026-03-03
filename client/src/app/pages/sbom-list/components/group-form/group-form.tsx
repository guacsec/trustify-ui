import React from "react";

import {
  Card,
  ExpandableSection,
  Form,
  Label,
  LabelGroup,
  Radio,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { splitStringAsKeyValue } from "@app/api/model-utils";
import type { Group } from "@app/client";
import { Autocomplete } from "@app/components/Autocomplete/Autocomplete";
import type { AutocompleteOptionProps } from "@app/components/Autocomplete/type-utils";
import {
  HookFormPFGroupController,
  HookFormPFTextArea,
  HookFormPFTextInput,
} from "@app/components/HookFormPFFields";
import { LABEL_VALIDATION_REGEX, PRODUCT_LABEL_KEY } from "@app/Constants";
import { getString } from "@app/utils/utils";

import { GroupSelect } from "../sbom-group-select/sbom-group-select";
import type { useGroupForm } from "./useGroupForm";
import type { useGroupFormData } from "./useGroupFormData";

export interface GroupFormProps {
  form: ReturnType<typeof useGroupForm>["form"];
  data: ReturnType<typeof useGroupFormData>;
  group: Group | null;
}

const labelToOption = (label: string): AutocompleteOptionProps => ({
  id: label,
  name: label,
});

export const GroupForm: React.FC<GroupFormProps> = ({ form }) => {
  const { control, watch } = form;
  const isProduct = watch("isProduct");

  const [isAdvancedExpanded, setIsAdvancedExpanded] = React.useState(false);

  return (
    <Form>
      <HookFormPFGroupController
        control={control}
        name="parentGroup"
        label="Parent group"
        fieldId="parent-group-id"
        helperText="Leave blank if this group does not have a parent"
        renderInput={({ field: { onChange, value } }) => (
          <GroupSelect
            value={value || undefined}
            onChange={onChange}
            placeholder={"Select parent group"}
            limit={10}
          />
        )}
      />

      <HookFormPFTextInput
        control={control}
        name="name"
        label="Group name"
        fieldId="group-name"
        isRequired
        placeholder="Enter group name"
      />

      <HookFormPFGroupController
        control={control}
        name="isProduct"
        fieldId="is-product"
        label="Is this group a product?"
        isRequired
        renderInput={({ field: { name, value, onChange } }) => (
          <Stack hasGutter>
            <StackItem>
              <Radio
                id="is-product-yes"
                name={name}
                label="Yes"
                isChecked={value === true}
                onChange={() => onChange(true)}
              />
            </StackItem>
            <StackItem>
              <Radio
                id="is-product-no"
                name={name}
                label="No"
                isChecked={value === false}
                onChange={() => onChange(false)}
              />
            </StackItem>
          </Stack>
        )}
      />

      <HookFormPFTextArea
        control={control}
        name="description"
        label="Description"
        fieldId="description"
        resizeOrientation="vertical"
        placeholder="Brief description of the group"
      />

      <ExpandableSection
        toggleText="Advanced"
        onToggle={(_event, val) => setIsAdvancedExpanded(val)}
        isExpanded={isAdvancedExpanded}
      >
        <HookFormPFGroupController
          control={control}
          name="labels"
          fieldId="labels"
          label="Labels"
          renderInput={({ field: { value, onChange } }) => {
            const labels = (value ?? []) as string[];
            const selections = labels.map(labelToOption);

            return (
              <Stack hasGutter>
                <StackItem>Add metadata labels as key-value pairs</StackItem>
                <StackItem>
                  <Card
                    style={{ padding: 10, minHeight: 100, borderRadius: 8 }}
                  >
                    <LabelGroup numLabels={10}>
                      {labels.map((label) => (
                        <Label
                          key={label}
                          color="blue"
                          onClose={() =>
                            onChange(labels.filter((l) => l !== label))
                          }
                        >
                          {label}
                        </Label>
                      ))}
                    </LabelGroup>
                  </Card>
                </StackItem>
                <StackItem>
                  <Autocomplete
                    selections={selections}
                    options={[]}
                    onChange={(newSelections) =>
                      onChange(newSelections.map((o) => getString(o.name)))
                    }
                    placeholderText="Add label"
                    searchInputAriaLabel="labels-select-toggle"
                    onCreateNewOption={(val) => ({
                      id: val,
                      name: val,
                    })}
                    validateNewOption={(val) => {
                      if (!val || val.trim().length === 0) return false;
                      if (!LABEL_VALIDATION_REGEX.test(val)) return false;

                      const { key } = splitStringAsKeyValue(val);
                      if (key === PRODUCT_LABEL_KEY)
                        return `The label '${PRODUCT_LABEL_KEY}' is reserved`;
                      if (isProduct && /^type=/.test(val))
                        return "Groups designated as products cannot have additional 'type' labels";

                      return true;
                    }}
                    filterBeforeOnChange={(selections, newOption) => {
                      const newOptionKeyValue = splitStringAsKeyValue(
                        getString(newOption.name),
                      );
                      return selections.filter((option) => {
                        const optionKeyValue = splitStringAsKeyValue(
                          getString(option.name),
                        );
                        return optionKeyValue.key !== newOptionKeyValue.key;
                      });
                    }}
                  />
                </StackItem>
              </Stack>
            );
          }}
        />
      </ExpandableSection>
    </Form>
  );
};
