import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { array, boolean, mixed, object, string } from "yup";

import {
  checkSbomGroupNameUniqueness,
  joinKeyValueAsString,
  splitStringAsKeyValue,
} from "@app/api/model-utils";
import type { Group, GroupRequest } from "@app/client";
import { PRODUCT_LABEL_KEY } from "@app/Constants";

import type { useGroupFormData } from "./useGroupFormData";

export interface FormValues {
  name: string;
  description: string;
  isProduct: boolean;
  labels: string[];
  parentGroupId: string | null;
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
  const validationSchema = object().shape({
    name: string()
      .trim()
      .required()
      .min(1)
      .max(255)
      .test(
        "unique-name",
        "A group with this name already exists",
        async function (value) {
          if (!value) return true;

          const { parentGroupId } = this.parent as FormValues;

          // Skip check when editing and neither name nor parent changed
          if (
            group &&
            value === group.name &&
            parentGroupId === (group.parent ?? null)
          ) {
            return true;
          }

          const isUnique = await checkSbomGroupNameUniqueness(
            value,
            parentGroupId || undefined,
          );

          return (
            isUnique ||
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
      isProduct: group?.labels?.[PRODUCT_LABEL_KEY] === "true",
      labels: Object.entries(group?.labels ?? {})
        .filter(([key]) => key !== PRODUCT_LABEL_KEY)
        .map(([key, value]) => joinKeyValueAsString({ key, value })),
      parentGroupId: group?.parent ?? null,
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    shouldUnregister: true,
  });

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
        [PRODUCT_LABEL_KEY]: String(formValues.isProduct),
      },
      parent: formValues.parentGroupId,
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
    isSubmitDisabled: !isValid || isSubmitting || isValidating || !isDirty,
    isCancelDisabled: isSubmitting || isValidating,
    onSubmit: handleSubmit(onValidSubmit),
  };
};
