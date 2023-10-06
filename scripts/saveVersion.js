const fs = require('fs');
const { spawnSync } = require('child_process');

function saveVersion(packageJson) {
  const { version } = packageJson;

  fs.writeFile('./package.json',
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

module.exports = { saveVersion };