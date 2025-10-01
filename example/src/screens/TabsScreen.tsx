import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tab, type TabItemType } from '@pakenfit/smooth-tabs';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { TabsStackParamList } from '../navigation/TabsStack';

const TABS: TabItemType[] = [
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

type TabsScreenNavigationProp = StackNavigationProp<
  TabsStackParamList,
  'TabsScreen'
>;

export default function TabsScreen() {
  const navigation = useNavigation<TabsScreenNavigationProp>();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate('HelloScreen')}
            >
              <Text style={styles.navButtonText}>Go to Hello Screen</Text>
            </TouchableOpacity>
          </View>
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
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  navigationContainer: {
    padding: 16,
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
