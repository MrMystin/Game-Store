import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Catalog: undefined,
  Cart: undefined,
  Login: undefined,
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  Details: { itemId: number };
  Login: undefined;
  Register: undefined,
  Game: { productId: number };
}

export type AuthTabParamList = {
  Catalog: undefined,
  Cart: undefined,
  Account: undefined,
}

export type AuthStackParamList = {
  Tabs: NavigatorScreenParams<AuthTabParamList>;
  Details: { itemId: number};
  Payment?: { product?: any };
  Game: { productId: number };
}