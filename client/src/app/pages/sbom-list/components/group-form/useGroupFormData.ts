import { useCallback, useContext } from "react";

import type { AxiosError } from "axios";

import type { CreateResponse, GroupRequest } from "@app/client";
import { NotificationsContext } from "@app/components/NotificationsContext";
import {
  useCreateSBOMGroupMutation,
  useUpdateSBOMGroupMutation,
} from "@app/queries/sbom-groups";

export const useGroupFormData = ({
  onActionSuccess = () => {},
  onActionFail = () => {},
}: {
  onActionSuccess?: () => void;
  onActionFail?: () => void;
} = {}) => {
  const { pushNotification } = useContext(NotificationsContext);

  const onCreateGroupSuccess = useCallback(
    (_response: CreateResponse | null, payload: GroupRequest) => {
      pushNotification({
        title: `Group ${payload.name} created`,
        variant: "success",
      });
      onActionSuccess();
    },
    [pushNotification, onActionSuccess],
  );

  const onUpdateGroupSuccess = useCallback(
    (payload: { id: string; body: GroupRequest }) => {
      pushNotification({
        title: `Group ${payload.body.name} saved`,
        variant: "success",
      });
      onActionSuccess();
    },
    [pushNotification, onActionSuccess],
  );

  const onCreateUpdateGroupError = useCallback(
    (_error: AxiosError) => {
      pushNotification({
        title: "Error while saving the group",
        variant: "danger",
      });
      onActionFail();
    },
    [pushNotification, onActionFail],
  );

  // Mutations
  const { mutateAsync: createGroup } = useCreateSBOMGroupMutation(
    onCreateGroupSuccess,
    onCreateUpdateGroupError,
  );
  const { mutateAsync: updateGroup } = useUpdateSBOMGroupMutation(
    onUpdateGroupSuccess,
    onCreateUpdateGroupError,
  );

  return {
    createGroup,
    updateGroup,
  };
};
