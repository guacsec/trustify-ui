import type { InfoResponse } from "@app/client";

// Extends the generated type until the backend OpenAPI spec includes readOnly
export type TrustifyInfo = InfoResponse & {
  readOnly?: boolean;
};
