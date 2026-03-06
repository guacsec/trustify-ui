import { useCallback, useContext } from "react";

import type { AxiosError } from "axios";

import type { Group, SbomHead } from "@app/client";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { useAddSBOMsToGroupsMutation } from "@app/queries/sboms";

export const useAddToGroupFormData = ({
  onActionSuccess = () => {},
  onActionFail = () => {},
}: {
  onActionSuccess?: () => void;
  onActionFail?: () => void;
} = {}) => {
  const { pushNotification } = useContext(NotificationsContext);

  const onAddSuccess = useCallback(
    (payload: { groups: Group[]; sboms: SbomHead[] }) => {
      const { sboms, groups } = payload;
      pushNotification({
        title: `${sboms.length} SBOM(s) added to the group ${groups.map((e) => e.name).join(",")}`,
        variant: "success",
      });
      onActionSuccess();
    },
    [pushNotification, onActionSuccess],
  );

  const onAddError = useCallback(
    (_error: AxiosError) => {
      pushNotification({
        title: "Error while adding SBOMs to Group",
        variant: "danger",
      });
      onActionFail();
    },
    [pushNotification, onActionFail],
  );

  // Mutations
  const { mutateAsync: addToGroup } = useAddSBOMsToGroupsMutation(
    onAddSuccess,
    onAddError,
  );

  return {
    addToGroup,
  };
};
