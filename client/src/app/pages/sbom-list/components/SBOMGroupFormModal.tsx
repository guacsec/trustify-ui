import React from "react";

import {
  Button,
  ButtonVariant,
  ExpandableSection,
  Form,
  FormSelectOption,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Radio,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { useForm } from "react-hook-form";

import {
  HookFormPFGroupController,
  HookFormPFSelect,
  HookFormPFTextArea,
  HookFormPFTextInput,
} from "@app/components/HookFormPFFields";
import { HookFormPFAddLabels } from "@app/components/HookFormPFFields/HookFormPFAddLabels";

type SBOMGroupFormValues = {
  name: string;
  parentGroup?: string;
  isProduct: "yes" | "no";
  description?: string;
  labels: string[];
};

export interface SBOMGroupFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: SBOMGroupFormValues) => void | Promise<void>;
  initialValues?: Partial<SBOMGroupFormValues>;
  type?: "Create" | "Edit";
}

export const SBOMGroupFormModal: React.FC<SBOMGroupFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  type = "Create",
}) => {
  const defaultValues: SBOMGroupFormValues = {
    name: "",
    parentGroup: "",
    isProduct: "no",
    description: "",
    labels: [],
  };

  const [isAdvancedExpanded, setIsAdvancedExpanded] =
    React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, isValidating },
  } = useForm<SBOMGroupFormValues>({
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset({
        ...defaultValues,
        ...initialValues,
      });
    }
  }, [isOpen, initialValues, reset]);

  const onSubmitHandler = (values: SBOMGroupFormValues) => {
    onSubmit(values);
  };

  const parentGroups: string[] = [];

  return (
    <Modal
      variant="small"
      isOpen={isOpen}
      onClose={onClose}
      aria-label={`${type} group`}
    >
      <ModalHeader title={`${type} group`} />
      <ModalBody>
        <Form id="sbom-group-form" onSubmit={handleSubmit(onSubmitHandler)}>
          <HookFormPFTextInput
            control={control}
            controllerProps={{
              rules: { required: "This field is required" },
            }}
            name="name"
            label="Group name"
            fieldId="group-name"
            isRequired
            placeholder="Enter group name"
          />

          <HookFormPFSelect
            control={control}
            name="parentGroup"
            label="Parent group"
            fieldId="parent-group"
            placeholder="Select parent group"
            helperText="Leave blank if this group does not have a parent"
          >
            {parentGroups.map((groupName) => (
              <FormSelectOption
                key={groupName}
                value={groupName}
                label={groupName}
              />
            ))}
          </HookFormPFSelect>

          <HookFormPFGroupController
            control={control}
            name="isProduct"
            fieldId="is-product"
            label="Is this group a product?"
            controllerProps={{
              rules: { required: "This field is required" },
            }}
            isRequired
            renderInput={({ field: { name, value, onChange } }) => (
              <Stack hasGutter>
                <StackItem>
                  <Radio
                    id="is-product-yes"
                    name={name}
                    label="Yes"
                    isChecked={value === "yes"}
                    onChange={() => {
                      onChange("yes");
                    }}
                  />
                </StackItem>
                <StackItem>
                  <Radio
                    id="is-product-no"
                    name={name}
                    label="No"
                    isChecked={value === "no"}
                    onChange={() => {
                      onChange("no");
                    }}
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
            <HookFormPFAddLabels
              control={control}
              name="labels"
              fieldId="labels"
              label="Labels"
              restrictedLabels={["Product"]}
            />
          </ExpandableSection>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          form="sbom-group-form"
          aria-label={`${type} btn`}
          variant={ButtonVariant.primary}
          isDisabled={!isValid || isSubmitting || isValidating}
        >
          {type}
        </Button>
        <Button
          type="button"
          aria-label="Cancel"
          variant={ButtonVariant.link}
          isDisabled={isSubmitting || isValidating}
          onClick={onClose}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
