import { Label, LabelGroup } from "@patternfly/react-core";
type Props = {
  labels?: Record<string, string | null>;
};

type FormattedLabel = {
  text: string;
  color: "purple" | "blue";
};

function formatLabel(key: string, value: string | null): FormattedLabel {
  const text = value ? `${key}: ${value}` : `${key}`;
  const color = key === "Product" ? "purple" : "blue";
  return { color, text };
}

export const SbomGroupLabels = ({ labels }: Props) => {
  if (!labels || Object.keys(labels).length === 0) {
    return null;
  }

  return (
    <LabelGroup>
      {Object.entries(labels).map(([key, value]) => {
        const { color, text } = formatLabel(key, value);
        return (
          <Label key={key} color={color}>
            {text}
          </Label>
        );
      })}
    </LabelGroup>
  );
};
