import React from "react";

import { useFormContext } from "react-hook-form";

import {
  Card,
  Form,
  FormGroupLabelHelp,
  FormSelectOption,
  Label,
  LabelGroup,
  Popover,
  Stack,
  StackItem,
  Switch,
  TextInput,
} from "@patternfly/react-core";

import { splitStringAsKeyValue } from "@app/api/model-utils";
import type { Importer } from "@app/client";
import {
  HookFormPFGroupController,
  HookFormPFSelect,
  HookFormPFTextArea,
  HookFormPFTextInput,
} from "@app/components/HookFormPFFields";
import { validateLabelString } from "@app/utils/utils";

import type { ImporterWizardFormValues } from "./schema";
import { ALL_IMPORTER_TYPES } from "./type-utils";

export const SELECT_ONE = "select-one";

//

interface ISetGeneralInformationProps {
  importer: Importer | null;
}

export const SetGeneralInformation: React.FC<ISetGeneralInformationProps> = ({
  importer,
}) => {
  const { control } = useFormContext<ImporterWizardFormValues>();

  const [labelInputTextValue, setLabelInputTextValue] = React.useState("");

  const labelsHelpRef = React.useRef(null);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <HookFormPFSelect
        control={control}
        name="type"
        label="Type"
        fieldId="type"
        isRequired
        isDisabled={!!importer}
      >
        <FormSelectOption value={SELECT_ONE} label="Select one" isDisabled />
        {ALL_IMPORTER_TYPES.map((option) => (
          <FormSelectOption key={option} value={option} label={option} />
        ))}
      </HookFormPFSelect>
      <HookFormPFTextInput
        control={control}
        name="name"
        label="Name"
        fieldId="name"
        isRequired
        isDisabled={!!importer}
      />
      <HookFormPFTextArea
        control={control}
        name="description"
        label="Description"
        fieldId="description"
        resizeOrientation="vertical"
      />

      <HookFormPFGroupController
        control={control}
        name="enabled"
        fieldId="enabled"
        renderInput={({ field: { value, onChange } }) => (
          <Switch
            id="enabled"
            label="Enabled"
            aria-label="Enable importer"
            isChecked={value}
            onChange={(_, checked) => {
              onChange(checked);
            }}
          />
        )}
      />
      <HookFormPFGroupController
        control={control}
        name="labels"
        label="Labels"
        fieldId="labels"
        formGroupProps={{
          labelHelp: (
            <Popover
              triggerRef={labelsHelpRef}
              bodyContent={
                <div>These labels will be added to each document imported.</div>
              }
            >
              <FormGroupLabelHelp
                ref={labelsHelpRef}
                aria-label="More info for labels field"
              />
            </Popover>
          ),
        }}
        renderInput={({ field: { value, onChange } }) => {
          const onAddNewLabel = () => {
            if (validateLabelString(labelInputTextValue)) {
              const newLabel = splitStringAsKeyValue(labelInputTextValue);
              const filteredLabels = value.filter((option) => {
                const optionKeyValue = splitStringAsKeyValue(option);
                return optionKeyValue.key !== newLabel.key;
              });

              onChange([...filteredLabels, labelInputTextValue]);
              setLabelInputTextValue("");
            }
          };

          return (
            <Stack hasGutter>
              {value.length > 0 && (
                <StackItem>
                  <Card>
                    <LabelGroup
                      style={{ padding: 10, minHeight: 10 }}
                      defaultIsOpen
                      numLabels={10}
                    >
                      {value.map((item, index) => (
                        <Label
                          key={item}
                          color="blue"
                          onClose={() => {
                            const newSelected = [...value];
                            newSelected.splice(index, 1);
                            onChange(newSelected);
                          }}
                        >
                          {item}
                        </Label>
                      ))}
                    </LabelGroup>
                  </Card>
                </StackItem>
              )}
              <StackItem>
                <TextInput
                  aria-label="label input"
                  value={labelInputTextValue}
                  type="text"
                  onChange={(_event, inputTextValue) =>
                    setLabelInputTextValue(inputTextValue)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      onAddNewLabel();
                    }
                  }}
                  onBlur={() => {
                    onAddNewLabel();
                  }}
                  validated={
                    labelInputTextValue.length > 1 &&
                    !validateLabelString(labelInputTextValue)
                      ? "error"
                      : undefined
                  }
                />
              </StackItem>
            </Stack>
          );
        }}
      />
    </Form>
  );
};
