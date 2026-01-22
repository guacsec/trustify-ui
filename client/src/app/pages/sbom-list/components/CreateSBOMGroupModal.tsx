import React from "react";

import {
  Button,
  ButtonVariant,
  Card,
  ExpandableSection,
  Form,
  FormSelectOption,
  Label,
  LabelGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Radio,
  Stack,
  StackItem,
  TextInput,
} from "@patternfly/react-core";
import { useForm } from "react-hook-form";

import {
  HookFormPFGroupController,
  HookFormPFSelect,
  HookFormPFTextArea,
  HookFormPFTextInput,
} from "@app/components/HookFormPFFields";

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
  const [newLabel, setNewLabel] = React.useState<string>("");

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
            <FormSelectOption value="" label="No parent" />
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
            <HookFormPFGroupController
              control={control}
              name={"labels"}
              fieldId="labels"
              label="Labels"
              renderInput={({ field: { value, onChange } }) => {
                const labels = (value ?? []) as string[];

                const handleAdd = () => {
                  const trimmed = newLabel.trim();
                  if (!trimmed || labels.includes(trimmed)) {
                    return;
                  }
                  onChange([...labels, trimmed]);
                  setNewLabel("");
                };

                const handleDelete = (labelToRemove: string) => {
                  onChange(labels.filter((l) => l !== labelToRemove));
                };

                return (
                  <Stack hasGutter>
                    <StackItem>Add metadata labels</StackItem>
                    <StackItem>
                      <Card>
                        <LabelGroup numLabels={10} style={{ padding: 10 }}>
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
                        aria-label="add-label-input"
                        placeholder="Add label"
                        onChange={(_event, value) => setNewLabel(value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleAdd();
                          }
                        }}
                      />
                    </StackItem>
                  </Stack>
                );
              }}
            />
          </ExpandableSection>
          <ModalFooter>
            <Button
              type="submit"
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
        </Form>
      </ModalBody>
    </Modal>
  );
};
