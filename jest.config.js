module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/plugins/**/*.test.ts"],
  setupFilesAfterEnv: ['./jest.setup.js']
}
