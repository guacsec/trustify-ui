import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { mixed, object } from "yup";

import type { Group, SbomHead } from "@app/client";

import type { useAddToGroupFormData } from "./useAddToGroupFormData";

interface FormValues {
  targetGroup: Group | null;
}

type UseGroupFormArgs = {
  sboms: SbomHead[];
  formData: ReturnType<typeof useAddToGroupFormData>;
};

export const useAddToGroupForm = ({
  sboms,
  formData: { addToGroup },
}: UseGroupFormArgs) => {
  const validationSchema = object().shape({
    targetGroup: mixed<Group>().nullable().defined().default(null).required(),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      targetGroup: null,
    },
    resolver: yupResolver(validationSchema),
    mode: "all",
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValidating, isValid, isDirty },
  } = form;

  const onValidSubmit = (formValues: FormValues) => {
    const targetGroup = formValues.targetGroup;
    return addToGroup({
      groups: targetGroup ? [targetGroup] : [],
      sboms,
    });
  };

  return {
    form,
    isSubmitDisabled: !isValid || isSubmitting || isValidating || !isDirty,
    isCancelDisabled: isSubmitting || isValidating,
    onSubmit: handleSubmit(onValidSubmit),
  };
};
