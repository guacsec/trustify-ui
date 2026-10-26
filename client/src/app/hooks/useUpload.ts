import React from "react";

import { FORM_DATA_FILE_KEY } from "@app/Constants";
import axios, {
  type AxiosError,
  type AxiosPromise,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CancelTokenSource,
} from "axios";

const CANCEL_MESSAGE = "cancelled";

interface PromiseConfig<T, E> {
  formData: FormData;
  config: AxiosRequestConfig;

  thenFn: (response: AxiosResponse<T>) => Promise<void>;
  catchFn: (error: AxiosError<E>) => void;
}

export interface Upload<T, E> {
  progress: number;
  status: "queued" | "inProgress" | "complete";
  response?: AxiosResponse<T>;
  error?: AxiosError<E>;
  wasCancelled: boolean;
  cancelFn?: CancelTokenSource;
}

const defaultUpload = <T, E>(): Upload<T, E> => ({
  progress: 0,
  status: "queued",
  error: undefined,
  response: undefined,
  wasCancelled: false,
  cancelFn: undefined,
});

interface Status<T, E> {
  uploads: Map<File, Upload<T, E>>;
}

type Action<T, E> =
  | {
      type: "queueUpload";
      payload: {
        file: File;
        cancelFn: CancelTokenSource;
      };
    }
  | {
      type: "updateUploadProgress";
      payload: {
        file: File;
        progress: number;
      };
    }
  | {
      type: "finishUploadSuccessfully";
      payload: {
        file: File;
        response: AxiosResponse<T>;
      };
    }
  | {
      type: "finishUploadWithError";
      payload: {
        file: File;
        error: AxiosError<E>;
      };
    }
  | {
      type: "removeUpload";
      payload: {
        file: File;
      };
    };

const reducer = <T, E>(
  state: Status<T, E>,
  action: Action<T, E>,
): Status<T, E> => {
  switch (action.type) {
    case "queueUpload": {
      return {
        ...state,
        uploads: new Map(state.uploads).set(action.payload.file, {
          ...(state.uploads.get(action.payload.file) || defaultUpload()),
          status: "queued",
          cancelFn: action.payload.cancelFn,
        }),
      };
    }
    case "updateUploadProgress": {
      return {
        ...state,
        uploads: new Map(state.uploads).set(action.payload.file, {
          ...(state.uploads.get(action.payload.file) || defaultUpload()),
          progress: action.payload.progress || 0,
          status: "inProgress",
        }),
      };
    }
    case "finishUploadSuccessfully": {
      return {
        ...state,
        uploads: new Map(state.uploads).set(action.payload.file, {
          ...(state.uploads.get(action.payload.file) || defaultUpload()),
          status: "complete",

          response: action.payload.response,
        }),
      };
    }
    case "finishUploadWithError": {
      return {
        ...state,
        uploads: new Map(state.uploads).set(action.payload.file, {
          ...(state.uploads.get(action.payload.file) || defaultUpload()),
          status: "complete",
          error: action.payload.error,
          wasCancelled: action.payload.error?.message === CANCEL_MESSAGE,
        }),
      };
    }
    case "removeUpload": {
      const newUploads = new Map(state.uploads);
      newUploads.delete(action.payload.file);
      return {
        ...state,
        uploads: newUploads,
      };
    }
    default:
      throw new Error();
  }
};

const initialState = <T, E>(): Status<T, E> => ({
  uploads: new Map(),
});

export const useUpload = <T, E>({
  parallel,
  uploadFn,
  onSuccess,
  onError,
}: {
  parallel: boolean;
  uploadFn: (
    form: FormData,
    requestConfig: AxiosRequestConfig,
  ) => AxiosPromise<T>;
  onSuccess?: (response: AxiosResponse<T>, file: File) => void;
  onError?: (error: AxiosError<E>, file: File) => void;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState<T, E>());
  const uploadTokensRef = React.useRef(new Map<File, symbol>());

  const handleUpload = (acceptedFiles: File[]): Promise<void> => {
    const queue: PromiseConfig<T, E>[] = [];
    const successCallbacks: Array<Promise<void>> = [];

    for (let index = 0; index < acceptedFiles.length; index++) {
      const file = acceptedFiles[index]!;

      // Upload
      const formData = new FormData();
      formData.set(FORM_DATA_FILE_KEY, file);

      const cancelFn = axios.CancelToken.source();
      const token = Symbol();
      uploadTokensRef.current.set(file, token);

      const config: AxiosRequestConfig = {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        onUploadProgress: (progressEvent) => {
          if (uploadTokensRef.current.get(file) !== token) return;
          const total = progressEvent.total ?? 1;
          const progress = (progressEvent.loaded / total) * 100;
          dispatch({
            type: "updateUploadProgress",
            payload: { file, progress: Math.round(progress) },
          });
        },
        cancelToken: cancelFn.token,
      };

      dispatch({
        type: "queueUpload",
        payload: {
          file,
          cancelFn,
        },
      });

      const thenFn = async (response: AxiosResponse<T>) => {
        if (uploadTokensRef.current.get(file) !== token) return;
        dispatch({
          type: "finishUploadSuccessfully",
          payload: { file, response },
        });
        if (onSuccess) {
          successCallbacks.push(
            Promise.resolve()
              .then(() => onSuccess(response, file))
              .catch(() => {
                // callback failure must not reclassify a successful upload
              }),
          );
        }
      };

      const catchFn = (error: AxiosError<E>) => {
        if (uploadTokensRef.current.get(file) !== token) return;
        dispatch({
          type: "finishUploadWithError",
          payload: { file, error },
        });

        if (error.message !== CANCEL_MESSAGE) {
          if (onError) onError(error, file);
        }
      };

      const promiseConfig: PromiseConfig<T, E> = {
        formData,
        config,
        thenFn,
        catchFn,
      };

      queue.push(promiseConfig);
    }

    const uploadChain = parallel
      ? Promise.all(
          queue.map((item) =>
            uploadFn(item.formData, item.config)
              .then(item.thenFn)
              .catch(item.catchFn),
          ),
        ).then(() => undefined)
      : queue.reduce(async (prev, next) => {
          await prev;
          return uploadFn(next.formData, next.config)
            .then(next.thenFn)
            .catch(next.catchFn);
        }, Promise.resolve<void>(undefined));

    return uploadChain
      .then(() => Promise.all(successCallbacks))
      .then(() => undefined);
  };

  const handleCancelUpload = (file: File) => {
    state.uploads.get(file)?.cancelFn?.cancel(CANCEL_MESSAGE);
  };

  const handleRemoveUpload = (file: File) => {
    uploadTokensRef.current.delete(file);
    state.uploads.get(file)?.cancelFn?.cancel(CANCEL_MESSAGE);
    dispatch({
      type: "removeUpload",
      payload: { file },
    });
  };

  return {
    uploads: state.uploads as Map<File, Upload<T, E>>,
    handleUpload,
    handleCancelUpload,
    handleRemoveUpload,
  };
};
