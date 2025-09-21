import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tab } from '@pakenfit/smooth-tabs';

const TABS = [
  { index: 0, title: 'Popular' },
  { index: 1, title: 'Top Rated' },
  { index: 2, title: 'Upcoming' },
  { index: 3, title: 'Now Playing' },
  { index: 4, title: 'Trending' },
];

const Content = ({ title }: { title: string }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Tab.Provider>
            <Tab.Container
              tabs={TABS}
              scrollViewContentContainerStyle={
                styles.scrollViewContentContainer
              }
            >
              <Content title="Popular" />
              <Content title="Top Rated" />
              <Content title="Upcoming" />
              <Content title="Now Playing" />
              <Content title="Trending" />
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  scrollViewContentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
