import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MainTabs from './screens/components/MainTabs';
import CategoriesScreen from './screens/components/Category/CategoriesScreen';
import FavoritesScreen from './screens/components/Category/FavoritesScreen';
import ProfileScreen from './screens/components/Category/ProfileScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={MainTabs} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name = "Favorites" component={FavoritesScreen} />
        <Stack.Screen name = "Profile" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
