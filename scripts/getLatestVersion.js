import { spawnSync } from 'child_process';

export default function getLatestVersion(packageJson) {
  let latestVersion;
  const latestPublishedVersion = spawnSync('npm', ['show', packageJson.name, 'version']);
  if (latestPublishedVersion.stderr.toString()) latestVersion = packageJson.version;
  else latestVersion = latestPublishedVersion.stdout.toString().trim();
  return latestVersion;
}