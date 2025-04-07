module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  globalSetup: "<rootDir>/testConfig/globalSetup.js",
  globalTeardown: "<rootDir>/testConfig/globalTeardown.js",
  setupFilesAfterEnv: ["<rootDir>/testConfig/setupFile.js"],
};
