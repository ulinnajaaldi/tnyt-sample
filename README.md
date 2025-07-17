## Getting Started

This guide will help you set up and run the project locally.

### Prerequisites

- Clone the repository to your local machine:
  ```bash
    git clone <repository-url>
    cd <repository-directory>
  ```

### Installation

1. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
2. Create a `.env` file in the root of the project and add environment variables like in `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Make sure to fill in the required values in the `.env` file.
3. Install the required dependencies:
   ```bash
   pnpm install
   ```
   if you're using npm, you can run:
   ```bash
   npm install --legacy-peer-deps
   ```
   its used to resolve peer dependency issues on npm

### Running the Project

1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Open your web browser and go to `http://localhost:5173` to view the application.

### Building for Production

1. To create a production build of the project, run:

   ```bash
   pnpm build
   ```

2. Run the following command to serve the production build:
   ```bash
   pnpm preview
   ```

### Running Tests & Linting

To run the tests, use:

```bash
pnpm test
```

To run the linter, use:

```bash
pnpm lint
```
