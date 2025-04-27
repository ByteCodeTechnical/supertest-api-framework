# Supertest API Automation Framework

This project is a Supertest automation framework designed for testing APIs. It provides a structured way to write and execute tests using Supertest and TypeScript.

## Project Structure

```
supertest-api-framework
├── src
│   ├── tests
│   │   └── example.test.ts
│   ├── utils
│   │   └── request.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ByteCodeTechnical/supertest-api-framework.git
   cd supertest-api-framework
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure TypeScript:**
   Ensure that your `tsconfig.json` is set up correctly for your environment.

## Usage

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

This will execute the test cases defined in the `src/tests/example.test.ts` file.

### Writing Tests

You can add your own test cases in the `src/tests` directory. Make sure to follow the structure and conventions used in the existing tests.

### Creating Requests

Use the `createRequest` function from `src/utils/request.ts` to initialize requests to your API endpoints. This function allows you to specify the base URL and make requests easily.

### Type Safety

The project uses TypeScript interfaces defined in `src/types/index.ts` to ensure type safety for API requests and responses. This helps in maintaining the integrity of the data being sent and received.

## Example

Refer to `src/tests/example.test.ts` for an example of how to structure your tests using Supertest.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.