import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import ProfileScreen from './views/ProfileScreen';
import MapScreen from './views/MapScreen';
import SplashScreen from './views/SplashScreen'; // Import the SplashScreen component

const Stack = createStackNavigator();

const App = () => {
  const [isAppReady, setIsAppReady] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000); // Adjust the timeout as needed
  }, []);

  return (
    <NavigationContainer>
      {isAppReady ? (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
};

export default App;
