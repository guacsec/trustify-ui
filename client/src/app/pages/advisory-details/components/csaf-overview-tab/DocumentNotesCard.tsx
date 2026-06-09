import React from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Content,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import type { Note } from "@app/specs/csaf/csaf-v2.0-schema";

interface IDocumentNotesCardProps {
  notes: Note[];
}

export const DocumentNotesCard: React.FC<IDocumentNotesCardProps> = ({
  notes,
}) => (
  <Card>
    <CardTitle>Notes</CardTitle>
    <CardBody>
      <Stack hasGutter>
        {notes.map((note) => (
          <StackItem key={note.title}>
            <Content component="h4">{note.title}</Content>
            <Content component="p">{note.text}</Content>
          </StackItem>
        ))}
      </Stack>
    </CardBody>
  </Card>
);
