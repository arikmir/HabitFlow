# HabitFlow

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

A beautiful and intuitive habit tracking app built with React Native and Expo. Build better habits, track your progress, and achieve your goals.

## Screenshots

| Today View | Stats | Settings |
|:----------:|:-----:|:--------:|
| ![Today](screenshots/today.png) | ![Stats](screenshots/stats.png) | ![Settings](screenshots/settings.png) |

> *Screenshots coming soon*

## Features

- **Daily Habit Tracking** - Track your habits with a simple, intuitive interface
- **Progress Statistics** - Visualize your progress with detailed stats and charts
- **Customizable Settings** - Personalize your experience with themes and preferences
- **Cross-Platform** - Works seamlessly on iOS, Android, and Web
- **Offline Support** - Track your habits even without an internet connection
- **Modern UI** - Clean, minimalist design that keeps you focused

## Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: React Native StyleSheet
- **Code Quality**: ESLint + Prettier

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) app on your mobile device (for testing)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/HabitFlow.git
   cd HabitFlow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on your device**

   - Scan the QR code with the Expo Go app (Android) or Camera app (iOS)
   - Or press `i` for iOS simulator, `a` for Android emulator, `w` for web

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS device/simulator |
| `npm run web` | Run in web browser |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Run ESLint and auto-fix issues |
| `npm run format` | Format code with Prettier |

## Project Structure

```
HabitFlow/
├── src/
│   ├── constants/       # App constants and theme colors
│   ├── screens/         # Screen components
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── assets/              # Images, fonts, and other static assets
├── App.tsx              # Root component
├── app.json             # Expo configuration
├── babel.config.js      # Babel configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Development

### Code Style

This project uses ESLint and Prettier for code quality and formatting. Configuration files:

- `.eslintrc.js` - ESLint rules
- `.prettierrc` - Prettier formatting options

Run linting before committing:

```bash
npm run lint
npm run format
```

### Building for Production

```bash
# Build for all platforms
npx expo build

# Build for specific platform
npx expo build:android
npx expo build:ios
```

For EAS Build (recommended):

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure and build
eas build --platform all
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) for cross-platform mobile development
- All contributors who help improve this project

---

<p align="center">
  Made with :heart: for better habits
</p>
