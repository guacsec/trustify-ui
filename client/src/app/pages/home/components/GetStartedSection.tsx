import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Content,
  Divider,
  Flex,
  FlexItem,
  Icon,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import ArrowRightIcon from "@patternfly/react-icons/dist/esm/icons/arrow-right-icon";
import BookOpenIcon from "@patternfly/react-icons/dist/esm/icons/book-open-icon";
import ChartLineIcon from "@patternfly/react-icons/dist/esm/icons/chart-line-icon";
import UploadIcon from "@patternfly/react-icons/dist/esm/icons/upload-icon";

import { Paths } from "@app/Routes";
import useBranding from "@app/hooks/useBranding";

import { HomeSectionCard } from "./PortfolioMetricsSection";

const ACTION_ICON_COLOR = "var(--pf-t--global--text--color--brand--default)";

interface GetStartedAction {
  title: string;
  description: string;
  buttonLabel: string;
  icon: React.ReactNode;
  linkTo?: string;
  href?: string;
}

const STATIC_ACTIONS: GetStartedAction[] = [
  {
    title: "Upload an SBOM",
    description:
      "Ingest a new Software Bill of Materials for automated analysis. The agent will immediately scan for known vulnerabilities and policy violations.",
    linkTo: Paths.sbomUpload,
    buttonLabel: "Upload SBOM",
    icon: <UploadIcon aria-hidden color={ACTION_ICON_COLOR} />,
  },
  {
    title: "Generate vulnerability report",
    description:
      "Create a summary of your current security posture across all ingested SBOMs, including VEX status and remediation guidance.",
    linkTo: Paths.sbomScan,
    buttonLabel: "Generate vulnerability report",
    icon: <ChartLineIcon aria-hidden color={ACTION_ICON_COLOR} />,
  },
];

export const GetStartedSection: React.FC = () => {
  const { about } = useBranding();
  const documentationUrl = about.documentationUrl?.trim();

  const actions: GetStartedAction[] = [
    ...STATIC_ACTIONS,
    ...(documentationUrl
      ? [
          {
            title: "Learn more",
            description: `Discover how ${about.displayName} helps you manage supply chain security, interpret SBOM analysis, and act on vulnerability findings.`,
            href: documentationUrl,
            buttonLabel: "View documentation",
            icon: <BookOpenIcon aria-hidden color={ACTION_ICON_COLOR} />,
          },
        ]
      : []),
  ];

  return (
    <HomeSectionCard>
      <Stack hasGutter>
        <StackItem>
          <Title headingLevel="h2" size="lg">
            {`Get started with ${about.displayName}`}
          </Title>
          <Content component="p">
            Upload SBOMs to inventory components and vulnerabilities, review
            findings across your portfolio, and explore documentation to get the
            most from {about.displayName}.
          </Content>
        </StackItem>
        <StackItem>
          <Flex
            direction={{ default: "column", md: "row" }}
            alignItems={{ default: "alignItemsStretch" }}
          >
            {actions.map((action, index) => {
              const actionButton = (
                <Button
                  variant="secondary"
                  icon={<ArrowRightIcon />}
                  iconPosition="end"
                >
                  {action.buttonLabel}
                </Button>
              );

              return (
                <React.Fragment key={action.title}>
                  {index > 0 && (
                    <Divider
                      orientation={{
                        default: "horizontal",
                        md: "vertical",
                      }}
                    />
                  )}
                  <FlexItem flex={{ default: "flex_1" }}>
                    <Stack hasGutter>
                      <StackItem isFilled>
                        <Stack>
                          <StackItem>
                            <Icon size="lg">{action.icon}</Icon>
                          </StackItem>
                          <StackItem>
                            <Title headingLevel="h3" size="md">
                              {action.title}
                            </Title>
                          </StackItem>
                          <StackItem>
                            <Content component="p">
                              {action.description}
                            </Content>
                          </StackItem>
                        </Stack>
                      </StackItem>
                      <StackItem>
                        {action.href ? (
                          <a
                            href={action.href}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {actionButton}
                          </a>
                        ) : (
                          <Link to={action.linkTo ?? "/"}>{actionButton}</Link>
                        )}
                      </StackItem>
                    </Stack>
                  </FlexItem>
                </React.Fragment>
              );
            })}
          </Flex>
        </StackItem>
      </Stack>
    </HomeSectionCard>
  );
};
