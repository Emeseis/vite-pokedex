import { readFileSync } from 'fs';
import getLatestVersion from './getLatestVersion';
import saveVersion from './saveVersion';

export default function incrementVersion(incrementer) {
  const rawPackage = readFileSync('./package.json');
  const parsedPackage = JSON.parse(rawPackage);
  const latestVersion = getLatestVersion(parsedPackage);
  const nextVersion = incrementer(latestVersion);
  parsedPackage.version = nextVersion;
  saveVersion(parsedPackage);
}