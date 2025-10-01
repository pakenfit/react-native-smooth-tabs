import { createStackNavigator } from '@react-navigation/stack';
import TabsScreen from '../screens/TabsScreen';
import HelloScreen from '../screens/HelloScreen';

export type TabsStackParamList = {
  TabsScreen: undefined;
  HelloScreen: undefined;
};

const Stack = createStackNavigator<TabsStackParamList>();

export default function TabsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="TabsScreen"
        component={TabsScreen}
        options={{ title: 'Smooth Tabs' }}
      />
      <Stack.Screen
        name="HelloScreen"
        component={HelloScreen}
        options={{ title: 'Hello' }}
      />
    </Stack.Navigator>
  );
}
