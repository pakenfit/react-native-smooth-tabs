import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import TabsStack from './navigation/TabsStack';
import SettingsScreen from './screens/SettingsScreen';

const HomeIcon = ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 20 }}>🏠</Text>
);

const TabsIcon = ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 20 }}>📱</Text>
);

const SettingsIcon = ({ color }: { color: string }) => (
  <Text style={{ color, fontSize: 20 }}>⚙️</Text>
);

export type RootTabParamList = {
  Home: undefined;
  TabsStack: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopColor: 'rgba(255, 255, 255, 0.1)',
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <HomeIcon color={color} />,
            }}
          />
          <Tab.Screen
            name="TabsStack"
            component={TabsStack}
            options={{
              title: 'Smooth Tabs',
              headerShown: false,
              tabBarIcon: ({ color }) => <TabsIcon color={color} />,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'Settings',
              tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
