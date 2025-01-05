# Fintech Dashboard

A Next.js application demonstrating transaction and loan request management with Tailwind CSS, ShadCN components, and robust Mock API endpoints.

## Features

- User loan request form with validation.
- Transaction filtering and sorting.
- Context-based state management for global state sharing.
- Fully styled with Tailwind CSS and ShadCN components.
- Test coverage report.

## Folder Structure

Refer to the folder structure in the repository.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-project.git
   cd my-project
2. Install dependencies
   ```bash
     npm install
3.  Start the development server
   ```bash
    npm run dev
```
4. Run test
   ```bash
   npm run test
   ```
5. Genereate test coverage report
  ```bash
npm run test:coverage
```
6. Build the project
     ```bash
     npm run build
## Approach
### Code Organization
- Components: Modular, reusable components with Tailwind CSS styling.
- API Endpoints: Well-defined RESTful routes for transactions and loans.
- Global State: React Context API to manage user, loans, and transactions.
### Validation
- Form validation handled via react-hook-form with detailed error handling.
- Secure API endpoints to validate request data.
### Testing
- Component and integration tests using Jest and React Testing Library.
- Mock data for consistent test results.
