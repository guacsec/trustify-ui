import fs from "node:fs";
import path from "node:path";

import type { AxiosInstance } from "axios";

export async function uploadSboms(
  axios: AxiosInstance,
  files: string[],
  sbomDirPath: string,
) {
  const uploads = files.map((e) => {
    const filePath = path.join(__dirname, `${sbomDirPath}/${e}`);
    fs.statSync(filePath); // Verify file exists

    const fileStream = fs.createReadStream(filePath);
    const promise = axios.post("/api/v2/sbom", fileStream, {
      headers: { "Content-Type": "application/json+bzip2" },
    });

    return promise;
  });

  const responses = await Promise.all(uploads);
  return responses.map((response) => response.data);
}
