import { Label, LabelGroup } from '@patternfly/react-core';
type Props = {
  labels?: Record<string, string>;
};

// TODO: Change color based on label type
export const GroupLabels = ({ labels }: Props) => {
  if (!labels || Object.keys(labels).length === 0) {
    return null;
  }

  return (
    <LabelGroup>
      {
        Object.entries(labels).map(([key, value]) => (
          <Label key={key} color='blue'>
            {key}: {value}
          </Label>
        ))
      }
    </LabelGroup>
  );
}
