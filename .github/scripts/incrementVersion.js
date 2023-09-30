const fs = require("fs");
const { getLatestVersion } = require("./getLatestVersion");
const { saveVersion } = require("./saveVersion");

function incrementVersion(incrementer) {
  const rawPackage = fs.readFileSync("./package.json");
  const parsedPackage = JSON.parse(rawPackage);
  const latestVersion = getLatestVersion(parsedPackage);
  const nextVersion = incrementer(latestVersion);
  parsedPackage.version = nextVersion;

  saveVersion(parsedPackage);
};

module.exports = { incrementVersion };