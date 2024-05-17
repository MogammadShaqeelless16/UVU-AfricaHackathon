import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import ProfileScreen from './views/ProfileScreen';
import MapScreen from './views/MapScreen';
import SplashScreen from './views/SplashScreen'; // Import the SplashScreen component
import ChatScreen from './views/ChatScreen';
import LandingPage from './views/LandingPage';

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
        <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  );
};

export default App;
