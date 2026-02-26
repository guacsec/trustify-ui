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
  HookFormPFTextArea,
  HookFormPFTextInput,
} from "@app/components/HookFormPFFields";
import { HookFormPFAddLabels } from "@app/components/HookFormPFFields/HookFormPFAddLabels";
import type { Group, GroupRequest, Labels } from "@app/client";
import { HookFormPFGroupSelect } from "./HookFormPFGroupSelect";
import {
  checkSbomGroupNameUniqueness,
  splitStringAsKeyValue,
} from "@app/api/model-utils";

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
  onSubmit: (body: GroupRequest) => void | Promise<void>;
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

const convertValues = (values: SBOMGroupFormValues): GroupRequest => {
  // Convert labels array to Labels object
  const labelsObj: Labels = {};
  for (const label of values.labels) {
    const { key, value } = splitStringAsKeyValue(label);
    labelsObj[key] = value ?? "";
  }

  // Add Product label if isProduct is "yes"
  if (values.isProduct === "yes") {
    labelsObj.Product = "";
  }

  const body: GroupRequest = {
    name: values.name.trim(),
    description: values.description?.trim() || null,
    parent: values.parentGroup?.id || null,
    labels: Object.keys(labelsObj).length > 0 ? labelsObj : undefined,
  };

  return body;
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
  const [tempName, setTempName] = React.useState<string>("");
  const [tempParent, setTempParent] = React.useState<Group | undefined>(
    undefined,
  );

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
  const isProduct = watch("isProduct");

  React.useEffect(() => {
    if (isOpen) {
      reset({
        ...defaultValues,
        ...initialValues,
      });
    }
  }, [isOpen, initialValues, reset]);

  // Re-validate name when parentGroup changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: parentGroup is intentionally a dependency to re-trigger validation
  React.useEffect(() => {
    const name = getValues("name");
    if (name) {
      trigger("name");
    }
  }, [parentGroup, trigger, getValues]);

  const onSubmitHandler = (values: SBOMGroupFormValues) => {
    onSubmit(convertValues(values));
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
            limit={10}
          />
          <HookFormPFTextInput
            control={control}
            controllerProps={{
              rules: {
                validate: async (value: string, values) => {
                  const trimmed = value.trim();
                  if (!trimmed) return "This field is required";

                  const currentParent = values.parentGroup;

                  // Skip uniqueness check if editing and neither name nor parent changed or if not parent or name changed depending on previous input
                  if (
                    (type === "Edit" &&
                      trimmed === initialValues?.name &&
                      currentParent?.id === initialValues?.parentGroup?.id) ||
                    (currentParent?.id === tempParent?.id &&
                      trimmed === tempName)
                  ) {
                    return true;
                  }

                  setTempName(trimmed);
                  setTempParent(currentParent);

                  const isUnique = await checkSbomGroupNameUniqueness(
                    trimmed,
                    currentParent?.id || undefined,
                  );
                  return (
                    isUnique ||
                    `${trimmed} already exists${currentParent ? ` in ${currentParent.name}` : ""}`
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
              restrictedLabels={[
                "Product",
                ...(isProduct === "yes"
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
          isLoading={isSubmitting}
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
