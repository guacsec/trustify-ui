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
import { useFetchSBOMGroupById } from "@app/queries/sbom-groups";

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
  const parentId = group?.parent ?? "";
  const { sbomGroup: parentGroup, isFetching: isParentFetching } =
    useFetchSBOMGroupById(parentId);
  const isParentHydrating =
    Boolean(group?.parent) && isParentFetching && !parentGroup;

  if (isParentHydrating) {
    return (
      <Modal
        variant="small"
        isOpen={isOpen}
        onClose={onClose}
        aria-label={group ? "Edit group" : "Create group"}
      >
        <ModalHeader title={group ? "Edit group" : "Create group"} />
        <ModalBody>
          <Bullseye>
            <Spinner />
          </Bullseye>
        </ModalBody>
      </Modal>
    );
  }

  return (
    <GroupFormModalReady
      group={group}
      onClose={onClose}
      isOpen={isOpen}
      formData={formData}
      initialParentGroup={parentGroup ?? null}
    />
  );
};

interface GroupFormModalReadyProps extends GroupFormModalProps {
  formData: ReturnType<typeof useGroupFormData>;
  initialParentGroup: Group | null;
}

const GroupFormModalReady: React.FC<GroupFormModalReadyProps> = ({
  group,
  onClose,
  isOpen,
  formData,
  initialParentGroup,
}) => {
  const { form, onSubmit, isSubmitDisabled, isCancelDisabled } = useGroupForm({
    group,
    formData,
    initialParentGroup,
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
        <GroupForm group={group} form={form} data={formData} />
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
