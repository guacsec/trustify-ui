import { useEffect, useRef } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { array, boolean, mixed, object, string } from "yup";

import {
  joinKeyValueAsString,
  splitStringAsKeyValue,
} from "@app/api/model-utils";
import type { Group, GroupRequest } from "@app/client";
import { PRODUCT_LABEL_KEY } from "@app/Constants";
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
  /** Data result from useGroupFormData */
  formData: ReturnType<typeof useGroupFormData>;
}

export const useGroupForm = ({
  group,
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
    parentGroup: mixed<Group>().nullable().defined().default(null),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      name: group?.name || "",
      description: group?.description || "",
      isProduct: typeof group?.labels?.[PRODUCT_LABEL_KEY] === "string",
      labels: Object.entries(group?.labels ?? {})
        .filter(([key]) => key !== PRODUCT_LABEL_KEY)
        .map(([key, value]) => joinKeyValueAsString({ key, value })),
      parentGroup: null,
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  //Infer parent group
  const parentId = group?.parent ?? null;

  const { result: parentResult, isFetching: isParentFetching } =
    useFetchSBOMGroups(
      {
        page: { pageNumber: 1, itemsPerPage: 1 },
        filters: parentId
          ? [{ field: "id", operator: "=", value: parentId }]
          : [],
      },
      {},
      !parentId, // disable when no parent
    );

  useEffect(() => {
    if (!parentId) return;

    const parent = parentResult.data[0];
    if (!parent) return;

    form.setValue("parentGroup", parent, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: true,
    });
  }, [parentId, parentResult.data, form]);

  // Watch parentGroupId to fetch siblings for that parent
  const parentGroup = form.watch("parentGroup");
  const { result, isFetching } = useFetchSBOMGroups({
    page: { pageNumber: 1, itemsPerPage: 1000 },
    filters: [
      { field: "parent", operator: "=", value: parentGroup?.id || "\0" },
    ],
  });

  siblingsRef.current = result.data;

  // Re-validate name when fetch completes (isFetching transitions true → false)
  const wasFetchingRef = useRef(false);
  useEffect(() => {
    if (wasFetchingRef.current && !isFetching) {
      form.trigger("name");
    }
    wasFetchingRef.current = isFetching;
  }, [isFetching, form]);

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
  const isParentHydrating =
    Boolean(parentId) && isParentFetching && !parentGroup;

  return {
    form,
    isSubmitDisabled: !isValid || isSubmitting || isValidating || !isDirty,
    isCancelDisabled: isSubmitting || isValidating,
    onSubmit: handleSubmit(onValidSubmit),
    isParentHydrating,
  };
};
