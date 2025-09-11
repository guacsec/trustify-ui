import type React from "react";

import { useFormContext, useWatch } from "react-hook-form";

import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  List,
  ListItem,
} from "@patternfly/react-core";

import { LabelsAsList } from "@app/components/LabelsAsList";

import type { ImporterWizardFormValues } from "./schema";
import {
  type AllImporterConfigurations,
  getImporterConfigurationFromFormValues,
  type ImporterType,
} from "./type-utils";

export const Review: React.FC = () => {
  const { control, getValues } = useFormContext<ImporterWizardFormValues>();

  const nameType = useWatch({
    control,
    name: "name",
  });

  const watchType = useWatch({
    control,
    name: "type",
  });
  const configurationType = watchType as ImporterType;

  const formValues = getValues();
  const configuration = getImporterConfigurationFromFormValues(
    configurationType,
    formValues,
  );

  const { description, disabled, labels, period, source, apiToken, ...rest } =
    // biome-ignore lint/suspicious/noExplicitAny: allowed
    (configuration as any)[configurationType] as AllImporterConfigurations;

  return (
    <DescriptionList
      columnModifier={{
        default: "2Col",
      }}
    >
      <DescriptionListGroup>
        <DescriptionListTerm>Name</DescriptionListTerm>
        <DescriptionListDescription>{nameType}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Description</DescriptionListTerm>
        <DescriptionListDescription>{description}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Enabled</DescriptionListTerm>
        <DescriptionListDescription>
          {disabled ? "No" : "Yes"}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Labels</DescriptionListTerm>
        <DescriptionListDescription>
          <LabelsAsList value={labels ?? {}} />
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Source</DescriptionListTerm>
        <DescriptionListDescription>{source}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Period</DescriptionListTerm>
        <DescriptionListDescription>{period}</DescriptionListDescription>
      </DescriptionListGroup>
      {apiToken && (
        <DescriptionListGroup>
          <DescriptionListTerm>Api Token</DescriptionListTerm>
          <DescriptionListDescription>***</DescriptionListDescription>
        </DescriptionListGroup>
      )}

      {Object.entries(rest)
        .filter(([_key, value]) => {
          if (value === null || value === undefined) {
            return false;
          } else if (Array.isArray(value) || typeof value === "string") {
            return value.length > 0;
          } else if (typeof value === "boolean") {
            return value;
          } else {
            return true;
          }
        })
        .map(([key, value]) => (
          <DescriptionListGroup key={key}>
            <DescriptionListTerm>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </DescriptionListTerm>
            <DescriptionListDescription>
              {typeof value === "string" || typeof value === "number"
                ? value
                : null}
              {typeof value === "boolean" ? (value ? "Yes" : "No") : null}
              {Array.isArray(value) ? (
                <List>
                  {value.map((item) => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </List>
              ) : null}
            </DescriptionListDescription>
          </DescriptionListGroup>
        ))}
    </DescriptionList>
  );
};
