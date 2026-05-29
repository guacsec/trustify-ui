export const READ_ONLY_TOOLTIP = "Not available in read-only mode";

/** Returns props that disable an ActionsColumn item when read-only, including a click guard. */
export const readOnlyActionProps = (isReadOnly: boolean) =>
  isReadOnly
    ? {
        isAriaDisabled: true,
        tooltipProps: { content: READ_ONLY_TOOLTIP },
        onClick: () => {},
      }
    : {};
