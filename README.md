# Credential Utils

This is a service for issuing and verifying Verite credentials for testing purposes, useful for hackathons, local integrations, etc.

## Getting Started

### Installation

Upon first checkout of this codebase, you should run the setup script:

```bash
npm run setup
```

This will install all dependencies and perform any other necessary setup.

### Running the Server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

There are several scripts included to help improve your development experience:

- `npm run setup`: Installs all dependencies and performs any necessary setup.
- `npm run dev`: Runs the development server.
- `npm run lint`: Runs the linter.
- `npm run format`: Runs the formatter (prettier).
- `npm run type-check`: Runs the type checker.
- `npm test`: Runs the unit tests.
- `npm run build`: Builds the application for production.

### Visual Studio Code

This project includes some default settings for Visual Studio code, including auto-format (using Prettier) upon save. It also includes a list of recommended extensions.

These settings are located in the `.vscode` directory.

## Learn more

This project was created using [create-next-app](https://nextjs.org/docs/api-reference/create-next-app).

The following tools are used for this project:

- [Next.js](https://nextjs.org) for building and serving the React frontend and node API
- [TypeScript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com) for rapid development using utility-first CSS classes
- [Prettier](https://prettier.io) for code formatting
- [ESLint](https://eslint.org) for code linting
- [Jest](https://jestjs.io) for unit testing
- Github Actions enabled by default
