import React from "react";

import {
  Alert,
  Button,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Label,
  Stack,
  StackItem,
  Tab,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import type { SbomModel } from "@app/client";

import { getModelProperties, parseSafetyRisks } from "./utils";

export interface ExternalReference {
  type: string;
  url: string;
  comment?: string;
}

const parseExternalReferences = (json?: string): ExternalReference[] => {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

interface IAIModelDetailsProps {
  model: SbomModel;
}

export const AIModelDetails: React.FC<IAIModelDetailsProps> = ({ model }) => {
  const [activeTabKey, setActiveTabKey] = React.useState("overview");
  const props = getModelProperties(model.properties);
  const externalRefs = parseExternalReferences(props.external_references);
  const safetyRisks = parseSafetyRisks(props.safetyRiskAssessment);

  return (
    <Tabs
      isFilled
      activeKey={activeTabKey}
      onSelect={(_e, key) => setActiveTabKey(key as string)}
      aria-label="AI model details tabs"
      role="region"
    >
      <Tab eventKey="overview" title={<TabTitleText>Overview</TabTitleText>}>
        <Stack hasGutter style={{ paddingTop: 16 }}>
          <StackItem>
            <DescriptionList isCompact columnModifier={{ default: "2Col" }}>
              {props.typeOfModel && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Model type</DescriptionListTerm>
                  <DescriptionListDescription>
                    {props.typeOfModel}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {props.primaryPurpose && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Primary purpose</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label color="blue">{props.primaryPurpose}</Label>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {props.licenses && (
                <DescriptionListGroup>
                  <DescriptionListTerm>License</DescriptionListTerm>
                  <DescriptionListDescription>
                    {props.licenses}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {props.suppliedBy && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Supplied by</DescriptionListTerm>
                  <DescriptionListDescription>
                    {props.suppliedBy}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
            </DescriptionList>
          </StackItem>
          {safetyRisks.length > 0 && (
            <StackItem>
              <Alert variant="warning" isInline title="Safety Risk Assessment">
                <Stack hasGutter>
                  {safetyRisks.map((risk, index) => (
                    <StackItem key={index}>
                      <strong>{risk.name}</strong>
                      {risk.mitigationStrategy && (
                        <Content component="p">
                          Mitigation: {risk.mitigationStrategy}
                        </Content>
                      )}
                    </StackItem>
                  ))}
                </Stack>
              </Alert>
            </StackItem>
          )}
          {props.limitation && (
            <StackItem>
              <Content component="h4">Limitations</Content>
              <Content component="p">{props.limitation}</Content>
            </StackItem>
          )}
        </Stack>
      </Tab>

      <Tab
        eventKey="metadata"
        title={<TabTitleText>SBOM Metadata</TabTitleText>}
      >
        <Stack hasGutter style={{ paddingTop: 16 }}>
          <StackItem>
            <DescriptionList isCompact columnModifier={{ default: "2Col" }}>
              {props.bomFormat && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Format</DescriptionListTerm>
                  <DescriptionListDescription>
                    {props.bomFormat}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {props.specVersion && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Spec version</DescriptionListTerm>
                  <DescriptionListDescription>
                    {props.specVersion}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {props.serialNumber && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Serial number</DescriptionListTerm>
                  <DescriptionListDescription>
                    {props.serialNumber}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {props.version && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Manifest version</DescriptionListTerm>
                  <DescriptionListDescription>
                    {props.version}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
            </DescriptionList>
          </StackItem>
        </Stack>
      </Tab>

      <Tab
        eventKey="references"
        title={<TabTitleText>References</TabTitleText>}
      >
        <Stack hasGutter style={{ paddingTop: 16 }}>
          {externalRefs.length > 0 && (
            <StackItem>
              <DescriptionList isCompact>
                {externalRefs.map((ref) => (
                  <DescriptionListGroup key={`${ref.type}-${ref.url}`}>
                    <DescriptionListTerm>{ref.type}</DescriptionListTerm>
                    <DescriptionListDescription>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {ref.comment || ref.url} <ExternalLinkAltIcon />
                      </a>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                ))}
              </DescriptionList>
            </StackItem>
          )}
          {props.downloadLocation && (
            <StackItem>
              <Button
                variant="secondary"
                component="a"
                href={props.downloadLocation}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ExternalLinkAltIcon />}
                iconPosition="end"
              >
                Download
              </Button>
            </StackItem>
          )}
        </Stack>
      </Tab>
    </Tabs>
  );
};
