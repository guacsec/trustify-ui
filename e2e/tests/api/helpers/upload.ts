import fs from "node:fs";
import path from "node:path";

import type { AxiosInstance } from "axios";

export async function uploadSboms(
  axios: AxiosInstance,
  sbomDirPath: string,
  files: string[],
) {
  const uploads = files.map((e) => {
    const filePath = path.join(__dirname, `${sbomDirPath}/${e}`);
    fs.statSync(filePath); // Verify file exists

    const fileStream = fs.createReadStream(filePath);
    return axios.post("/api/v2/sbom", fileStream, {
      headers: { "Content-Type": "application/json+bzip2" },
    });
  });

  const responses = await Promise.all(uploads);
  return responses;
}

export async function uploadAdvisories(
  axios: AxiosInstance,
  advisoryDirPath: string,
  files: string[],
) {
  const uploads = files.map((e) => {
    const filePath = path.join(__dirname, `${advisoryDirPath}/${e}`);
    fs.statSync(filePath); // Verify file exists

    const fileStream = fs.createReadStream(filePath);
    return axios.post("/api/v2/advisory", fileStream, {
      headers: { "Content-Type": "application/json+bzip2" },
    });
  });

  const responses = await Promise.all(uploads);
  return responses;
}
