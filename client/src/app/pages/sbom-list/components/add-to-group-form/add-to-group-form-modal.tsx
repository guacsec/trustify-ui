import type React from "react";

import {
  Button,
  ButtonVariant,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@patternfly/react-core";

import type { SbomHead } from "@app/client";

import { AddToGroupForm } from "./add-to-group-form";
import { useAddToGroupForm } from "./useAddToGroupForm";
import { useAddToGroupFormData } from "./useAddToGroupFormData";

interface IAddToGroupModalProps {
  sboms: SbomHead[];
  onClose: () => void;
  isOpen?: boolean;
}

export const AddToGroupModal: React.FC<IAddToGroupModalProps> = ({
  sboms,
  onClose,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <AddToGroupModalInner sboms={sboms} onClose={onClose} isOpen={isOpen} />
  );
};

const AddToGroupModalInner: React.FC<IAddToGroupModalProps> = ({
  sboms,
  onClose,
  isOpen,
}) => {
  const formData = useAddToGroupFormData({
    onActionSuccess: onClose,
  });
  const { form, onSubmit, isSubmitDisabled, isCancelDisabled } =
    useAddToGroupForm({
      sboms,
      formData,
    });

  return (
    <Modal
      variant="small"
      isOpen={isOpen}
      onClose={onClose}
      aria-label={"Add SBOMs to Group"}
    >
      <ModalHeader title={"Add SBOM(s) to group"} />
      <ModalBody>
        <AddToGroupForm form={form} data={formData} />
      </ModalBody>
      <ModalFooter>
        <Button
          key="submit"
          aria-label="submit"
          variant={ButtonVariant.primary}
          isDisabled={isSubmitDisabled}
          onClick={onSubmit}
        >
          Add
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
