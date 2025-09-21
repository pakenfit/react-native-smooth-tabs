# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React Native library that provides smooth, animated tab components with gesture support. The library uses React Native Reanimated for smooth animations, Gesture Handler for touch interactions, and PagerView for swipeable content.

## Architecture

### Core Components
- **TabProvider**: Context provider that manages active tab state
- **TabContainer**: Main container that renders tab items and handles animated indicator
- **TabItem**: Individual tab button with gesture support (tap and long press)
- **TabContent**: Content area that responds to active tab changes

### Key Dependencies
- React Native Reanimated (animations and worklets)
- React Native Gesture Handler (touch interactions)
- React Native PagerView (swipeable content)
- React Native Worklets (UI thread scheduling)

### Animation System
The library uses a sophisticated animation system that:
- Interpolates tab indicator position and width based on scroll progress
- Synchronizes animations between tab selection and content swiping
- Uses worklets for 60fps UI thread animations
- Handles both programmatic tab changes and gesture-driven changes

## Development Commands

### Setup
```bash
yarn install              # Install dependencies for both library and example
```

### Development
```bash
yarn example start        # Start Metro bundler for example app
yarn example ios          # Run example app on iOS
yarn example android      # Run example app on Android
yarn example web          # Run example app on web
```

### Code Quality
```bash
yarn typecheck           # Type check with TypeScript
yarn lint                # Lint code with ESLint
yarn lint --fix          # Fix linting issues automatically
yarn test                # Run unit tests with Jest
```

### Build & Release
```bash
yarn clean               # Clean build artifacts
yarn prepare             # Build library with react-native-builder-bob
yarn release             # Release new version with release-it
```

### Single Test Execution
```bash
yarn test --testNamePattern="multiply"  # Run specific test
yarn test src/__tests__/index.test.tsx  # Run specific test file
```

## Workspace Structure

This is a yarn workspace monorepo:
- **Root**: Library source code and configuration
- **example/**: Demo app showing library usage

The example app automatically uses the local library version, so changes are reflected immediately without rebuilding.

## Important Notes

### Missing Dependencies
The codebase references some utility files that may need to be created:
- `~/types/tab-types.ts` (for TabItemType interface)
- `~/lib/utils.ts` (for cn utility function)

### Development Workflow
1. Make changes to library code in `src/`
2. Test changes using the example app
3. Ensure TypeScript compilation passes
4. Run linting and tests before committing
5. Use conventional commit messages (enforced by commitlint)

### Gesture Handling
The library uses both tap and long press gestures with proper worklet integration for performance. When modifying gesture code, ensure UI thread operations use `scheduleOnRN`.

### Animation State Management
The tab indicator animation state is managed through:
- `scrollProgress` shared value for position tracking
- Layout measurements for accurate positioning
- Interpolation between current and next tab positions

### Publishing
The library uses release-it with conventional changelog generation. Versions follow semantic versioning based on commit messages.