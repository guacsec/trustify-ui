import React from "react";

import {
  Button,
  ButtonVariant,
  ExpandableSection,
  Form,
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
  HookFormPFGroupSelect,
  HookFormPFTextArea,
  HookFormPFTextInput,
} from "@app/components/HookFormPFFields";
import { HookFormPFAddLabels } from "@app/components/HookFormPFFields/HookFormPFAddLabels";
import { checkGroupNameUniqueness } from "@app/queries/sbom-groups";
import type { Group } from "@app/client";

type SBOMGroupFormValues = {
  name: string;
  parentGroup?: Group;
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

const defaultValues: SBOMGroupFormValues = {
  name: "",
  parentGroup: undefined,
  isProduct: "no",
  description: "",
  labels: [],
};

export const SBOMGroupFormModal: React.FC<SBOMGroupFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  type = "Create",
}) => {

  const [isAdvancedExpanded, setIsAdvancedExpanded] =
    React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
    trigger,
    formState: { isSubmitting, isValid, isValidating },
  } = useForm<SBOMGroupFormValues>({
    mode: "onBlur",
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  const parentGroup = watch("parentGroup");

  React.useEffect(() => {
    if (isOpen) {
      reset({
        ...defaultValues,
        ...initialValues,
      });
    }
  }, [isOpen, initialValues, reset]);

  // Re-validate name when parentGroup changes
  React.useEffect(() => {
    const name = getValues("name");
    if (name) {
      trigger("name");
    }
  }, [parentGroup, trigger, getValues]);

  const onSubmitHandler = (values: SBOMGroupFormValues) => {
    onSubmit(values);
  };

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
          <HookFormPFGroupSelect
            control={control}
            name="parentGroup"
            label="Parent group"
            fieldId="parent-group"
            placeholderText="Select parent group"
            helperText="Leave blank if this group does not have a parent"
            limit={0}
          />
          <HookFormPFTextInput
            control={control}
            controllerProps={{
              rules: {
                required: "This field is required",
                validate: async (value: string) => {
                  const currentParent = getValues("parentGroup");

                  // Skip uniqueness check if editing and neither name nor parent changed
                  if (
                    type === "Edit" &&
                    value === initialValues?.name &&
                    currentParent?.id === initialValues?.parentGroup?.id
                  ) {
                    return true;
                  }

                  const isUnique = await checkGroupNameUniqueness(
                    value,
                    currentParent?.id || undefined,
                  );
                  return (
                    isUnique ||
                    `${value} already exists${currentParent ? ` in ${currentParent.name}` : ""}`
                  );
                },
              },
            }}
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
          isLoading={isSubmitting || isValidating}
          spinnerAriaLabel="Loading"
          spinnerAriaValueText="Loading"
        >
          {type}
        </Button>
        <Button
          type="button"
          aria-label="Cancel"
          variant={ButtonVariant.link}
          isDisabled={isSubmitting}
          onClick={onClose}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
