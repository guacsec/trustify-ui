import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  CardTitle,
  CodeBlock,
  CodeBlockCode,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Label,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import type { IconedStatusPreset } from "@app/components/IconedStatus";
import { IconedStatus } from "@app/components/IconedStatus";

import type { CryptoAlgorithm } from "../crypto-context";

interface ICryptoAlgorithmDetailProps {
  algorithm: CryptoAlgorithm;
}

const policyPresetMap: Record<string, IconedStatusPreset> = {
  Compliant: "Compliant",
  Warning: "Warning",
  NonCompliant: "NonCompliant",
};

const policyReasonMap: Record<string, { label: string; description: string }> =
  {
    Compliant: {
      label: "Post-quantum",
      description: "Post-quantum safe algorithm",
    },
    Warning: {
      label: "Classical only",
      description: "Classical algorithm, not post-quantum",
    },
    NonCompliant: {
      label: "Weak / broken",
      description: "Weak or broken algorithm",
    },
  };

/** Extracts nested algorithm or related-crypto-material properties. */
const getAlgProps = (
  algorithm: CryptoAlgorithm,
): Record<string, unknown> | undefined => {
  const props = algorithm.properties as Record<string, unknown>;
  return (props?.algorithmProperties ??
    props?.relatedCryptoMaterialProperties) as
    Record<string, unknown> | undefined;
};

/** Drawer content component for a selected cryptographic algorithm or key. */
export const CryptoAlgorithmDetail: React.FC<ICryptoAlgorithmDetailProps> = ({
  algorithm,
}) => {
  const props = algorithm.properties as Record<string, unknown>;
  const algProps = getAlgProps(algorithm);

  const primitive =
    (algProps?.primitive as string) ?? (algProps?.type as string) ?? undefined;
  const cryptoFunctions = algProps?.cryptoFunctions as string[] | undefined;
  const usage = props?.detectionContext as string | undefined;
  const occurrences = (props?.occurrences as number) ?? 1;

  const executionEnvironment = algProps?.executionEnvironment as
    string | undefined;
  const implementationPlatform = algProps?.implementationPlatform as
    string | undefined;
  const scanner = props?.scanner as string | undefined;
  const source = props?.source as string | undefined;

  const detectionRules = props?.detectionRules as string[] | undefined;
  const analysisMethod = props?.analysisMethod as string | undefined;

  const evidence = props?.evidence as
    | Array<{
        file: string;
        line: number;
        snippet: string;
      }>
    | undefined;

  const relatedSboms = props?.relatedSboms as
    Array<{ id: string; name: string }> | undefined;

  const policyStatus = algorithm.policy_status;
  const reason = policyReasonMap[policyStatus];

  return (
    <Stack hasGutter>
      <StackItem>
        <Card isCompact>
          <CardTitle>Summary</CardTitle>
          <CardBody>
            <DescriptionList isCompact>
              <DescriptionListGroup>
                <DescriptionListTerm>Name</DescriptionListTerm>
                <DescriptionListDescription>
                  {algorithm.name}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Asset type</DescriptionListTerm>
                <DescriptionListDescription>
                  <Label color="blue">{algorithm.asset_type}</Label>
                </DescriptionListDescription>
              </DescriptionListGroup>
              {primitive && (
                <DescriptionListGroup>
                  <DescriptionListTerm>
                    Primitive / material
                  </DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label color="blue">{primitive}</Label>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {cryptoFunctions && cryptoFunctions.length > 0 && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Functions</DescriptionListTerm>
                  <DescriptionListDescription>
                    {cryptoFunctions.map((fn) => (
                      <Label key={fn} color="blue" style={{ marginRight: 4 }}>
                        {fn}
                      </Label>
                    ))}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {usage && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Usage</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label color="blue">{usage}</Label>
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              <DescriptionListGroup>
                <DescriptionListTerm>Occurrences</DescriptionListTerm>
                <DescriptionListDescription>
                  {occurrences}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </StackItem>

      {(scanner ||
        source ||
        executionEnvironment ||
        implementationPlatform) && (
        <StackItem>
          <Card isCompact>
            <CardTitle>Detection</CardTitle>
            <CardBody>
              <DescriptionList isCompact>
                {scanner && (
                  <DescriptionListGroup>
                    <DescriptionListTerm>Scanner</DescriptionListTerm>
                    <DescriptionListDescription>
                      {scanner}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                )}
                {source && (
                  <DescriptionListGroup>
                    <DescriptionListTerm>Source</DescriptionListTerm>
                    <DescriptionListDescription>
                      {source}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                )}
                {executionEnvironment && (
                  <DescriptionListGroup>
                    <DescriptionListTerm>Execution</DescriptionListTerm>
                    <DescriptionListDescription>
                      {executionEnvironment}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                )}
                {implementationPlatform && (
                  <DescriptionListGroup>
                    <DescriptionListTerm>Platform</DescriptionListTerm>
                    <DescriptionListDescription>
                      {implementationPlatform}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                )}
              </DescriptionList>
            </CardBody>
          </Card>
        </StackItem>
      )}

      {detectionRules && detectionRules.length > 0 && (
        <StackItem>
          <Card isCompact>
            <CardTitle>Detection rules</CardTitle>
            <CardBody>
              <CodeBlock>
                <CodeBlockCode>{detectionRules.join("\n")}</CodeBlockCode>
              </CodeBlock>
              {analysisMethod && (
                <Content component="small">{analysisMethod}</Content>
              )}
            </CardBody>
          </Card>
        </StackItem>
      )}

      {evidence && evidence.length > 0 && (
        <StackItem>
          <Card isCompact>
            <CardTitle>Evidence</CardTitle>
            <CardBody>
              <Content component="p" style={{ marginBottom: 8 }}>
                {evidence.length} site{evidence.length !== 1 ? "s" : ""} in
                source
              </Content>
              <Stack hasGutter>
                {evidence.map((e, i) => (
                  <StackItem key={i}>
                    <Content component="small">
                      {e.file}
                      {e.line != null && `:${e.line}`}
                    </Content>
                    {e.snippet && (
                      <CodeBlock>
                        <CodeBlockCode>{e.snippet}</CodeBlockCode>
                      </CodeBlock>
                    )}
                  </StackItem>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </StackItem>
      )}

      <StackItem>
        <Card isCompact>
          <CardTitle>Policy compliance</CardTitle>
          <CardBody>
            <DescriptionList isCompact>
              <DescriptionListGroup>
                <DescriptionListTerm>Overall</DescriptionListTerm>
                <DescriptionListDescription>
                  <IconedStatus
                    preset={policyPresetMap[policyStatus] ?? "Unknown"}
                  />
                </DescriptionListDescription>
              </DescriptionListGroup>
              {reason && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Reason</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label
                      color={
                        policyStatus === "Compliant"
                          ? "green"
                          : policyStatus === "NonCompliant"
                            ? "red"
                            : "orange"
                      }
                    >
                      {reason.label}
                    </Label>{" "}
                    {reason.description}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
            </DescriptionList>
          </CardBody>
        </Card>
      </StackItem>

      {relatedSboms && relatedSboms.length > 0 && (
        <StackItem>
          <Card isCompact>
            <CardTitle>Related SBOMs</CardTitle>
            <CardBody>
              <Content component="p" style={{ marginBottom: 8 }}>
                SBOMs in this workspace that reference this finding.
              </Content>
              <Stack>
                {relatedSboms.map((sbom) => (
                  <StackItem key={sbom.id}>
                    <Link to={`/sboms/${sbom.id}`}>{sbom.name}</Link>
                  </StackItem>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </StackItem>
      )}
    </Stack>
  );
};
