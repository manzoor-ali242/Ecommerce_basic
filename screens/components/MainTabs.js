// MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';



/* import HomeScreen from './components/HomeScreen';
import CategoriesScreen from './CategoriesScreen';
import FavoritesScreen from './FavoritesScreen';
import ProfileScreen from './ProfileScreen';
 */
import HomeScreen from './HomeScreen';
import ProfileScreen from './Category/ProfileScreen';
import FavoritesScreen from './Category/FavoritesScreen';
import CategoriesScreen from './Category/CategoriesScreen';



const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Home') {
          return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
        }
        if (route.name === 'Categories') {
          return <MaterialIcons name="category" size={size} color={color} />;
        }
        if (route.name === 'Favorites') {
          return <FontAwesome name={focused ? 'heart' : 'heart-o'} size={size} color={color} />;
        }
        if (route.name === 'Profile') {
          return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />;
        }
      },
      tabBarActiveTintColor: 'rgb(87, 107, 242)',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Categories" component={CategoriesScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabs;
