import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-axios",
  input: "./openapi/trustd.yaml",
  output: "src/app/client",
});
