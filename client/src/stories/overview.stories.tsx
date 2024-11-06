import type { Meta, StoryObj } from "@storybook/react";

import { Overview } from "../app/pages/vulnerability-details/overview";

const meta = {
  title: "v2/Vulnerability Details",
  component: Overview,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Overview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vulnerability: {
      // type VulnerabilityHead
      cwes: [],
      description: "Some description here",
      discovered: "And here",
      identifier: "vulny-wulny",
      title: "Some Fun Vulnerability",
      modified: null,
      normative: false,
      published: null,
      released: null,
      withdrawn: null,
      average_score: null,
      average_severity: null,
      reserved: null,

      // advisories, if any
      advisories: [],
    },
  },
};
