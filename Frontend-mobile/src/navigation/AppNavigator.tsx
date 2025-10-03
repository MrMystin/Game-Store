import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RootStackParamList, TabParamList } from './types';

// Telas do app - área não logada.
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/CadastroScreen";
import LoginScreen from "../screens/LoginScreen";
import CatalogScreen from "../screens/catalog/CatalogScreen";
import CartScreen from "../screens/cart/CartScreen";
import GameScreen from "../screens/GameScreen";

const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route, navigation}) => ({
              tabBarIcon: ({ color, focused, size}) => {
                let iconName: React.ComponentProps<typeof FontAwesome>['name'];
                if (route.name === "Catalog") {
                  iconName = focused ? "tags" : "tags";
                }
                if (route.name === "Cart") {
                  iconName = focused ? "shopping-cart" : "shopping-cart";
                }
                if (route.name === "Login") {
                  iconName = focused ? "user" : "user";
                }
                return <FontAwesome name={iconName!} size={size} color={color} />
              },
              tabBarActiveTintColor: "red",
              tabBarInactiveTintColor: "grey",
              headerShown: false,
            })}
          >
            <Tab.Screen 
              name="Catalog"
              component={CatalogScreen}
              options={{title: 'Menu'}}
              />
            <Tab.Screen
              name="Cart"
              component={CartScreen}
              options={{title: 'Seu Carrinho'}}
            />
            <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
    );
}

function StackNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Details"
        component={HomeScreen}
        options={{ title: 'Detalhes' }}
      />
      <AppStack.Screen 
        name="Login"
        component={LoginScreen}
        options={{ title: "Acessar" }}
      />
      <AppStack.Screen 
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen 
        name="Game"
        component={GameScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <StackNavigator />
  );
};