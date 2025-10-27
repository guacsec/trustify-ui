import fs from "node:fs";
import { logger, REPORT_DIR } from "../../common/constants";

export function writeRequestDurationToFile(
  fileName: string,
  sbomNumber: string,
  sbomId: string,
  duration: string,
) {
  const line = `${sbomNumber},${sbomId},${duration}`;

  try {
    fs.appendFileSync(`${REPORT_DIR}${fileName}`, `${line}\n`);
    logger.debug(line);
  } catch (error) {
    logger.error(`Error writing the request duration to file: ${error}`);
    throw error;
  }
}
