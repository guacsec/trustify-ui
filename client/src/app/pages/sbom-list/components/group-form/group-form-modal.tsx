import type React from "react";

import {
  Bullseye,
  Button,
  ButtonVariant,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@patternfly/react-core";

import type { Group } from "@app/client";

import { GroupForm } from "./group-form";
import { useGroupForm } from "./useGroupForm";
import { useGroupFormData } from "./useGroupFormData";

export interface GroupFormModalProps {
  group: Group | null;
  onClose: () => void;
  isOpen?: boolean;
}

export const GroupFormModal: React.FC<GroupFormModalProps> = ({
  group,
  onClose,
  isOpen = true,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <GroupFormModalInner
      key={!isOpen ? "closed" : (group?.id ?? "new")}
      group={group}
      onClose={onClose}
      isOpen={isOpen}
    />
  );
};

const GroupFormModalInner: React.FC<GroupFormModalProps> = ({
  group,
  onClose,
  isOpen,
}) => {
  const formData = useGroupFormData({
    onActionSuccess: onClose,
  });
  const {
    form,
    onSubmit,
    isSubmitDisabled,
    isCancelDisabled,
    isParentHydrating,
  } = useGroupForm({
    group,
    formData,
  });

  return (
    <Modal
      variant="small"
      isOpen={isOpen}
      onClose={onClose}
      aria-label={group ? "Edit group" : "Create group"}
    >
      <ModalHeader title={group ? "Edit group" : "Create group"} />
      <ModalBody>
        {isParentHydrating ? (
          <Bullseye>
            <Spinner />
          </Bullseye>
        ) : (
          <GroupForm group={group} form={form} data={formData} />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          key="submit"
          aria-label="submit"
          variant={ButtonVariant.primary}
          isDisabled={isSubmitDisabled}
          onClick={onSubmit}
        >
          {group ? "Save" : "Create"}
        </Button>
        <Button
          key="cancel"
          aria-label="cancel"
          variant={ButtonVariant.link}
          isDisabled={isCancelDisabled}
          onClick={onClose}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
