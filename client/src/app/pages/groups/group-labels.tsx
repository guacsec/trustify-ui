import { Label, LabelGroup } from "@patternfly/react-core";
type Props = {
  labels?: Record<string, string | null>;
};

type FormattedLabel = {
  format: string;
  color: "purple" | "blue";
};

function formatLabel(key: string, value: string | null): FormattedLabel {
  const format = value ? `${key}: ${value}` : `${key}`;
  const color = key === "Product" ? "purple" : "blue";
  return { color, format };
}
// TODO: Change color based on label type
export const GroupLabels = ({ labels }: Props) => {
  if (!labels || Object.keys(labels).length === 0) {
    return null;
  }

  return (
    <LabelGroup>
      {Object.entries(labels).map(([key, value]) => {
        const { color, format } = formatLabel(key, value);
        return (
          <Label key={key} color={`${color}`}>
            {format}
          </Label>
        );
      })}
    </LabelGroup>
  );
};
