import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthStackParamList, AuthTabParamList } from './types';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Telas do app - área não logada.
import HomeScreen from "../screens/HomeScreen";
import Account from "../screens/accountScreen";
import CatalogScreen from "../screens/catalog/CatalogScreen";
import CartScreen from "../screens/cart/CartScreen";
import GameScreen from "../screens/GameScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<AuthTabParamList>();

function AuthTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route, navigation}) => ({
              tabBarIcon: ({ color, focused, size}) => {
                let iconName: React.ComponentProps<typeof FontAwesome>['name'];
                if (route.name === "Catalog") {
                  iconName = "tags";
                }
                if (route.name === "Cart") {
                  iconName = "shopping-cart";
                }
                if (route.name === "Account") {
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
            <Tab.Screen name="Account" component={Account} options={{title: 'Sua conta'}}/>
        </Tab.Navigator>
    );
}

function AuthStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={AuthTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={HomeScreen}
        options={{ title: 'Detalhes' }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: 'Pagamento' }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function AuthNavigator() {
  return (
    <AuthStackNavigator />
  );
};