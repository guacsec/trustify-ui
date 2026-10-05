import React, { useState } from "react";

import {
  Icon,
  MenuToggle,
  Select,
  SelectGroup,
  SelectList,
  SelectOption,
} from "@patternfly/react-core";
import {
  DesktopIcon,
  OutlinedMoonIcon,
  OutlinedSunIcon,
} from "@patternfly/react-icons";

import { ThemeContext, type ThemeMode } from "./theme-utils";

const ColorSchemeGroupLabel = (
  <div
    className="pf-v6-c-menu__group-title"
    id="theme-selector-color-scheme-title"
  >
    Color scheme
  </div>
);

type ThemeMetadataType = {
  [key in ThemeMode]: {
    value: ThemeMode;
    icon: React.ReactNode;
    displayText: string;
    description: string;
  };
};

const themesMetadata: ThemeMetadataType = {
  light: {
    value: "light",
    icon: <OutlinedSunIcon />,
    displayText: "Light",
    description: "Always use light mode",
  },
  dark: {
    value: "dark",
    icon: <OutlinedMoonIcon />,
    displayText: "Dark",
    description: "Always use dark mode",
  },
  system: {
    value: "system",
    icon: <DesktopIcon />,
    displayText: "System",
    description: "Follow system preference",
  },
};

export const ThemeSelector: React.FC = () => {
  const { mode, setMode } = React.use(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (
    _event?: React.MouseEvent,
    selectedMode?: string,
  ) => {
    setMode((selectedMode as ThemeMode | undefined) ?? "system");
    setIsOpen(false);
  };

  return (
    <Select
      isOpen={isOpen}
      selected={mode}
      onSelect={handleThemeChange}
      onOpenChange={(open) => setIsOpen(open)}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen(!isOpen)}
          isExpanded={isOpen}
          icon={<Icon size="lg">{themesMetadata[mode].icon}</Icon>}
          aria-label={`Theme selection, current: ${themesMetadata[mode].displayText}`}
        />
      )}
      shouldFocusToggleOnSelect
      onOpenChangeKeys={["Escape"]}
      popperProps={{
        position: "right",
        enableFlip: true,
        preventOverflow: true,
      }}
    >
      <SelectGroup label={ColorSchemeGroupLabel}>
        <SelectList aria-labelledby="theme-selector-color-scheme-title">
          {Object.entries(themesMetadata).map(([themeName, themeMetadata]) => (
            <SelectOption
              key={themeName}
              value={themeMetadata.value}
              icon={themeMetadata.icon}
              description={themeMetadata.description}
            >
              {themeMetadata.displayText}
            </SelectOption>
          ))}
        </SelectList>
      </SelectGroup>
    </Select>
  );
};
