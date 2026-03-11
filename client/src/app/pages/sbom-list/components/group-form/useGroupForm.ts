import { useEffect, useMemo, useRef } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { array, boolean, mixed, object, string } from "yup";

import {
  joinKeyValueAsString,
  splitStringAsKeyValue,
} from "@app/api/model-utils";
import type { Group, GroupRequest } from "@app/client";
import { FILTER_NULL_VALUE, PRODUCT_LABEL_KEY } from "@app/Constants";
import { useFetchSBOMGroups } from "@app/queries/sbom-groups";

import type { useGroupFormData } from "./useGroupFormData";

export interface FormValues {
  name: string;
  description: string;
  isProduct: boolean;
  labels: string[];
  parentGroup: Group | null;
}

export interface UseGroupFormArgs {
  /** The group being edited, or null for create mode */
  group: Group | null;
  /** Preloaded parent group for edit mode */
  initialParentGroup: Group | null;
  /** Data result from useGroupFormData */
  formData: ReturnType<typeof useGroupFormData>;
}

export const useGroupForm = ({
  group,
  initialParentGroup,
  formData: { createGroup, updateGroup },
}: UseGroupFormArgs) => {
  const siblingsRef = useRef<Group[]>([]);

  const validationSchema = object().shape({
    name: string()
      .trim()
      .required()
      .min(1)
      .max(255)
      .test(
        "unique-name",
        "A group with this name already exists",
        function (value) {
          if (!value) return true;

          const { parentGroup } = this.parent as FormValues;

          // Skip check when editing and neither name nor parent changed
          if (
            group &&
            value === group.name &&
            (parentGroup?.id ?? null) === (group.parent ?? null)
          ) {
            return true;
          }

          // Synchronous in-memory check against siblings
          const isDuplicate = siblingsRef.current.some((g) => g.name === value);

          return (
            !isDuplicate ||
            this.createError({
              message: `${value} already exists in group`,
            })
          );
        },
      ),
    description: string().trim().max(255),
    isProduct: boolean().required(),
    labels: array().of(string().defined()).defined().default([]),
    parentGroup: mixed<Group>()
      .nullable()
      .defined()
      .default(null)
      .test(
        "circular-parent",
        "Circular dependency, a group cannot reference itself",
        function (value) {
          if (!value) return true;
          if (value.id !== group?.id) return true;

          return this.createError({
            message: "Parent cannot reference itself",
          });
        },
      ),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      name: group?.name || "",
      description: group?.description || "",
      isProduct: typeof group?.labels?.[PRODUCT_LABEL_KEY] === "string",
      labels: Object.entries(group?.labels ?? {})
        .filter(([key]) => key !== PRODUCT_LABEL_KEY)
        .map(([key, value]) => joinKeyValueAsString({ key, value })),
      parentGroup: initialParentGroup,
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  // Watch parentGroupId to fetch siblings for that parent
  const parentGroup = form.watch("parentGroup");
  const { result: siblingGroups, isFetching } = useFetchSBOMGroups(
    parentGroup?.id || FILTER_NULL_VALUE,
    { page: { pageNumber: 1, itemsPerPage: 0 } },
  );

  const siblingsKey = useMemo(() => {
    return siblingGroups.data.map((g) => g.id).join(",");
  }, [siblingGroups]);
  siblingsRef.current = siblingGroups.data;

  // biome-ignore lint/correctness/useExhaustiveDependencies: siblingsKey is an intentional trigger dependency
  useEffect(() => {
    form.trigger("name");
  }, [siblingsKey, form]);

  const prevParentRef = useRef<Group | null>(null);
  useEffect(() => {
    const isInitial = prevParentRef.current === null;
    const hasChanged = prevParentRef.current !== parentGroup;
    prevParentRef.current = parentGroup;

    // Mark name as touched so validation errors display even when only the
    // parent changed (the UI gates error visibility on isDirty || isTouched)
    if (hasChanged && !isInitial) {
      form.setValue("name", form.getValues("name"), { shouldTouch: true });
    }
  }, [parentGroup, form]);

  const {
    handleSubmit,
    formState: { isSubmitting, isValidating, isValid, isDirty },
  } = form;

  const onValidSubmit = (formValues: FormValues) => {
    const payload: GroupRequest = {
      name: formValues.name.trim(),
      description: formValues.description.trim(),
      labels: {
        ...Object.fromEntries(
          formValues.labels.map((label) => {
            const { key, value } = splitStringAsKeyValue(label);
            return [key, value];
          }),
        ),
        ...(formValues.isProduct ? { [PRODUCT_LABEL_KEY]: "" } : {}),
      },
      parent: formValues.parentGroup?.id ?? null,
    };

    if (group) {
      updateGroup({
        id: group.id,
        body: { ...payload },
      });
    } else {
      createGroup(payload);
    }
  };
  return {
    form,
    isSubmitDisabled:
      !isValid || isSubmitting || isValidating || !isDirty || isFetching,
    isCancelDisabled: isSubmitting || isValidating,
    onSubmit: handleSubmit(onValidSubmit),
  };
};
