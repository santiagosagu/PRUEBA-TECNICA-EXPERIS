/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";

import { server } from "./src/mocks/server";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export const waitForPromise = async (ms = 0): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await new Promise((resolve) => setTimeout(resolve, ms));
};

global.fetch = vi.fn(() =>
  Promise.reject(new Error("Real API calls are disabled"))
);

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // obsoleto, pero requerido por algunas librerías
    removeListener: () => {}, // obsoleto, pero requerido por algunas librerías
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
