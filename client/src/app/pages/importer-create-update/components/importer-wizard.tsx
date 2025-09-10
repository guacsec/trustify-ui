import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useIsMutating } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";

import {
  Wizard,
  WizardStep,
  type WizardStepType,
} from "@patternfly/react-core";

import type { Importer } from "@app/client";

import { joinKeyValueAsString } from "@app/api/model-utils";
import { NotificationsContext } from "@app/components/NotificationsContext";
import { useAsyncYupValidation } from "@app/hooks/useAsyncYupValidation";
import {
  useCreateImporterMutation,
  useFetchImporters,
  useUpdateImporterMutation,
} from "@app/queries/importers";

import { Review } from "./review";
import {
  type ConfigurationFormValues,
  type GeneralInformationFormValues,
  type ImporterWizardFormValues,
  useAnalysisWizardFormValidationSchema,
} from "./schema";
import { SetConfiguration } from "./set-configuration";
import { SELECT_ONE, SetGeneralInformation } from "./set-general-information";
import {
  getImporterConfigurationFromFormValues,
  getImporterTypeAndConfiguration,
  getLimitSizeValueAndUnit,
  getPeriodValueAndUnit,
  type ImporterType,
} from "./type-utils";

interface IImporterWizard {
  importer: Importer | null;
  onClose: () => void;
}

export const ImporterWizard: React.FC<IImporterWizard> = ({
  importer,
  onClose,
}) => {
  const { importers, createImporter, updateImporter } =
    useImporterFormData(onClose);

  // Mutations
  const isMutating = useIsMutating();

  // Data
  const typeAndConfiguration = importer
    ? getImporterTypeAndConfiguration(importer)
    : null;

  // Form
  const { schemas, allFieldsSchema } = useAnalysisWizardFormValidationSchema({
    importer,
    importers,
  });

  const form = useForm<ImporterWizardFormValues>({
    defaultValues: {
      type: typeAndConfiguration?.importerType ?? SELECT_ONE,
      name: importer?.name ?? "",
      description: typeAndConfiguration?.configuration?.description ?? "",
      enabled: typeAndConfiguration?.configuration?.disabled
        ? !typeAndConfiguration?.configuration?.disabled
        : true,
      labels: Object.entries(
        typeAndConfiguration?.configuration?.labels ?? {},
      ).map(([key, value]) => joinKeyValueAsString({ key, value })),
      source: typeAndConfiguration?.configuration?.source ?? "",
      periodValue:
        getPeriodValueAndUnit(typeAndConfiguration?.configuration?.period)
          ?.value ?? 60,
      periodUnit:
        getPeriodValueAndUnit(typeAndConfiguration?.configuration?.period)
          ?.unit ?? "s",
      v3Signatures: typeAndConfiguration?.configuration?.v3Signatures ?? false,
      ignoreMissing:
        typeAndConfiguration?.configuration?.ignoreMissing ?? false,
      fetchRetries: typeAndConfiguration?.configuration?.fetchRetries ?? 0,
      sizeLimitValue:
        getLimitSizeValueAndUnit(typeAndConfiguration?.configuration?.sizeLimit)
          ?.value ?? "",
      sizeLimitUnit:
        getLimitSizeValueAndUnit(typeAndConfiguration?.configuration?.sizeLimit)
          ?.unit ?? "Mb",
      onlyPatterns:
        typeAndConfiguration?.configuration?.onlyPatterns?.map((e) => ({
          value: e,
        })) ?? [],
      keys:
        typeAndConfiguration?.configuration?.keys?.map((e) => ({ value: e })) ??
        [],
      branch: typeAndConfiguration?.configuration?.branch ?? "",
      path: typeAndConfiguration?.configuration?.path ?? "",
      years:
        typeAndConfiguration?.configuration?.years?.map((e) => ({
          value: e,
        })) ?? [],
      startYear: typeAndConfiguration?.configuration?.startYear ?? undefined,
      clearlyDefinedTypes: typeAndConfiguration?.configuration?.types ?? [],
      apiToken: typeAndConfiguration?.configuration?.apiToken ?? "",
      namespace: typeAndConfiguration?.configuration?.namespace ?? "",
      concurrency: typeAndConfiguration?.configuration?.concurrency ?? 0,
    },
    resolver: yupResolver(allFieldsSchema),
    mode: "onChange",
  });

  const { handleSubmit, watch } = form;
  const values = watch();

  // Wizard
  const [stepIdReached, setStepIdReached] = React.useState(1);

  enum StepId {
    GeneralInformation = 1,
    Configuration,
    Review,
  }

  const isStepValid: Record<StepId, boolean> = {
    [StepId.GeneralInformation]:
      useAsyncYupValidation<GeneralInformationFormValues>(
        values,
        schemas.generalInformationStep,
      ),
    [StepId.Configuration]: useAsyncYupValidation<ConfigurationFormValues>(
      values,
      schemas.configurationStep,
    ),
    [StepId.Review]: true,
  };

  const firstInvalidStep: StepId | null =
    (
      Object.values(StepId).filter((val) => typeof val === "number") as StepId[]
    ).find((stepId) => !isStepValid[stepId]) || null;

  const onSubmit = (formValues: ImporterWizardFormValues) => {
    const importerType = formValues.type as ImporterType;

    const configuration = getImporterConfigurationFromFormValues(
      importerType,
      formValues,
    );

    if (!configuration) {
      return;
    }

    if (importer) {
      updateImporter({
        importerName: importer.name,
        configuration,
      });
    } else {
      createImporter({
        importerName: formValues.name,
        configuration,
      });
    }
  };

  const onMove = (current: WizardStepType) => {
    const id = current.id;
    if (id && stepIdReached < (id as number)) setStepIdReached(id as number);
  };

  const isStepEnabled = (stepId: StepId) => {
    return (
      stepIdReached + 1 >= stepId &&
      (firstInvalidStep === null || firstInvalidStep >= stepId)
    );
  };

  return (
    <FormProvider {...form}>
      <Wizard
        isVisitRequired
        onClose={onClose}
        onStepChange={(_event, currentStep: WizardStepType) =>
          onMove(currentStep)
        }
        onSave={handleSubmit(onSubmit)}
      >
        <WizardStep
          key={StepId.GeneralInformation}
          id={StepId.GeneralInformation}
          name="General information"
          footer={{
            isNextDisabled:
              !!isMutating || !isStepEnabled(StepId.GeneralInformation + 1),
          }}
        >
          <SetGeneralInformation importer={importer} />
        </WizardStep>
        <WizardStep
          key={StepId.Configuration}
          id={StepId.Configuration}
          name="Configuration"
          isDisabled={!isStepEnabled(StepId.Configuration)}
          footer={{
            isNextDisabled:
              !!isMutating || !isStepEnabled(StepId.Configuration + 1),
          }}
        >
          <SetConfiguration />
        </WizardStep>
        <WizardStep
          key={StepId.Review}
          id={StepId.Review}
          name="Review"
          isDisabled={!isStepEnabled(StepId.Review)}
          footer={{
            nextButtonText: "Save",
            isNextDisabled: !!isMutating,
            isBackDisabled: !!isMutating,
            isCancelHidden: !!isMutating,
          }}
        >
          <Review />
        </WizardStep>
      </Wizard>
    </FormProvider>
  );
};

const useImporterFormData = (
  onActionSuccess = () => {},
  onActionFail = () => {},
) => {
  const { pushNotification } = React.useContext(NotificationsContext);

  // Fetch data
  const { importers } = useFetchImporters();

  // Mutations
  const { mutate: createImporter } = useCreateImporterMutation(
    (payload) => {
      pushNotification({
        title: `Importer ${payload.importerName} was successfully created.`,
        variant: "success",
      });
      onActionSuccess();
    },
    (_error: AxiosError, _payload) => {
      pushNotification({
        title: "Failed to create Importer",
        variant: "danger",
      });
      onActionFail();
    },
  );

  const { mutate: updateImporter } = useUpdateImporterMutation(
    (payload) => {
      pushNotification({
        title: `Importer ${payload.importerName} was successfully saved.`,
        variant: "success",
      });
      onActionSuccess();
    },
    (_error: AxiosError, payload) => {
      pushNotification({
        title: `Failed to save Importer ${payload.importerName}`,
        variant: "danger",
      });
      onActionFail();
    },
  );

  // Send back source data and actions that are needed by the Form
  return {
    importers,
    createImporter,
    updateImporter,
  };
};
