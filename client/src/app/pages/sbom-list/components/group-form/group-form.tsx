import type React from "react";

import { Form, Radio, Stack, StackItem } from "@patternfly/react-core";

import type { Group } from "@app/client";
import {
  HookFormPFGroupController,
  HookFormPFTextArea,
  HookFormPFTextInput,
} from "@app/components/HookFormPFFields";

import type { useGroupForm } from "./useGroupForm";
import type { useGroupFormData } from "./useGroupFormData";
import { HookFormPFGroupSelect } from "../CreateGroupForm/HookFormPFGroupSelect";

export interface GroupFormProps {
  form: ReturnType<typeof useGroupForm>["form"];
  data: ReturnType<typeof useGroupFormData>;
  group: Group | null;
}

export const GroupForm: React.FC<GroupFormProps> = ({ form }) => {
  const { control } = form;

  return (
    <Form>
      <HookFormPFGroupSelect
        control={control}
        name="parentGroup"
        label="Parent group"
        fieldId="parent-group-id"
        placeholderText="Select parent group"
        helperText="Leave blank if this group does not have a parent"
        limit={10}
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

      {/* <ExpandableSection
        toggleText="Advanced"
        onToggle={(_event, val) => setIsAdvancedExpanded(val)}
        isExpanded={isAdvancedExpanded}
      >
        <HookFormPFAddLabels
          control={control}
          name="labels"
          fieldId="labels"
          label="Labels"
          restrictedLabels={[
            PRODUCT_LABEL_KEY,
            ...(isProduct
              ? [
                  {
                    pattern: /^type=/,
                    errorMessage:
                      "Groups designated as products cannot have additional 'type' labels",
                  },
                ]
              : []),
          ]}
        />
      </ExpandableSection> */}
    </Form>
  );
};
