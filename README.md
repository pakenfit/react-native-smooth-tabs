# @pakenfit/smooth-tabs

A smooth, animated tab component for React Native with gesture support and beautiful transitions.

## Features

- 🎨 **Smooth Animations**: Beautiful spring-based animations powered by Reanimated
- 👆 **Gesture Support**: Tap and long-press gestures with haptic feedback
- 📱 **Cross-Platform**: Works on both iOS and Android
- 🎯 **TypeScript**: Full TypeScript support with type definitions
- ⚡ **Performance**: Optimized with React Native Reanimated and Worklets
- 🎛️ **Customizable**: Extensive styling and behavior customization options
- 🔄 **Synchronized**: Tab indicator and content are perfectly synchronized

## Installation

```sh
npm install @pakenfit/smooth-tabs
# or
yarn add @pakenfit/smooth-tabs
```

### Peer Dependencies

This library requires the following peer dependencies. Make sure they are installed in your project:

```sh
npm install react react-native react-native-gesture-handler react-native-pager-view react-native-reanimated react-native-worklets
```

### iOS Setup

For iOS, you need to install pods:

```sh
cd ios && pod install
```

### Android Setup

For Android, make sure to follow the setup instructions for:

- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)

## Usage

### Basic Example

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tab } from '@pakenfit/smooth-tabs';

const TABS = [
  { index: 0, title: 'Home' },
  { index: 1, title: 'Search' },
  { index: 2, title: 'Profile' },
];

const HomeContent = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Home Content</Text>
  </View>
);

const SearchContent = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Search Content</Text>
  </View>
);

const ProfileContent = () => (
  <View style={styles.content}>
    <Text style={styles.text}>Profile Content</Text>
  </View>
);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Tab.Provider>
            <Tab.Container tabs={TABS}>
              <HomeContent />
              <SearchContent />
              <ProfileContent />
            </Tab.Container>
          </Tab.Provider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
```

### Advanced Example with Custom Styling

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tab } from '@pakenfit/smooth-tabs';

const TABS = [
  { index: 0, title: 'Popular' },
  { index: 1, title: 'Top Rated' },
  { index: 2, title: 'Upcoming' },
  { index: 3, title: 'Now Playing' },
];

export default function AdvancedExample() {
  return (
    <Tab.Provider>
      <Tab.Container
        tabs={TABS}
        tabContainerStyle={styles.tabContainer}
        tabItemStyle={styles.tabItem}
        tabItemTextStyle={styles.tabText}
        tabItemActiveTextStyle={styles.activeTabText}
        scrollViewContentContainerStyle={styles.scrollContainer}
        tabAnimatedIndicatorStyle={styles.indicator}
      >
        <View style={styles.content}>
          <Text style={styles.contentText}>Popular Movies</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>Top Rated Movies</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>Upcoming Movies</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>Now Playing Movies</Text>
        </View>
      </Tab.Container>
    </Tab.Provider>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#1a1a1a',
    paddingTop: 20,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  indicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  contentText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## API Reference

### Components

#### `Tab.Provider`

The context provider that manages tab state. Must wrap your `Tab.Container`.

```tsx
<Tab.Provider>
  <Tab.Container>{/* Your content */}</Tab.Container>
</Tab.Provider>
```

#### `Tab.Container`

The main container component that renders the tabs and content.

##### Props

| Prop                              | Type                   | Default      | Description                                   |
| --------------------------------- | ---------------------- | ------------ | --------------------------------------------- |
| `tabs`                            | `TabItemType[]`        | **Required** | Array of tab objects with `index` and `title` |
| `children`                        | `React.ReactNode`      | **Required** | Content components for each tab               |
| `tabItemStyle`                    | `StyleProp<ViewStyle>` | -            | Style for individual tab items                |
| `tabContainerStyle`               | `StyleProp<ViewStyle>` | -            | Style for the tab container                   |
| `tabItemTextStyle`                | `StyleProp<TextStyle>` | -            | Style for tab item text                       |
| `tabItemActiveTextStyle`          | `StyleProp<TextStyle>` | -            | Style for active tab item text                |
| `scrollViewContainerStyle`        | `StyleProp<ViewStyle>` | -            | Style for the scroll view container           |
| `scrollViewContentContainerStyle` | `StyleProp<ViewStyle>` | -            | Style for the scroll view content container   |
| `tabAnimatedIndicatorStyle`       | `StyleProp<ViewStyle>` | -            | Style for the animated indicator              |

##### TabItemType

```tsx
type TabItemType = {
  index: number;
  title: string;
};
```

### Hooks

#### `useTab()`

Hook to access and control tab state.

```tsx
import { useTab } from '@pakenfit/smooth-tabs';

function MyComponent() {
  const { activeTab, setActiveTab } = useTab();

  return (
    <View>
      <Text>Current tab: {activeTab}</Text>
      <Button title="Go to tab 2" onPress={() => setActiveTab(2)} />
    </View>
  );
}
```

##### Returns

| Property       | Type                    | Description                       |
| -------------- | ----------------------- | --------------------------------- |
| `activeTab`    | `number`                | Current active tab index          |
| `setActiveTab` | `(tab: number) => void` | Function to change the active tab |

## Styling Guide

### Default Styles

The library comes with sensible defaults that work well for most use cases:

- **Tab Container**: Full width with relative positioning
- **Tab Items**: Rounded corners with padding
- **Indicator**: Semi-transparent background with smooth transitions
- **Text**: Bold white text for active tabs

### Customization Tips

1. **Tab Height**: Adjust `height` in `scrollViewContentContainerStyle`
2. **Tab Spacing**: Use `gap` in `scrollViewContentContainerStyle`
3. **Indicator Appearance**: Customize `tabAnimatedIndicatorStyle`
4. **Text Colors**: Use `tabItemTextStyle` and `tabItemActiveTextStyle`

### Example Custom Styles

```tsx
const customStyles = {
  tabContainer: {
    backgroundColor: '#2a2a2a',
    paddingTop: 10,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  scrollContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 50,
  },
  indicator: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderRadius: 16,
  },
};
```

## Gesture Support

The library includes built-in gesture support:

- **Tap**: Switch to the tapped tab
- **Long Press**: Provides visual feedback with scale animation
- **Swipe**: Navigate between tabs by swiping the content area

## Performance

This library is optimized for performance:

- Uses React Native Reanimated for smooth 60fps animations
- Implements worklets for gesture handling
- Minimizes re-renders with proper state management
- Optimized scroll performance with native drivers

## Requirements

- React Native >= 0.70.0
- React >= 18.0.0
- react-native-gesture-handler >= 2.8.0
- react-native-pager-view >= 6.0.0
- react-native-reanimated >= 3.0.0
- react-native-worklets >= 0.3.0

## Troubleshooting

### Common Issues

1. **Tabs not animating**: Make sure you have properly installed and configured react-native-reanimated
2. **Gestures not working**: Ensure react-native-gesture-handler is properly set up
3. **TypeScript errors**: Make sure you have the latest version of the library

### Setup Checklist

- [ ] Installed all peer dependencies
- [ ] Configured react-native-gesture-handler
- [ ] Configured react-native-reanimated
- [ ] Wrapped your app with `GestureHandlerRootView`
- [ ] Used `Tab.Provider` to wrap `Tab.Container`

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development

1. Clone the repository
2. Install dependencies: `yarn install`
3. Run the example: `yarn example start`
4. Make your changes
5. Test your changes
6. Submit a pull request

## License

MIT © [Pakenfit](https://github.com/pakenfit)

## Support

If you encounter any issues or have questions, please:

1. Check the [troubleshooting section](#troubleshooting)
2. Search existing [issues](https://github.com/pakenfit/smooth-tabs/issues)
3. Create a new issue with detailed information

---

Made with ❤️ using [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
