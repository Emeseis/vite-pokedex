import * as fs from 'fs';

import { getLatestVersion } from './getLatestVersion';
import { saveVersion } from './saveVersion';

export const incrementVersion = (incrementer) => {
  const rawPackage = fs.readFileSync("./package.json");
  const parsedPackage = JSON.parse(rawPackage);
  const latestVersion = getLatestVersion(parsedPackage);
  const nextVersion = incrementer(latestVersion);
  parsedPackage.version = nextVersion;
  
  saveVersion(parsedPackage);
};