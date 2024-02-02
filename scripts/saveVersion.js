import { writeFile } from 'fs';
import { spawnSync } from 'child_process';

export default function saveVersion(packageJson) {
  const { version } = packageJson;

  writeFile('./package.json',
    Buffer.from(JSON.stringify(packageJson, null, 2)),
    { encoding: 'utf8' },
    (err) => {
      if (err) return console.log('Error!', err);
      spawnSync('git', ['add', 'package.json']);
      spawnSync('git', ['commit', `-m 'Published version: ${version}'`]);
      return console.log(`Successfully updated and committed package.json to version ${version}`);
    }
  );
}