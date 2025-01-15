# Project PRUEBA TECNICA EXPERIS

## Installation

After cloning the project, install the dependencies:

```bash
npm install
```

## Configuration

Create a `.env` file with the following content:

VITE_APP_MODE=development
This value is used to run the Mock Service Worker (MSW) for both server-side and browser-side testing, as the project is configured to preview mocked data in the browser as well.

## Running the Project

To run the project, use the following command:

```bash
npm run dev
```

## Running Tests

To run the tests, use the following command:

```bash
npm run test:dev
```

The --watch prefix is enabled to keep the test suite listening and updating the test status.

## Running Coverage Tests

To run the coverage tests, use the following command:

```bash
npm run coverage
```
