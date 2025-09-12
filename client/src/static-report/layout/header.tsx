import type React from "react";
import { useReducer, useState } from "react";

import {
  Brand,
  Dropdown,
  DropdownItem,
  DropdownList,
  Icon,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  MenuToggle,
  type MenuToggleElement,
  PageToggleButton,
  Split,
  SplitItem,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import EllipsisVIcon from "@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon";
import HelpIcon from "@patternfly/react-icons/dist/esm/icons/help-icon";
import BarsIcon from "@patternfly/react-icons/dist/js/icons/bars-icon";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/js/icons/external-link-alt-icon";

import useBranding from "@app/hooks/useBranding";

import { AboutApp } from "./about";

export const HeaderApp: React.FC = () => {
  const {
    masthead: { leftBrand, leftTitle, rightBrand, supportUrl },
  } = useBranding();

  const [isAboutModalOpen, toggleIsAboutModalOpen] = useReducer(
    (state) => !state,
    false,
  );
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState(false);

  const onHelpDropdownToggle = () => {
    setIsHelpDropdownOpen(!isHelpDropdownOpen);
  };

  const onKebabDropdownToggle = () => {
    setIsKebabDropdownOpen(!isKebabDropdownOpen);
  };

  return (
    <>
      <AboutApp isOpen={isAboutModalOpen} onClose={toggleIsAboutModalOpen} />

      <Masthead>
        <MastheadMain>
          <MastheadToggle>
            <PageToggleButton variant="plain" aria-label="Global navigation">
              <BarsIcon />
            </PageToggleButton>
          </MastheadToggle>
          <MastheadBrand data-codemods>
            <MastheadLogo data-codemods>
              <Split>
                <SplitItem>
                  {leftBrand ? (
                    <Brand
                      src={leftBrand.src}
                      alt={leftBrand.alt}
                      heights={{ default: leftBrand.height }}
                    />
                  ) : null}
                </SplitItem>
                <SplitItem isFilled>
                  {leftTitle ? (
                    <Title
                      className="logo-pointer"
                      headingLevel={leftTitle?.heading ?? "h1"}
                      size={leftTitle?.size ?? "2xl"}
                    >
                      {leftTitle.text}
                    </Title>
                  ) : null}
                </SplitItem>
              </Split>
            </MastheadLogo>
          </MastheadBrand>
        </MastheadMain>
        <MastheadContent>
          <Toolbar isFullHeight isStatic>
            <ToolbarContent>
              {/* toolbar items to always show */}
              <ToolbarGroup
                variant="action-group-plain"
                align={{ default: "alignEnd" }}
              />

              {/* toolbar items to show at desktop sizes */}
              <ToolbarGroup
                variant="action-group-plain"
                gap={{ default: "gapNone", md: "gapMd" }}
                visibility={{
                  default: "hidden",
                  "2xl": "visible",
                  xl: "visible",
                  lg: "visible",
                  md: "hidden",
                }}
              >
                <ToolbarItem>
                  <Dropdown
                    isOpen={isHelpDropdownOpen}
                    onSelect={onHelpDropdownToggle}
                    onOpenChange={(isOpen: boolean) =>
                      setIsHelpDropdownOpen(isOpen)
                    }
                    popperProps={{ position: "right" }}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        onClick={onHelpDropdownToggle}
                        isExpanded={isHelpDropdownOpen}
                        variant="plain"
                        aria-label="About"
                      >
                        <HelpIcon />
                      </MenuToggle>
                    )}
                  >
                    <DropdownList>
                      {supportUrl && (
                        <DropdownItem
                          key="support"
                          component="a"
                          to={supportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Support{" "}
                          <Icon isInline iconSize="sm">
                            <ExternalLinkAltIcon />
                          </Icon>
                        </DropdownItem>
                      )}
                      <DropdownItem
                        key="about"
                        onClick={toggleIsAboutModalOpen}
                      >
                        About
                      </DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </ToolbarItem>
              </ToolbarGroup>

              {/* toolbar items to show at mobile sizes */}
              <ToolbarGroup
                variant="action-group-plain"
                gap={{ default: "gapNone", md: "gapMd" }}
                visibility={{ lg: "hidden" }}
              >
                <ToolbarItem>
                  <Dropdown
                    isOpen={isKebabDropdownOpen}
                    onSelect={onKebabDropdownToggle}
                    onOpenChange={(isOpen: boolean) =>
                      setIsKebabDropdownOpen(isOpen)
                    }
                    popperProps={{ position: "right" }}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        onClick={onKebabDropdownToggle}
                        isExpanded={isKebabDropdownOpen}
                        variant="plain"
                        aria-label="About"
                      >
                        <EllipsisVIcon />
                      </MenuToggle>
                    )}
                  >
                    <DropdownList>
                      {supportUrl && (
                        <DropdownItem
                          key="support"
                          component="a"
                          to={supportUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Support{" "}
                          <Icon isInline iconSize="sm">
                            <ExternalLinkAltIcon />
                          </Icon>
                        </DropdownItem>
                      )}
                      <DropdownItem
                        key="about"
                        onClick={toggleIsAboutModalOpen}
                      >
                        About
                      </DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </ToolbarItem>
              </ToolbarGroup>

              {/* Show the SSO menu at desktop sizes */}
              <ToolbarGroup
                visibility={{
                  default: "hidden",
                  md: "visible",
                }}
              ></ToolbarGroup>

              {rightBrand ? (
                <ToolbarGroup>
                  <ToolbarItem>
                    <Brand
                      src={rightBrand.src}
                      alt={rightBrand.alt}
                      heights={{ default: rightBrand.height }}
                    />
                  </ToolbarItem>
                </ToolbarGroup>
              ) : null}
            </ToolbarContent>
          </Toolbar>
        </MastheadContent>
      </Masthead>
    </>
  );
};
