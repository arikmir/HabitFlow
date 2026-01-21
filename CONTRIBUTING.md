# Contributing to HabitFlow

First off, thank you for considering contributing to HabitFlow! It's people like you that make HabitFlow such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/HabitFlow.git
   cd HabitFlow
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible using our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

**Great bug reports include:**
- A clear and descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, device, app version)

### Suggesting Features

Feature suggestions are tracked as GitHub issues. When creating a feature request, use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- A clear and descriptive title
- Detailed description of the proposed feature
- Explanation of why this feature would be useful
- Any relevant mockups or examples

### Code Contributions

1. Look for issues labeled `good first issue` or `help wanted`
2. Comment on the issue to let others know you're working on it
3. Follow the development workflow below

## Development Workflow

1. **Ensure you're on the latest main branch**:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and test thoroughly

4. **Run linting and formatting**:
   ```bash
   npm run lint
   npm run format
   ```

5. **Test on multiple platforms** if possible (iOS, Android, Web)

6. **Commit your changes** following our commit message guidelines

7. **Push to your fork** and submit a pull request

## Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type
- Use meaningful variable and function names

### Code Formatting

This project uses ESLint and Prettier. Before committing:

```bash
npm run lint:fix
npm run format
```

### File Organization

- Place components in appropriate directories under `src/`
- Keep files focused and single-purpose
- Export from index files when appropriate

### Naming Conventions

- **Files**: PascalCase for components (`TodayScreen.tsx`), camelCase for utilities (`id.ts`)
- **Components**: PascalCase (`HabitCard`)
- **Functions**: camelCase (`calculateStreak`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_HABITS`)
- **Types/Interfaces**: PascalCase (`Habit`, `HabitProps`)

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(habits): add streak counter display
fix(stats): correct weekly progress calculation
docs: update installation instructions
style: format components with prettier
```

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Fill out the pull request template** completely
3. **Link related issues** using keywords (e.g., "Fixes #123")
4. **Ensure all checks pass** (linting, type checking, tests)
5. **Request review** from maintainers
6. **Address feedback** promptly and respectfully

### Review Criteria

Your PR will be reviewed for:
- Code quality and style consistency
- Proper TypeScript usage
- Component architecture
- Performance considerations
- Accessibility
- Documentation

## Questions?

Feel free to open an issue with your question or reach out to the maintainers. We're here to help!

---

Thank you for contributing to HabitFlow!
