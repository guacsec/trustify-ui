import type React from "react";

import { Form } from "@patternfly/react-core";

import { HookFormPFGroupController } from "@app/components/HookFormPFFields";

import { SbomGroupSelect } from "@app/pages/sbom-groups/components/sbom-group-select/sbom-group-select";
import type { useAddToGroupForm } from "./useAddToGroupForm";
import type { useAddToGroupFormData } from "./useAddToGroupFormData";

export interface IAddToGroupFormProps {
  form: ReturnType<typeof useAddToGroupForm>["form"];
  data: ReturnType<typeof useAddToGroupFormData>;
}

export const AddToGroupForm: React.FC<IAddToGroupFormProps> = ({ form }) => {
  const { control } = form;

  return (
    <Form>
      <HookFormPFGroupController
        control={control}
        name="targetGroup"
        label="Select group"
        fieldId="target-group-id"
        isRequired
        renderInput={({ field: { onChange, value } }) => {
          return (
            <SbomGroupSelect value={value || undefined} onChange={onChange} />
          );
        }}
      />
    </Form>
  );
};
