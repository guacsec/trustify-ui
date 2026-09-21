import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  CardTitle,
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

export const CryptoAlgorithmDetail: React.FC<ICryptoAlgorithmDetailProps> = ({
  algorithm,
}) => {
  const props = algorithm.properties as Record<string, unknown>;

  const primitive = (props?.primitive as string) ?? undefined;
  const type = (props?.type as string) ?? undefined;
  const cryptoFunctions = props?.cryptoFunctions as string[] | undefined;
  const parameterSetIdentifier =
    (props?.parameterSetIdentifier as string) ?? undefined;
  const curve = (props?.curve as string) ?? undefined;
  const mode = (props?.mode as string) ?? undefined;
  const padding = (props?.padding as string) ?? undefined;
  const executionEnvironment =
    (props?.executionEnvironment as string) ?? undefined;
  const implementationPlatform =
    (props?.implementationPlatform as string) ?? undefined;
  const certificationLevel =
    (props?.certificationLevel as string[]) ?? undefined;
  const classicalSecurityLevel =
    (props?.classicalSecurityLevel as number) ?? undefined;
  const nistQuantumSecurityLevel =
    (props?.nistQuantumSecurityLevel as number) ?? undefined;

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
              {algorithm.oid && (
                <DescriptionListGroup>
                  <DescriptionListTerm>OID</DescriptionListTerm>
                  <DescriptionListDescription>
                    {algorithm.oid}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {(primitive || type) && (
                <DescriptionListGroup>
                  <DescriptionListTerm>
                    Primitive / material
                  </DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label color="blue">{primitive ?? type}</Label>
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
              {parameterSetIdentifier && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Parameter set</DescriptionListTerm>
                  <DescriptionListDescription>
                    {parameterSetIdentifier}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {curve && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Curve</DescriptionListTerm>
                  <DescriptionListDescription>
                    {curve}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {mode && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Mode</DescriptionListTerm>
                  <DescriptionListDescription>
                    {mode}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {padding && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Padding</DescriptionListTerm>
                  <DescriptionListDescription>
                    {padding}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
            </DescriptionList>
          </CardBody>
        </Card>
      </StackItem>

      {(executionEnvironment ||
        implementationPlatform ||
        certificationLevel) && (
        <StackItem>
          <Card isCompact>
            <CardTitle>Environment</CardTitle>
            <CardBody>
              <DescriptionList isCompact>
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
                {certificationLevel && certificationLevel.length > 0 && (
                  <DescriptionListGroup>
                    <DescriptionListTerm>Certification</DescriptionListTerm>
                    <DescriptionListDescription>
                      {certificationLevel.join(", ")}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                )}
              </DescriptionList>
            </CardBody>
          </Card>
        </StackItem>
      )}

      {(classicalSecurityLevel !== undefined ||
        nistQuantumSecurityLevel !== undefined) && (
        <StackItem>
          <Card isCompact>
            <CardTitle>Security levels</CardTitle>
            <CardBody>
              <DescriptionList isCompact>
                {classicalSecurityLevel !== undefined && (
                  <DescriptionListGroup>
                    <DescriptionListTerm>Classical</DescriptionListTerm>
                    <DescriptionListDescription>
                      {classicalSecurityLevel} bits
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                )}
                {nistQuantumSecurityLevel !== undefined && (
                  <DescriptionListGroup>
                    <DescriptionListTerm>
                      NIST quantum level
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {nistQuantumSecurityLevel}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                )}
              </DescriptionList>
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
