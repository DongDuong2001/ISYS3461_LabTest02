# Contributing to WonderTour Lab Test 02 Reference Solution

First off, thank you for considering contributing to this reference solution! Contributions help keep the codebase clean, readable, and highly educational for future learners.

Please note that this is a **post-assessment reference solution** and is meant for learning and self-study.

---

## Important: Academic Integrity

> [!WARNING]
> This repository is a reference solution. If you are currently enrolled in a course containing this lab or project (e.g., at RMIT University), please adhere to your institution's **Academic Integrity Policy**.
> - Do **NOT** copy-paste or submit any code from this repository for your graded assessments.
> - Use this codebase solely for study, reference, and understanding the system design/architecture.

---

## How Can I Contribute?

### 1. Reporting Bugs & Issues
If you find a bug, discrepancy with the lab requirements, or potential improvement in code structure:
1. Search the existing issues to see if it has already been reported.
2. If not, open a new issue using the **Bug Report** template.
3. Be as descriptive as possible, including steps to reproduce the issue, expected versus actual behavior, and error logs if applicable.

### 2. Suggesting Enhancements
To propose improvements, new features, or architectural adjustments (e.g. adding distributed tracing, Docker support, or centralized config):
1. Open an issue using the **Feature Request** template.
2. Outline the benefits and design considerations of your proposal.

### 3. Submitting Pull Requests
To submit code changes:
1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-name
   ```
2. Make your changes, keeping code style consistent with the rest of the project.
3. Verify that your changes build and run successfully:
   - For backend services, run:
     ```bash
     mvn clean test
     ```
   - For frontend, run:
     ```bash
     npm run build
     ```
4. Commit your changes with clear, descriptive commit messages.
5. Push to your fork and submit a Pull Request (PR) against the `main` branch of this repository.
6. Fill out the **Pull Request Template** completely.

## Coding Guidelines

### Backend (Spring Boot Microservices)
- Use standard Java formatting and naming conventions.
- Maintain the layered structure: `controller`, `service`, `repository`, `model`, `dto`, `client`, `exception`.
- Ensure all business models are not exposed directly to the controller; use DTOs for request/response contracts.
- Include proper validation annotations (e.g., `@NotNull`, `@Min`) and handle errors elegantly.
- Include unit/integration tests for any new endpoints or logic.

### Frontend (React)
- Follow the React 19 and Vite folder structures under `frontend/src`.
- Use descriptive custom hooks for business logic and components for UI presentation.
- Keep CSS clean, utilizing Tailwind CSS or standard styles as structured.
- Keep the `localStorage` key names and cart structures consistent to prevent breaking user state.
