import React from "react";
import { Link } from "react-router-dom";

import { Button, Content, Divider, Icon, Title } from "@patternfly/react-core";
import ArrowRightIcon from "@patternfly/react-icons/dist/esm/icons/arrow-right-icon";
import BookOpenIcon from "@patternfly/react-icons/dist/esm/icons/book-open-icon";
import ChartLineIcon from "@patternfly/react-icons/dist/esm/icons/chart-line-icon";
import UploadIcon from "@patternfly/react-icons/dist/esm/icons/upload-icon";

import { Paths } from "@app/Routes";
import useBranding from "@app/hooks/useBranding";

import { HomeSectionCard } from "./HomeSectionCard";

import "./get-started-section.css";

const ACTION_ICON_COLOR = "var(--pf-t--global--text--color--brand--default)";
const GET_STARTED_SECTION_TITLE = "Get started with Trusted Profile Analyzer";

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
      "Create a PDF or CSV summary of your current security posture across all ingested SBOMs, including VEX status and remediation guidance.",
    linkTo: Paths.sbomScan,
    buttonLabel: "Generate vulnerability report",
    icon: <ChartLineIcon aria-hidden color={ACTION_ICON_COLOR} />,
  },
];

export const GetStartedSection: React.FC = () => {
  const { about } = useBranding();
  const documentationUrl =
    about.documentationUrl?.trim() || "https://www.redhat.com/";

  const actions: GetStartedAction[] = [
    ...STATIC_ACTIONS,
    {
      title: "Learn more",
      description: `Discover how ${about.displayName} helps you manage supply chain security, interpret SBOM analysis, and act on vulnerability findings.`,
      href: documentationUrl,
      buttonLabel: "View documentation",
      icon: <BookOpenIcon aria-hidden color={ACTION_ICON_COLOR} />,
    },
  ];

  return (
    <HomeSectionCard className="get-started-section">
      <div className="home-section-card__header">
        <Title headingLevel="h2" size="lg">
          {GET_STARTED_SECTION_TITLE}
        </Title>
        <Content className="home-section-card__subtitle" component="p">
          Upload SBOMs to inventory components and CVEs, review vulnerability
          findings across your portfolio, and explore documentation to get the
          most from {about.displayName}.
        </Content>
      </div>

      <div className="home-section-card__columns">
        {actions.map((action, index) => {
          const actionButton = (
            <Button
              className="get-started-section__action"
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
                  className="home-section-card__divider"
                  orientation={{ default: "vertical" }}
                />
              )}
              <div className="home-section-card__column">
                <div className="home-section-card__column-content">
                  <Icon className="get-started-section__icon" size="lg">
                    {action.icon}
                  </Icon>
                  <Title
                    className="home-section-card__column-title"
                    headingLevel="h3"
                    size="md"
                  >
                    {action.title}
                  </Title>
                  <Content
                    className="home-section-card__column-description"
                    component="p"
                  >
                    {action.description}
                  </Content>
                </div>
                {action.href ? (
                  <a
                    className="get-started-section__action-link"
                    href={action.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {actionButton}
                  </a>
                ) : (
                  <Link
                    className="get-started-section__action-link"
                    to={action.linkTo ?? "/"}
                  >
                    {actionButton}
                  </Link>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </HomeSectionCard>
  );
};
