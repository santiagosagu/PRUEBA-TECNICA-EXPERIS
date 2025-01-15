import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    css: true,

    coverage: {
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/.{idea,git,cache}/**",
        "**/test-results/**",
        "**/coverage/**",
        "**/src/mocks/**",
        "**/jest.setup.js",
        "**/jest.config.ts",
        "**/setupTests.ts",
        "**/postcss.config.js",
        "**/tailwind.config.js",
        "**/vite.config.ts",
        "**/public/**",
        "**/eslint.config.js",
        "**/vitest.config.ts",
        "**/app.tsx",
        "**/main.tsx",
        "**/routes.tsx",
      ],
    },
  },
});
